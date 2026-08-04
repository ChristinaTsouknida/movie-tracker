from pydantic import BaseModel

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