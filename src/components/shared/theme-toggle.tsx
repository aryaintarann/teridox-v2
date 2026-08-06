"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground font-medium"
      title="Toggle theme"
    >
      [ {theme === "dark" ? "dark" : "light"} ]
    </button>
  );
}
