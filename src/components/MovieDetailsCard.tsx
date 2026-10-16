import type { MovieDetails } from '../api/omdb'

interface MovieDetailsCardProps {
  movie: MovieDetails
}

function MovieDetailsCard({ movie }: MovieDetailsCardProps) {
  return (
    <article className="mt-6 grid gap-4 rounded border border-gray-300 p-4 sm:grid-cols-[12rem_1fr]">
      {movie.Poster !== 'N/A' ? (
        <img
          className="w-full max-w-48 rounded object-cover"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      ) : (
        <div className="grid min-h-64 w-full max-w-48 place-items-center bg-gray-100">
          No poster
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold">{movie.Title}</h2>
        <p className="my-2 text-sm text-gray-600">
          {[movie.Year, movie.Rated, movie.Runtime].filter((item) => item !== 'N/A').join(' · ')}
        </p>

        <p className="leading-relaxed">{movie.Plot}</p>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div><dt className="font-semibold">Genre</dt><dd>{movie.Genre}</dd></div>
          <div><dt className="font-semibold">Director</dt><dd>{movie.Director}</dd></div>
          <div><dt className="font-semibold">Cast</dt><dd>{movie.Actors}</dd></div>
          <div><dt className="font-semibold">IMDb rating</dt><dd>{movie.imdbRating}</dd></div>
        </dl>
      </div>
    </article>
  )
}

export default MovieDetailsCard
