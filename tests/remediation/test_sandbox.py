from remediation.sandbox import DockerSandboxValidator, SandboxError

def test_sandbox_rejects_shell_commands():
    try:
        DockerSandboxValidator._validate_command(("sh","-c","echo unsafe"))
    except SandboxError:
        return
    raise AssertionError("shell command should be rejected")


def test_scanner_accepts_exit_one_with_findings():
    validator = DockerSandboxValidator()
    validator._run_container = lambda workspace, command: {
        "command": list(command),
        "returncode": 1,
        "stdout": '[{"rule":"python.sql-injection"}]',
        "stderr": "",
    }
    finding = type("Finding", (), {"file": "app.py"})()
    result = validator._scan(__import__("pathlib").Path("."), finding)
    assert result == [{"rule": "python.sql-injection"}]


def test_scanner_reports_nonzero_failure():
    validator = DockerSandboxValidator()
    validator._run_container = lambda workspace, command: {
        "command": list(command),
        "returncode": 2,
        "stdout": "",
        "stderr": "scanner crashed",
    }
    finding = type("Finding", (), {"file": "app.py"})()
    try:
        validator._scan(__import__("pathlib").Path("."), finding)
    except SandboxError as exc:
        assert "scanner crashed" in str(exc)
    else:
        raise AssertionError("scanner failure should be rejected")
