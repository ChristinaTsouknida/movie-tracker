from app.models.user_movie import UserMovie

def create_user_movie(db, user_id, movie_id, status):
    new_movie = UserMovie(user_id=user_id, movie_id=movie_id, status=status)
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie

def get_user_movies(db, user_id):
    return db.query(UserMovie).filter(UserMovie.user_id == user_id).all()


def get_user_movie(db, user_id, movie_id):
    return db.query(UserMovie).filter(UserMovie.user_id == user_id, UserMovie.movie_id == movie_id).first()

def update_status(db, user_movie_id, status):
    new_status = db.query(UserMovie).filter(UserMovie.id == user_movie_id).first()
    new_status.status = status
    db.commit()
    db.refresh(new_status)
    return new_status
