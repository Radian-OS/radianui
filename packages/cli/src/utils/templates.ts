export const UTILS = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs.filter(Boolean)));
}
`

export const COMPONENTS_JSON_CONFIG = `{
  "$schema": "https://radianos.com/schema.json",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "animated": "@/components/animated",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "hasSrcDir": true
}`

export const GLOBAL_CSS_V4 = `
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
	/* primary */
	--color-primary: oklch(0.528 0.2539 282.58);
	--color-primary-accent: oklch(0.94 0.0271 295.05);
	--color-primary-focus: oklch(0.9169 0.0383 295.46);
	--color-primary-border: oklch(0.6784 0.1708 290.38);
	--color-primary-hover: oklch(0.5768 0.2279 286.25);
	--color-primary-text: oklch(0.528 0.2539 282.58);

	/* success */
	--color-success: oklch(0.6334 0.171 148.65);
	--color-success-accent: oklch(0.9685 0.0336 157.66);
	--color-success-focus: oklch(0.9489 0.0556 156.34);
	--color-success-border: oklch(0.7761 0.2117 148.55);
	--color-success-hover: oklch(0.6901 0.1748 149.64);
	--color-success-text: oklch(0.5388 0.1339 149.74);

	/* error */
	--color-error: oklch(0.64 0.22 26.04);
	--color-error-accent: oklch(0.9465 0.0252 17.61);
	--color-error-focus: oklch(0.9133 0.0414 17.93);
	--color-error-border: oklch(0.719 0.1751 22.5);
	--color-error-hover: oklch(0.6786 0.2095 24.66);
	--color-error-text: oklch(0.5716 0.2125 27.27);

	/* warning */
	--color-warning: oklch(0.8016 0.1705 73.27);
	--color-warning-accent: oklch(0.9622 0.0384 83.83);
	--color-warning-focus: oklch(0.946 0.0574 85.03);
	--color-warning-border: oklch(0.7318 0.1522 75.09);
	--color-warning-hover: oklch(0.8342 0.1594 79.51);
	--color-warning-text: oklch(0.5461 0.1088 77.73);

	/* information */
	--color-info: oklch(0.6092 0.2041 255.8);
	--color-info-accent: oklch(0.949 0.0213 245.85);
	--color-info-focus: oklch(0.9135 0.0358 249.52);
	--color-info-border: oklch(0.829 0.0811 248.83);
	--color-info-hover: oklch(0.6722 0.1615 251.56);
	--color-info-text: oklch(0.6092 0.2041 255.8);

	/* background */
	--color-bg: oklch(1 0 0);
	--color-fill1: oklch(0.9764 0.0013 286.38);
	--color-fill2: oklch(0.9519 0.0029 264.54);
	--color-fill3: oklch(0.9368 0.0029 264.54);
	--color-fill4: oklch(0.906 0.0046 258.33);

	/* foreground */
	--color-fg: oklch(0.2764 0.0079 264.44);
	--color-fg-secondary: oklch(0.5338 0.0202 264.39);
	--color-fg-tertiary: oklch(0.6726 0.0172 266.22);
	--color-fg-disabled: oklch(0.7408 0.0137 266.67);
	--color-fg-inverse: oklch(1 0 0);

	/* border */
	--color-border: oklch(0.906 0.0046 258.33);
	--color-alpha: color-mix(
		in srgb,
		oklch(0.144 0.0028 247.09),
		transparent 88%
	);
	--color-soft: oklch(0.9368 0.0029 264.54);
	--color-soft-alpha: color-mix(
		in srgb,
		oklch(0.144 0.0028 247.09),
		transparent 92%
	);

	/* background elevation */
	--color-elevation-negative: oklch(0.9764 0.0013 286.38);
	--color-elevation-level1: oklch(1 0 0);
	--color-elevation-level2: oklch(1 0 0);

	/* inverse */
	--color-white-inverse: oklch(1 0 0);
	--color-black-inverse: oklch(0.144 0.0028 247.09);

	/* background fill alpha */
	--color-fill1-alpha: color-mix(
		in srgb,
		oklch(0.144 0.0018 211),
		transparent 96%
	);
	--color-fill2-alpha: color-mix(
		in srgb,
		oklch(0.144 0.0018 211),
		transparent 92%
	);
	--color-fill3-alpha: color-mix(
		in srgb,
		oklch(0.144 0.0018 211),
		transparent 88%
	);
	--color-fill4-alpha: color-mix(
		in srgb,
		oklch(0.144 0.0018 211),
		transparent 84%
	);

	--color-sidebar: var(--color-fill1);
	--color-sidebar-fg: var(--color-fg);
	--color-sidebar-accent: var(--color-fill1);
	--color-sidebar-accent-fg: var(--color-fg);
	--color-sidebar-border: var(--color-border);
	--color-sidebar-ring: var(--color-fg-secondary);
}

