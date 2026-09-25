"use client"

import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useThemerPreset } from "@/lib/themer-preset"
import { buildRegistryConfig } from "@/registry/config"
import { FONTS } from "@/registry/fonts"
import { IconLibraryProvider } from "@/registry/icon/icon-library"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { generateCustomColorShades } from "@/lib/shade-generator"
import ntc from "ntcjs"
import { Type, ChevronDown, CheckSquare, X } from "lucide-react"

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
		customColorId?: string
		property: string
		value?: string
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

	useLayoutEffect(() => {
		const applyOverrides = () => {
			if (!params.componentOverrides || params.componentOverrides.length === 0)
				return

			params.componentOverrides.forEach((override) => {
				const elements = document.querySelectorAll(override.selector)
				elements.forEach((el) => {
					if (el instanceof HTMLElement) {
						if (override.value) {
							el.style.setProperty(
								override.property,
								override.value,
								"important"
							)
						} else if (override.customColorId) {
							el.style.setProperty(
								override.property,
								`var(--color-${override.customColorId})`,
								"important"
							)
							if (override.property === "background-color") {
								const baseId = override.customColorId.replace(
									/-(accent|focus|border|hover|text)$/,
									""
								)
								el.style.setProperty(
									"color",
									`var(--color-${baseId}-fg)`,
									"important"
								)
								el.style.setProperty("--color-fg", `var(--color-${baseId}-fg)`)
								el.style.setProperty(
									"--color-fg-secondary",
									`color-mix(in srgb, var(--color-${baseId}-fg) 80%, transparent)`
								)
								el.style.setProperty(
									"--color-fg-tertiary",
									`color-mix(in srgb, var(--color-${baseId}-fg) 60%, transparent)`
								)
							}
						}
					}
				})
			})
		}

		applyOverrides()

		const observer = new MutationObserver((mutations) => {
			let shouldApply = false
			for (const mutation of mutations) {
				if (
					mutation.type === "childList" ||
					(mutation.type === "attributes" && mutation.attributeName === "class")
				) {
					shouldApply = true
					break
				}
			}
			if (shouldApply) applyOverrides()
		})

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["class"],
		})

		return () => {
			observer.disconnect()
			if (params.componentOverrides) {
				params.componentOverrides.forEach((override) => {
					const elements = document.querySelectorAll(override.selector)
					elements.forEach((el) => {
						if (el instanceof HTMLElement) {
							el.style.removeProperty(override.property)
							if (override.property === "background-color") {
								el.style.removeProperty("color")
								el.style.removeProperty("--color-fg")
								el.style.removeProperty("--color-fg-secondary")
								el.style.removeProperty("--color-fg-tertiary")
							}
						}
					})
				})
			}
		}
	}, [params.componentOverrides])

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
				<ElementInspectorPopover
					selectedSelector={selectedSelector}
					clickPos={clickPos}
					params={params}
					selectedElement={selectedElement}
					onClose={() => {
						setSelectedElement(null)
						setSelectedSelector(null)
					}}
				/>
			)}
		</IconLibraryProvider>
	)
}

