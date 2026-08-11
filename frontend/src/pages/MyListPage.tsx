import MovieCard from "../components/MovieCard.tsx";
import {MonitorPlay, SquareCheckBig} from 'lucide-react'
import {useEffect, useState} from 'react'
import type {UserMovieWithDetails} from "../shared/types.ts";


const MyListPage = ()=> {

  const [movies, setMovies] = useState<UserMovieWithDetails[]>([]);

  const watchListMovies = movies.filter((movie) => movie.status === "watchlist")
  const watchedMovies = movies.filter((movie) => movie.status === "watched")

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
          <h2 className="w-full text-left text-white text-2xl font-bold mb-8 flex items-center gap-2">
            <MonitorPlay size={22}/>
            Watchlist
          </h2>
          <div className="grid grid-cols-8 gap-8">
            {watchListMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <hr className="border border-mt-light-gray w-full mt-8"/>
          <h2 className="w-full text-left text-white text-2xl font-bold mb-8 flex items-center gap-2 mt-5">
            <SquareCheckBig size={22}/>
            Watched
          </h2>
          <div className="grid grid-cols-8 gap-8">
            {watchedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </>
  )
}

export default MyListPage