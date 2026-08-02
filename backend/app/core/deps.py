from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import decode_access_token
from app.repositories.user_repository import get_user_by_email

oauth2_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    token = credentials.credentials
    email = decode_access_token(token)
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user