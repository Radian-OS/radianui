/**
 * generate-style.ts
 *
 * This script transforms components in registry/ui into styled versions
 * based on the CSS definitions in registry/styles (lyra, nova, etc.).
 *
 * HOW IT WORKS:
 * 1. Finds all style-*.css files in src/registry/styles
 * 2. Reads generic components from src/registry/ui
 * 3. Transforms cn-* classes using the CSS style maps
 * 4. Fixes import paths to point to the new styled location
 * 5. Writes the result to src/styles/<style>/ui/
 */
import { createHash } from "crypto"
import { promises as fs } from "fs"
import path from "path"
import prettier from "prettier"
import { createStyleMap } from "./utils/create-style-map"
import { transformStyle } from "./utils/transform"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REGISTRY_UI_DIR = path.join(process.cwd(), "src/registry/ui")
const REGISTRY_STYLES_DIR = path.join(process.cwd(), "src/registry/styles")
const OUTPUT_STYLES_DIR = path.join(process.cwd(), "src/styles")

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type StyleMap = Record<string, string>

const GENERATED_STYLE_ICON_REPLACEMENTS = [
	{ themedIcon: "SelectDropdownIcon", lucideIcon: "ChevronDown" },
] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashContent(...parts: string[]) {
	const hash = createHash("sha256")
	for (const part of parts) {
		hash.update(part)
		hash.update("\0")
	}
	return hash.digest("hex")
}

function extractCnTokens(source: string) {
	const matches = source.matchAll(/\bcn-[\w-]+\b/g)
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

function applyLocalLucideIconsInGeneratedStyles(source: string) {
	let transformed = source
	const neededLucideIcons = new Set<string>()
	const generatedThemedIcons = new Set<string>(
		GENERATED_STYLE_ICON_REPLACEMENTS.map(({ themedIcon }) => themedIcon)
	)

	for (const { themedIcon, lucideIcon } of GENERATED_STYLE_ICON_REPLACEMENTS) {
		if (transformed.includes(themedIcon)) {
			neededLucideIcons.add(lucideIcon)
		}

		transformed = transformed.replace(
			new RegExp(`<${themedIcon}\\b`, "g"),
			`<${lucideIcon}`
		)
		transformed = transformed.replace(
			new RegExp(`</${themedIcon}>`, "g"),
			`</${lucideIcon}>`
		)
	}

	transformed = transformed.replace(
		/^import\s+\{([^}]*)\}\s+from\s+"@\/styles\/icon-library"\n/gm,
		(_, imports: string) => {
			const remainingImports = imports
				.split(",")
				.map((importName) => importName.trim())
				.filter(
					(importName) => importName && !generatedThemedIcons.has(importName)
				)

			if (remainingImports.length === 0) return ""

			return `import { ${remainingImports.join(", ")} } from "@/styles/icon-library"\n`
		}
	)

	return ensureLucideImports(transformed, neededLucideIcons)
}

function ensureLucideImports(source: string, iconNames: Set<string>) {
	if (iconNames.size === 0) return source

	const lucideImportPattern = /import\s+\{([^}]*)\}\s+from\s+"lucide-react"/m
	const lucideImportMatch = source.match(lucideImportPattern)

	if (lucideImportMatch) {
		const currentImports = lucideImportMatch[1]
			.split(",")
			.map((importName) => importName.trim())
			.filter(Boolean)
		const nextImports = Array.from(new Set([...currentImports, ...iconNames]))

		return source.replace(
			lucideImportPattern,
			`import { ${nextImports.join(", ")} } from "lucide-react"`
		)
	}

	return `import { ${Array.from(iconNames).join(", ")} } from "lucide-react"\n${source}`
}

// ---------------------------------------------------------------------------
// STEP 1 & 2 — Read the CSS and call createStyleMap()
// ---------------------------------------------------------------------------

async function loadStyleMap(styleName: string): Promise<{
	styleHash: string
	styleMap: StyleMap
}> {
	const styleFile = path.join(REGISTRY_STYLES_DIR, `style-${styleName}.css`)
	const styleContent = await fs.readFile(styleFile, "utf8")

	return {
		styleHash: hashContent(styleContent),
		styleMap: createStyleMap(styleContent),
	}
}

