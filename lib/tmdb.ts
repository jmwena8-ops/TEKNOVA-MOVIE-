import type { Movie, TVShow, Genre, TMDBResponse } from "./types";

const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Mock movie data for demo purposes
const MOCK_MOVIES: Movie[] = [
  { id: 1, title: "The Dark Knight", overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.", poster_path: null, backdrop_path: null, release_date: "2008-07-18", vote_average: 9.0, genre_ids: [28, 80, 18], original_language: "en" },
  { id: 2, title: "Inception", overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", poster_path: null, backdrop_path: null, release_date: "2010-07-16", vote_average: 8.8, genre_ids: [28, 878, 12], original_language: "en" },
  { id: 3, title: "Interstellar", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster_path: null, backdrop_path: null, release_date: "2014-11-07", vote_average: 8.6, genre_ids: [12, 18, 878], original_language: "en" },
  { id: 4, title: "Parasite", overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", poster_path: null, backdrop_path: null, release_date: "2019-05-30", vote_average: 8.5, genre_ids: [35, 53, 18], original_language: "ko" },
  { id: 5, title: "Avengers: Endgame", overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.", poster_path: null, backdrop_path: null, release_date: "2019-04-26", vote_average: 8.4, genre_ids: [28, 12, 878], original_language: "en" },
  { id: 6, title: "Spider-Man: No Way Home", overview: "Peter Parker's life turns upside down when his secret identity is exposed. He seeks help from Doctor Strange to restore his secret.", poster_path: null, backdrop_path: null, release_date: "2021-12-17", vote_average: 8.2, genre_ids: [28, 12, 878], original_language: "en" },
  { id: 7, title: "Dune", overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.", poster_path: null, backdrop_path: null, release_date: "2021-10-22", vote_average: 8.0, genre_ids: [878, 12], original_language: "en" },
  { id: 8, title: "The Batman", overview: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.", poster_path: null, backdrop_path: null, release_date: "2022-03-04", vote_average: 7.8, genre_ids: [80, 9648, 53], original_language: "en" },
  { id: 9, title: "Top Gun: Maverick", overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.", poster_path: null, backdrop_path: null, release_date: "2022-05-27", vote_average: 8.3, genre_ids: [28, 18], original_language: "en" },
  { id: 10, title: "Avatar: The Way of Water", overview: "Jake Sully and Neytiri have formed a family and are doing everything to stay together. They must leave their home and explore the regions of Pandora.", poster_path: null, backdrop_path: null, release_date: "2022-12-16", vote_average: 7.7, genre_ids: [878, 12, 28], original_language: "en" },
  { id: 11, title: "Oppenheimer", overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", poster_path: null, backdrop_path: null, release_date: "2023-07-21", vote_average: 8.5, genre_ids: [18, 36], original_language: "en" },
  { id: 12, title: "Barbie", overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.", poster_path: null, backdrop_path: null, release_date: "2023-07-21", vote_average: 7.1, genre_ids: [35, 12, 14], original_language: "en" },
  { id: 13, title: "John Wick: Chapter 4", overview: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.", poster_path: null, backdrop_path: null, release_date: "2023-03-24", vote_average: 7.8, genre_ids: [28, 53, 80], original_language: "en" },
  { id: 14, title: "Guardians of the Galaxy Vol. 3", overview: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and protect one of their own.", poster_path: null, backdrop_path: null, release_date: "2023-05-05", vote_average: 8.0, genre_ids: [878, 12, 28], original_language: "en" },
  { id: 15, title: "Mission: Impossible - Dead Reckoning", overview: "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon.", poster_path: null, backdrop_path: null, release_date: "2023-07-12", vote_average: 7.6, genre_ids: [28, 53], original_language: "en" },
  { id: 16, title: "Wonka", overview: "The story of how the world's greatest inventor, magician and chocolate-maker became the beloved Willy Wonka we know today.", poster_path: null, backdrop_path: null, release_date: "2023-12-15", vote_average: 7.2, genre_ids: [35, 10751, 14], original_language: "en" },
  { id: 17, title: "Killers of the Flower Moon", overview: "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s.", poster_path: null, backdrop_path: null, release_date: "2023-10-20", vote_average: 7.5, genre_ids: [80, 18, 36], original_language: "en" },
  { id: 18, title: "Poor Things", overview: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.", poster_path: null, backdrop_path: null, release_date: "2023-12-08", vote_average: 8.0, genre_ids: [878, 10749, 35], original_language: "en" },
  { id: 19, title: "Godzilla x Kong: The New Empire", overview: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins.", poster_path: null, backdrop_path: null, release_date: "2024-03-29", vote_average: 7.0, genre_ids: [28, 878, 12], original_language: "en" },
  { id: 20, title: "Dune: Part Two", overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.", poster_path: null, backdrop_path: null, release_date: "2024-03-01", vote_average: 8.3, genre_ids: [878, 12], original_language: "en" },
];

const MOCK_TV_SHOWS: TVShow[] = [
  { id: 101, name: "Breaking Bad", overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.", poster_path: null, backdrop_path: null, first_air_date: "2008-01-20", vote_average: 9.5, genre_ids: [18, 80], original_language: "en" },
  { id: 102, name: "Game of Thrones", overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.", poster_path: null, backdrop_path: null, first_air_date: "2011-04-17", vote_average: 9.3, genre_ids: [10765, 18, 10759], original_language: "en" },
  { id: 103, name: "Stranger Things", overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.", poster_path: null, backdrop_path: null, first_air_date: "2016-07-15", vote_average: 8.6, genre_ids: [18, 10765, 9648], original_language: "en" },
  { id: 104, name: "The Mandalorian", overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.", poster_path: null, backdrop_path: null, first_air_date: "2019-11-12", vote_average: 8.5, genre_ids: [10765, 10759, 18], original_language: "en" },
  { id: 105, name: "Squid Game", overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.", poster_path: null, backdrop_path: null, first_air_date: "2021-09-17", vote_average: 7.8, genre_ids: [10759, 9648, 18], original_language: "ko" },
  { id: 106, name: "Wednesday", overview: "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers.", poster_path: null, backdrop_path: null, first_air_date: "2022-11-23", vote_average: 8.1, genre_ids: [10765, 9648, 35], original_language: "en" },
  { id: 107, name: "House of the Dragon", overview: "The story of the Targaryen civil war that took place about 200 years before events portrayed in Game of Thrones.", poster_path: null, backdrop_path: null, first_air_date: "2022-08-21", vote_average: 8.4, genre_ids: [10765, 18, 10759], original_language: "en" },
  { id: 108, name: "The Last of Us", overview: "Joel and Ellie, a pair connected through the harshness of the world they live in, must survive ruthless killers and monsters.", poster_path: null, backdrop_path: null, first_air_date: "2023-01-15", vote_average: 8.8, genre_ids: [18, 10765], original_language: "en" },
  { id: 109, name: "The Bear", overview: "A young chef from the fine dining world returns to Chicago to run his family's sandwich shop.", poster_path: null, backdrop_path: null, first_air_date: "2022-06-23", vote_average: 8.6, genre_ids: [18, 35], original_language: "en" },
  { id: 110, name: "Shogun", overview: "When a mysterious European ship is found marooned in a nearby fishing village, Lord Yoshii Toranaga discovers secrets that could tip the scales of power.", poster_path: null, backdrop_path: null, first_air_date: "2024-02-27", vote_average: 8.7, genre_ids: [18, 10768], original_language: "en" },
  { id: 111, name: "The Witcher", overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", poster_path: null, backdrop_path: null, first_air_date: "2019-12-20", vote_average: 8.0, genre_ids: [10765, 18, 10759], original_language: "en" },
  { id: 112, name: "Money Heist", overview: "A criminal mastermind who goes by 'The Professor' has a plan to pull off the biggest heist in recorded history.", poster_path: null, backdrop_path: null, first_air_date: "2017-05-02", vote_average: 8.2, genre_ids: [80, 18], original_language: "es" },
  { id: 113, name: "Peaky Blinders", overview: "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.", poster_path: null, backdrop_path: null, first_air_date: "2013-09-12", vote_average: 8.5, genre_ids: [18, 80], original_language: "en" },
  { id: 114, name: "Dark", overview: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.", poster_path: null, backdrop_path: null, first_air_date: "2017-12-01", vote_average: 8.7, genre_ids: [80, 18, 9648], original_language: "de" },
  { id: 115, name: "Narcos", overview: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins.", poster_path: null, backdrop_path: null, first_air_date: "2015-08-28", vote_average: 8.1, genre_ids: [80, 18], original_language: "en" },
  { id: 116, name: "The Crown", overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.", poster_path: null, backdrop_path: null, first_air_date: "2016-11-04", vote_average: 8.2, genre_ids: [18], original_language: "en" },
];

const MOCK_GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10768, name: "War & Politics" },
];

function useMockData(): boolean {
  return !TMDB_API_KEY;
}

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

function filterMockMovies(params: { year?: string; with_original_language?: string; with_genres?: string }): Movie[] {
  let filtered = [...MOCK_MOVIES];
  
  if (params.year) {
    filtered = filtered.filter(m => m.release_date.startsWith(params.year!));
  }
  if (params.with_original_language) {
    filtered = filtered.filter(m => m.original_language === params.with_original_language);
  }
  if (params.with_genres) {
    const genreId = parseInt(params.with_genres);
    filtered = filtered.filter(m => m.genre_ids.includes(genreId));
  }
  
  return filtered;
}

function filterMockTVShows(params: { year?: string; with_original_language?: string; with_genres?: string }): TVShow[] {
  let filtered = [...MOCK_TV_SHOWS];
  
  if (params.year) {
    filtered = filtered.filter(t => t.first_air_date.startsWith(params.year!));
  }
  if (params.with_original_language) {
    filtered = filtered.filter(t => t.original_language === params.with_original_language);
  }
  if (params.with_genres) {
    const genreId = parseInt(params.with_genres);
    filtered = filtered.filter(t => t.genre_ids.includes(genreId));
  }
  
  return filtered;
}

function paginateMock<T>(items: T[], page: number, perPage = 20): TMDBResponse<T> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const results = items.slice(start, end);
  
  return {
    page,
    results,
    total_pages: Math.ceil(items.length / perPage),
    total_results: items.length,
  };
}

export async function getTrendingMovies(page = 1): Promise<TMDBResponse<Movie>> {
  if (useMockData()) {
    return paginateMock(MOCK_MOVIES, page);
  }
  return fetchTMDB<TMDBResponse<Movie>>("/trending/movie/week", { page: page.toString() });
}

export async function getTrendingTVShows(page = 1): Promise<TMDBResponse<TVShow>> {
  if (useMockData()) {
    return paginateMock(MOCK_TV_SHOWS, page);
  }
  return fetchTMDB<TMDBResponse<TVShow>>("/trending/tv/week", { page: page.toString() });
}

export async function getPopularMovies(page = 1): Promise<TMDBResponse<Movie>> {
  if (useMockData()) {
    return paginateMock(MOCK_MOVIES, page);
  }
  return fetchTMDB<TMDBResponse<Movie>>("/movie/popular", { page: page.toString() });
}

export async function getPopularTVShows(page = 1): Promise<TMDBResponse<TVShow>> {
  if (useMockData()) {
    return paginateMock(MOCK_TV_SHOWS, page);
  }
  return fetchTMDB<TMDBResponse<TVShow>>("/tv/popular", { page: page.toString() });
}

export async function searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  if (useMockData()) {
    const filtered = MOCK_MOVIES.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return paginateMock(filtered, page);
  }
  return fetchTMDB<TMDBResponse<Movie>>("/search/movie", { query, page: page.toString() });
}

export async function searchTVShows(query: string, page = 1): Promise<TMDBResponse<TVShow>> {
  if (useMockData()) {
    const filtered = MOCK_TV_SHOWS.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase())
    );
    return paginateMock(filtered, page);
  }
  return fetchTMDB<TMDBResponse<TVShow>>("/search/tv", { query, page: page.toString() });
}

export async function getMovieGenres(): Promise<{ genres: Genre[] }> {
  if (useMockData()) {
    return { genres: MOCK_GENRES };
  }
  return fetchTMDB<{ genres: Genre[] }>("/genre/movie/list");
}

export async function getTVGenres(): Promise<{ genres: Genre[] }> {
  if (useMockData()) {
    return { genres: MOCK_GENRES };
  }
  return fetchTMDB<{ genres: Genre[] }>("/genre/tv/list");
}

export async function discoverMovies(params: {
  page?: number;
  year?: string;
  with_genres?: string;
  with_original_language?: string;
  sort_by?: string;
}): Promise<TMDBResponse<Movie>> {
  if (useMockData()) {
    const filtered = filterMockMovies(params);
    return paginateMock(filtered, params.page || 1);
  }
  
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
  if (useMockData()) {
    const filtered = filterMockTVShows(params);
    return paginateMock(filtered, params.page || 1);
  }
  
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
  if (useMockData()) {
    const movie = MOCK_MOVIES.find(m => m.id === id);
    if (movie) {
      const genres = MOCK_GENRES.filter(g => movie.genre_ids.includes(g.id));
      return { ...movie, genres };
    }
  }
  return fetchTMDB<Movie & { genres: Genre[] }>(`/movie/${id}`);
}

export async function getTVShowDetails(id: number): Promise<TVShow & { genres: Genre[] }> {
  if (useMockData()) {
    const show = MOCK_TV_SHOWS.find(t => t.id === id);
    if (show) {
      const genres = MOCK_GENRES.filter(g => show.genre_ids.includes(g.id));
      return { ...show, genres };
    }
  }
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
