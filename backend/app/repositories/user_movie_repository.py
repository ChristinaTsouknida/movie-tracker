from app.models.user_movie import UserMovie

def create_user_movie(db, user_id, movie_id, status):
    new_movie = UserMovie(user_id=user_id, movie_id=movie_id, status=status)
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie

def get_user_movies(db, user_id):
    return db.query(UserMovie).filter(UserMovie.user_id == user_id).all()