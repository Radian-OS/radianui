"use client"

import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS, type Font } from "@/registry/fonts"
import { IconLibraryProvider } from "@/registry/icon/icon-library"
import { ScrollArea, ScrollBar } from "@/styles/default/ui/scroll-area"

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
	const lightVars = buildCssRule(":root, :root[data-color], html[data-color]", {
		...cssVars.light,
		...cssVars.theme,
	})
	const darkVars = buildCssRule(
		".dark, .dark[data-color], html.dark[data-color]",
		cssVars.dark
	)

	return [lightVars, darkVars].join("\n")
}

const useFontLoader = (font: Font | undefined, cssVar: string) => {
	useEffect(() => {
		if (!font) return

		const link = document.createElement("link")
		link.rel = "stylesheet"
		link.href = font.font.googleFontsUrl
		document.head.appendChild(link)

		const fontFamily = font.font.family
		document.documentElement.style.setProperty(cssVar, fontFamily)

		return () => {
			document.head.removeChild(link)
		}
	}, [font, cssVar])
}

const THEMER_STYLE_ID = "themer-style"

const buildThemerCssText = (cssVars: RegistryThemeCssVars | undefined) => {
	if (!cssVars) return ""
	return buildStyleCssText(cssVars)
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
	const { setTheme: setClientTheme } = useTheme()
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

		style.textContent = buildThemerCssText(config?.cssVars)

		removeManagedBodyClasses(document.body)
		document.body.classList.add(`style-${params.style}`)
	}, [config, params.style, params.density])

	useFontLoader(selectedHeadingFont, "--font-heading")
	useFontLoader(selectedBodyFont, "--font-body")

	useEffect(() => {
		if (window.parent === window) {
			setIsReady(true)
		}

		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === "all-params-sync" && event.data.params) {
				setParams(event.data.params)
				setIsReady(true)
			}
		}

		window.addEventListener("message", handleMessage)
		window.parent?.postMessage({ type: "preview-ready" }, "*")

		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [setParams])

	if (!isReady) return null

	return (
		<IconLibraryProvider value={params.iconLibrary}>
			<ScrollArea className="h-dvh w-full overflow-hidden" type="auto">
				{children}
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</IconLibraryProvider>
	)
}
