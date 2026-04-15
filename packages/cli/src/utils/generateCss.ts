/**
 * Generates a Tailwind v4 CSS string from a theme config object.
 */

export interface ThemeConfig {
	id?: string
	name?: string
	config: {
		name?: string
		cssVars: {
			light: Record<string, string>
			dark: Record<string, string>
			theme?: Record<string, string>
		}
		css: Record<string, Record<string, string> | string>
	}
}

export interface GenerateOptions {
	/** CSS variable prefix for color tokens. Defaults to "--color-". */
	colorVarPrefix?: string
	/** Emit a `@theme inline` block in addition to `:root`. Default: true. */
	emitThemeBlock?: boolean
	/** Selector for dark-mode variables. Default: ".dark". */
	darkSelector?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────

function indent(text: string, n = 2): string {
	const pad = " ".repeat(n)
	return text
		.split("\n")
		.map((l) => (l.trim() ? pad + l : l))
		.join("\n")
}

function varsToDeclarations(
	vars: Record<string, string>,
	prefix = "--color-"
): string {
	return Object.entries(vars)
		.map(([key, value]) => `${prefix}${key}: ${value};`)
		.join("\n")
}

/** Split a raw CSS body into top-level declarations, respecting nested {}. */
function formatRawBody(raw: string): string {
	const parts: string[] = []
	let depth = 0
	let current = ""

	for (const char of raw) {
		if (char === "{") depth++
		if (char === "}") depth--

		if (char === ";" && depth === 0) {
			const trimmed = current.trim()
			if (trimmed) parts.push(trimmed + ";")
			current = ""
		} else {
			current += char
		}
	}
	const last = current.trim()
	if (last) parts.push(last.endsWith("}") ? last : last + ";")

	return parts
		.map((p) => (p.includes("{") ? formatNestedBlock(p) : p))
		.join("\n")
}

function formatNestedBlock(block: string): string {
	return block
		.replace(/\s*\{\s*/g, " {\n  ")
		.replace(/\s*\}\s*/g, "\n}\n")
		.trim()
}

function renderCssEntry(
	selector: string,
	body: Record<string, string> | string
): string {
	// Bare at-rules with empty body: @import, @custom-variant, etc.
	if (typeof body === "object" && Object.keys(body).length === 0) {
		return `${selector};`
	}

	if (typeof body === "string") {
		return `${selector} {\n${indent(formatRawBody(body))}\n}`
	}

	const inner = Object.entries(body)
		.map(([sel, decl]) => {
			if (typeof decl === "string") {
				return `${sel} {\n${indent(formatRawBody(decl))}\n}`
			}
			return `${sel}: ${decl};`
		})
		.join("\n\n")

	return `${selector} {\n${indent(inner)}\n}`
}

// ── Main ───────────────────────────────────────────────────────────────────

export function generateThemeCss(
	config: ThemeConfig,
	options: GenerateOptions = {}
): string {
	const {
		colorVarPrefix = "--color-",
		emitThemeBlock = true,
		darkSelector = ".dark",
	} = options

	const { cssVars, css } = config.config
	const lines: string[] = []

	// 1. Top-level at-rules first (@import, @custom-variant, …)
	const atRuleKeys = Object.keys(css).filter(
		(k) => k.startsWith("@import") || k.startsWith("@custom-variant")
	)
	for (const key of atRuleKeys) {
		lines.push(renderCssEntry(key, css[key]))
	}
	if (atRuleKeys.length) lines.push("")

	lines.push("@theme {")
	lines.push(indent(varsToDeclarations(cssVars.light, colorVarPrefix)))
	if (cssVars.theme) {
		lines.push("")
		lines.push(
			indent(
				Object.entries(cssVars.theme)
					.map(([k, v]) => `${k}: ${v};`)
					.join("\n")
			)
		)
	}
	lines.push("}")
	lines.push("")

	// 2. Dark mode
	lines.push(`${darkSelector} {`)
	lines.push(indent(varsToDeclarations(cssVars.dark, colorVarPrefix)))
	lines.push("}")
	lines.push("")

	// 3. Remaining CSS blocks (@layer, @utility, …)
	const remainingKeys = Object.keys(css).filter((k) => !atRuleKeys.includes(k))
	for (const key of remainingKeys) {
		lines.push(renderCssEntry(key, css[key]))
		lines.push("")
	}

	return lines.join("\n").trim() + "\n"
}

// ── Example usage ──────────────────────────────────────────────────────────
//
// import themeConfig from "./test.json";

// const css = generateThemeCss(themeConfig);
// console.log(css)
