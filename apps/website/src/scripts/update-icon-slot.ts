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
import { format as formatCode } from "oxfmt"
import { transformIconSlots } from "@/lib/transform-icon-slots"

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

let oxfmtConfigPromise: Promise<Record<string, unknown>> | null = null

async function loadOxfmtConfig(): Promise<Record<string, unknown>> {
	const candidates = [
		path.join(process.cwd(), ".oxfmtrc.json"),
		path.join(process.cwd(), "../../.oxfmtrc.json"),
	]
	for (const candidate of candidates) {
		try {
			const raw = await fs.readFile(candidate, "utf8")
			return JSON.parse(raw)
		} catch {
			// Continue
		}
	}
	return {}
}

async function formatSource(content: string, filePath: string) {
	oxfmtConfigPromise ??= loadOxfmtConfig()
	const config = await oxfmtConfigPromise
	try {
		const res = await formatCode(filePath, content, config)
		return res.code ?? content
	} catch {
		return content
	}
}

// ---------------------------------------------------------------------------
// Process a single file
// ---------------------------------------------------------------------------

async function processFile(filePath: string): Promise<boolean> {
	const source = await readFileIfExists(filePath)
	if (!source) return false

	// Process if file has <IconSlot tags OR imports from any */icon-library (absolute or relative)
	const hasIconSlotTags = source.includes("<IconSlot")
	const hasIconSlotImports = /from\s+["'][^"']*\/icon-library["']/m.test(source)
	if (!hasIconSlotTags && !hasIconSlotImports) return false

	const isClientComponent =
		source.trim().startsWith('"use client"') ||
		source.trim().startsWith("'use client'")

	let formatted = transformIconSlots(source)
	formatted = await formatSource(formatted, filePath)

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
			await processFile(filePath)
		}
	}

	console.log("\n Icon slot update complete!")
}

main().catch((err) => {
	console.error("❌ Error updating icon slots:", err)
	process.exit(1)
})
