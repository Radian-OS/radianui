// Keep Themer's exported variant styles derived from the actual Button implementation.
import fs from "node:fs/promises"
import path from "node:path"
import postcss from "postcss"
import tailwind from "@tailwindcss/postcss"
import { buttonVariants } from "../registry/ui/button"

const variants = [
	"strong",
	"soft",
	"outline",
	"ghost",
	"link",
	"glossy",
	"glossy-inverted",
	"smooth",
	"smooth-inverted",
] as const
const colors = [
	"primary",
	"info",
	"success",
	"warning",
	"error",
	"neutral",
] as const
const rules = variants
	.flatMap((variant) =>
		colors.map((color) => {
			// Appearance overrides must preserve the existing layout and width.
			const layout = new Set([
				"box-border",
				"inline-flex",
				"w-fit",
				"items-center",
				"justify-center",
				"whitespace-nowrap",
			])
			const classes = buttonVariants({ variant, color, size: null })
				.split(/\s+/)
				.filter((token) => !layout.has(token))
				.join(" ")
			return `.button-theme-${variant}-${color} { @apply ${classes}; }`
		})
	)
	.join("\n")
const from = path.resolve("src/css/globals.css")
const globals = await fs.readFile(from, "utf8")
const result = await postcss([tailwind()]).process(globals + "\n" + rules, {
	from,
})
const output: Record<string, string> = {}
result.root.walkRules((rule) => {
	if (!rule.selector.startsWith(".button-theme-")) return
	const key = rule.selector.replace(".button-theme-", "")
	rule.walkDecls((decl) => {
		decl.important = true
	})
	const text = rule.toString()
	output[key] = text.slice(text.indexOf("{") + 1, text.lastIndexOf("}"))
})
await fs.writeFile(
	"src/registry/component-presets/button-variant-css.json",
	JSON.stringify(output, null, 2) + "\n"
)
console.log(
	`Generated ${Object.keys(output).length} Button variant/color combinations`
)
