from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class PlatformSettings(BaseSettings):
    """
    Configuration settings for Platform module (Phase P0).
    Allows environment variable overrides and provides sensible defaults.
    """
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = Field(default="Platform Security & Workflow API", validation_alias="PLATFORM_APP_NAME")
    version: str = Field(default="1.0.0", validation_alias="PLATFORM_VERSION")
    env: str = Field(default="development", validation_alias="PLATFORM_ENV")
    api_port: int = Field(default=8000, validation_alias="PLATFORM_API_PORT")
    log_level: str = Field(default="INFO", validation_alias="PLATFORM_LOG_LEVEL")
    cors_origins_raw: str = Field(
        default="http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173",
        validation_alias="CORS_ORIGINS"
    )

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]


settings = PlatformSettings()
