from app.models.movie import Movie

def create_movie(db, title, year, category, poster_url, tmdb_id=None):
    new_movie = Movie(title=title, year=year, category=category, poster_url=poster_url, tmdb_id=tmdb_id)
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie


def get_all_movies(db):
    return db.query(Movie).all()

def get_movie_by_id(db, movie_id):
    return db.query(Movie).filter(Movie.id == movie_id).first()


def get_movie_by_tmdb_id(db, tmdb_id):
    return db.query(Movie).filter(Movie.tmdb_id == tmdb_id).first()