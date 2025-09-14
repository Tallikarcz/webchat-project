"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative cursor-pointer"
    >
      <Sun
        className={`
          h-5 w-5
          transition-all duration-500 ease-in-out
          ${theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}
        `}
      />
      <Moon
        className={`
          absolute h-5 w-5
          transition-all duration-500 ease-in-out
          ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
    