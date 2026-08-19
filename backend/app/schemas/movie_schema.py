from pydantic import BaseModel, Field, field_validator
from typing import Optional

class Movie(BaseModel):
    id: int
    title: str
    year: int
    category: Optional[str] = None
    posterUrl: Optional[str] = Field(validation_alias="poster_url", default=None)

class MovieCreate(BaseModel):
    title: str = Field(examples=["Spider-man: No Way Home"])
    year: int = Field(examples=[2021])
    category: str = Field(examples=["Action"])
    posterUrl: str = Field(examples=["https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"])

class TMDBSearchResult(BaseModel):
    tmdb_id: int = Field(validation_alias="id")
    title: str
    year: Optional[int] = Field(validation_alias="release_date", default=None)
    posterUrl: Optional[str] = Field(validation_alias="poster_path", default=None)

    @field_validator("year", mode="before")
    @classmethod
    def extract_year(cls, value):
        if not value:
            return None
        return int(value[:4])

    @field_validator("posterUrl", mode="before")
    @classmethod
    def build_poster_url(cls, value):
        if value is None:
            return None
        else:
            return "https://image.tmdb.org/t/p/w500" + value
