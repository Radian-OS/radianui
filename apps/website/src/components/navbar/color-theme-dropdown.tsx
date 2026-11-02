"use client"

import React, { useEffect, useState } from "react"
import { Palette } from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

export const THEME_COLORS = [
	{ title: "Neutral (Default)", value: "neutral" },
	{ title: "Red", value: "red" },
	{ title: "Orange", value: "orange" },
	{ title: "Amber", value: "amber" },
	{ title: "Yellow", value: "yellow" },
	{ title: "Neon", value: "neon" },
	{ title: "Green", value: "green" },
	{ title: "Emerald", value: "emerald" },
	{ title: "Teal", value: "teal" },
	{ title: "Cyan", value: "cyan" },
	{ title: "Light Blue", value: "light-blue" },
	{ title: "Blue", value: "blue" },
	{ title: "Violet Blue", value: "violet-blue" },
	{ title: "Purple", value: "purple" },
	{ title: "Dark Orchid", value: "dark-orchid" },
	{ title: "Fuchsia", value: "fuchsia" },
	{ title: "Magenta", value: "magenta" },
	{ title: "Rose", value: "rose" },
] as const

export type ThemeColor = (typeof THEME_COLORS)[number]["value"]

const COLOR_STORAGE_KEY = "radian-primary-color"

export function ColorThemeDropdown() {
	const [currentColor, setCurrentColor] = useState<string>("neutral")

	useEffect(() => {
		const saved = localStorage.getItem(COLOR_STORAGE_KEY)
		const active =
			saved || document.documentElement.getAttribute("data-color") || "neutral"
		setCurrentColor(active)

		const handleStorage = (e: StorageEvent) => {
			if (e.key === COLOR_STORAGE_KEY && e.newValue) {
				setCurrentColor(e.newValue)
				if (e.newValue === "neutral") {
					document.documentElement.removeAttribute("data-color")
				} else {
					document.documentElement.setAttribute("data-color", e.newValue)
				}
			}
		}

		window.addEventListener("storage", handleStorage)
		return () => window.removeEventListener("storage", handleStorage)
	}, [])

	const handleColorChange = (value: string) => {
		setCurrentColor(value)
		try {
			localStorage.setItem(COLOR_STORAGE_KEY, value)
		} catch {}

		if (value === "neutral") {
			document.documentElement.removeAttribute("data-color")
		} else {
			document.documentElement.setAttribute("data-color", value)
		}
	}

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<IconButton
					aria-label="Toggle primary color"
					variant="outline"
					color="neutral"
					className="relative">
					<Palette className="size-4.5" />
					<span
						className="border-bg absolute right-1.5 bottom-1.5 size-2 rounded-full border"
						style={{ backgroundColor: "var(--color-primary)" }}
					/>
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="h-72 w-52 overflow-y-scroll"
				sideOffset={8}>
				<DropdownMenuRadioGroup
					value={currentColor}
					onValueChange={handleColorChange}>
					{THEME_COLORS.map((colorOption) => (
						<DropdownMenuRadioItem
							key={colorOption.value}
							value={colorOption.value}
							className="cursor-pointer">
							<div className="flex items-center gap-2">
								<span
									className="border-border size-3.5 shrink-0 rounded-full border"
									style={{
										backgroundColor: `var(--color-${colorOption.value})`,
									}}
								/>
								<span className="text-sm">{colorOption.title}</span>
							</div>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
