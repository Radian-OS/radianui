"use client"

import { Suspense, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
	ProjectConfig,
	ProjectOptions,
	createProjectConfig,
} from "@/lib/create-project-config"
import registry from "@/registry/registry-map"

const getComponentsByPrefix = (prefix: string) => {
	return Object.entries(registry).filter(([key]) =>
		key.startsWith(`${prefix}-`)
	)
}

const buildCssRule = (selector: string, cssVars?: Record<string, string>) => {
	const declarations = Object.entries(cssVars ?? {})
		.filter(([, value]) => Boolean(value))
		.map(([key, value]) => `  --color-${key}: ${value};`)
		.join("\n")

	if (!declarations) {
		return `${selector} {}\n`
	}

	return `${selector} {\n${declarations}\n}\n`
}

const buildStyleCssText = (config: ProjectConfig) => {
	const lightVars = buildCssRule(":root", config.cssVars.light)
	const darkVars = buildCssRule(".dark", config.cssVars.dark)

	return [lightVars, darkVars].join("\n")
}

const PRIMARY_COLOR_STYLE_ID = "primary-color-style"

const RADIUS_STYLE_ID = "radius-style"

const RADIUS_PRESETS: Record<string, Record<string, string>> = {
	none: {
		xs: "0px",
		sm: "0px",
		md: "0px",
		lg: "0px",
		xl: "0px",
		"2xl": "0px",
	},
	small: {
		xs: "1px",
		sm: "2px",
		md: "4px",
		lg: "4px",
		xl: "6px",
		"2xl": "8px",
	},
	medium: {
		xs: "2px",
		sm: "4px",
		md: "6px",
		lg: "8px",
		xl: "12px",
		"2xl": "16px",
	},
	large: {
		xs: "2px",
		sm: "4px",
		md: "8px",
		lg: "12px",
		xl: "20px",
		"2xl": "28px",
	},
}

const buildRadiusCssText = (preset: string) => {
	const radii = RADIUS_PRESETS[preset]
	if (!radii) return ""

	const declarations = Object.entries(radii)
		.map(([key, value]) => `  --radius-${key}: ${value};`)
		.join("\n")

	return `:root {\n${declarations}\n}\n`
}

export default function Page({}: { params: { name: string } }) {
	const searchParams = useSearchParams()

	const [primaryColor, setPrimaryColor] = useState(
		searchParams.get("primaryColor")
	)
	const [componentName, setComponentName] = useState(
		searchParams.get("component") ?? "button"
	)

	const [radius, setRadius] = useState<string>("")

	const configOptions: ProjectOptions = {
		primaryColor: primaryColor as ProjectOptions["primaryColor"],
	}

	const config = createProjectConfig(configOptions)

	const components = useMemo(
		() => getComponentsByPrefix(componentName),
		[componentName]
	)

	useLayoutEffect(() => {
		if (!config || !config.cssVars) return

		let style = document.getElementById(
			PRIMARY_COLOR_STYLE_ID
		) as HTMLStyleElement

		if (!style) {
			style = document.createElement("style")
			style.id = PRIMARY_COLOR_STYLE_ID
			document.head.appendChild(style)
		}

		const styleText = buildStyleCssText(config)
		style.textContent = styleText
		console.log(styleText)

		return () => {
			if (style && document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [config])

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === "primary-color-change") {
				setPrimaryColor(event.data.primaryColor)
			}
			if (event.data.type === "component-change") {
				setComponentName(event.data.component)
			}
			if (event.data.type === "radius-change") {
				setRadius(event.data.radius)
			}
		}

		window.addEventListener("message", handleMessage)

		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [])

	useLayoutEffect(() => {
		let style = document.getElementById(RADIUS_STYLE_ID) as HTMLStyleElement

		if (!radius || radius === "default") {
			if (style && document.head.contains(style)) {
				document.head.removeChild(style)
			}
			return
		}

		const cssText = buildRadiusCssText(radius)
		if (!cssText) return

		if (!style) {
			style = document.createElement("style")
			style.id = RADIUS_STYLE_ID
			document.head.appendChild(style)
		}

		style.textContent = cssText

		return () => {
			if (style && document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [radius])

	return (
		<div className="flex flex-col items-center gap-3 p-3">
			{components.map(([key, Component]) => (
				<Suspense
					key={key}
					fallback={
						<div className="bg-fill2 h-10 w-full animate-pulse rounded" />
					}>
					<Component />
				</Suspense>
			))}
		</div>
	)
}
