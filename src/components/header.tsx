import Link from "next/link"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--accent-a5)] backdrop-blur-sm supports-backdrop-filter:bg-[var(--accent-3)]/60">
      <div className="container mx-auto flex h-14 w-full items-center justify-between px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="#about"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="#projects"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
