"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { OMDbMovieDetails } from "@/lib/types";
import { getMovieDetails, getPosterUrl } from "@/lib/omdb";
import { XIcon, StarIcon, CalendarIcon, PlayIcon } from "./icons";

interface MovieModalProps {
  imdbId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieModal({ imdbId, isOpen, onClose }: MovieModalProps) {
  const [movie, setMovie] = useState<OMDbMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (isOpen && imdbId) {
      setLoading(true);
      setShowTrailer(false);
      getMovieDetails(imdbId)
        .then(setMovie)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, imdbId]);

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

  if (!isOpen) return null;

  // Generate YouTube search URL for trailer
  const youtubeSearchUrl = movie 
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`)}`
    : "";

  // YouTube embed search (using YouTube's search embed)
  const youtubeEmbedUrl = movie
    ? `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`)}`
    : "";

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

        {loading ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-[var(--muted-foreground)]">Loading movie details...</p>
          </div>
        ) : movie && movie.Response === "True" ? (
          <>
            {showTrailer ? (
              /* YouTube Trailer View */
              <div className="p-4">
                <button
                  onClick={() => setShowTrailer(false)}
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
                  {movie.Title} - Trailer
                </h2>

                {/* YouTube Embed */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`)}&autoplay=1`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>

                {/* Fallback link */}
                <div className="text-center">
                  <p className="text-[var(--muted-foreground)] text-sm mb-2">
                    If the trailer doesn&apos;t load, click below to search on YouTube:
                  </p>
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ) : (
              /* Movie Details View */
              <>
                {/* Header with Poster */}
                <div className="relative p-6 pb-0">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <Image
                        src={getPosterUrl(movie.Poster)}
                        alt={movie.Title}
                        width={200}
                        height={300}
                        className="rounded-xl shadow-lg"
                        unoptimized={movie.Poster?.startsWith("http")}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)] mb-2">
                        {movie.Title}
                      </h2>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4 text-sm">
                        {movie.imdbRating && movie.imdbRating !== "N/A" && (
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-[var(--foreground)] font-semibold">{movie.imdbRating}/10</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{movie.Year}</span>
                        </div>
                        {movie.Runtime && movie.Runtime !== "N/A" && (
                          <span className="text-[var(--muted-foreground)]">{movie.Runtime}</span>
                        )}
                        {movie.Rated && movie.Rated !== "N/A" && (
                          <span className="px-2 py-1 bg-[var(--secondary)] text-[var(--foreground)] text-xs rounded-md">
                            {movie.Rated}
                          </span>
                        )}
                      </div>

                      {/* Genres */}
                      {movie.Genre && movie.Genre !== "N/A" && (
                        <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                          {movie.Genre.split(", ").map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] text-xs rounded-full"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Watch Trailer Button */}
                      <button
                        onClick={() => setShowTrailer(true)}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors mx-auto sm:mx-0"
                      >
                        <PlayIcon className="w-5 h-5" />
                        Watch Trailer on YouTube
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plot */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Plot</h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "No plot available."}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.Director && movie.Director !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Director</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.Director}</p>
                    </div>
                  )}
                  {movie.Writer && movie.Writer !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Writer</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.Writer}</p>
                    </div>
                  )}
                  {movie.Actors && movie.Actors !== "N/A" && (
                    <div className="sm:col-span-2">
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Cast</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.Actors}</p>
                    </div>
                  )}
                  {movie.Country && movie.Country !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Country</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.Country}</p>
                    </div>
                  )}
                  {movie.Language && movie.Language !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Language</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.Language}</p>
                    </div>
                  )}
                  {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Box Office</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.BoxOffice}</p>
                    </div>
                  )}
                  {movie.Awards && movie.Awards !== "N/A" && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">Awards</h4>
                      <p className="text-[var(--muted-foreground)] text-sm">{movie.Awards}</p>
                    </div>
                  )}
                </div>

                {/* Ratings */}
                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Ratings</h3>
                    <div className="flex flex-wrap gap-4">
                      {movie.Ratings.map((rating) => (
                        <div
                          key={rating.Source}
                          className="flex flex-col items-center p-3 bg-[var(--secondary)] rounded-xl min-w-[100px]"
                        >
                          <span className="text-lg font-bold text-[var(--primary)]">{rating.Value}</span>
                          <span className="text-xs text-[var(--muted-foreground)] text-center">{rating.Source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-[var(--muted-foreground)]">Movie details not found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
