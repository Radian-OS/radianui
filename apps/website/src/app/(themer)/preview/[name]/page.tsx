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

export default function Page({}: { params: { name: string } }) {
	const searchParams = useSearchParams()

	const [primaryColor, setPrimaryColor] = useState(
		searchParams.get("primaryColor")
	)
	const [componentName, setComponentName] = useState(
		searchParams.get("component") ?? "button"
	)

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
		}

		window.addEventListener("message", handleMessage)

		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [])

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
