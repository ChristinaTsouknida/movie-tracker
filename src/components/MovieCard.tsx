import type {MovieCardProps} from "../shared/types.ts";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react"


const MovieCard = ({ movie }: MovieCardProps) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const [status, setStatus] = useState<"none" | "watchlist" | "watched">("none");


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
            {menuOpen && (
                <div className="absolute top-8 right-2 bg-mt-dark-gray border border-mt-light-gray rounded-lg p-2">
                  <button
                      type="button" className="text-xs px-2 py-1 text-white block w-full text-left hover:bg-mt-black rounded"
                      onClick={() => setStatus(status === "watchlist" ? "none" : "watchlist")}
                  >
                    {status === "watchlist" ? "Remove from Watchlist" : "Add to Watchlist"}
                  </button>
                  <button
                      type="button" className="text-xs px-2 py-1 text-white block w-full text-left hover:bg-mt-black rounded"
                      onClick={() => setStatus(status === "watched" ? "none" : "watched")}
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