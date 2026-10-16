import type { MovieSearchResult } from '../api/omdb'

interface MovieSuggestionProps {
  movie: MovieSearchResult
  onSelect: (movie: MovieSearchResult) => void
}

function MovieSuggestion({ movie, onSelect }: MovieSuggestionProps) {
  return (
    <li className="border-b border-gray-200 last:border-0">
      <button
        className="flex w-full items-center gap-3 p-2 text-left hover:bg-gray-100"
        type="button"
        onClick={() => onSelect(movie)}
      >
        {movie.Poster !== 'N/A' ? (
          <img className="h-14 w-10 object-cover" src={movie.Poster} alt="" />
        ) : (
          <span className="grid h-14 w-10 place-items-center bg-gray-200">?</span>
        )}
        <span>
          <strong className="block">{movie.Title}</strong>
          <span className="text-sm text-gray-600">{movie.Year} · {movie.Type}</span>
        </span>
      </button>
    </li>
  )
}

export default MovieSuggestion
