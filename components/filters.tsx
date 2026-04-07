"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { LANGUAGES, getYears } from "@/lib/tmdb";
import type { Genre } from "@/lib/types";
import { FilterIcon, FilmIcon, TvIcon } from "./icons";

interface FiltersProps {
  movieGenres: Genre[];
  tvGenres: Genre[];
}

export function Filters({ movieGenres, tvGenres }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "all";
  const currentYear = searchParams.get("year") || "";
  const currentGenre = searchParams.get("genre") || "";
  const currentLanguage = searchParams.get("language") || "";

  const genres = currentType === "tv" ? tvGenres : movieGenres;
  const years = getYears();

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      
      // Reset to page 1 when filters change
      params.delete("page");
      
      // If changing type, reset genre as they differ between movies and tv
      if (key === "type") {
        params.delete("genre");
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="bg-[var(--card)] rounded-xl p-4 lg:p-6 border border-[var(--border)]">
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon className="w-5 h-5 text-[var(--primary)]" />
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Filters</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
            Type
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updateFilters("type", "all")}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentType === "all"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => updateFilters("type", "movie")}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentType === "movie"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <FilmIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Movies</span>
            </button>
            <button
              onClick={() => updateFilters("type", "tv")}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentType === "tv"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <TvIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Series</span>
            </button>
          </div>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
            Year
          </label>
          <select
            value={currentYear}
            onChange={(e) => updateFilters("year", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
            Genre
          </label>
          <select
            value={currentGenre}
            onChange={(e) => updateFilters("genre", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language/Country Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
            Language
          </label>
          <select
            value={currentLanguage}
            onChange={(e) => updateFilters("language", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          >
            <option value="">All Languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
