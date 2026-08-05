from pydantic import BaseModel, Field, field_validator
from typing import Optional

class Movie(BaseModel):
    id: int
    title: str
    year: int
    category: Optional[str] = None
    posterUrl: Optional[str] = Field(validation_alias="poster_url", default=None)

class MovieCreate(BaseModel):
    title: str
    year: int
    category: str
    posterUrl: str

class TMDBSearchResult(BaseModel):
    tmdb_id: int = Field(validation_alias="id")
    title: str
    year: int = Field(validation_alias="release_date")
    posterUrl: Optional[str] = Field(validation_alias="poster_path", default=None)

    @field_validator("year", mode="before")
    @classmethod
    def extract_year(cls, value):
        return int(value[:4])

    @field_validator("posterUrl", mode="before")
    @classmethod
    def build_poster_url(cls, value):
        if value is None:
            return None
        else:
            return "https://image.tmdb.org/t/p/w500" + value
