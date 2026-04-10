"use client"

import { Suspense, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { DesignSystemConfig, buildProjectInitConfig } from "@/registry/config"
import { FONTS } from "@/registry/fonts"
import registry from "@/registry/registry-map"

type RegistryThemeCssVars = NonNullable<
	ReturnType<typeof buildProjectInitConfig>["cssVars"]
>

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

const buildStyleCssText = (cssVars: RegistryThemeCssVars) => {
	const lightVars = buildCssRule(":root", cssVars.light)
	const darkVars = buildCssRule(".dark", cssVars.dark)

	return [lightVars, darkVars].join("\n")
}

const useFontLoader = (
	font: (typeof FONTS)[number] | undefined,
	cssVar: string
) => {
	useEffect(() => {
		if (!font) return

		const link = document.createElement("link")
		link.rel = "stylesheet"
		link.href = font.font.googleFontsUrl
		document.head.appendChild(link)

		const fontFamily = font.name
		document.documentElement.style.setProperty(cssVar, fontFamily)

		return () => {
			document.head.removeChild(link)
		}
	}, [font, cssVar])
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
	const [headingFont, setHeadingFont] = useState(
		searchParams.get("headingFont")
	)
	const [bodyFont, setBodyFont] = useState(searchParams.get("bodyFont"))

	const selectedHeadingFont = FONTS.find((font) => font.value === headingFont)
	const selectedBodyFont = FONTS.find((font) => font.value === bodyFont)

	const config = useMemo(
		() =>
			buildProjectInitConfig({
				primaryColor,
				headingFont,
				bodyFont,
			} as DesignSystemConfig),
		[primaryColor, headingFont, bodyFont]
	)

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

		const styleText = buildStyleCssText(config.cssVars)
		style.textContent = styleText

		return () => {
			if (style && document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [config])

	useFontLoader(selectedHeadingFont, "--heading-font")
	useFontLoader(selectedBodyFont, "--body-font")

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === "primary-color-change") {
				setPrimaryColor(event.data.primaryColor)
			}
			if (event.data.type === "component-change") {
				setComponentName(event.data.component)
			}
			if (event.data.type === "heading-font-change") {
				setHeadingFont(event.data.headingFont)
			}
			if (event.data.type === "body-font-change") {
				setBodyFont(event.data.bodyFont)
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
