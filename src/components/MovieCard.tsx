import type {MovieCardProps} from "../shared/types.ts";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
      <>
        <div className="w-40">
          <div className="rounded-lg border border-mt-light-gray bg-mt-dark-gray overflow-hidden">
            <img src={movie.posterUrl} alt={movie.title + " poster"}/>
          </div>
          <h3 className="text-white">{movie.title}</h3>
          <p className="text-mt-light-gray text-sm">{movie.year}</p>
        </div>
      </>
  )
}

export default MovieCard;