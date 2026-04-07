import type { Movie, TVShow, Genre, TMDBResponse } from "./types";

const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMovies(page = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/trending/movie/week", { page: page.toString() });
}

export async function getTrendingTVShows(page = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>("/trending/tv/week", { page: page.toString() });
}

export async function getPopularMovies(page = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/movie/popular", { page: page.toString() });
}

export async function getPopularTVShows(page = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>("/tv/popular", { page: page.toString() });
}

export async function searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/search/movie", { query, page: page.toString() });
}

export async function searchTVShows(query: string, page = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB<TMDBResponse<TVShow>>("/search/tv", { query, page: page.toString() });
}

export async function getMovieGenres(): Promise<{ genres: Genre[] }> {
  return fetchTMDB<{ genres: Genre[] }>("/genre/movie/list");
}

export async function getTVGenres(): Promise<{ genres: Genre[] }> {
  return fetchTMDB<{ genres: Genre[] }>("/genre/tv/list");
}

export async function discoverMovies(params: {
  page?: number;
  year?: string;
  with_genres?: string;
  with_original_language?: string;
  sort_by?: string;
}): Promise<TMDBResponse<Movie>> {
  const queryParams: Record<string, string> = {
    page: (params.page || 1).toString(),
    sort_by: params.sort_by || "popularity.desc",
  };
  
  if (params.year) queryParams.primary_release_year = params.year;
  if (params.with_genres) queryParams.with_genres = params.with_genres;
  if (params.with_original_language) queryParams.with_original_language = params.with_original_language;

  return fetchTMDB<TMDBResponse<Movie>>("/discover/movie", queryParams);
}

export async function discoverTVShows(params: {
  page?: number;
  year?: string;
  with_genres?: string;
  with_original_language?: string;
  sort_by?: string;
}): Promise<TMDBResponse<TVShow>> {
  const queryParams: Record<string, string> = {
    page: (params.page || 1).toString(),
    sort_by: params.sort_by || "popularity.desc",
  };
  
  if (params.year) queryParams.first_air_date_year = params.year;
  if (params.with_genres) queryParams.with_genres = params.with_genres;
  if (params.with_original_language) queryParams.with_original_language = params.with_original_language;

  return fetchTMDB<TMDBResponse<TVShow>>("/discover/tv", queryParams);
}

export async function getMovieDetails(id: number): Promise<Movie & { genres: Genre[] }> {
  return fetchTMDB<Movie & { genres: Genre[] }>(`/movie/${id}`);
}

export async function getTVShowDetails(id: number): Promise<TVShow & { genres: Genre[] }> {
  return fetchTMDB<TVShow & { genres: Genre[] }>(`/tv/${id}`);
}

export function getImageUrl(path: string | null, size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"): string {
  if (!path) return "/placeholder-movie.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "tr", name: "Turkish" },
  { code: "th", name: "Thai" },
  { code: "id", name: "Indonesian" },
  { code: "vi", name: "Vietnamese" },
  { code: "pl", name: "Polish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "no", name: "Norwegian" },
];

export function getYears(): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year.toString());
  }
  return years;
}
