import Link from "next/link"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--accent-a5)] backdrop-blur-sm supports-backdrop-filter:bg-[var(--accent-3)]/60">
      <div className="flex h-14 items-center w-full px-4 justify-between container mx-auto">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="#about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#projects"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
