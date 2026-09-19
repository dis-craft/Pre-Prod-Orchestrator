"""Disposable Docker validation sandbox."""
from __future__ import annotations
import json
import re
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence
from .models import SecurityFinding, ValidationEvidence

_SHA = re.compile(r"^[0-9a-fA-F]{7,64}$")

@dataclass(frozen=True)
class SandboxConfig:
    image: str = "python:3.12-slim"
    timeout_seconds: int = 120
    test_command: tuple[str, ...] = ("python", "-m", "remediation.fixture_tests")
    scan_command: tuple[str, ...] = ("python", "-m", "remediation.seeded_scan")
    build_command: tuple[str, ...] | None = None
    lint_command: tuple[str, ...] | None = None
    network: str = "none"

class SandboxError(RuntimeError):
    pass

class DockerSandboxValidator:
    """Validate untrusted candidate code only inside a disposable container."""
    def __init__(self, config: SandboxConfig | None = None):
        self.config = config or SandboxConfig()

    def validate(self, repo_path: str | Path, expected_sha: str, finding: SecurityFinding, patch: str) -> ValidationEvidence:
        self._validate_sha(expected_sha)
        source = Path(repo_path).resolve()
        if not (source / ".git").exists():
            raise SandboxError("repository must contain .git for exact-SHA validation")
        if shutil.which("docker") is None:
            raise SandboxError("docker is required for sandbox validation")
        with tempfile.TemporaryDirectory(prefix="preprod-remediation-") as tmp:
            workspace = Path(tmp) / "repo"
            shutil.copytree(source, workspace, symlinks=False)
            self._git_checkout(workspace, expected_sha)
            before_scan = self._scan(workspace, finding)
            self._apply_patch(workspace, patch)
            commands = []
            tests = self._run_container(workspace, self.config.test_command)
            commands.append({"kind": "tests", **tests})
            if tests["returncode"] != 0:
                return ValidationEvidence(True, False, None, None, False, 0, commands, error="allowlisted tests failed")
            build = None
            if self.config.build_command:
                build = self._run_container(workspace, self.config.build_command)
                commands.append({"kind": "build", **build})
                if build["returncode"] != 0:
                    return ValidationEvidence(True, True, False, None, False, 0, commands, error="allowlisted build failed")
            lint = None
            if self.config.lint_command:
                lint = self._run_container(workspace, self.config.lint_command)
                commands.append({"kind": "lint", **lint})
                if lint["returncode"] != 0:
                    return ValidationEvidence(True, True, None if build is None else True, False, False, 0, commands, error="allowlisted lint failed")
            after_scan = self._scan(workspace, finding)
            original_remains = any(self._same_finding(item, finding) for item in after_scan)
            new_high_critical = sum(1 for item in after_scan if item.get("severity") in {"HIGH","CRITICAL"} and not self._same_finding(item, finding))
            return ValidationEvidence(
                True, True, None if build is None else build["returncode"] == 0,
                None if lint is None else lint["returncode"] == 0,
                not original_remains, new_high_critical, commands,
                {"before_count": len(before_scan), "after_count": len(after_scan),
                 "original_finding_remains": original_remains,
                 "new_high_critical_findings": new_high_critical},
            )

    @staticmethod
    def _validate_sha(sha: str) -> None:
        if not _SHA.fullmatch(sha):
            raise SandboxError("expected_sha must be a hexadecimal git SHA")

    @staticmethod
    def _git_checkout(workspace: Path, sha: str) -> None:
        result = subprocess.run(["git","-C",str(workspace),"checkout","--detach","--quiet",sha],
                                capture_output=True, text=True, timeout=30)
        if result.returncode:
            raise SandboxError(f"unable to checkout exact SHA: {result.stderr.strip()}")

    @staticmethod
    def _apply_patch(workspace: Path, patch: str) -> None:
        check = subprocess.run(["git","-C",str(workspace),"apply","--check","--whitespace=nowarn","-"],
                               input=patch, capture_output=True, text=True, timeout=30)
        if check.returncode:
            raise SandboxError(f"patch rejected: {check.stderr.strip()}")
        apply = subprocess.run(["git","-C",str(workspace),"apply","--whitespace=nowarn","-"],
                               input=patch, capture_output=True, text=True, timeout=30)
        if apply.returncode:
            raise SandboxError(f"patch application failed: {apply.stderr.strip()}")

    def _run_container(self, workspace: Path, command: Sequence[str]) -> dict:
        self._validate_command(command)
        argv = ["docker","run","--rm","--network",self.config.network,"--read-only",
                "--cap-drop","ALL","--security-opt","no-new-privileges","--pids-limit","128",
                "--memory","512m","--cpus","1","--tmpfs","/tmp:rw,noexec,nosuid,size=64m",
                "-v",f"{workspace}:/workspace:rw","-w","/workspace",self.config.image,*command]
        result = subprocess.run(argv, capture_output=True, text=True, timeout=self.config.timeout_seconds)
        return {"command":list(command),"returncode":result.returncode,
                "stdout":result.stdout[-8000:],"stderr":result.stderr[-8000:]}

    @staticmethod
    def _validate_command(command: Sequence[str]) -> None:
        if not command or any(not isinstance(item,str) or not item for item in command):
            raise SandboxError("sandbox command must be a non-empty string sequence")
        if command[0] in {"sh","bash","zsh","fish","cmd","powershell","pwsh"}:
            raise SandboxError("shell entrypoints are forbidden in sandbox commands")
        if any(item in {"&&","||",";","|",">","<"} for item in command):
            raise SandboxError("shell metacharacters are forbidden")

    def _scan(self, workspace: Path, finding: SecurityFinding) -> list[dict]:
        result = self._run_container(workspace, (*self.config.scan_command, finding.file))
        try:
            parsed = json.loads(result["stdout"])
        except json.JSONDecodeError as exc:
            raise SandboxError("security scanner did not return JSON") from exc
        if not isinstance(parsed, list):
            raise SandboxError("security scanner JSON must be an array")
        return parsed

    @staticmethod
    def _same_finding(item: dict, finding: SecurityFinding) -> bool:
        return item.get("rule") == finding.rule and item.get("file") == finding.file and item.get("line") == finding.line
