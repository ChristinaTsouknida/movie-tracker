from pydantic import BaseModel, Field
from typing import Optional

class UserMovieCreate(BaseModel):
    movie_id: int = Field(examples=[2])
    status: str = Field(examples=["Watched"])

class UserMovie(BaseModel):
    id: int
    user_id: int
    movie_id: int
    status: str

class UserMovieStatusUpdate(BaseModel):
    status: str = Field(examples=["Watchlist"])

class AddMovieFromTMDB(BaseModel):
    tmdb_id: int = Field(examples=[2040])
    title: str = Field(examples=["Batman"])
    year: int = Field(examples=[2020])
    posterUrl: Optional[str]
    status: str = Field(examples=["Watched"])

class UserMovieWithDetails(BaseModel):
    id: int
    status: str
    title: str
    year: int
    posterUrl: str
    tmdb_id: Optional[int] = None