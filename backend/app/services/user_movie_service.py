from app.repositories.user_movie_repository import create_user_movie

def add_to_list(db, user_id, movie_id, status):
    return create_user_movie(db=db, user_id=user_id, movie_id=movie_id, status=status)
