import type { AtRule, Declaration, PluginCreator, Root, Rule } from "postcss"
import postcss from "postcss"
import { type Preset } from "@/registry/schema"

const CSS_CONSTANTS = {
	DARK_SELECTOR: ".dark",
	COLOR_PREFIX: "--color-",
	GOOGLE_FONTS_DOMAIN: "fonts.googleapis.com",
} as const

/**
 * Updates existing CSS variable values in a node and appends missing ones.
 */
function updateColorVars(
	node: AtRule | Rule,
	vars: Record<string, string>
): void {
	const remaining = { ...vars }

	node.walkDecls((decl: Declaration) => {
		if (!decl.prop.startsWith(CSS_CONSTANTS.COLOR_PREFIX)) return

		const key = decl.prop.replace(CSS_CONSTANTS.COLOR_PREFIX, "")
		if (remaining[key]) {
			decl.value = remaining[key]
			delete remaining[key]
		}
	})

	// Append any vars not already in the node
	for (const [key, value] of Object.entries(remaining)) {
		node.append(
			postcss.decl({ prop: `${CSS_CONSTANTS.COLOR_PREFIX}${key}`, value })
		)
	}
}

/**
 * Updates existing theme variables and appends missing ones.
 */
function updateThemeVars(
	node: AtRule,
	themeVars: Record<string, string>
): void {
	const remaining = { ...themeVars }

	node.walkDecls((decl: Declaration) => {
		if (remaining[decl.prop]) {
			decl.value = remaining[decl.prop]
			delete remaining[decl.prop]
		}
	})

	// Append any vars not already in the node
	for (const [prop, value] of Object.entries(remaining)) {
		node.append(postcss.decl({ prop, value }))
	}
}

/**
 * Appends Google Fonts import URLs from the preset that don't already exist.
 */
function updateFontImports(root: Root, css: Record<string, Record<string, string> | string>): void {
	const fontImportKeys = Object.keys(css).filter(
		(k) => k.startsWith("@import") && k.includes(CSS_CONSTANTS.GOOGLE_FONTS_DOMAIN)
	)
	if (fontImportKeys.length === 0) return

	// Collect existing import params for deduplication
	const existingImports = new Set<string>()
	root.walkAtRules("import", (atRule: AtRule) => {
		existingImports.add(atRule.params.replace(/['"]/g, ""))
	})

	// Prepend font imports at the very top, in order
	let insertAfter: AtRule | null = null
	for (const importKey of fontImportKeys) {
		const importParams = importKey.replace("@import ", "")
		const normalizedParams = importParams.replace(/['"]/g, "")

		if (existingImports.has(normalizedParams)) continue

		const newImport = postcss.atRule({
			name: "import",
			params: importParams,
			raws: { before: "\n", after: "", afterName: " " },
		})

		if (insertAfter) {
			insertAfter.after(newImport)
		} else {
			newImport.raws.before = ""
			root.prepend(newImport)
		}
		insertAfter = newImport
	}
}

/**
 * PostCSS plugin that updates an existing CSS file with preset values
 * instead of overwriting the entire file.
 */
const presetUpdatePlugin: PluginCreator<{ preset: Preset }> = (
	options
) => {
	const preset = options!.preset
	const { cssVars, css } = preset.config

	return {
		postcssPlugin: "preset-update",

		Once(root: Root): void {
			// Update light theme colors in @theme
			root.walkAtRules("theme", (atRule: AtRule) => {
				updateColorVars(atRule, cssVars.light)
				if (cssVars.theme) {
					updateThemeVars(atRule, cssVars.theme)
				}
			})

			// Update dark theme colors in .dark
			root.walkRules((rule: Rule) => {
				if (rule.selector === CSS_CONSTANTS.DARK_SELECTOR) {
					updateColorVars(rule, cssVars.dark)
				}
			})

			// Append font imports from preset
			updateFontImports(root, css)
		},
	}
}

presetUpdatePlugin.postcss = true

/**
 * Updates an existing CSS file with preset theme values.
 * Unlike generateThemeCss which creates a full CSS file from scratch,
 * this preserves the existing CSS structure and only updates the relevant variables.
 */
export async function updateCssWithPreset(
	cssFilePath: string,
	preset: Preset
): Promise<void> {
	const fs = await import("fs/promises")
	const cssContent = await fs.readFile(cssFilePath, "utf-8")
	const result = await postcss([presetUpdatePlugin({ preset })]).process(
		cssContent,
		{ from: cssFilePath }
	)
	await fs.writeFile(cssFilePath, result.css)
}
