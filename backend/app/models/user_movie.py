from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class UserMovie(Base):
    __tablename__ = "user_movies"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)
    status = Column(String(20), nullable=False)

