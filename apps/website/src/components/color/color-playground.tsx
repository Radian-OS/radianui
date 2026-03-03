"use client"

import React, { useEffect, useMemo, useState } from "react"
import CommonCard from "@/components/common/common-card"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { Button } from "@/registry/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const COLORS = [
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
	{ title: "Violet Blue (Default)", value: "violet-blue" },
	{ title: "Purple", value: "purple" },
	{ title: "Dark Orchid", value: "dark-orchid" },
	{ title: "Fuchsia", value: "fuchsia" },
	{ title: "Magenta", value: "magenta" },
	{ title: "Rose", value: "rose" },
] as const

const COLOR_CLASSES = {
	red: "bg-[oklch(0.64_0.22_26.04)]",
	orange: "bg-[oklch(0.6211_0.1686_43.12)]",
	amber: "bg-[oklch(0.8016_0.1705_73.27)]",
	yellow: "bg-[oklch(0.8_0.1625_94.77)]",
	neon: "bg-[oklch(0.7153_0.1873_128.9)]",
	green: "bg-[oklch(0.6523_0.2156_142.6)]",
	emerald: "bg-[oklch(0.6334_0.171_148.65)]",
	teal: "bg-[oklch(0.6432_0.1255_169.12)]",
	cyan: "bg-[oklch(0.6549_0.1092_194.82)]",
	"light-blue": "bg-[oklch(0.6092_0.2041_255.8)]",
	blue: "bg-[oklch(0.5345_0.223_272.15)]",
	"violet-blue": "bg-[oklch(0.528_0.2539_282.58)]",
	purple: "bg-[oklch(0.5554_0.2522_292.8)]",
	"dark-orchid": "bg-[oklch(0.623_0.2799_310.69)]",
	fuchsia: "bg-[oklch(0.6901_0.2628_327.97)]",
	magenta: "bg-[oklch(0.6175_0.2503_347.29)]",
	rose: "bg-[oklch(0.6515_0.221_6.33)]",
} as const

const CSS_VARIABLE_ORDER = [
	"primary",
	"primary-accent",
	"primary-focus",
	"primary-border",
	"primary-hover",
	"primary-text",
] as const

type Theme = {
	name: string
	label?: string
	cssVariables?: {
		light?: Record<string, string>
		dark?: Record<string, string>
	}
}

function buildCssBlock(vars: Record<string, string> | undefined): string {
	const lines = CSS_VARIABLE_ORDER.map(function (key) {
		return vars?.[key] ? `\t--color-${key}: ${vars[key]};` : null
	})
		.filter(Boolean)
		.join("\n")
	return `${lines}`
}

function computeCss(theme: Theme): string {
	const lightBlock = buildCssBlock(theme.cssVariables?.light)
	const darkBlock = buildCssBlock(theme.cssVariables?.dark)
	return `/* Light theme */\n${lightBlock}\n\n/* Dark theme */\n${darkBlock}`
}

function useTheme(colorName: string) {
	const [theme, setTheme] = useState<Theme | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(
		function () {
			const cache = new Map<string, Theme>()

			async function fetchTheme() {
				if (cache.has(colorName)) {
					setTheme(cache.get(colorName)!)
					return
				}
				setLoading(true)
				setError(null)
				try {
					const res = await fetch(`/r/themes/${colorName}.json`, {
						cache: "force-cache",
					})
					if (!res.ok)
						throw new Error(`Failed to load theme: ${res.statusText}`)
					const data: Theme = await res.json()
					cache.set(colorName, data)
					setTheme(data)
				} catch (err) {
					setError(err instanceof Error ? err.message : "Unknown error")
					console.error("Theme fetch error:", err)
				} finally {
					setLoading(false)
				}
			}

			fetchTheme()
		},
		[colorName]
	)

	return { theme, loading, error }
}

export default function ColorPlayground() {
	const [color, setColor] = useState("violet-blue")
	const { theme, loading, error } = useTheme(color)

	const css = useMemo(() => {
		return theme ? computeCss(theme) : ""
	}, [theme])

	const { copied, copy } = useCopyPaste({
		title: "Color theme CSS",
		category: color,
		code: css,
		eventName: "snippet_copy",
	})

	function handleColorChange(value: string) {
		setColor(value)
	}

	return (
		<div className={`flex flex-col gap-4 color-${color}`}>
			<div className="flex items-center justify-between">
				<Select value={color} onValueChange={handleColorChange}>
					<SelectTrigger className="ml-0.5 w-fit">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{COLORS.map((colorOption) => (
							<SelectItem key={colorOption.value} value={colorOption.value}>
								<div className="flex items-center justify-center gap-2">
									<span
										className={`inline-block h-4 w-4 rounded-sm ${COLOR_CLASSES[colorOption.value]}`}
									/>
									{colorOption.title}
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					variant="outline"
					color="neutral"
					aria-label={copied ? "Copied" : "Copy Primary Color"}
					onClick={copy}
					disabled={loading || !css}>
					{copied ? "Copied" : "Copy CSS"}
				</Button>
			</div>

			{error && (
				<div className="text-error-text text-sm">
					Failed to load theme: {error}
				</div>
			)}

			<div className="bg-elevation-negative border-soft rounded-2xl">
				<CommonCard />
			</div>
		</div>
	)
}
