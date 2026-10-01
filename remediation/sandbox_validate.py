#!/usr/bin/env python3
"""Run lightweight syntax validation for AI-modified files inside disposable Docker containers."""
from __future__ import annotations
import shutil
import subprocess
import tempfile
from pathlib import Path

def _docker_check(image: str, command: list[str], root: Path) -> dict:
    try:
        p = subprocess.run(
            ["docker","run","--rm","--network","none","-v",f"{root}:/workspace:ro","-w","/workspace",image,*command],
            text=True,capture_output=True,timeout=180,
        )
        return {"image":image,"passed":p.returncode==0,"returncode":p.returncode,"stdout":p.stdout[-4000:],"stderr":p.stderr[-4000:]}
    except FileNotFoundError:
        return {"image":image,"passed":False,"returncode":127,"stderr":"Docker is not installed on the runner"}
    except subprocess.TimeoutExpired:
        return {"image":image,"passed":False,"returncode":124,"stderr":"Sandbox command timed out"}

def _run_group(repo: Path, files: list[str], image: str, command: list[str]) -> dict:
    root=Path(tempfile.mkdtemp(prefix="preprod-sandbox-"))
    copied=0
    try:
        for rel in files:
            src=(repo/rel).resolve()
            if not src.is_file() or not str(src).startswith(str(repo)):
                continue
            dst=root/rel
            dst.parent.mkdir(parents=True,exist_ok=True)
            shutil.copy2(src,dst)
            copied+=1
        if copied!=len(files):
            return {"passed":False,"error":"Could not copy every changed file into sandbox"}
        return _docker_check(image,command,root)
    finally:
        shutil.rmtree(root,ignore_errors=True)

def validate(repo_path: str, changed_files: list[str]) -> dict:
    repo=Path(repo_path).resolve()
    if shutil.which("docker") is None:
        return {"required":True,"passed":False,"checks":[],"error":"Docker is not installed on the runner"}

    groups={"python":[],"node":[],"shell":[]}
    for rel in changed_files:
        suffix=Path(rel).suffix.lower()
        if suffix==".py": groups["python"].append(rel)
        elif suffix in {".js",".mjs",".cjs"}: groups["node"].append(rel)
        elif suffix in {".sh",".bash"}: groups["shell"].append(rel)

    checks=[]
    specs=[
        ("python","python:3.12-slim",["python","-m","py_compile",*groups["python"]]),
        ("node","node:22-bookworm",["node","--check",*groups["node"]]),
        ("shell","bash:5.2",["bash","-n",*groups["shell"]]),
    ]
    for kind,image,command in specs:
        if not groups[kind]: continue
        result=_run_group(repo,groups[kind],image,command)
        result["kind"]=kind
        result["files"]=groups[kind]
        checks.append(result)
    passed=all(c.get("passed") for c in checks)
    return {"required":True,"passed":passed,"checks":checks,"error":None if passed else "One or more sandbox syntax checks failed"}
