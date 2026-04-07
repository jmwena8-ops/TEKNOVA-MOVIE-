// OMDb API configuration
const OMDB_API_KEY = "1a3c9e88";
const OMDB_BASE_URL = "https://www.omdbapi.com";

export interface OMDbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface OMDbMovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface OMDbSearchResponse {
  Search?: OMDbMovie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export async function searchMovies(query: string, page = 1): Promise<OMDbSearchResponse> {
  const url = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  
  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error(`OMDb API Error: ${res.status}`);
  }

  return res.json();
}

export async function getMovieDetails(imdbId: string): Promise<OMDbMovieDetails> {
  const url = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`;
  
  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error(`OMDb API Error: ${res.status}`);
  }

  return res.json();
}

export async function getMovieByTitle(title: string, year?: string): Promise<OMDbMovieDetails> {
  let url = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&plot=full`;
  if (year) {
    url += `&y=${year}`;
  }
  
  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error(`OMDb API Error: ${res.status}`);
  }

  return res.json();
}

// Get poster URL with fallback
export function getPosterUrl(poster: string): string {
  if (poster && poster !== "N/A") {
    return poster;
  }
  return "/placeholder-movie.jpg";
}

// Featured movies to show on homepage
export const FEATURED_SEARCHES = [
  "Avengers",
  "Spider-Man",
  "Batman",
  "Star Wars",
  "Marvel",
  "Fast Furious",
  "James Bond",
  "Jurassic",
  "Mission Impossible",
  "Transformers",
];

export async function getFeaturedMovies(): Promise<OMDbMovie[]> {
  const allMovies: OMDbMovie[] = [];
  
  // Fetch movies from multiple popular searches
  const searchPromises = FEATURED_SEARCHES.slice(0, 5).map(query => 
    searchMovies(query, 1).catch(() => ({ Search: [], Response: "False" } as OMDbSearchResponse))
  );
  
  const results = await Promise.all(searchPromises);
  
  for (const result of results) {
    if (result.Search) {
      allMovies.push(...result.Search);
    }
  }
  
  // Remove duplicates by imdbID and return first 20
  const uniqueMovies = Array.from(
    new Map(allMovies.map(m => [m.imdbID, m])).values()
  );
  
  return uniqueMovies.slice(0, 20);
}
