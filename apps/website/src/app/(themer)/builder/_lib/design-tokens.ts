/**
 * Design Tokens
 *
 * Editable design tokens that map 1:1 to CSS custom properties from globals.css.
 * Integrates with the existing registry infrastructure:
 * - primary-colors.ts for primary color presets
 * - base-colors.ts for base/neutral color presets
 * - radius.ts for border radius presets
 * - fonts.ts for heading/body font presets
 */

import { BASE_COLORS, type BaseColorValue } from "@/registry/base-colors"
import { FONTS, type FontValue } from "@/registry/fonts"
import {
	PRIMARY_COLORS,
	type PrimaryColorValue,
} from "@/registry/primary-colors"
import { RADIUS, type RadiusValue } from "@/registry/radius"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DesignTokens {
	/** Primary color preset key */
	primaryColor: PrimaryColorValue
	/** Base/neutral color preset key */
	baseColor: BaseColorValue
	/** Border radius preset key */
	radius: RadiusValue
	/** Heading font preset key */
	headingFont: FontValue
	/** Body font preset key */
	bodyFont: FontValue
	/** Dark mode enabled */
	darkMode: boolean
	/** Custom section padding (CSS value) */
	sectionPadding: string
	/** Custom container max width (CSS value) */
	containerMaxWidth: string
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_DESIGN_TOKENS: DesignTokens = {
	primaryColor: "violet-blue",
	baseColor: "default",
	radius: "medium",
	headingFont: "geist",
	bodyFont: "inter",
	darkMode: false,
	sectionPadding: "80px",
	containerMaxWidth: "1200px",
}

// ---------------------------------------------------------------------------
// CSS Variable Resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the current design tokens into a flat record of CSS variable
 * overrides that can be injected as a `<style>` block.
 */
export function resolveTokensToCssVars(
	tokens: DesignTokens
): Record<string, string> {
	const vars: Record<string, string> = {}

	// Primary color
	const primaryColor = PRIMARY_COLORS.find(
		(c) => c.value === tokens.primaryColor
	)
	if (primaryColor) {
		const colorMode = tokens.darkMode ? "dark" : "light"
		const colorVars = primaryColor.cssVars[colorMode]
		for (const [key, value] of Object.entries(colorVars)) {
			// Normalize keys: some entries use bare keys like "primary",
			// others use "--color-primary"
			const normalizedKey = key.startsWith("--") ? key : `--color-${key}`
			vars[normalizedKey] = value
		}
	}

	// Base color
	const baseColor = BASE_COLORS.find((c) => c.value === tokens.baseColor)
	if (baseColor) {
		const colorMode = tokens.darkMode ? "dark" : "light"
		const baseVars = baseColor.cssVars[colorMode]
		for (const [key, value] of Object.entries(baseVars)) {
			vars[key] = value
		}
	}

	// Radius
	const radius = RADIUS.find((r) => r.value === tokens.radius)
	if (radius) {
		for (const [key, value] of Object.entries(radius.radius)) {
			vars[`--${key}`] = value
		}
	}

	// Fonts
	const headingFont = FONTS.find((f) => f.value === tokens.headingFont)
	if (headingFont) {
		vars["--font-heading"] = headingFont.font.family
	}

	const bodyFont = FONTS.find((f) => f.value === tokens.bodyFont)
	if (bodyFont) {
		vars["--font-body"] = bodyFont.font.family
	}

	return vars
}

/**
 * Build a CSS string from token-resolved variables.
 * This gets injected as a `<style>` block into the preview.
 */
export function buildTokenStyleBlock(tokens: DesignTokens): string {
	const vars = resolveTokensToCssVars(tokens)
	const declarations = Object.entries(vars)
		.map(([key, value]) => `  ${key}: ${value};`)
		.join("\n")

	// Also inject Google Fonts @import if needed
	const headingFont = FONTS.find((f) => f.value === tokens.headingFont)
	const bodyFont = FONTS.find((f) => f.value === tokens.bodyFont)

	const fontImports: string[] = []
	if (headingFont?.font.googleFontsUrl) {
		fontImports.push(`@import url('${headingFont.font.googleFontsUrl}');`)
	}
	if (
		bodyFont?.font.googleFontsUrl &&
		bodyFont.font.googleFontsUrl !== headingFont?.font.googleFontsUrl
	) {
		fontImports.push(`@import url('${bodyFont.font.googleFontsUrl}');`)
	}

	return `${fontImports.join("\n")}
:root {
${declarations}
}`
}

// ---------------------------------------------------------------------------
// Re-exports for convenience
// ---------------------------------------------------------------------------

export { PRIMARY_COLORS } from "@/registry/primary-colors"
export { BASE_COLORS } from "@/registry/base-colors"
export { RADIUS } from "@/registry/radius"
export { FONTS } from "@/registry/fonts"
