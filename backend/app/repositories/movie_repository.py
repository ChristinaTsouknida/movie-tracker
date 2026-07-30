from app.models.movie import Movie

def create_movie(db, title, year, category, poster_url):
    new_movie = Movie(title=title, year=year, category=category, poster_url=poster_url)
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie


def get_all_movies(db):
    return db.query(Movie).all()