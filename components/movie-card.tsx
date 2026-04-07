"use client";

import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/tmdb";
import type { Movie, TVShow } from "@/lib/types";
import { StarIcon, CalendarIcon, PlayIcon, DownloadIcon } from "./icons";
import { MovieModal } from "./movie-modal";

interface MovieCardProps {
  item: Movie | TVShow;
  mediaType: "movie" | "tv";
}

export function MovieCard({ item, mediaType }: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = "title" in item ? item.title : item.name;
  const releaseDate = "release_date" in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const rating = item.vote_average?.toFixed(1) || "N/A";

  return (
    <>
      <div
        className="group relative cursor-pointer card-glow rounded-xl overflow-hidden bg-[var(--card)] transition-transform duration-300 hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={getImageUrl(item.poster_path, "w500")}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
              <button className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <PlayIcon className="w-4 h-4" />
                Watch
              </button>
              <button className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--muted)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <DownloadIcon className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
            <StarIcon className="w-3 h-3 text-yellow-400" />
            <span className="text-xs font-semibold text-white">{rating}</span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
              mediaType === "movie" 
                ? "bg-[var(--primary)]/90 text-white" 
                : "bg-[var(--accent)]/90 text-white"
            }`}>
              {mediaType === "movie" ? "Movie" : "Series"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-[var(--foreground)] line-clamp-1 text-sm lg:text-base">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[var(--muted-foreground)]">
            <CalendarIcon className="w-3 h-3" />
            <span className="text-xs">{year}</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MovieModal
        item={item}
        mediaType={mediaType}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
