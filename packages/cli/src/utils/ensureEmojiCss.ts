import postcss from "postcss"

/** Include shared emoji styles in both downloaded and preset-generated CSS. */
export function ensureEmojiCss(css: string): string {
	const root = postcss.parse(css)
	let hasFontImport = false
	let hasUtility = false
	root.walkAtRules("import", (rule) => {
		if (/^["']noto-color-emoji-flags["'](?:\s|$)/.test(rule.params))
			hasFontImport = true
	})
	root.walkAtRules("utility", (rule) => {
		if (rule.params.trim() === "font-emoji") hasUtility = true
	})
	if (hasFontImport && hasUtility) return css
	if (!hasFontImport) {
		const fontImport = postcss.atRule({
			name: "import",
			params: '"noto-color-emoji-flags"',
		})
		const charset = root.nodes.find(
			(node) => node.type === "atrule" && node.name === "charset"
		)
		if (charset) root.insertAfter(charset, fontImport)
		else root.prepend(fontImport)
	}
	if (!hasUtility) {
		const utility = postcss.atRule({ name: "utility", params: "font-emoji" })
		utility.append(
			postcss.decl({
				prop: "font-family",
				value:
					'"Noto Color Emoji Flags", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", var(--font-body, sans-serif)',
			})
		)
		root.append(utility)
	}
	return root.toString()
}
