"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { ThemeToggler, type ThemeSelection } from '@/components/animate-ui/primitives/effects/theme-toggler';
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  return (
    <ThemeToggler
      theme="system"
      resolvedTheme="light"
      direction="ttb"
      setTheme={(theme: ThemeSelection) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }}
    >
      {({ resolved, toggleTheme }) => (
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            toggleTheme(resolved === 'dark' ? 'light' : 'dark')
          }
          className="relative cursor-pointer"
        >
          <Sun
            className={`h-5 w-5 transition-all duration-500 ease-in-out ${
              resolved === 'dark'
                ? 'scale-0 rotate-90 opacity-0'
                : 'scale-100 rotate-0 opacity-100'
            }`}
          />
          <Moon
            className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
              resolved === 'dark'
                ? 'scale-100 rotate-0 opacity-100'
                : 'scale-0 -rotate-90 opacity-0'
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </ThemeToggler>
  );
}
