"use client"

import { THEME_STORAGE_KEY, type ThemeName } from "@/lib/theme"

interface ThemeToggleProps {
  toLightLabel: string
  toDarkLabel: string
}

// The server can't know the theme, so icon and label are switched with CSS
// and are right before hydration. Below 640px the button is icon-only and the
// label stays available to screen readers.
export default function ThemeToggle({
  toLightLabel,
  toDarkLabel,
}: ThemeToggleProps) {
  function toggle() {
    const root = document.documentElement
    const next: ThemeName = root.dataset.theme === "light" ? "dark" : "light"
    root.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode, blocked site data)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-transparent px-4 font-mono text-[13px] text-fg hover:border-fg max-sm:size-11 max-sm:justify-center max-sm:gap-0 max-sm:px-0"
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden light:block"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="light:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <span className="hidden max-sm:sr-only light:inline">{toDarkLabel}</span>
      <span className="max-sm:sr-only light:hidden">{toLightLabel}</span>
    </button>
  )
}
