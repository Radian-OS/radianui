"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button, IconButton } from "@/styles/default/ui/button"

export function DesktopThemeToggler() {
	const { setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(
			document.documentElement.classList.contains("dark") ? "light" : "dark"
		)
	}

	return (
		<IconButton
			aria-label="Toggle color theme"
			variant="outline"
			color="neutral"
			onClick={toggleTheme}>
			<MoonIcon className="dark:hidden" />
			<SunIcon className="hidden dark:block" />
		</IconButton>
	)
}

export function TabletMobileThemeToggler() {
	const { setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(
			document.documentElement.classList.contains("dark") ? "light" : "dark"
		)
	}

	return (
		<Button
			aria-label="Toggle color theme"
			variant="outline"
			color="neutral"
			className="w-full"
			onClick={toggleTheme}>
			<MoonIcon className="size-5 dark:hidden" />
			<span className="dark:hidden">Dark mode</span>
			<SunIcon className="hidden size-5 dark:block" />
			<span className="hidden dark:inline">Light mode</span>
		</Button>
	)
}
