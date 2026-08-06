// import {mockMovies} from "../mockData.ts";
import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import {Search, ChevronRight, ChevronLeft} from 'lucide-react'
import type {Movie, TMDBMovie} from "../shared/types.ts";


const HomePage = () => {

  const [searchTitle, setSearchTitle] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const [categories, setCategories] = useState<{ name: string; genreId: number; movies: TMDBMovie[]; scrolled: boolean }[]>([
    { name: "Action", genreId: 28, movies: [], scrolled: false },
    { name: "Comedy", genreId: 35, movies: [], scrolled: false },
    { name: "Drama", genreId: 18, movies: [], scrolled: false },
    { name: "Science Fiction", genreId: 878, movies: [], scrolled: false },
    { name: "Thriller", genreId: 53, movies: [], scrolled: false },
  ]);

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTitle.toLowerCase()));


  useEffect(() => {
    fetch("http://127.0.0.1:8000/movies")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data);
        });
  }, []);

  useEffect(() => {
    categories.forEach((category) => {
      fetch(`http://127.0.0.1:8000/movies/discover?genre_id=${category.genreId}`)
          .then((res) => res.json())
          .then((data) => {
            setCategories((prevCategories) =>
                prevCategories.map((c) => {
                  if (c.genreId === category.genreId) {
                    return { ...c, movies: data };
                  }
                  return c;
                })
            );
          });
    });
  }, []);

  useEffect(() => {
    document.title = "Home Page";
  }, [])

  const scrollRow = (rowId: number) => {
    const row = document.getElementById(`row-${rowId}`);
    if (row) {
      row.scrollBy({ left: 400, behavior: "smooth" })
      setCategories((prevCategories) =>
          prevCategories.map((c) => {
            if (c.genreId === rowId) {
              return { ...c, scrolled: true };
            }
            return c;
          })
      );
    }
  };

  const scrollRowLeft = (rowId: number) => {
    const row = document.getElementById(`row-${rowId}`);
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
          <div className="w-full">
            {categories.map((category) => (
                <div key={category.genreId} className="w-full mb-8">
                  <h2 className="text-white text-xl font-bold mb-4">{category.name}</h2>
                  <div className="relative">
                    <div id={`row-${category.genreId}`} className="flex gap-6 overflow-x-hidden">
                      {category.movies.map((movie) => (
                          <div key={movie.tmdb_id} className="shrink-0">
                            <MovieCard movie={movie} />
                          </div>
                      ))}
                    </div>
                    {category.scrolled && (
                        <button
                            onClick={() => scrollRowLeft(category.genreId)}
                            className="absolute -left-2 top-16 bg-mt-dark-gray/80 text-white rounded-full p-2"
                        >
                          <ChevronLeft size={24} />
                        </button>
                    )}
                    <button
                        onClick={() => scrollRow(category.genreId)}
                        className="absolute -right-2 top-16 bg-mt-dark-gray/80 text-white rounded-full p-2"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </>
  )
}

export default HomePage