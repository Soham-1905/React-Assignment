export interface MovieSearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MovieDetails extends MovieSearchResult {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: Array<{ Source: string; Value: string }>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
}

interface OmdbSearchResponse {
  Search: MovieSearchResult[]
  Response: 'True'
}

interface OmdbDetailsResponse extends MovieDetails {
  Response: 'True'
}

interface OmdbErrorResponse {
  Response: 'False'
  Error: string
}

type OmdbResponse =
  | OmdbSearchResponse
  | OmdbDetailsResponse
  | OmdbErrorResponse

const apiKey = import.meta.env.VITE_OMDB_API_KEY
const apiUrl = 'https://www.omdbapi.com/'

async function request<T extends OmdbResponse>(
  params: Record<string, string>,
  signal?: AbortSignal,
): Promise<T | OmdbErrorResponse> {
  if (!apiKey) {
    throw new Error('Missing VITE_OMDB_API_KEY. Add it to your .env file and restart Vite.')
  }

  const searchParams = new URLSearchParams({ apikey: apiKey, ...params })
  const response = await fetch(`${apiUrl}?${searchParams}`, { signal })

  if (!response.ok) {
    throw new Error(`Movie service request failed (HTTP ${response.status}).`)
  }

  return (await response.json()) as T | OmdbErrorResponse
}

export async function searchMovies(
  query: string,
  signal?: AbortSignal,
): Promise<MovieSearchResult[]> {
  const data = await request<OmdbSearchResponse>(
    { s: query, type: 'movie' },
    signal,
  )

  if (data.Response === 'False') {
    if (data.Error === 'Movie not found!') {
      return []
    }
    throw new Error(data.Error)
  }

  return data.Search
}

export async function getMovieDetails(
  imdbID: string,
  signal?: AbortSignal,
): Promise<MovieDetails> {
  const data = await request<OmdbDetailsResponse>(
    { i: imdbID, plot: 'full' },
    signal,
  )

  if (data.Response === 'False') {
    throw new Error(data.Error)
  }

  return data
}
