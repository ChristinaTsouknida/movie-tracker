from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from app.core.database import engine, Base
from app.models.movie import Movie as MovieModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.movie_repository import get_all_movies
from typing import List

class Movie(BaseModel):
    id: int
    title: str
    year: int
    category: str
    posterUrl: str = Field(validation_alias="poster_url")

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