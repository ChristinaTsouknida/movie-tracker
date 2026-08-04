from app.repositories.user_movie_repository import create_user_movie, get_user_movies, get_user_movie, update_status

def add_to_list_service(db, user_id, movie_id, status):
    existing_movie = get_user_movie(db, user_id, movie_id)
    if existing_movie:
        raise ValueError("Movie already in your list")

    return create_user_movie(db=db, user_id=user_id, movie_id=movie_id, status=status)

def get_my_movies_service(db, user_id):
    return get_user_movies(db=db, user_id=user_id)


def change_status_service(db, user_movie_id, status):
    return update_status(db=db, user_movie_id=user_movie_id, status=status)