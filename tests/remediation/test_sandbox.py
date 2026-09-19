from remediation.sandbox import DockerSandboxValidator, SandboxError

def test_sandbox_rejects_shell_commands():
    try:
        DockerSandboxValidator._validate_command(("sh","-c","echo unsafe"))
    except SandboxError:
        return
    raise AssertionError("shell command should be rejected")
