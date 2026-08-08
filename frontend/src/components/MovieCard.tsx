import type {MovieCardProps} from "../shared/types.ts";
import { useState } from "react";
import { EllipsisVertical, Check } from "lucide-react"


const MovieCard = ({ movie }: MovieCardProps) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const [status, setStatus] = useState<"none" | "watchlist" | "watched">("none");

  const addToWatchlist = () => {
    fetch("http://127.0.0.1:8000/list/from-tmdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        year: movie.year,
        posterUrl: movie.posterUrl,
        status: "watchlist"
      })
    })
        .then((res) => {
          if (res.ok) {
            setStatus("watchlist");
          }
        });
  }

  const addToWatched = () => {
    fetch("http://127.0.0.1:8000/list/from-tmdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        year: movie.year,
        posterUrl: movie.posterUrl,
        status: "watched"
      })
    })
    .then((res) => {
      if (res.ok) {
        setStatus("watched");
      }
    });
  }

  return (
      <>
        <div className="w-40">
          <div className="relative rounded-lg border border-mt-light-gray bg-mt-dark-gray">
            <div className="overflow-hidden rounded-lg h-56">
              <img src={movie.posterUrl} alt={movie.title + " poster"}/>
            </div>
            <EllipsisVertical
                onClick={() => setMenuOpen(!menuOpen)}
                className="absolute top-2 right-2 text-white cursor-pointer"
            />
            <div className={`absolute bottom-2 right-2 rounded-full p-1 ${status === "watched" ? "bg-green-500" : status === "watchlist" ? "bg-yellow-500" : "bg-mt-light-gray"}`}>
              <Check size={14} className="text-white" />
            </div>
            {menuOpen && (
                <div className="absolute top-8 right-2 bg-mt-dark-gray border border-mt-light-gray rounded-lg p-2">
                  <button
                      type="button" className="text-xs px-2 py-1 text-white block w-full text-left hover:bg-mt-black rounded"
                      onClick={addToWatchlist}
                  >
                    {status === "watchlist" ? "Remove from Watchlist" : "Add to Watchlist"}
                  </button>
                  <button
                      type="button" className="text-xs px-2 py-1 text-white block w-full text-left hover:bg-mt-black rounded"
                      onClick={addToWatched}
                  >
                    {status === "watched" ? "Remove from Watched" : "Watched"}
                  </button>
                </div>
            )}
          </div>
          <h3 className="text-white">{movie.title}</h3>
          <p className="text-mt-light-gray text-sm">{movie.year}</p>
        </div>
      </>
  )
}

export default MovieCard;