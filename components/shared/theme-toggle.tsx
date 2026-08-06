"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="text-sm hover:underline underline-offset-4 font-medium flex items-center gap-2">
        [ theme ]
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-sm hover:underline underline-offset-4 font-medium flex items-center gap-2"
    >
      [ {theme === "light" ? "dark" : "light"} ]
    </button>
  )
}
