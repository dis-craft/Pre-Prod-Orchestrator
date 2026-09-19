from fastapi.testclient import TestClient
import pytest

from platform.main import app
from platform.config import PlatformSettings, settings
from platform.errors import NotFoundError, ValidationError, register_error_handlers


client = TestClient(app)


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["module"] == "platform"
    assert data["version"] == "1.0.0"
    assert "timestamp" in data
    assert "details" in data
    assert data["details"]["app_name"] == "Platform Security & Workflow API"


def test_readiness_endpoint():
    response = client.get("/api/readiness")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert data["module"] == "platform"
    assert data["details"]["orchestrator_adapter"] == "ready"


def test_config_settings():
    assert settings.app_name == "Platform Security & Workflow API"
    assert settings.version == "1.0.0"
    assert "http://localhost:3000" in settings.cors_origins
    assert "http://127.0.0.1:3000" in settings.cors_origins


def test_custom_platform_error_handler():
    # Test error schema formatting
    err = NotFoundError(message="Test resource not found")
    assert err.code == "NOT_FOUND"
    assert err.status_code == 404
    assert err.message == "Test resource not found"

    val_err = ValidationError(message="Invalid severity level")
    assert val_err.code == "VALIDATION_ERROR"
    assert val_err.status_code == 400


def test_findings_integration_with_p0():
    response = client.get("/api/findings")
    assert response.status_code == 200
    findings = response.json()
    assert isinstance(findings, list)
