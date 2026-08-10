from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models.movie import Movie as MovieModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.movie_repository import get_all_movies
from typing import List, Optional
from app.services.tmdb_service import search_movies_service, discover_movies_service
from app.services.movie_service import create_movie_service
from app.models.user import User as UserModel
from app.services.user_service import register_user_service, login_user_service
from app.schemas.movie_schema import Movie, MovieCreate, TMDBSearchResult
from app.schemas.user_schema import UserRegister, UserResponse, UserLogin, Token
from app.core.security import create_access_token
from app.core.deps import get_current_user
from app.models.user_movie import UserMovie as UserMovieModel
from app.schemas.user_movie_schema import UserMovieCreate, UserMovie, UserMovieStatusUpdate, AddMovieFromTMDB
from app.services.user_movie_service import add_to_list_service, get_my_movies_service, change_status_service, delete_from_list_service, add_movie_from_tmdb_service, get_status_service

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
    return search_movies_service(query)

@app.get("/list", response_model=List[UserMovie])
def get_my_movies(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return get_my_movies_service(db, current_user.id)

@app.get("/movies/discover", response_model=List[TMDBSearchResult])
def get_movie_by_genre(genre_id: int):
    return discover_movies_service(genre_id)

@app.get("/list/status/{tmdb_id}")
def get_status(tmdb_id: int, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    user_movie = get_status_service(db, current_user.id, tmdb_id)
    if user_movie:
        return {"user_movie_id": user_movie.id, "status": user_movie.status}
    return {"user_movie_id": None, "status": None}

@app.post("/movies", response_model=Movie)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return create_movie_service(db, movie.title, movie.year, movie.category, movie.posterUrl)

@app.post("/list", response_model=UserMovie)
def add_to_my_list(user_movie: UserMovieCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    try:
        return add_to_list_service(db, current_user.id, user_movie.movie_id, user_movie.status)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/list/from-tmdb", response_model=UserMovie)
def add_movie_from_tmdb(movie_data: AddMovieFromTMDB, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    try:
        return add_movie_from_tmdb_service(db, current_user.id, movie_data.tmdb_id, movie_data.title, movie_data.year, movie_data.posterUrl, movie_data.status)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


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


@app.patch("/list/{user_movie_id}", response_model=UserMovie)
def update_movie_status(user_movie_id: int, update_data: UserMovieStatusUpdate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return change_status_service(db, user_movie_id, update_data.status)

@app.delete("/list/{user_movie_id}")
def delete_movie_from_list(user_movie_id: int, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return delete_from_list_service(db, user_movie_id)
