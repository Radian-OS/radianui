"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { IconButton } from "@/styles/default/ui/button"

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<div className="fixed top-4 right-4 z-50">
			<IconButton
				type="button"
				variant="outline"
				color="neutral"
				size="32"
				aria-label="Toggle theme"
				onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
				className="bg-bg/80 border-border/70 shadow-xs backdrop-blur-md">
				{resolvedTheme === "dark" ? (
					<Sun className="size-4" />
				) : (
					<Moon className="size-4" />
				)}
			</IconButton>
		</div>
	)
}
