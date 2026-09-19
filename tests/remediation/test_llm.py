from remediation import llm
from remediation.context import RemediationContext


def _context() -> RemediationContext:
    return RemediationContext(
        finding={
            "id": "xss-1",
            "file": "remediation/fixtures/vulnerable_xss.py",
            "line": 2,
            "end_line": None,
            "severity": "HIGH",
            "rule": "python.xss",
            "confidence": 0.99,
        },
        file="remediation/fixtures/vulnerable_xss.py",
        line_range=(1, 5),
        code="1: def render(name):\n2:     return '<h1>' + name + '</h1>'",
        enclosing_symbol="render",
        imports="",
        relevant_tests="",
        scanner_context="tool=seeded-scanner\nrule=python.xss\nseverity=HIGH",
    )


def test_groq_provider_parses_structured_response(monkeypatch):
    captured = {}

    def fake_post_json(url, payload, *, timeout, headers=None):
        captured["url"] = url
        captured["payload"] = payload
        captured["timeout"] = timeout
        captured["headers"] = headers
        return {
            "choices": [{
                "message": {
                    "content": (
                        '{"root_cause":"Unescaped user input reaches HTML output.",'
                        '"patch":"--- a/remediation/fixtures/vulnerable_xss.py\\n'
                        '+++ b/remediation/fixtures/vulnerable_xss.py\\n'
                        '@@ -1,2 +1,2 @@\\n'
                        ' def render(name):\\n'
                        "-    return '<h1>' + name + '</h1>'\\n"
                        "+    return '<h1>' + escape(name) + '</h1>'\\n"
                        '",'
                        '"tests":["tests/test_xss.py"],'
                        '"assumptions":["escape is available in the module."],'
                        '"confidence":0.92,"risk":"MEDIUM"}'
                    )
                }
            }]
        }

    monkeypatch.setattr(llm, "_post_json", fake_post_json)

    provider = llm.GroqProvider(token="test-token")
    proposal = provider.generate(_context())

    assert proposal.confidence == 0.92
    assert proposal.risk == "MEDIUM"
    assert proposal.tests == ["tests/test_xss.py"]
    assert proposal.patch.startswith("--- a/remediation/fixtures/vulnerable_xss.py")
    assert captured["url"].endswith("/chat/completions")
    assert captured["headers"]["Authorization"] == "Bearer test-token"

    response_format = captured["payload"]["response_format"]
    assert response_format["type"] == "json_schema"
    assert response_format["json_schema"]["strict"] is True
    assert captured["payload"]["model"] == "openai/gpt-oss-120b"
    assert captured["payload"]["temperature"] == 0


def test_provider_from_env_selects_groq(monkeypatch):
    monkeypatch.setenv("LLM_PROVIDER", "groq")
    monkeypatch.setenv("GROQ_API_KEY", "not-a-real-key")
    provider = llm.provider_from_env()

    assert isinstance(provider, llm.GroqProvider)
    assert provider.model == "openai/gpt-oss-120b"
