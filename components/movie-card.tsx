"use client";

import Image from "next/image";
import type { OMDbMovie } from "@/lib/types";
import { getPosterUrl } from "@/lib/omdb";
import { CalendarIcon, PlayIcon } from "./icons";

interface MovieCardProps {
  movie: OMDbMovie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.Poster);
  const typeLabel = movie.Type === "movie" ? "Movie" : movie.Type === "series" ? "Series" : movie.Type;

  return (
    <div
      className="group relative cursor-pointer card-glow rounded-xl overflow-hidden bg-[var(--card)] transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--secondary)]">
        <Image
          src={posterUrl}
          alt={movie.Title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          unoptimized={posterUrl.startsWith("http")}
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
            <button className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              <PlayIcon className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
            movie.Type === "movie" 
              ? "bg-[var(--primary)]/90 text-white" 
              : "bg-[var(--accent)]/90 text-white"
          }`}>
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-[var(--foreground)] line-clamp-1 text-sm lg:text-base">
          {movie.Title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-[var(--muted-foreground)]">
          <CalendarIcon className="w-3 h-3" />
          <span className="text-xs">{movie.Year}</span>
        </div>
      </div>
    </div>
  );
}