// ---------------------------------------------------------------------------
// STEP 3 & 4 — transformStyle() + fix imports
// ---------------------------------------------------------------------------

async function transformComponentFile({
	styleName,
	filePath,
	source,
	styleMap,
}: {
	styleName: string
	filePath: string // basename, e.g. "button.tsx"
	source: string
	styleMap: StyleMap
}): Promise<string> {
	// transformStyle() replaces cn-* tokens with real Tailwind classes
	let transformedContent = await transformStyle(source, { styleMap })

	// Rewrite registry imports to point to the styled version
	// e.g.  @/registry/ui/button  →  @/styles/lyra/ui/button
	transformedContent = transformedContent.replace(
		/@\/registry\/ui\//g,
		`@/styles/${styleName}/ui/`
	)

	transformedContent =
		applyLocalLucideIconsInGeneratedStyles(transformedContent)

	// Format with prettier
	transformedContent = await formatGeneratedSource(transformedContent, filePath)

	return transformedContent
}

// ---------------------------------------------------------------------------
// Main execution logic
// ---------------------------------------------------------------------------

async function main() {
	console.log("Starting style generation...")

	// 1. Find styles
	const styleFiles = await fs.readdir(REGISTRY_STYLES_DIR)
	const styles = styleFiles
		.filter((f) => f.startsWith("style-") && f.endsWith(".css"))
		.map((f) => f.replace("style-", "").replace(".css", ""))

	console.log(`Found styles: ${styles.join(", ")}`)

	// 2. Find components
	const components = (await fs.readdir(REGISTRY_UI_DIR)).filter(
		(f) => f.endsWith(".tsx") || f.endsWith(".ts")
	)

	console.log(`Found ${components.length} components to transform`)

	// 2.1 Read component sources once (saves IO per style) and detect cn-* usage
	const componentSources = new Map<string, string>()
	const cnTokensInRegistry = new Set<string>()

	for (const componentFile of components) {
		const sourcePath = path.join(REGISTRY_UI_DIR, componentFile)
		const source = await fs.readFile(sourcePath, "utf8")
		componentSources.set(componentFile, source)

		for (const token of extractCnTokens(source)) {
			cnTokensInRegistry.add(token)
		}
	}

	if (cnTokensInRegistry.size === 0) {
		console.warn(
			"⚠️  No `cn-*` tokens found in src/registry/ui. Style generation will only rewrite internal imports; outputs will be identical across styles.\n" +
				"    To generate different per-style components, author registry/ui components using `cn-*` class tokens that exist in src/registry/styles (e.g. `cn-button`, `cn-card`, etc.)."
		)
	}

	// 3. Process each style
	for (const styleName of styles) {
		console.log(`\n Processing style: ${styleName}`)

		const { styleMap } = await loadStyleMap(styleName)
		const styleMapSize = Object.keys(styleMap).length
		const mappedTokenCount = Array.from(cnTokensInRegistry).filter((token) =>
			Boolean(styleMap[token])
		).length
		console.log(
			`   styleMap entries: ${styleMapSize} | cn tokens used: ${cnTokensInRegistry.size} | mapped: ${mappedTokenCount}`
		)
		const targetDir = path.join(OUTPUT_STYLES_DIR, styleName, "ui")

		for (const componentFile of components) {
			const source = componentSources.get(componentFile)
			if (!source) {
				throw new Error(`Missing cached source for ${componentFile}`)
			}

			const transformed = await transformComponentFile({
				styleName,
				filePath: componentFile,
				source,
				styleMap,
			})

			const outputPath = path.join(targetDir, componentFile)
			const changed = await writeIfChanged(outputPath, transformed)

			if (changed) {
				console.log(`   ✅ Generated ${styleName}/ui/${componentFile}`)
			}
		}
	}

	console.log("\n Style generation complete!")
}

main().catch((err) => {
	console.error("❌ Error generating styles:", err)
	process.exit(1)
})
