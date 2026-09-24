"use client"

import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS } from "@/registry/fonts"
import { IconLibraryProvider } from "@/registry/icon/icon-library"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { generateCustomColorShades } from "@/lib/shade-generator"

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
	const lightVars = buildCssRule(":root", {
		...cssVars.light,
		...cssVars.theme,
	})
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

		const fontFamily = font.font.family
		document.documentElement.style.setProperty(cssVar, fontFamily)

		return () => {
			document.head.removeChild(link)
		}
	}, [font, cssVar])
}

const THEMER_STYLE_ID = "themer-style"

const buildThemerCssText = (
	cssVars: RegistryThemeCssVars | undefined,
	customColors?: Record<string, string>,
	componentOverrides?: Array<{
		selector: string
		customColorId: string
		property: string
	}>
) => {
	const parts: string[] = []

	if (cssVars) {
		parts.push(buildStyleCssText(cssVars))
	}

	if (customColors) {
		const customColorVars = Object.entries(customColors).reduce(
			(acc, [id, val]) => {
				let shades: Record<string, string> = {}

				if (val.startsWith("#")) {
					shades = generateCustomColorShades(val, id)
				} else {
					const preset = PRIMARY_COLORS.find((c) => c.value === val)
					if (preset) {
						for (const [key, v] of Object.entries(preset.cssVars.light)) {
							const newKey = key.replace("--color-primary", `--color-${id}`)
							shades[newKey] = v
						}
					} else {
						shades[`--color-${id}`] = val
					}
				}

				return { ...acc, ...shades }
			},
			{} as Record<string, string>
		)
		if (Object.keys(customColorVars).length > 0) {
			parts.push(buildCssRule(":root", customColorVars))
		}
	}

	if (componentOverrides && componentOverrides.length > 0) {
		const overrideRules = componentOverrides.map((override) => {
			let rules = `  ${override.property}: var(--color-${override.customColorId}) !important;`

			if (override.property === "background-color") {
				rules += `
  color: var(--color-${override.customColorId}-fg) !important;
  --color-fg: var(--color-${override.customColorId}-fg);
  --color-fg-secondary: color-mix(in srgb, var(--color-${override.customColorId}-fg) 80%, transparent);
  --color-fg-tertiary: color-mix(in srgb, var(--color-${override.customColorId}-fg) 60%, transparent);`
			}

			return `${override.selector} {\n${rules}\n}`
		})
		parts.push(overrideRules.join("\n\n"))
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

function getThemerNode(el: Element): Element | null {
	let current: Element | null = el
	while (current && current.tagName.toLowerCase() !== "html") {
		if (current.hasAttribute("data-themer-id")) {
			return current
		}
		current = current.parentElement
	}
	return null
}

function getCssSelector(el: Element): string | null {
	const node = getThemerNode(el)
	if (node) {
		return `[data-themer-id="${node.getAttribute("data-themer-id")}"]`
	}
	return null
}

export function PreviewClient({ children }: { children: React.ReactNode }) {
	const [params, setParams] = useThemerPreset()
	const [isReady, setIsReady] = useState(false)
	const [inspectMode, setInspectMode] = useState(false)
	const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)
	const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
		null
	)
	const [selectedSelector, setSelectedSelector] = useState<string | null>(null)
	const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(
		null
	)

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

		style.textContent = buildThemerCssText(
			config?.cssVars,
			params.customColors,
			params.componentOverrides
		)

		removeManagedBodyClasses(document.body)
		document.body.classList.add(`style-${params.style}`)
		setIsReady(true)

		return () => {
			if (style && document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [config, params.style, params.customColors, params.componentOverrides])

	useFontLoader(selectedHeadingFont, "--font-heading")
	useFontLoader(selectedBodyFont, "--font-body")

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === "primary-color-change") {
				setParams({ primaryColor: event.data.primaryColor })
			}
			if (event.data.type === "base-color-change") {
				setParams({ baseColor: event.data.baseColor })
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
			if (event.data.type === "control-radius-change") {
				setParams({ controlRadius: event.data.controlRadius })
			}
			if (event.data.type === "template-change") {
				setParams({ template: event.data.template })
			}
			if (event.data.type === "style-change") {
				setParams({ style: event.data.style })
			}
			if (event.data.type === "icon-library-change") {
				setParams({ iconLibrary: event.data.iconLibrary })
			}
			if (event.data.type === "inspect-mode-change") {
				setInspectMode(event.data.inspectMode)
			}
			if (event.data.type === "custom-colors-change") {
				setParams({ customColors: event.data.customColors })
			}
			if (event.data.type === "component-overrides-change") {
				setParams({ componentOverrides: event.data.componentOverrides })
			}
		}

		window.addEventListener("message", handleMessage)

		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [setParams])

	useEffect(() => {
		if (!inspectMode) {
			setHoveredElement(null)
			return
		}

		const handleMouseOver = (e: MouseEvent) => {
			e.stopPropagation()
			const node = getThemerNode(e.target as Element)
			setHoveredElement(node as HTMLElement | null)
		}

		const handleClick = (e: MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			const target = e.target as HTMLElement
			const selector = getCssSelector(target)
			if (selector) {
				setSelectedElement(target)
				setSelectedSelector(selector)
				setClickPos({ x: e.clientX, y: e.clientY })
				// Tell the parent window to turn off the inspect mode button state
				window.parent.postMessage({ type: "element-inspected", selector }, "*")
				setInspectMode(false)
				setHoveredElement(null)
			}
		}

		document.addEventListener("mouseover", handleMouseOver, true)
		document.addEventListener("click", handleClick, true)

		return () => {
			document.removeEventListener("mouseover", handleMouseOver, true)
			document.removeEventListener("click", handleClick, true)
		}
	}, [inspectMode])

	if (!isReady) return null

	return (
		<IconLibraryProvider value={params.iconLibrary}>
			{children}
			{inspectMode && hoveredElement && (
				<div
					style={{
						position: "fixed",
						top: hoveredElement.getBoundingClientRect().top,
						left: hoveredElement.getBoundingClientRect().left,
						width: hoveredElement.getBoundingClientRect().width,
						height: hoveredElement.getBoundingClientRect().height,
						backgroundColor: "rgba(59, 130, 246, 0.2)",
						border: "2px solid rgb(59, 130, 246)",
						pointerEvents: "none",
						zIndex: 9999,
					}}
				/>
			)}
			{selectedElement && selectedSelector && clickPos && (
				<div
					style={{
						position: "absolute",
						top: clickPos.y + window.scrollY + 12,
						left: Math.max(8, clickPos.x + window.scrollX + 12),
						backgroundColor: "white",
						border: "1px solid var(--color-border)",
						borderRadius: "8px",
						padding: "8px",
						zIndex: 10000,
						boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.15)",
						display: "flex",
						flexDirection: "column",
						gap: "4px",
						minWidth: "160px",
					}}>
					<div
						style={{
							fontSize: "12px",
							fontWeight: "600",
							marginBottom: "4px",
							color: "#111",
							padding: "0 4px",
						}}>
						Set Custom Color
					</div>
					{["primary", ...Object.keys(params.customColors || {})].map((id) => {
						const isPrimary = id === "primary"
						const actualColorHex = isPrimary
							? params.primaryColor
							: params.customColors?.[id]
						// We can use the generated CSS variable for the preview box, but we need to resolve primary color if it's a preset
						let previewBg = `var(--color-${id})`

						// If they chose primary and it's a preset like violet-blue, our CSS variables have it stored as --color-primary
						if (
							isPrimary &&
							actualColorHex &&
							!actualColorHex.startsWith("#")
						) {
							const preset = PRIMARY_COLORS.find(
								(c) => c.value === actualColorHex
							)
							if (preset) previewBg = preset.cssVars.light["--color-primary"]
						}

						return (
							<button
								key={id}
								onClick={() => {
									window.parent.postMessage(
										{
											type: "add-component-override",
											selector: selectedSelector,
											customColorId: id,
										},
										"*"
									)
									setSelectedElement(null)
									setSelectedSelector(null)
								}}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									padding: "6px 8px",
									fontSize: "12px",
									borderRadius: "6px",
									border: "none",
									background: "transparent",
									cursor: "pointer",
									color: "#333",
									fontWeight: "500",
								}}
								onMouseOver={(e) =>
									(e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.06)")
								}
								onMouseOut={(e) =>
									(e.currentTarget.style.backgroundColor = "transparent")
								}>
								<div
									style={{
										width: "14px",
										height: "14px",
										borderRadius: "3px",
										backgroundColor: previewBg,
										border: "1px solid rgba(0,0,0,0.1)",
									}}
								/>
								{id === "primary" ? "Primary Color" : id}
							</button>
						)
					})}
					<button
						onClick={() => {
							setSelectedElement(null)
							setSelectedSelector(null)
						}}
						style={{
							marginTop: "6px",
							padding: "6px",
							fontSize: "12px",
							fontWeight: "500",
							background: "rgba(0,0,0,0.04)",
							border: "none",
							borderRadius: "6px",
							cursor: "pointer",
							color: "#555",
						}}
						onMouseOver={(e) =>
							(e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)")
						}
						onMouseOut={(e) =>
							(e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)")
						}>
						Cancel
					</button>
				</div>
			)}
		</IconLibraryProvider>
	)
}
