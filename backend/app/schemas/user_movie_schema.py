from pydantic import BaseModel
from typing import Optional

class UserMovieCreate(BaseModel):
    movie_id: int
    status: str

class UserMovie(BaseModel):
    id: int
    user_id: int
    movie_id: int
    status: str

class UserMovieStatusUpdate(BaseModel):
    status: str

class AddMovieFromTMDB(BaseModel):
    tmdb_id: int
    title: str
    year: int
    posterUrl: Optional[str]
    status: str