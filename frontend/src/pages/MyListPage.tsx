import MovieCard from "../components/MovieCard.tsx";
import {MonitorPlay, SquareCheckBig} from 'lucide-react'
import {useEffect, useState} from 'react'
import type {UserMovieWithDetails} from "../shared/types.ts";
import { ChevronRight, ChevronLeft} from "lucide-react";


const MyListPage = ()=> {

  const [movies, setMovies] = useState<UserMovieWithDetails[]>([]);

  const watchListMovies = movies.filter((movie) => movie.status === "watchlist")
  const watchedMovies = movies.filter((movie) => movie.status === "watched")

  const [watchlistScrolled, setWatchlistScrolled] = useState(false);
  const [watchedScrolled, setWatchedScrolled] = useState(false);

  const handleRemove = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/list", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(res => res.json())
    .then((data) => {
      setMovies(data);
    })
  }, [])


  useEffect(() => {
    document.title = "My List";
  }, [])

  const scrollRow = (rowId: string) => {
    const row = document.getElementById(rowId);
    if (row) {
      row.scrollBy({ left: 400, behavior: "smooth" });
      if (rowId === "row-watchlist") {
        setWatchlistScrolled(true);
      }
      if (rowId === "row-watched") {
        setWatchedScrolled(true);
      }
    }
  };

  const scrollRowLeft = (rowId: string) => {
    const row = document.getElementById(rowId);
    if (row) {
      row.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  return (
      <>
        <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: "url('/login-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
        />
        <div className="relative z-10 flex flex-col items-center w-full self-start mt-20">
          <h2 className="w-full text-left text-white text-2xl font-bold mb-4 flex items-center gap-2">
            <MonitorPlay size={22}/>
            Watchlist
          </h2>
          <div className="relative w-full overflow-hidden">
            <div id="row-watchlist" className="flex gap-6 overflow-x-hidden">
              {watchListMovies.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0">
                    <MovieCard movie={movie} onRemove={() => handleRemove(movie.id)} />
                  </div>
              ))}
            </div>
            {watchlistScrolled && (
                <button
                    onClick={() => scrollRowLeft("row-watchlist")}
                    className="absolute -left-2 top-16 bg-mt-dark-gray/80 text-white rounded-full p-2"
                >
                  <ChevronLeft size={24} />
                </button>
            )}
            <button
                onClick={() => scrollRow("row-watchlist")}
                className="absolute -right-2 top-16 bg-mt-dark-gray/80 text-white rounded-full p-2"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <hr className="border border-mt-light-gray w-full mt-8"/>
          <h2 className="w-full text-left text-white text-2xl font-bold mb-4 flex items-center gap-2 mt-5">
            <SquareCheckBig size={22}/>
            Watched
          </h2>
          <div className="relative w-full overflow-hidden">
            <div id="row-watched" className="flex gap-6 overflow-x-hidden">
              {watchedMovies.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0">
                    <MovieCard movie={movie} onRemove={() => handleRemove(movie.id)} />
                  </div>
              ))}
            </div>
            {watchedScrolled && (
                <button
                onClick={() => scrollRowLeft("row-watched")}
                className="absolute -left-2 top-16 bg-mt-dark-gray/80 text-white rounded-full p-2">
                  <ChevronLeft size={24} />
                </button>
            )}
            <button
            onClick={() => scrollRow("row-watched")}
            className="absolute -right-2 top-16 bg-mt-dark-gray/80 text-white rounded-full p-2">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </>
  )
}

export default MyListPage