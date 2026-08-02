from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models.movie import Movie as MovieModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.movie_repository import get_all_movies
from typing import List, Optional
from app.services.tmdb_service import search_movies as search_movie_service
from app.services.movie_service import create_movie as create_movie_service
from app.models.user import User as UserModel
from app.services.user_service import register_user as register_user_service, login_user as login_user_service
from app.schemas.movie_schema import Movie, MovieCreate, TMDBSearchResult
from app.schemas.user_schema import UserRegister, UserResponse, UserLogin, Token
from app.core.security import create_access_token
from app.core.deps import get_current_user

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
def search_movies(query: str):
    return search_movie_service(query)

@app.post("/movies", response_model=Movie)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return create_movie_service(db, movie.title, movie.year, movie.category, movie.posterUrl)

@app.post("/register", response_model=UserResponse)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    try:
        return register_user_service(db, user.full_name, user.email, user.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login", response_model=Token)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    try:
        logged_in_user = login_user_service(db, user.email, user.password)
        token = create_access_token(logged_in_user.email)
        return {
            "access_token": token,
            "token_type": "bearer"
        }
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))