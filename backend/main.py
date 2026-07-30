from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from app.core.database import engine, Base
from app.models.movie import Movie as MovieModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.movie_repository import get_all_movies
from typing import List, Optional
from app.services.tmdb_service import search_movies

class Movie(BaseModel):
    id: int
    title: str
    year: int
    category: str
    posterUrl: str = Field(validation_alias="poster_url")

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

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Movie Tracker API is running"}


@app.get("/movies", response_model=List[Movie])
def read_movies(db: Session = Depends(get_db)):
    return get_all_movies(db)


@app.get("/movies/search", response_model=List[TMDBSearchResult])
def search_movies_endpoint(query: str):
    return search_movies(query)