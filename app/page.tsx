import { Suspense } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Filters } from "@/components/filters";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Footer } from "@/components/footer";
import {
  discoverMovies,
  discoverTVShows,
  searchMovies,
  searchTVShows,
  getMovieGenres,
  getTVGenres,
} from "@/lib/tmdb";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    page?: string;
    year?: string;
    genre?: string;
    language?: string;
    search?: string;
  }>;
}

async function MoviesContent({ searchParams }: { searchParams: PageProps["searchParams"] }) {
  const params = await searchParams;
  const type = params.type || "all";
  const page = parseInt(params.page || "1", 10);
  const year = params.year || "";
  const genre = params.genre || "";
  const language = params.language || "";
  const search = params.search || "";

  // Fetch genres for filters
  const [movieGenresData, tvGenresData] = await Promise.all([
    getMovieGenres(),
    getTVGenres(),
  ]);

  let movies: Awaited<ReturnType<typeof discoverMovies>>["results"] = [];
  let tvShows: Awaited<ReturnType<typeof discoverTVShows>>["results"] = [];
  let totalPages = 1;

  try {
    if (search) {
      // Search mode
      if (type === "all" || type === "movie") {
        const movieResults = await searchMovies(search, page);
        movies = movieResults.results;
        totalPages = Math.max(totalPages, movieResults.total_pages);
      }
      if (type === "all" || type === "tv") {
        const tvResults = await searchTVShows(search, page);
        tvShows = tvResults.results;
        totalPages = Math.max(totalPages, tvResults.total_pages);
      }
    } else {
      // Discover mode with filters
      const filterParams = {
        page,
        year,
        with_genres: genre,
        with_original_language: language,
      };

      if (type === "all" || type === "movie") {
        const movieResults = await discoverMovies(filterParams);
        movies = movieResults.results;
        totalPages = Math.max(totalPages, movieResults.total_pages);
      }
      if (type === "all" || type === "tv") {
        const tvResults = await discoverTVShows(filterParams);
        tvShows = tvResults.results;
        totalPages = Math.max(totalPages, tvResults.total_pages);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Suspense fallback={<div className="h-24 bg-[var(--card)] rounded-xl animate-pulse" />}>
          <Filters
            movieGenres={movieGenresData.genres}
            tvGenres={tvGenresData.genres}
          />
        </Suspense>
      </section>

      {/* Search Results Title */}
      {search && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Search results for: <span className="text-[var(--primary)]">{`"${search}"`}</span>
          </h2>
        </section>
      )}

      {/* Movie Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MovieGrid
          movies={movies}
          tvShows={tvShows}
          type={type as "movie" | "tv" | "all"}
        />

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={totalPages} />
      </section>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters skeleton */}
      <div className="h-24 bg-[var(--card)] rounded-xl animate-pulse mb-8" />
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[2/3] bg-[var(--card)] rounded-xl animate-pulse" />
            <div className="h-4 bg-[var(--card)] rounded animate-pulse" />
            <div className="h-3 bg-[var(--card)] rounded animate-pulse w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <Hero />
      
      <main className="pb-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <MoviesContent searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
