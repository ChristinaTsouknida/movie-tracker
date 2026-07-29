from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Movie(BaseModel):
    id: int
    title: str
    year: int
    category: str
    posterUrl: str

app = FastAPI()

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


movie1 = Movie(id=1, title="Titanic", year=1996, category="Drama", posterUrl="empty")
movie2 = Movie(id=2, title="Batman", year=2022, category="Action", posterUrl="empty")

movies_list = [movie1, movie2]

@app.get("/movies")
def read_movies():
    return movies_list