"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, MenuIcon, XIcon } from "./icons";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="TEKNOVA MOVIE"
              width={180}
              height={60}
              className="h-10 lg:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/?search=action"
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Action
            </Link>
            <Link
              href="/?search=comedy"
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Comedy
            </Link>
            <Link
              href="/?search=horror"
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Horror
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 px-4 py-2 pl-10 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            </div>
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-[var(--primary)] hover:bg-[var(--accent)] text-white rounded-lg font-medium transition-colors"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--accent)] text-white rounded-lg font-medium transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/?search=action"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Action
              </Link>
              <Link
                href="/?search=comedy"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Comedy
              </Link>
              <Link
                href="/?search=horror"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Horror
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
