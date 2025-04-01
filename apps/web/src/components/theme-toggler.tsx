"use client"

import { useEffect, useState } from "react"
import { Loader2, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/registry/ui/button"

export const DesktopThemeToggler = () => {
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
			<Button className="hidden lg:block" variant="neutral-outline" isIcon>
				<Loader2 className="size-5 animate-spin" />
			</Button>
		)
	}

	return (
		<Button className="hidden lg:block" isIcon variant="neutral-outline" onClick={toggleTheme}>
			{resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}

export const TabletMobileThemeToggler = () => {
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
			<Button className="hidden lg:block" variant="neutral-outline" isIcon disabled>
				<Loader2 className="size-5 animate-spin" />
			</Button>
		)
	}

	return (
		<Button variant="neutral-outline" onClick={toggleTheme}>
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
