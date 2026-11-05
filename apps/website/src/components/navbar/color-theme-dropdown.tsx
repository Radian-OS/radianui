"use client"

import React, { useEffect, useState } from "react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { cn } from "@/lib/utils"

export interface ThemeColorOption {
	id: string
	name: string
	gradient: string
	ringColor: string
}

export const RADIAN_COLORS: ThemeColorOption[] = [
	{
		id: "neutral",
		name: "Neutral",
		gradient:
			"radial-gradient(circle at 32% 32%, #a1a1aa 0%, #52525b 55%, #18181b 100%)",
		ringColor: "#71717a",
	},
	{
		id: "red",
		name: "Red",
		gradient:
			"radial-gradient(circle at 32% 32%, #fca5a5 0%, #ef4444 50%, #b91c1c 100%)",
		ringColor: "#ef4444",
	},
	{
		id: "orange",
		name: "Orange",
		gradient:
			"radial-gradient(circle at 32% 32%, #fdba74 0%, #f97316 50%, #c2410c 100%)",
		ringColor: "#f97316",
	},
	{
		id: "amber",
		name: "Amber",
		gradient:
			"radial-gradient(circle at 32% 32%, #fde68a 0%, #f59e0b 50%, #b45309 100%)",
		ringColor: "#f59e0b",
	},
	{
		id: "yellow",
		name: "Yellow",
		gradient:
			"radial-gradient(circle at 32% 32%, #fef08a 0%, #eab308 50%, #a16207 100%)",
		ringColor: "#eab308",
	},
	{
		id: "neon",
		name: "Neon",
		gradient:
			"radial-gradient(circle at 32% 32%, #bef264 0%, #84cc16 50%, #4d7c0f 100%)",
		ringColor: "#84cc16",
	},
	{
		id: "green",
		name: "Green",
		gradient:
			"radial-gradient(circle at 32% 32%, #86efac 0%, #22c55e 50%, #15803d 100%)",
		ringColor: "#22c55e",
	},
	{
		id: "emerald",
		name: "Emerald",
		gradient:
			"radial-gradient(circle at 32% 32%, #6ee7b7 0%, #10b981 50%, #047857 100%)",
		ringColor: "#10b981",
	},
	{
		id: "teal",
		name: "Teal",
		gradient:
			"radial-gradient(circle at 32% 32%, #5eead4 0%, #14b8a6 50%, #0f766e 100%)",
		ringColor: "#14b8a6",
	},
	{
		id: "cyan",
		name: "Cyan",
		gradient:
			"radial-gradient(circle at 32% 32%, #67e8f9 0%, #06b6d4 50%, #0e7490 100%)",
		ringColor: "#06b6d4",
	},
	{
		id: "light-blue",
		name: "Light Blue",
		gradient:
			"radial-gradient(circle at 32% 32%, #7dd3fc 0%, #0ea5e9 50%, #0369a1 100%)",
		ringColor: "#0ea5e9",
	},
	{
		id: "blue",
		name: "Blue",
		gradient:
			"radial-gradient(circle at 32% 32%, #93c5fd 0%, #3b82f6 50%, #1d4ed8 100%)",
		ringColor: "#3b82f6",
	},
	{
		id: "violet-blue",
		name: "Violet Blue",
		gradient:
			"radial-gradient(circle at 32% 32%, #a5b4fc 0%, #6366f1 50%, #4338ca 100%)",
		ringColor: "#6366f1",
	},
	{
		id: "purple",
		name: "Purple",
		gradient:
			"radial-gradient(circle at 32% 32%, #d8b4fe 0%, #a855f7 50%, #7e22ce 100%)",
		ringColor: "#a855f7",
	},
	{
		id: "dark-orchid",
		name: "Dark Orchid",
		gradient:
			"radial-gradient(circle at 32% 32%, #e879f9 0%, #c026d3 50%, #86198f 100%)",
		ringColor: "#c026d3",
	},
	{
		id: "fuchsia",
		name: "Fuchsia",
		gradient:
			"radial-gradient(circle at 32% 32%, #f0abfc 0%, #d946ef 50%, #a21caf 100%)",
		ringColor: "#d946ef",
	},
	{
		id: "magenta",
		name: "Magenta",
		gradient:
			"radial-gradient(circle at 32% 32%, #f472b6 0%, #e11d48 50%, #9f1239 100%)",
		ringColor: "#e11d48",
	},
	{
		id: "rose",
		name: "Rose",
		gradient:
			"radial-gradient(circle at 32% 32%, #fda4af 0%, #f43f5e 50%, #be123c 100%)",
		ringColor: "#f43f5e",
	},
]

