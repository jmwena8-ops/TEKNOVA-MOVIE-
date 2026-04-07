"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./icons";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = ["Avengers", "Batman", "Star Wars", "Spider-Man", "Marvel"];

  return (
    <section className="relative overflow-hidden pt-20 lg:pt-24">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_50%)] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="TEKNOVA MOVIE"
              width={300}
              height={100}
              className="h-20 lg:h-28 w-auto"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--foreground)] mb-4 max-w-4xl text-balance">
            Search & Watch <span className="gradient-text">Movie Trailers</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-[var(--muted-foreground)] max-w-2xl mb-8 text-balance">
            Find any movie, view details, ratings, and watch trailers on YouTube. Your ultimate movie discovery platform.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-6">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for any movie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-xl bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-lg border border-[var(--border)]"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-[var(--primary)] hover:bg-[var(--accent)] text-white rounded-xl font-semibold transition-colors text-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[var(--muted-foreground)] text-sm">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/?search=${encodeURIComponent(term)}`)}
                className="px-3 py-1 bg-[var(--secondary)] hover:bg-[var(--muted)] text-[var(--foreground)] rounded-full text-sm transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
