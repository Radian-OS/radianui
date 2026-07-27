import fs from "fs/promises"
import path from "path"
import { PRIMARY_COLORS } from "../registry/primary-colors"

const THEMES_DIR = path.join(process.cwd(), "public/r/themes")

function removePrefix(cssVars: Record<string, string>) {
	const result: Record<string, string> = {}
	for (const [key, value] of Object.entries(cssVars)) {
		const newKey = key.replace(/^--color-/, "")
		result[newKey] = value
	}
	return result
}

async function main() {
	await fs.mkdir(THEMES_DIR, { recursive: true })

	for (const color of PRIMARY_COLORS) {
		const themeData = {
			name: color.value,
			label: color.name,
			cssVariables: {
				light: removePrefix(color.cssVars.light),
				dark: removePrefix(color.cssVars.dark),
			},
		}

		const filePath = path.join(THEMES_DIR, `${color.value}.json`)
		await fs.writeFile(filePath, JSON.stringify(themeData, null, "\t") + "\n")
		console.log(`Generated ${color.value}.json`)
	}
}

main().catch((err) => {
	console.error("Error generating themes:", err)
	process.exit(1)
})
