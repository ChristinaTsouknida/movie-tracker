from app.repositories.user_movie_repository import create_user_movie, get_user_movies, get_user_movie

def add_to_list(db, user_id, movie_id, status):
    existing_movie = get_user_movie(db, user_id, movie_id)
    if existing_movie:
        raise ValueError("Movie already in your list")

    return create_user_movie(db=db, user_id=user_id, movie_id=movie_id, status=status)

def get_my_movies(db, user_id):
    return get_user_movies(db=db, user_id=user_id)
