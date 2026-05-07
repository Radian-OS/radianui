/**
 * update-icon-slots.ts
 *
 * This script updates generated styled components in src/styles/<style>/ui/
 * by replacing <IconSlot slot="..."> elements with their corresponding
 * Lucide React icon components, and cleaning up unused IconSlot imports.
 *
 * HOW IT WORKS:
 * 1. Finds all style folders in src/styles/
 * 2. Reads each generated component file
 * 3. Replaces <IconSlot slot="..."> with the mapped Lucide icon component
 * 4. Removes IconSlot from imports if no longer used
 * 5. Adds/merges lucide-react imports for any icons introduced
 * 6. Writes back only if content changed
 */
import { promises as fs } from "fs"
import path from "path"
import prettier from "prettier"
import { ICON_SLOT_REPLACEMENTS } from "@/lib/icon-libraries"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const OUTPUT_STYLES_DIR = path.join(process.cwd(), "src/styles")

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function readFileIfExists(filePath: string): Promise<string | null> {
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
	await fs.writeFile(filePath, content)
	return true
}

let prettierConfigPromise: Promise<prettier.Options | null> | null = null

async function formatSource(content: string, filePath: string) {
	prettierConfigPromise ??= prettier.resolveConfig(
		path.join(process.cwd(), "package.json")
	)
	const prettierConfig = (await prettierConfigPromise) ?? {}
	return prettier.format(content, { ...prettierConfig, filepath: filePath })
}

// ---------------------------------------------------------------------------
// Icon slot replacement
// ---------------------------------------------------------------------------

function replaceIconSlots(source: string): {
	transformed: string
	neededLucideIcons: Set<string>
} {
	let transformed = source
	const neededLucideIcons = new Set<string>()

	for (const { slot, lucideIcon } of ICON_SLOT_REPLACEMENTS) {
		const iconSlotPattern = new RegExp(
			`<IconSlot\\s+slot=["']${slot.replace(".", "\\.")}["']`,
			"g"
		)

		if (transformed.match(iconSlotPattern)) {
			neededLucideIcons.add(lucideIcon)
		}

		transformed = transformed.replace(iconSlotPattern, `<${lucideIcon}`)
	}

	return { transformed, neededLucideIcons }
}

function cleanIconSlotImport(source: string): string {
	// If <IconSlot is still used somewhere, leave the import alone
	if (source.includes("<IconSlot")) return source

	return source.replace(
		/^import\s+\{([^}]*)\}\s+from\s+"@\/styles\/icon-library"\n/gm,
		(_, imports: string) => {
			const remainingImports = imports
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s && s !== "IconSlot")

			if (remainingImports.length === 0) return ""
			return `import { ${remainingImports.join(", ")} } from "@/styles/icon-library"\n`
		}
	)
}

function mergeLucideImports(source: string, iconNames: Set<string>): string {
	if (iconNames.size === 0) return source

	const lucideImportPattern = /import\s+\{([^}]*)\}\s+from\s+"lucide-react"/m
	const lucideImportMatch = source.match(lucideImportPattern)

	if (lucideImportMatch) {
		const currentImports = lucideImportMatch[1]
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean)
		const merged = Array.from(new Set([...currentImports, ...iconNames]))

		return source.replace(
			lucideImportPattern,
			`import { ${merged.join(", ")} } from "lucide-react"`
		)
	}

	// No existing lucide import — prepend one
	return `import { ${Array.from(iconNames).join(", ")} } from "lucide-react"\n${source}`
}

// ---------------------------------------------------------------------------
// Process a single file
// ---------------------------------------------------------------------------

async function processFile(filePath: string): Promise<boolean> {
	const source = await readFileIfExists(filePath)
	if (!source) return false
	if (!source.includes("<IconSlot")) return false

	const isClientComponent =
		source.trim().startsWith('"use client"') ||
		source.trim().startsWith("'use client'")

	const { transformed: afterSlots, neededLucideIcons } =
		replaceIconSlots(source)
	const afterCleanImport = cleanIconSlotImport(afterSlots)
	const afterLucide = mergeLucideImports(afterCleanImport, neededLucideIcons)
	let formatted = await formatSource(afterLucide, filePath)

	if (isClientComponent && !formatted.trim().startsWith('"use client"')) {
		formatted = formatted.replace(/^;?\(?["']use client["']\)?;?\s*/m, "")
		formatted = `"use client"\n\n${formatted}`
	}

	return writeIfChanged(filePath, formatted)
}
// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	console.log("Updating icon slots in generated style components...")

	// 1. Find all style folders
	const entries = await fs.readdir(OUTPUT_STYLES_DIR, { withFileTypes: true })
	const styleFolders = entries.filter((e) => e.isDirectory()).map((e) => e.name)

	if (styleFolders.length === 0) {
		console.warn("⚠️  No style folders found in src/styles/. Nothing to do.")
		return
	}

	console.log(`Found styles: ${styleFolders.join(", ")}`)

	// 2. Process each style's ui folder
	for (const styleName of styleFolders) {
		const uiDir = path.join(OUTPUT_STYLES_DIR, styleName, "ui")

		let files: string[]
		try {
			files = await fs.readdir(uiDir)
		} catch {
			console.warn(
				`   ⚠️  No ui/ folder found for style "${styleName}", skipping.`
			)
			continue
		}

		const componentFiles = files.filter(
			(f) => f.endsWith(".tsx") || f.endsWith(".ts")
		)

		console.log(
			`\n Processing style: ${styleName} (${componentFiles.length} files)`
		)

		for (const componentFile of componentFiles) {
			const filePath = path.join(uiDir, componentFile)
			const changed = await processFile(filePath)

			if (changed) {
				console.log(`   ✅ Updated ${styleName}/ui/${componentFile}`)
			}
		}
	}

	console.log("\n Icon slot update complete!")
}

main().catch((err) => {
	console.error("❌ Error updating icon slots:", err)
	process.exit(1)
})
