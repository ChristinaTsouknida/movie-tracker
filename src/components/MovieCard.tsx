import type {MovieCardProps} from "../shared/types.ts";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react"


const MovieCard = ({ movie }: MovieCardProps) => {

  const [menuOpen, setMenuOpen] = useState(false);


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
                  <p className="text-white text-sm">menu εδώ</p>
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