const COLOR_STORAGE_KEY = "radian-primary-color"

function syncColor(colorId: string) {
	const isDefault = colorId === "neutral" || colorId === "default"

	if (isDefault) {
		document.documentElement.removeAttribute("data-color")
	} else {
		document.documentElement.setAttribute("data-color", colorId)
	}

	try {
		const iframes = document.querySelectorAll("iframe")
		iframes.forEach((iframe) => {
			try {
				if (isDefault) {
					iframe.contentDocument?.documentElement.removeAttribute("data-color")
				} else {
					iframe.contentDocument?.documentElement.setAttribute(
						"data-color",
						colorId
					)
				}
				iframe.contentWindow?.postMessage(
					{ type: "radian-color-change", color: colorId },
					"*"
				)
			} catch {}
		})
	} catch {}
}

export function ColorThemeDropdown() {
	const [activeId, setActiveId] = useState<string>("neutral")
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem(COLOR_STORAGE_KEY)
		const current =
			saved || document.documentElement.getAttribute("data-color") || "neutral"

		const matched = RADIAN_COLORS.find((c) => c.id === current)
		const initialId = matched ? matched.id : "neutral"
		setActiveId(initialId)
		syncColor(initialId)

		const handleIframeLoad = () => {
			const active = localStorage.getItem(COLOR_STORAGE_KEY) || "neutral"
			syncColor(active)
		}

		const iframes = document.querySelectorAll("iframe")
		iframes.forEach((iframe) => {
			iframe.addEventListener("load", handleIframeLoad)
		})

		const handleStorage = (e: StorageEvent) => {
			if (e.key === COLOR_STORAGE_KEY && e.newValue) {
				const updateMatch = RADIAN_COLORS.find((c) => c.id === e.newValue)
				if (updateMatch) {
					setActiveId(updateMatch.id)
					syncColor(updateMatch.id)
				}
			}
		}

		window.addEventListener("storage", handleStorage)
		return () => {
			window.removeEventListener("storage", handleStorage)
			iframes.forEach((iframe) => {
				iframe.removeEventListener("load", handleIframeLoad)
			})
		}
	}, [])

	const handleSelect = (colorOption: ThemeColorOption) => {
		setActiveId(colorOption.id)
		try {
			localStorage.setItem(COLOR_STORAGE_KEY, colorOption.id)
		} catch {}

		syncColor(colorOption.id)
		setIsOpen(false)
	}

	const currentColor =
		RADIAN_COLORS.find((c) => c.id === activeId) || RADIAN_COLORS[0]

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					aria-label="Toggle theme color"
					className="border-border bg-fill1 hover:bg-fill2 text-fg focus-visible:ring-primary flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
					<span
						className="size-3.5 shrink-0 rounded-full shadow-xs"
						style={{ background: currentColor.gradient }}
					/>
					<span>{currentColor.name}</span>
				</button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				sideOffset={8}
				className="border-border bg-elevation-level1 no-scrollbar max-h-[380px] w-[290px] overflow-y-auto rounded-2xl border p-4 shadow-2xl backdrop-blur-md">
				<div className="grid grid-cols-4 gap-x-2 gap-y-3.5">
					{RADIAN_COLORS.map((colorOption) => {
						const isSelected = colorOption.id === activeId

						return (
							<button
								key={colorOption.id}
								type="button"
								onClick={() => handleSelect(colorOption)}
								className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg p-1 text-center transition-transform focus-visible:outline-none">
								<div
									className="relative flex items-center justify-center rounded-full transition-transform duration-150 group-hover:scale-105 group-active:scale-95"
									style={{
										padding: "2px",
										boxShadow: isSelected
											? `0 0 0 2px var(--color-elevation-level1, #0B0F17), 0 0 0 4px ${colorOption.ringColor}`
											: "none",
									}}>
									<div
										className="size-10 shrink-0 rounded-full shadow-inner"
										style={{ background: colorOption.gradient }}
									/>
								</div>
								<span
									className={cn(
										"text-[11px] leading-tight tracking-tight transition-colors",
										isSelected
											? "text-fg font-semibold"
											: "text-fg-tertiary group-hover:text-fg"
									)}>
									{colorOption.name}
								</span>
							</button>
						)
					})}
				</div>
			</PopoverContent>
		</Popover>
	)
}
