from app.repositories.movie_repository import create_movie as create_movie_repo

def create_movie(db, title, year, category, poster_url):
    return create_movie_repo(db=db, title=title, year=year, category=category, poster_url=poster_url)