.dark {
	/* primary */
	--color-primary: oklch(0.528 0.2539 282.58);
	--color-primary-accent: oklch(0.2622 0.0915 289.13);
	--color-primary-focus: oklch(0.2827 0.1227 284.67);
	--color-primary-border: oklch(0.528 0.2539 282.58);
	--color-primary-hover: oklch(0.5768 0.2279 286.25);
	--color-primary-text: oklch(0.6784 0.1708 290.38);

	/* success */
	--color-success: oklch(0.6334 0.171 148.65);
	--color-success-accent: oklch(0.271 0.0537 151.74);
	--color-success-focus: oklch(0.3887 0.0924 150.55);
	--color-success-border: oklch(0.5388 0.1339 149.74);
	--color-success-hover: oklch(0.6901 0.1748 149.64);
	--color-success-text: oklch(0.7761 0.2117 148.55);

	/* error */
	--color-error: oklch(0.64 0.22 26.04);
	--color-error-accent: oklch(0.2567 0.0648 22.77);
	--color-error-focus: oklch(0.2973 0.0922 24.71);
	--color-error-border: oklch(0.4423 0.146 25.48);
	--color-error-hover: oklch(0.6786 0.2095 24.66);
	--color-error-text: oklch(0.719 0.1751 22.5);

	/* warning */
	--color-warning: oklch(0.8016 0.1705 73.27);
	--color-warning-accent: oklch(0.2663 0.0372 84.34);
	--color-warning-focus: oklch(0.3744 0.0636 81.14);
	--color-warning-border: oklch(0.5461 0.1088 77.73);
	--color-warning-hover: oklch(0.8342 0.1594 79.51);
	--color-warning-text: oklch(0.8342 0.1594 79.51);

	/* information */
	--color-info: oklch(0.6092 0.2041 255.8);
	--color-info-accent: oklch(0.2544 0.0418 249.78);
	--color-info-focus: oklch(0.3147 0.0668 250.78);
	--color-info-border: oklch(0.5067 0.1401 252.67);
	--color-info-hover: oklch(0.6722 0.1615 251.56);
	--color-info-text: oklch(0.6722 0.1615 251.56);

	/* background */
	--color-bg: oklch(0.144 0.0028 247.09);
	--color-fill1: oklch(0.191 0.0043 264.47);
	--color-fill2: oklch(0.2342 0.0065 258.36);
	--color-fill3: oklch(0.2764 0.0079 264.44);
	--color-fill4: oklch(0.3162 0.0099 260.71);

	/* foreground */
	--color-fg: oklch(0.9764 0.0013 286.38);
	--color-fg-secondary: oklch(0.6726 0.0172 266.22);
	--color-fg-tertiary: oklch(0.5686 0.0213 265.87);
	--color-fg-disabled: oklch(0.4632 0.0174 264.39);
	--color-fg-inverse: oklch(0.2342 0.0065 258.36);

	/* border */
	--color-border: oklch(0.2764 0.0079 264.44);
	--color-alpha: color-mix(in srgb, oklch(1 0 0), transparent 88%);
	--color-soft: oklch(0.2342 0.0065 258.36);
	--color-soft-alpha: color-mix(in srgb, oklch(1 0 0), transparent 92%);

	/* background elevation */
	--color-elevation-negative: oklch(0 0 0);
	--color-elevation-level1: oklch(0.191 0.0043 264.47);
	--color-elevation-level2: oklch(0.2342 0.0065 258.36);

	/* inverse */
	--color-white-inverse: oklch(0.144 0.0028 247.09);
	--color-black-inverse: oklch(1 0 0);

	/* background fill alpha */
	--color-fill1-alpha: color-mix(in srgb, oklch(1 0 0), transparent 96%);
	--color-fill2-alpha: color-mix(in srgb, oklch(1 0 0), transparent 92%);
	--color-fill3-alpha: color-mix(in srgb, oklch(1 0 0), transparent 88%);
	--color-fill4-alpha: color-mix(in srgb, oklch(1 0 0), transparent 84%);

	--color-sidebar: var(--color-fill1);
	--color-sidebar-fg: var(--color-fg);
	--color-sidebar-accent: var(--color-fill1);
	--color-sidebar-accent-fg: var(--color-fg);
	--color-sidebar-border: var(--color-border);
	--color-sidebar-ring: var(--color-fg-secondary);
}

