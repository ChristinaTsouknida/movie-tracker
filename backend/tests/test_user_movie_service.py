from unittest.mock import MagicMock, patch
from app.services.user_movie_service import add_to_list_service
import pytest

def test_add_to_list_raises_error_if_movie_already_exists():
    mock_db = MagicMock()

    with patch("app.services.user_movie_service.get_user_movie") as mock_get:
        mock_get.return_value = MagicMock()

        with pytest.raises(ValueError):
            add_to_list_service(mock_db, user_id=1, movie_id=1, status="watchlist")


def test_add_to_list_succeeds_when_movie_not_already_in_list():
    mock_db = MagicMock()

    with patch("app.services.user_movie_service.get_user_movie") as mock_get:
        mock_get.return_value =  None

        with patch("app.services.user_movie_service.create_user_movie") as mock_create:
            mock_create.return_value = MagicMock()

            result = add_to_list_service(mock_db, user_id=1, movie_id=1, status="watchlist")

            assert result is not None
        