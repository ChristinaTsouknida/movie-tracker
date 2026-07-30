from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    tmdb_read_access_token: str

    class Config:
        env_file = ".env"

settings = Settings()