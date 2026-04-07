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
              Your ultimate destination for streaming and downloading movies and TV series from around the world. Enjoy unlimited entertainment in HD quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?type=movie" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/?type=tv" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  TV Series
                </Link>
              </li>
              <li>
                <Link href="/?year=2026" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?genre=28" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/?genre=35" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/?genre=18" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/?genre=27" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
                  Horror
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
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
