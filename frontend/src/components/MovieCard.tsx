import type {MovieCardProps} from "../shared/types.ts";
import {useRef, useState, useEffect} from "react";
import { EllipsisVertical, Check } from "lucide-react"


const MovieCard = ({ movie, onRemove, onStatusChange }: MovieCardProps) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const [status, setStatus] = useState<"none" | "watchlist" | "watched">(
      "status" in movie ? (movie.status as "none" | "watchlist" | "watched") : "none"
  );

  const [userMovieId, setUserMovieId] = useState<number | null>(
      "status" in movie ? movie.id : null
  );

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!("status" in movie)) {
      fetch(`http://127.0.0.1:8000/list/status/${movie.tmdb_id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
          .then(res => res.json())
          .then((data) => {
            if (data.status) {
              setStatus(data.status)
              setUserMovieId(data.user_movie_id);
            }
          })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToWatchlist = () => {
    if (userMovieId) {
      fetch(`http://127.0.0.1:8000/list/${userMovieId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status: "watchlist" })
      })
          .then((res) => {
            if (res.ok) {
              setStatus("watchlist");
              setMenuOpen(false);
              if (onStatusChange) onStatusChange("watchlist");
            }
          });
    } else {
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
          .then((res) => res.json())
          .then((data) => {
            setStatus("watchlist");
            setUserMovieId(data.id);
            setMenuOpen(false);
            if (onStatusChange) onStatusChange("watchlist");
          });
    }
  }

  const addToWatched = () => {
    if (userMovieId) {
      fetch(`http://127.0.0.1:8000/list/${userMovieId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status: "watched" })
      })
        .then((res) => {
          if (res.ok) {
            setStatus("watched");
            setMenuOpen(false);
            if (onStatusChange) onStatusChange("watched");
          }
        });
    } else {
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
          .then((res) => res.json())
          .then((data) => {
            setStatus("watched");
            setUserMovieId(data.id);
            setMenuOpen(false);
            if (onStatusChange) onStatusChange("watched");
          });
      }
    }

  const removeFromList = () => {
    fetch(`http://127.0.0.1:8000/list/${userMovieId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
        .then((res) => {
          if (res.ok) {
            setStatus("none");
            setUserMovieId(null);
            if (onRemove) {
              onRemove()
            }
          }
        });
  }


  return (
      <>
        <div className="w-28 sm:w-32 md:w-36 lg:w-40">
          <div className="relative rounded-lg border border-mt-light-gray bg-mt-dark-gray">
            <div className="overflow-hidden rounded-lg h-56">
              <img className="w-full h-full object-cover" src={movie.posterUrl} alt={movie.title + " poster"}/>
            </div>
            <EllipsisVertical
                onClick={() => setMenuOpen(!menuOpen)}
                className="absolute top-2 right-2 text-white cursor-pointer"
            />
            <div className={`absolute bottom-2 right-2 rounded-full p-1 ${status === "watched" ? "bg-green-500" : status === "watchlist" ? "bg-yellow-500" : "bg-mt-light-gray"}`}>
              <Check size={14} className="text-white" />
            </div>
            {menuOpen && (
                <div ref={menuRef} className="absolute top-8 right-2 bg-mt-dark-gray border border-mt-light-gray rounded-lg p-2">
                  <button
                      type="button" className="text-xs px-2 py-1 text-white block w-full text-left hover:bg-mt-black rounded"
                      onClick={status === "watchlist" ? removeFromList : addToWatchlist}
                  >
                    {status === "watchlist" ? "Remove from Watchlist" : "Add to Watchlist"}
                  </button>
                  <button
                      type="button" className="text-xs px-2 py-1 text-white block w-full text-left hover:bg-mt-black rounded"
                      onClick={status === "watched" ? removeFromList : addToWatched}
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