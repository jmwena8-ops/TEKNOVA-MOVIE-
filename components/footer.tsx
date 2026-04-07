import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="TEKNOVA MOVIE"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-[var(--muted-foreground)] text-sm max-w-md">
              Your ultimate movie discovery platform. Search any movie, view details, ratings, cast info, and watch trailers on YouTube.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/?search=2024" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/?search=marvel" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Marvel Movies
                </Link>
              </li>
              <li>
                <Link href="/?search=dc" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  DC Movies
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Popular Searches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?search=action" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Action Movies
                </Link>
              </li>
              <li>
                <Link href="/?search=comedy" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Comedy Movies
                </Link>
              </li>
              <li>
                <Link href="/?search=horror" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Horror Movies
                </Link>
              </li>
              <li>
                <Link href="/?search=thriller" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Thriller Movies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--muted-foreground)] text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} TEKNOVA MOVIE. All rights reserved.
          </p>
          <p className="text-[var(--muted-foreground)] text-xs text-center">
            Powered by OMDb API. Trailers from YouTube.
          </p>
        </div>
      </div>
    </footer>
  );
}
