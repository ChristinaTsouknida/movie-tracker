from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    year = Column(Integer)
    category = Column(String(100))
    poster_url = Column(String(500))
    tmdb_id = Column(Integer, unique=True, nullable=True)

