"use client"

import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS } from "@/registry/fonts"
import { RADIUS } from "@/registry/radius"

const MANAGED_BODY_CLASS_PREFIXES = ["style-"] as const

type RegistryThemeCssVars = NonNullable<
	ReturnType<typeof buildRegistryConfig>["cssVars"]
>

const buildCssRule = (selector: string, cssVars?: Record<string, string>) => {
	const declarations = Object.entries(cssVars ?? {})
		.filter(([, value]) => Boolean(value))
		.map(([key, value]) => `  ${key}: ${value};`)
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

const THEMER_STYLE_ID = "themer-style"

const RADIUS_PRESETS = Object.fromEntries(
	RADIUS.map((r) => [r.value, r.radius])
)

const buildRadiusCssText = (preset: string) => {
	const radii = RADIUS_PRESETS[preset]
	if (!radii) return ""

	const declarations = Object.entries(radii)
		.map(([key, value]) => `  --radius-${key}: ${value};`)
		.join("\n")

	return `:root {\n${declarations}\n}\n`
}

const buildThemerCssText = (
	cssVars: RegistryThemeCssVars | undefined,
	radius: string | undefined
) => {
	const parts: string[] = []

	if (cssVars) {
		parts.push(buildStyleCssText(cssVars))
	}

	if (radius) {
		const radiusCss = buildRadiusCssText(radius)
		if (radiusCss) parts.push(radiusCss)
	}

	return parts.join("\n")
}

function removeManagedBodyClasses(body: Element) {
	for (const className of Array.from(body.classList)) {
		if (
			MANAGED_BODY_CLASS_PREFIXES.some((prefix) => className.startsWith(prefix))
		) {
			body.classList.remove(className)
		}
	}
}

export function PreviewClient({ children }: { children: React.ReactNode }) {
	const [params, setParams] = useThemerPreset()
	const [isReady, setIsReady] = useState(false)

	const selectedHeadingFont = FONTS.find(
		(font) => font.value === params.headingFont
	)
	const selectedBodyFont = FONTS.find((font) => font.value === params.bodyFont)

	const config = useMemo(() => buildRegistryConfig(params), [params])

	useLayoutEffect(() => {
		let style = document.getElementById(THEMER_STYLE_ID) as HTMLStyleElement

		if (!style) {
			style = document.createElement("style")
			style.id = THEMER_STYLE_ID
			document.head.appendChild(style)
		}

		style.textContent = buildThemerCssText(config?.cssVars, params.radius)

		removeManagedBodyClasses(document.body)
		document.body.classList.add(`style-${params.style}`)
		setIsReady(true)

		return () => {
			if (style && document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [config, params.radius, params.style])

	useFontLoader(selectedHeadingFont, "--heading-font")
	useFontLoader(selectedBodyFont, "--body-font")

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === "primary-color-change") {
				setParams({ primaryColor: event.data.primaryColor })
			}
			if (event.data.type === "heading-font-change") {
				setParams({ headingFont: event.data.headingFont })
			}
			if (event.data.type === "body-font-change") {
				setParams({ bodyFont: event.data.bodyFont })
			}
			if (event.data.type === "radius-change") {
				setParams({ radius: event.data.radius })
			}
			if (event.data.type === "template-change") {
				setParams({ template: event.data.template })
			}
			if (event.data.type === "style-change") {
				setParams({ style: event.data.style })
			}
			if (event.data.type === "theme-change") {
				setParams({ theme: event.data.theme })
			}
		}

		window.addEventListener("message", handleMessage)

		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [setParams])

	if (!isReady) return null

	return children
}
