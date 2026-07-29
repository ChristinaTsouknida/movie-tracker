import {mockMovies} from "../mockData.ts";
import MovieCard from "../components/MovieCard";
import {useState} from "react";
import {Search} from 'lucide-react'


const HomePage = () => {

  const [searchTitle, setSearchTitle] = useState("");

  const filteredMovies = mockMovies.filter((movie) => movie.title.toLowerCase().includes(searchTitle.toLowerCase()));

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
          <div className="relative mb-12">
            <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Search"
                className="relative w-100 bg-mt-dark-gray text-white border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-mt-red"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={18} />
          </div>
          <div className="grid grid-cols-8 gap-8">
            {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </>
  )
}

export default HomePage