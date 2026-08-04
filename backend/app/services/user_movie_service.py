from app.repositories.user_movie_repository import create_user_movie, get_user_movies, get_user_movie, update_status, delete_user_movie
from app.repositories.movie_repository import get_movie_by_id

def add_to_list_service(db, user_id, movie_id, status):
    existing_movie = get_user_movie(db, user_id, movie_id)
    if existing_movie:
        raise ValueError("Movie already in your list")

    return create_user_movie(db=db, user_id=user_id, movie_id=movie_id, status=status)

def get_my_movies_service(db, user_id):
    return get_user_movies(db=db, user_id=user_id)


def change_status_service(db, user_movie_id, status):
    return update_status(db=db, user_movie_id=user_movie_id, status=status)


def delete_from_list_service(db, user_movie_id):
    deleted_movie = delete_user_movie(db, user_movie_id)
    movie = get_movie_by_id(db, deleted_movie.movie_id)
    return {
        "message": f"Movie with title {movie.title} deleted from the list"
    }