/* Base styles */
@layer base {
	body {
		@apply font-body bg-bg text-fg;
		/* Font Families */
		--heading-font: var(--font-geist), system-ui, sans-serif;
		--body-font: var(--font-inter), system-ui, sans-serif;
	}

	/* Safari button fix - prevents shrinking on hover */
	button,
	[role="button"],
	input[type="button"],
	input[type="submit"],
	input[type="reset"] {
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		will-change: auto;
	}

	/* Specific fix for gradient buttons */
	button[class*="bg-gradient"],
	[role="button"][class*="bg-gradient"] {
		will-change: background-image;
	}
}

/* Custom heading font */
@utility font-heading {
	font-family: var(--heading-font);
}

/* Custom body font */
@utility font-body {
	font-family: var(--body-font);
}

/* Heading 1 */
@utility heading-1 {
	@apply font-heading text-[2.25rem] font-semibold leading-[2.75rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 3rem;
		line-height: 3.5rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 4rem;
		line-height: 4.5rem;
	}
}

/* Heading 2 */
@utility heading-2 {
	@apply font-heading text-[2rem] font-semibold leading-[2.5rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 2.5rem;
		line-height: 3rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 3rem;
		line-height: 3.5rem;
	}
}

/* Heading 3 */
@utility heading-3 {
	@apply font-heading text-[1.875rem] font-semibold leading-[2.375rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 2.25rem;
		line-height: 2.75rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 2.5rem;
		line-height: 3rem;
	}
}

/* Heading 4 */
@utility heading-4 {
	@apply font-heading text-[1.75rem] font-semibold leading-[2.25rem];

	@media (width >=theme(--breakpoint-sm)) {
		font-size: 1.875rem;
		line-height: 2.375rem;
	}

	@media (width >=theme(--breakpoint-lg)) {
		font-size: 2rem;
		line-height: 2.5rem;
	}
}

/* Heading 5 */
@utility heading-5 {
	@apply font-heading text-[1.5rem] font-semibold leading-[2rem];
}

/* Heading 6 */
@utility heading-6 {
	@apply font-heading text-[1.25rem] font-semibold leading-[1.75rem];
}

/* Additional body fonts */
@utility body-15 {
	@apply font-body text-[0.9375rem] leading-[1.375];
}

@utility text-sm-p {
	@apply font-body text-sm leading-[1.25rem];
}

@utility body-13 {
	@apply font-body text-[0.8125rem] leading-[1.125rem];
}

/* Hides scrollbar in multiple browsers*/
@utility no-scrollbar {
	-ms-overflow-style: none;
	/* IE and Edge */
	scrollbar-width: none;
	/* Firefox */

	&::-webkit-scrollbar {
		display: none;
		/* Chrome, Safari and Opera */
	}
}

`

export const THEME_PROVIDER_VITE = `
/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"
const THEME_VALUES: Theme[] = ["dark", "light", "system"]

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }

  return THEME_VALUES.includes(value as Theme)
}

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (isTheme(storedTheme)) {
      return storedTheme
    }

    return defaultTheme
  })

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
    [storageKey]
  )

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement
      const resolvedTheme =
        nextTheme === "system" ? getSystemTheme() : nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove("light", "dark")
      root.classList.add(resolvedTheme)

      if (restoreTransitions) {
        restoreTransitions()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    applyTheme(theme)

    if (theme !== "system") {
      return undefined
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, applyTheme])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      setThemeState((currentTheme) => {
        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : currentTheme === "light"
              ? "dark"
              : getSystemTheme() === "dark"
                ? "light"
                : "dark"

        localStorage.setItem(storageKey, nextTheme)
        return nextTheme
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [storageKey])

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return
      }

      if (event.key !== storageKey) {
        return
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue)
        return
      }

      setThemeState(defaultTheme)
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [defaultTheme, storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
`

export const THEME_PROVIDER_NEXT = `
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
`

export const LAYOUT_NEXT = `
import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
`

export const NEXT_PAGE_TSX = `
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
		  <h1>
            Press <kbd>d</kbd> to change theme
          </h1>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
`

export const LAYOUT_VITE = `
import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased font-sans">
        <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
`

export const VITE_PAGE = `
import * as React from "react"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
		  <h1>
            Press <kbd>d</kbd> to change theme
          </h1>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the App.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vitejs.dev"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Vite Documentation
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
`
