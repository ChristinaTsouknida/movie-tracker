import {mockMovies} from "../mockData.ts";
import MovieCard from "../components/MovieCard.tsx";
import {MonitorPlay, SquareCheckBig} from 'lucide-react'
import {useEffect} from 'react'


const MyListPage = ()=> {

  const watchListMovies = mockMovies.filter((movie) => movie.id % 2 === 0)
  const watchedMovies = mockMovies.filter((movie) => movie.id % 2 !== 0)

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