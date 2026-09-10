import manifest from "@radianui/flags/source/manifest.json" with { type: "json" }
import fs from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

export type RegistryType =
	| "ui"
	| "components"
	| "page"
	| "hooks"
	| "animated"
	| "block"
	| "asset"
	| "icon"

export interface RegistryComponentFile {
	name: string
	dir?: string
	content: string
	targetDir?: string
	type: RegistryType
}

export interface RegistryComponent {
	name: string
	description?: string
	dependencies?: string[]
	registryDependencies?: string[]
	files: RegistryComponentFile[]
	type: RegistryType
	assetsDirectory?: string
}

const require = createRequire(import.meta.url)
const flagsPkgPath = require.resolve("@radianui/flags/package.json")
const flagsSourceDir = path.join(path.dirname(flagsPkgPath), "source")
const flagsSvgDir = path.join(flagsSourceDir, "flags")

const outputFile = path.join(process.cwd(), "public/r/flags/flags.json")

async function generateFlagsJson() {
	console.log(
		`Generating flags.json registry from ${manifest.flags.length} flag definitions...`
	)

	const flagsData: RegistryComponent[] = []

	for (const flag of manifest.flags) {
		const svgFilePath = path.join(flagsSvgDir, flag.file)
		try {
			const rawSvg = await fs.readFile(svgFilePath, "utf-8")
			const name = `${flag.codes[0]}`
			flagsData.push({
				name: `flag:${name}`,
				description: flag.name,
				type: "icon",
				files: [
					{
						name: `${name}.svg`,
						content: rawSvg.trim(),
						type: "icon",
						targetDir: "/assets/flags",
					},
				],
			})
		} catch (error) {
			console.error(
				`❌ Failed to read SVG for flag: ${flag.id} (${flag.file})`,
				error
			)
			throw error
		}
	}

	const jsonContent = JSON.stringify(flagsData, null, 2)

	await fs.mkdir(path.dirname(outputFile), { recursive: true })
	await fs.writeFile(outputFile, jsonContent, "utf-8")
	console.log(`Saved flags registry at: ${outputFile}`)

	console.log(`Successfully generated ${flagsData.length} flags into registry!`)
}

generateFlagsJson().catch((err) => {
	console.error("Error generating flags registry:", err)
	process.exit(1)
})
