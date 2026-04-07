"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/tmdb";
import type { Movie, TVShow } from "@/lib/types";
import { XIcon, PlayIcon, DownloadIcon, StarIcon, CalendarIcon } from "./icons";

interface MovieModalProps {
  item: Movie | TVShow;
  mediaType: "movie" | "tv";
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = "select" | "watch" | "download";

export function MovieModal({ item, mediaType, isOpen, onClose }: MovieModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("select");

  const title = "title" in item ? item.title : item.name;
  const releaseDate = "release_date" in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const rating = item.vote_average?.toFixed(1) || "N/A";

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset view mode when modal closes
  useEffect(() => {
    if (!isOpen) {
      setViewMode("select");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--card)] rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          aria-label="Close modal"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {viewMode === "select" ? (
          <>
            {/* Backdrop Image */}
            <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
              <Image
                src={getImageUrl(item.backdrop_path || item.poster_path, "w780")}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative px-6 pb-6 -mt-20">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={getImageUrl(item.poster_path, "w300")}
                    alt={title}
                    width={150}
                    height={225}
                    className="rounded-xl shadow-lg"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)] mb-2">
                    {title}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-[var(--foreground)] font-semibold">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{year}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      mediaType === "movie"
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--accent)] text-white"
                    }`}>
                      {mediaType === "movie" ? "Movie" : "Series"}
                    </span>
                  </div>

                  <p className="text-[var(--muted-foreground)] text-sm lg:text-base leading-relaxed mb-6 line-clamp-4">
                    {item.overview || "No description available."}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <button
                      onClick={() => setViewMode("watch")}
                      className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <PlayIcon className="w-5 h-5" />
                      Watch Now
                    </button>
                    <button
                      onClick={() => setViewMode("download")}
                      className="flex items-center justify-center gap-2 bg-[var(--secondary)] hover:bg-[var(--muted)] text-[var(--foreground)] px-6 py-3 rounded-xl font-semibold transition-colors border border-[var(--border)]"
                    >
                      <DownloadIcon className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : viewMode === "watch" ? (
          <WatchView
            item={item}
            title={title}
            mediaType={mediaType}
            onBack={() => setViewMode("select")}
          />
        ) : (
          <DownloadView
            title={title}
            mediaType={mediaType}
            onBack={() => setViewMode("select")}
          />
        )}
      </div>
    </div>
  );
}

function WatchView({
  item,
  title,
  mediaType,
  onBack,
}: {
  item: Movie | TVShow;
  title: string;
  mediaType: "movie" | "tv";
  onBack: () => void;
}) {
  const embedUrl = mediaType === "movie"
    ? `https://vidsrc.xyz/embed/movie/${item.id}`
    : `https://vidsrc.xyz/embed/tv/${item.id}`;

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to details
      </button>

      <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
        Now Watching: {title}
      </h2>

      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>

      <p className="mt-4 text-sm text-[var(--muted-foreground)]">
        If the video does not load, please try again later or use the download option.
      </p>
    </div>
  );
}

function DownloadView({
  title,
  mediaType,
  onBack,
}: {
  title: string;
  mediaType: "movie" | "tv";
  onBack: () => void;
}) {
  const qualities = [
    { label: "4K Ultra HD", size: "8.5 GB", quality: "2160p" },
    { label: "Full HD", size: "2.4 GB", quality: "1080p" },
    { label: "HD", size: "1.2 GB", quality: "720p" },
    { label: "SD", size: "700 MB", quality: "480p" },
  ];

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to details
      </button>

      <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
        Download: {title}
      </h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">
        Select your preferred quality to download this {mediaType === "movie" ? "movie" : "series"}
      </p>

      <div className="grid gap-3">
        {qualities.map((q) => (
          <button
            key={q.quality}
            className="flex items-center justify-between p-4 bg-[var(--secondary)] hover:bg-[var(--muted)] rounded-xl transition-colors border border-[var(--border)] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/20 rounded-lg">
                <DownloadIcon className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[var(--foreground)]">{q.label}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{q.quality} - {q.size}</p>
              </div>
            </div>
            <span className="text-[var(--primary)] font-medium group-hover:underline">
              Download
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-[var(--muted-foreground)] text-center">
        Downloads are provided for personal use only. Please respect copyright laws.
      </p>
    </div>
  );
}
