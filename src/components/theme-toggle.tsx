"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons"
import { IconButton, Tooltip } from "@radix-ui/themes"
import { useState, useEffect } from "react"

export default function ThemeToggle({
  ...props
}: React.ComponentPropsWithoutRef<typeof IconButton>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { theme, systemTheme, setTheme } = useTheme()

  if (!mounted) return null

  const resolvedTheme = theme === "system" ? systemTheme : theme

  const getNextTheme = () => {
    if (theme === "system") return "light"
    if (theme === "light") return "dark"
    return "system"
  }

  const getIcon = () => {
    if (theme === "system") return <DesktopIcon width={16} height={16} />
    return resolvedTheme === "dark" ? (
      <MoonIcon width={16} height={16} />
    ) : (
      <SunIcon width={16} height={16} />
    )
  }

  return (
    <Tooltip content={`Theme: ${theme}`} className="radix-themes-custom-fonts">
      <IconButton
        size="3"
        variant="ghost"
        color="gray"
        aria-label="Toggle theme"
        onClick={() => setTheme(getNextTheme())}
        {...props}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  )
}
