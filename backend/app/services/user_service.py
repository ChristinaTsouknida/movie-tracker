from app.repositories.user_repository import get_user_by_email, create_user
from app.core.security import hash_password, verify_password

def register_user(db, full_name, email, password):
    existing_user = get_user_by_email(db, email)
    if existing_user:
        raise ValueError("Email already registered")

    hashed_password = hash_password(password)

    return create_user(db=db, full_name=full_name, email=email, hashed_password=hashed_password)


def login_user(db, email, password):
    user = get_user_by_email(db, email)
    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(password, user.hashed_password):
        raise ValueError("Invalid email or password")

    return user