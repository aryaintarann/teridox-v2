"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // false on the server and during hydration, true afterwards
  const mounted = React.useSyncExternalStore(() => () => {}, () => true, () => false);

  const dark = mounted && resolvedTheme === "dark";
  const Icon = dark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="btn btn-quiet size-11 min-h-0 p-0"
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}
