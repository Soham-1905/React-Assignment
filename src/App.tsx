import { useEffect, useState } from 'react'
import { getMovieDetails, searchMovies } from './api/omdb'
import type { MovieDetails, MovieSearchResult } from './api/omdb'
import MovieDetailsCard from './components/MovieDetailsCard'
import MovieSearchInput from './components/MovieSearchInput'
import MovieSuggestion from './components/MovieSuggestion'

function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([])
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery.length < 2) {
      setSuggestions([])
      setIsSearching(false)
      setHasSearched(false)
      return
    }

    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setIsSearching(true)
      setError('')

      try {
        const results = await searchMovies(trimmedQuery, controller.signal)
        setSuggestions(results)
        setHasSearched(true)
      } catch (searchError) {
        if (!controller.signal.aborted) {
          setSuggestions([])
          setHasSearched(true)
          setError(
            searchError instanceof Error
              ? searchError.message
              : 'Something went wrong while searching.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false)
        }
      }
    }, 400)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    if (!selectedId) {
      return
    }

    const controller = new AbortController()
    setIsLoadingDetails(true)
    setSelectedMovie(null)
    setError('')

    async function loadDetails() {
      try {
        const details = await getMovieDetails(selectedId, controller.signal)
        setSelectedMovie(details)
      } catch (detailsError) {
        if (!controller.signal.aborted) {
          setError(
            detailsError instanceof Error
              ? detailsError.message
              : 'Could not load this movie.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingDetails(false)
        }
      }
    }

    void loadDetails()

    return () => controller.abort()
  }, [selectedId])

  function handleQueryChange(value: string) {
    setQuery(value)
    setSuggestions([])
    setSelectedId('')
    setSelectedMovie(null)
    setIsSearching(false)
    setIsLoadingDetails(false)
    setHasSearched(false)
    setError('')
  }

  function handleClear() {
    handleQueryChange('')
    setIsSearching(false)
    setIsLoadingDetails(false)
  }

  function handleSelect(movie: MovieSearchResult) {
    setSuggestions([])
    setHasSearched(false)
    setSelectedId(movie.imdbID)
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 text-gray-900">
      <div className="mx-auto max-w-3xl rounded border border-gray-200 bg-white p-6">
        <header className="mb-8 text-center">
          <p className="mb-2 text-sm text-gray-600">Find a movie</p>
          <h1 className="text-3xl font-bold">Movie Search</h1>
          <p className="mt-2 text-gray-600">
            Search for a movie to explore its story, cast, and ratings.
          </p>
        </header>

        <section className="relative mx-auto max-w-xl">
          <MovieSearchInput
            value={query}
            onChange={handleQueryChange}
            onClear={handleClear}
          />

          <div className="min-h-8 py-2 text-sm text-gray-600">
            {query.trim().length < 2 && !selectedId && (
              <p>Enter at least 2 characters to search.</p>
            )}
            {isSearching && <p>Searching movies...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!isSearching && !error && hasSearched && suggestions.length === 0 && (
              <p>No movies found. Try another title.</p>
            )}
          </div>

          {suggestions.length > 0 && (
            <ul className="m-0 max-h-80 list-none overflow-y-auto rounded border border-gray-300 bg-white p-1">
              {suggestions.map((movie) => (
                <MovieSuggestion
                  key={movie.imdbID}
                  movie={movie}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          )}
        </section>

        {isLoadingDetails && (
          <p className="mt-6 text-center text-gray-600">Loading movie details...</p>
        )}
        {selectedMovie && <MovieDetailsCard movie={selectedMovie} />}

        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>Movie information by OMDb.</p>
          <p className="mt-1">Soham Naik</p>
          <p>Thank you for visiting!</p>
        </footer>
      </div>
    </main>
  )
}

export default App
