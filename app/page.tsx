import { Suspense } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MovieGrid } from "@/components/movie-grid";
import { Footer } from "@/components/footer";
import { searchMovies, getFeaturedMovies } from "@/lib/omdb";
import type { OMDbMovie } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

async function MoviesContent({ searchParams }: { searchParams: PageProps["searchParams"] }) {
  const params = await searchParams;
  const search = params.search || "";
  const page = parseInt(params.page || "1", 10);

  let movies: OMDbMovie[] = [];
  let totalResults = 0;
  let error = "";

  try {
    if (search) {
      // Search mode
      const result = await searchMovies(search, page);
      if (result.Response === "True" && result.Search) {
        movies = result.Search;
        totalResults = parseInt(result.totalResults || "0", 10);
      } else {
        error = result.Error || "No movies found";
      }
    } else {
      // Show featured movies on homepage
      movies = await getFeaturedMovies();
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    error = "Failed to fetch movies. Please try again.";
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <>
      {/* Search Results Title */}
      {search && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Search results for: <span className="text-[var(--primary)]">{`"${search}"`}</span>
            {totalResults > 0 && (
              <span className="text-[var(--muted-foreground)] text-lg font-normal ml-2">
                ({totalResults} results)
              </span>
            )}
          </h2>
        </section>
      )}

      {!search && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Popular Movies
          </h2>
          <p className="text-[var(--muted-foreground)] mt-1">
            Search for any movie to find trailers and details
          </p>
        </section>
      )}

      {/* Error Message */}
      {error && movies.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-center">
            <p className="text-[var(--muted-foreground)]">{error}</p>
          </div>
        </section>
      )}

      {/* Movie Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MovieGrid movies={movies} />

        {/* Pagination */}
        {search && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            {page > 1 && (
              <a
                href={`/?search=${encodeURIComponent(search)}&page=${page - 1}`}
                className="px-4 py-2 bg-[var(--secondary)] hover:bg-[var(--muted)] text-[var(--foreground)] rounded-lg transition-colors"
              >
                Previous
              </a>
            )}
            <span className="text-[var(--muted-foreground)]">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <a
                href={`/?search=${encodeURIComponent(search)}&page=${page + 1}`}
                className="px-4 py-2 bg-[var(--secondary)] hover:bg-[var(--muted)] text-[var(--foreground)] rounded-lg transition-colors"
              >
                Next
              </a>
            )}
          </div>
        )}
      </section>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title skeleton */}
      <div className="h-8 bg-[var(--card)] rounded-lg animate-pulse mb-6 w-64" />
      
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
