import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, withDay = true) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    ...(withDay && { day: "numeric" }),
  })
}
