# backend/main.py
from fastapi import FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import Optional
from datetime import datetime

app = FastAPI(title="MovieMate API")

# ---------- MODEL ----------
class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    director: Optional[str] = None
    genre: Optional[str] = None
    platform: Optional[str] = None  # Netflix, Prime, etc.
    status: str = "wishlist"  # watching/completed/wishlist
    episodes_total: Optional[int] = None
    episodes_watched: Optional[int] = None
    rating: Optional[int] = None
    review: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ---------- DATABASE ----------
sqlite_file_name = "movies.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=False)

def create_db():
    SQLModel.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
    create_db()

# ---------- ROUTES ----------
@app.get("/api/movies")
def list_movies():
    with Session(engine) as session:
        movies = session.exec(select(Movie)).all()
        return movies

@app.post("/api/movies")
def add_movie(movie: Movie):
    with Session(engine) as session:
        session.add(movie)
        session.commit()
        session.refresh(movie)
        return movie

@app.put("/api/movies/{movie_id}")
def update_movie(movie_id: int, data: Movie):
    with Session(engine) as session:
        movie = session.get(Movie, movie_id)
        for key, value in data.dict(exclude_unset=True).items():
            setattr(movie, key, value)
        session.add(movie)
        session.commit()
        session.refresh(movie)
        return movie

@app.delete("/api/movies/{movie_id}")
def delete_movie(movie_id: int):
    with Session(engine) as session:
        movie = session.get(Movie, movie_id)
        session.delete(movie)
        session.commit()
        return {"ok": True}
