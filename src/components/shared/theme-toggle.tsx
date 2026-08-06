"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="text-muted-foreground hover:text-foreground font-medium"
        title="Toggle theme"
      >
        [ theme ]
      </button>
    );
  }

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
