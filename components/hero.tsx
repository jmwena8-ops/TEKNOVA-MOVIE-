import Image from "next/image";

export function Hero() {
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
            Stream & Download <span className="gradient-text">Movies</span> and{" "}
            <span className="gradient-text">Series</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-[var(--muted-foreground)] max-w-2xl mb-8 text-balance">
            Your ultimate destination for entertainment. Watch the latest movies and TV shows from around the world, anytime, anywhere.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-[var(--primary)]">10K+</p>
              <p className="text-sm text-[var(--muted-foreground)]">Movies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-[var(--accent)]">5K+</p>
              <p className="text-sm text-[var(--muted-foreground)]">TV Series</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-[var(--primary)]">50+</p>
              <p className="text-sm text-[var(--muted-foreground)]">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold text-[var(--accent)]">HD</p>
              <p className="text-sm text-[var(--muted-foreground)]">Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
