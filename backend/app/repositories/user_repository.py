from app.models.user import User

def create_user(db, full_name, email, hashed_password):
    new_user = User(full_name=full_name, email=email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_email(db, email):
    return db.query(User).filter(User.email == email).first()
    