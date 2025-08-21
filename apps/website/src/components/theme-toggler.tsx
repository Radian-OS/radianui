"use client"

import { useEffect, useState } from "react"
import { Loader2, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/registry/ui/button"

export function DesktopThemeToggler() {
	// This component is only rendered on the client, so we can use useEffect to set the mounted state
	// and avoid server-side rendering issues with the theme provider
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(resolvedTheme === "light" ? "dark" : "light")
	}

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button variant="outline" color="neutral" iconOnly disabled>
				<Loader2 className="size-5 animate-spin" />
			</Button>
		)
	}

	return (
		<Button variant="outline" color="neutral" onClick={toggleTheme} iconOnly>
			{resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}

export function TabletMobileThemeToggler() {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()
	const toggleTheme = () => {
		setTheme(resolvedTheme === "light" ? "dark" : "light")
	}

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button variant="outline" color="neutral" iconOnly disabled>
				<Loader2 className="size-5 animate-spin" />
			</Button>
		)
	}

	return (
		<Button variant="outline" color="neutral" className="w-full" onClick={toggleTheme}>
			{resolvedTheme === "light" ? (
				<>
					<MoonIcon className="size-5" />
					<span>Dark mode</span>
				</>
			) : (
				<>
					<SunIcon className="size-5" />
					<span>Light mode</span>
				</>
			)}
		</Button>
	)
}
