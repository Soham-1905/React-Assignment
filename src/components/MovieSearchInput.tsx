interface MovieSearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

function MovieSearchInput({
  value,
  onChange,
  onClear,
}: MovieSearchInputProps) {
  return (
    <div>
      <label htmlFor="movie-search" className="mb-1 block font-medium">
        Movie title
      </label>
      <div className="flex items-center gap-2 rounded border border-gray-400 px-3 py-2">
        <input
          id="movie-search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try The Dark Knight..."
          autoComplete="off"
          className="min-w-0 flex-1 outline-none"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="text-gray-500 hover:text-gray-700"
          >
            × Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default MovieSearchInput
