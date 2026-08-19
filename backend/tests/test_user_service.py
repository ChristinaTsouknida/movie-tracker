from unittest.mock import MagicMock, patch
from app.services.user_service import login_user_service
import pytest

def test_login_raises_error_if_user_not_found():
    mock_db = MagicMock()

    with patch("app.services.user_service.get_user_by_email") as mock_get:
        mock_get.return_value = None

        with pytest.raises(ValueError):
            login_user_service(mock_db, email="notfound@example.com", password="whatever")


def test_login_raises_error_if_password_wrong():
    mock_db = MagicMock()
    fake_user = MagicMock()
    fake_user.hashed_password = "hashed_value"

    with patch("app.services.user_service.get_user_by_email") as mock_get:
        mock_get.return_value = fake_user

        with patch("app.services.user_service.verify_password") as mock_verify:
            mock_verify.return_value = False

            with pytest.raises(ValueError):
                login_user_service(mock_db, email="christina@example.com", password="wrongpassword")


def test_login_succeeds_with_correct_credentials():
    mock_db = MagicMock()
    fake_user = MagicMock()
    fake_user.hashed_password = "hashed_value"

    with patch("app.services.user_service.get_user_by_email") as mock_get:
        mock_get.return_value = fake_user

        with patch("app.services.user_service.verify_password") as mock_verify:
            mock_verify.return_value = True

            result = login_user_service(mock_db, email="christina@example.com", password="correctpassword")

            assert result == fake_user