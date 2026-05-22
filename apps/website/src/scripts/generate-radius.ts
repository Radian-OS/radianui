/**
 * generate-radius.ts
 *
 * Reads components from registry/ui, replaces:
 *   - cn-* tokens using style-default.css map
 *   - r-* tokens using radius-medium.css map
 * and writes the result to src/styles/default/ui/.
 */
import { promises as fs } from "fs"
import path from "path"
import prettier from "prettier"
import { createStyleMap, mergeStyleMaps } from "./utils/create-style-map"
import { transformStyle } from "./utils/transform"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REGISTRY_UI_DIR = path.join(process.cwd(), "src/registry/ui")
const REGISTRY_STYLES_DIR = path.join(process.cwd(), "src/registry/styles")
const REGISTRY_RADIUS_DIR = path.join(process.cwd(), "src/registry/radius")
const OUTPUT_DEFAULT_DIR = path.join(process.cwd(), "src/styles/default/ui")

const DEFAULT_RADIUS = "medium"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractRTokens(source: string) {
	const matches = source.matchAll(/\br-[\w-]+\b/g)
	return Array.from(matches, (match) => match[0])
}

async function readFileIfExists(filePath: string) {
	try {
		return await fs.readFile(filePath, "utf8")
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return null
		throw error
	}
}

async function writeIfChanged(filePath: string, content: string) {
	const existing = await readFileIfExists(filePath)
	if (existing === content) return false
	await fs.mkdir(path.dirname(filePath), { recursive: true })
	await fs.writeFile(filePath, content)
	return true
}

let prettierConfigPromise: Promise<prettier.Options | null> | null = null

async function formatGeneratedSource(content: string, filePath: string) {
	prettierConfigPromise ??= prettier.resolveConfig(
		path.join(process.cwd(), "package.json")
	)
	const prettierConfig = (await prettierConfigPromise) ?? {}
	return prettier.format(content, { ...prettierConfig, filepath: filePath })
}

// ---------------------------------------------------------------------------
// Load and merge cn-* and r-* style maps
// ---------------------------------------------------------------------------

async function loadStyleMaps(): Promise<Record<string, string>> {
	// Load cn-* map from style-default.css
	const cnFile = path.join(REGISTRY_STYLES_DIR, "style-default.css")
	const cnContent = await fs.readFile(cnFile, "utf8")
	const cnMap = createStyleMap(cnContent, "cn-")
	console.log(
		`  Loaded cn-* map — ${Object.keys(cnMap).length} entries from style-default.css`
	)

	// Load r-* map from radius-medium.css
	const radiusFile = path.join(
		REGISTRY_RADIUS_DIR,
		`radius-${DEFAULT_RADIUS}.css`
	)
	const radiusContent = await fs.readFile(radiusFile, "utf8")
	const radiusMap = createStyleMap(radiusContent, "r-")
	console.log(
		`  Loaded r-* map — ${Object.keys(radiusMap).length} entries from radius-${DEFAULT_RADIUS}.css`
	)

	// Merge both — cn-* and r-* keys are distinct so no conflicts
	return mergeStyleMaps(cnMap, radiusMap)
}

// ---------------------------------------------------------------------------
// Transform one component file
// ---------------------------------------------------------------------------

async function transformComponentFile({
	filePath,
	source,
	styleMap,
}: {
	filePath: string
	source: string
	styleMap: Record<string, string>
}): Promise<string> {
	const isClientComponent =
		source.trim().startsWith('"use client"') ||
		source.trim().startsWith("'use client'")

	// Replace cn-* and r-* tokens; everything else untouched
	let transformed = await transformStyle(source, { styleMap })

	// Rewrite registry imports to point to styles/default
	transformed = transformed.replace(
		/@\/registry\/ui\//g,
		`@/styles/default/ui/`
	)

	// Format with prettier
	transformed = await formatGeneratedSource(transformed, filePath)

	// Ensure "use client" stays at the very top
	if (isClientComponent && !transformed.trim().startsWith('"use client"')) {
		transformed = transformed.replace(/^;?\(?["']use client["']\)?;?\s*/m, "")
		transformed = `"use client"\n\n${transformed}`
	}

	return transformed
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	console.log(
		`Starting default style generation (radius: ${DEFAULT_RADIUS})...`
	)

	// 1. Load and merge both style maps
	const styleMap = await loadStyleMaps()
	console.log(`  Total styleMap entries: ${Object.keys(styleMap).length}`)

	// 2. Find all components
	const components = (await fs.readdir(REGISTRY_UI_DIR)).filter(
		(f) => f.endsWith(".tsx") || f.endsWith(".ts")
	)
	console.log(`\nFound ${components.length} components`)

	// 3. Read sources and collect tokens for diagnostics
	const sources = new Map<string, string>()
	const allRTokens = new Set<string>()

	for (const file of components) {
		const source = await fs.readFile(path.join(REGISTRY_UI_DIR, file), "utf8")
		sources.set(file, source)
		for (const token of extractRTokens(source)) {
			allRTokens.add(token)
		}
	}

	if (allRTokens.size === 0) {
		console.warn("⚠️  No r-* tokens found in any component.")
	} else {
		const mapped = Array.from(allRTokens).filter((t) => Boolean(styleMap[t]))
		const unmapped = Array.from(allRTokens).filter((t) => !styleMap[t])
		console.log(
			`r-* tokens found: ${allRTokens.size} | mapped: ${mapped.length}`
		)
		if (unmapped.length > 0) {
			console.warn(
				`⚠️  Unmapped r-* tokens (kept as-is): ${unmapped.join(", ")}`
			)
		}
	}

	// 4. Transform and write each component to styles/default/ui/
	let written = 0
	let skipped = 0

	for (const file of components) {
		const source = sources.get(file)!
		const transformed = await transformComponentFile({
			filePath: file,
			source,
			styleMap,
		})

		const outputPath = path.join(OUTPUT_DEFAULT_DIR, file)
		const changed = await writeIfChanged(outputPath, transformed)
		if (changed) {
			written++
		} else {
			skipped++
		}
		console.log(`  ${changed ? "✓" : "–"} ${file}`)
	}

	console.log(`\nDone! Written: ${written} | Unchanged: ${skipped}`)
	console.log(`Output → src/styles/default/ui/`)
}

main().catch((err) => {
	console.error("❌ Error:", err)
	process.exit(1)
})