function ElementInspectorPopover({
	selectedSelector,
	clickPos,
	params,
	selectedElement,
	onClose,
}: {
	selectedSelector: string
	clickPos: { x: number; y: number }
	params: any
	selectedElement: HTMLElement
	onClose: () => void
}) {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
	const [currentStyles, setCurrentStyles] = useState({
		fontSize: "16",
		fontWeight: "400",
	})

	useEffect(() => {
		if (selectedElement) {
			const computed = window.getComputedStyle(selectedElement)
			setCurrentStyles({
				fontSize: computed.fontSize.replace("px", ""),
				fontWeight: computed.fontWeight,
			})
		}
	}, [selectedElement])

	const applyOverride = (
		property: string,
		value?: string,
		customColorId?: string
	) => {
		window.parent.postMessage(
			{
				type: "add-component-override",
				selector: selectedSelector,
				customColorId,
				property,
				value,
			},
			"*"
		)
	}

	const renderColorMatrix = (property: string) => {
		return (
			<div
				style={{
					position: "absolute",
					top: "60px",
					left: 0,
					right: 0,
					backgroundColor: "#fff",
					border: "1px solid #e5e5e5",
					borderRadius: "8px",
					padding: "8px",
					zIndex: 100,
					maxHeight: "250px",
					overflowY: "auto",
					boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
				}}>
				{["primary", ...Object.keys(params.customColors || {})].map(
					(baseId) => {
						const isPrimary = baseId === "primary"
						const actualColorHex = isPrimary
							? params.primaryColor
							: params.customColors?.[baseId]
						const shades = [
							{ id: `${baseId}-accent`, label: "Accent", suffix: "-accent" },
							{ id: `${baseId}-focus`, label: "Focus", suffix: "-focus" },
							{ id: `${baseId}-border`, label: "Border", suffix: "-border" },
							{ id: baseId, label: "Base", suffix: "" },
							{ id: `${baseId}-hover`, label: "Hover", suffix: "-hover" },
							{ id: `${baseId}-text`, label: "Text", suffix: "-text" },
						]

						return (
							<div
								key={baseId}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "6px",
									marginBottom: "8px",
								}}>
								<div
									style={{
										fontSize: "11px",
										fontWeight: "500",
										color: "#666",
										padding: "0 4px",
									}}>
									{isPrimary
										? "Primary"
										: actualColorHex && actualColorHex.startsWith("#")
											? ntc.name(actualColorHex)[1]
											: PRIMARY_COLORS.find((c) => c.value === actualColorHex)
													?.name || baseId}
								</div>
								<div style={{ display: "flex", gap: "4px", padding: "0 4px" }}>
									{shades.map((shade) => {
										let previewBg = `var(--color-${shade.id})`
										if (
											isPrimary &&
											actualColorHex &&
											!actualColorHex.startsWith("#")
										) {
											const preset = PRIMARY_COLORS.find(
												(c) => c.value === actualColorHex
											)
											if (preset)
												previewBg =
													preset.cssVars.light[
														`--color-primary${shade.suffix}` as keyof typeof preset.cssVars.light
													]
										}

										return (
											<button
												key={shade.id}
												title={shade.label}
												onClick={(e) => {
													e.stopPropagation()
													applyOverride(property, undefined, shade.id)
												}}
												style={{
													flex: 1,
													height: "20px",
													borderRadius: "4px",
													border: "1px solid rgba(0,0,0,0.1)",
													backgroundColor: previewBg,
													cursor: "pointer",
													boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
													transition: "transform 0.1s ease",
												}}
												onMouseOver={(e) =>
													(e.currentTarget.style.transform = "scale(1.15)")
												}
												onMouseOut={(e) =>
													(e.currentTarget.style.transform = "scale(1)")
												}
											/>
										)
									})}
								</div>
							</div>
						)
					}
				)}
			</div>
		)
	}

	return (
		<div
			style={{
				position: "absolute",
				top: clickPos.y + window.scrollY + 12,
				left: Math.max(8, clickPos.x + window.scrollX + 12),
				backgroundColor: "#f9f9f9",
				border: "1px solid var(--color-border)",
				borderRadius: "8px",
				padding: "16px",
				zIndex: 10000,
				boxShadow: "0 4px 20px -2px rgb(0 0 0 / 0.15)",
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				width: "280px",
				fontFamily: "Inter, sans-serif",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<div style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>
					Inspect Element
				</div>
				<button
					onClick={onClose}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: "4px",
						borderRadius: "4px",
						color: "#666",
					}}
					onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
					onMouseOut={(e) =>
						(e.currentTarget.style.backgroundColor = "transparent")
					}>
					<X size={16} />
				</button>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
					<label style={{ fontSize: "13px", color: "#555" }}>Font size</label>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							border: "1px solid #e5e5e5",
							borderRadius: "6px",
							backgroundColor: "#fff",
							padding: "0 8px",
							height: "36px",
						}}>
						<Type size={16} color="#666" style={{ marginRight: "8px" }} />
						<input
							type="number"
							value={currentStyles.fontSize}
							onChange={(e) => {
								setCurrentStyles((s) => ({ ...s, fontSize: e.target.value }))
								if (e.target.value) {
									applyOverride("font-size", `${e.target.value}px`)
								}
							}}
							style={{
								border: "none",
								outline: "none",
								width: "100%",
								fontSize: "14px",
								color: "#111",
							}}
						/>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
					<label style={{ fontSize: "13px", color: "#555" }}>Font weight</label>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							border: "1px solid #e5e5e5",
							borderRadius: "6px",
							backgroundColor: "#fff",
							padding: "0 8px",
							height: "36px",
							position: "relative",
						}}>
						<select
							defaultValue={currentStyles.fontWeight}
							onChange={(e) => applyOverride("font-weight", e.target.value)}
							style={{
								appearance: "none",
								border: "none",
								outline: "none",
								width: "100%",
								fontSize: "14px",
								color: "#111",
								backgroundColor: "transparent",
								cursor: "pointer",
							}}>
							<option value="300">Light</option>
							<option value="400">Regular</option>
							<option value="500">Medium</option>
							<option value="600">Semibold</option>
							<option value="700">Bold</option>
						</select>
						<ChevronDown
							size={16}
							color="#666"
							style={{
								pointerEvents: "none",
								position: "absolute",
								right: "8px",
							}}
						/>
					</div>
				</div>
			</div>

			<div
				style={{
					fontSize: "14px",
					fontWeight: "600",
					color: "#111",
					marginTop: "4px",
				}}>
				Color
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "6px",
						position: "relative",
					}}>
					<label style={{ fontSize: "13px", color: "#555" }}>Text</label>
					<div
						onClick={() =>
							setActiveDropdown(activeDropdown === "color" ? null : "color")
						}
						style={{
							display: "flex",
							alignItems: "center",
							border: "1px solid #e5e5e5",
							borderRadius: "6px",
							backgroundColor: "#fff",
							padding: "0 8px",
							height: "36px",
							cursor: "pointer",
							justifyContent: "space-between",
						}}>
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<div
								style={{
									width: "16px",
									height: "16px",
									borderRadius: "4px",
									backgroundColor: "var(--color-bg)",
									border: "1px solid #ddd",
								}}
							/>
							<span style={{ fontSize: "14px", color: "#111" }}>
								Select Color...
							</span>
						</div>
						<ChevronDown size={16} color="#666" />
					</div>
					{activeDropdown === "color" && renderColorMatrix("color")}
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "6px",
						position: "relative",
					}}>
					<label style={{ fontSize: "13px", color: "#555" }}>Background</label>
					<div
						onClick={() =>
							setActiveDropdown(
								activeDropdown === "background-color"
									? null
									: "background-color"
							)
						}
						style={{
							display: "flex",
							alignItems: "center",
							border: "1px solid #e5e5e5",
							borderRadius: "6px",
							backgroundColor: "#fff",
							padding: "0 8px",
							height: "36px",
							cursor: "pointer",
							justifyContent: "space-between",
						}}>
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<CheckSquare size={16} color="#ccc" />
							<span style={{ fontSize: "14px", color: "#111" }}>
								Select Color...
							</span>
						</div>
						<ChevronDown size={16} color="#666" />
					</div>
					{activeDropdown === "background-color" &&
						renderColorMatrix("background-color")}
				</div>
			</div>

			<div
				style={{
					fontSize: "14px",
					fontWeight: "600",
					color: "#111",
					marginTop: "4px",
				}}>
				Border
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "6px",
					position: "relative",
				}}>
				<label style={{ fontSize: "13px", color: "#555" }}>Border color</label>
				<div
					onClick={() =>
						setActiveDropdown(
							activeDropdown === "border-color" ? null : "border-color"
						)
					}
					style={{
						display: "flex",
						alignItems: "center",
						border: "1px solid #e5e5e5",
						borderRadius: "6px",
						backgroundColor: "#fff",
						padding: "0 8px",
						height: "36px",
						cursor: "pointer",
						justifyContent: "space-between",
					}}>
					<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<div
							style={{
								width: "16px",
								height: "16px",
								borderRadius: "4px",
								backgroundColor: "var(--color-bg)",
								border: "1px solid #ddd",
							}}
						/>
						<span style={{ fontSize: "14px", color: "#111" }}>
							Select Color...
						</span>
					</div>
					<ChevronDown size={16} color="#666" />
				</div>
				{activeDropdown === "border-color" && renderColorMatrix("border-color")}
			</div>
		</div>
	)
}
