import {mockMovies} from "../mockData.ts";
import MovieCard from "../components/MovieCard";


const HomePage = () => {
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
        <div className="relative z-0 grid grid-cols-5 gap-3">
          {mockMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </>
  )
}

export default HomePage