import AdmZip from "adm-zip"
import { createWriteStream } from "fs"
import * as fs from "fs"
import path from "path"
import { pipeline } from "stream/promises"
import { handleError } from "@/utils/handleError"
import { spinner } from "@/utils/spinner"

const WEBSITE_URL = "https://radianos.com"
const BLOCKS_URL = "https://blocks.radianos.com"
const REGISTRY_COMPONENT_URL = `${WEBSITE_URL}/api/components`
const REGISTRY_BLOCK_URL = `${BLOCKS_URL}/api/blocks`

export type RegistryType = "ui" | "components" | "page" | "hooks" | "animated" | "block"

export type RegistryComponentFile = {
	name: string
	dir?: string
	content: string
	targetDir?: string
	type: RegistryType
}

export type RegistryComponent = {
	name: string
	dependencies?: string[]
	registryDependencies?: string[]
	files: RegistryComponentFile[]
	type: RegistryType
	assetsDirectory?: string
}

export type RegistryComponents = RegistryComponent[]

export type BlockAsset = {
	componentName: string
	assetsDirectory: string
}

export const getRegistryComponents = async (): Promise<RegistryComponents> => {
	try {
		const response = await fetch(REGISTRY_COMPONENT_URL)

		if (!response.ok) {
			const errorMessage = `Failed to fetch data from ${REGISTRY_COMPONENT_URL}.\nStatus: ${response.status} - ${response.statusText}`
			throw new Error(errorMessage)
		}
		const blockResponse = await fetch(new URL("/api/blocks", REGISTRY_BLOCK_URL).toString())

		if (!blockResponse.ok) {
			const errorMessage = `Failed to fetch data from ${REGISTRY_BLOCK_URL}.\nStatus: ${blockResponse.status} - ${blockResponse.statusText}`
			throw new Error(errorMessage)
		}

		const data = await response.json()
		const blockData = await blockResponse.json()
		return [...data, ...blockData]
	} catch (error) {
		handleError(error)
		return []
	}
}

export const downloadAssets = async (assetsDirectory: string): Promise<void> => {
	try {
		const url = new URL(`/api/assets?assetsDirectory=${assetsDirectory}`, REGISTRY_BLOCK_URL).toString()
		const response = await fetch(url)

		// The block doesn't contain assets so no need to download them
		if (response.status === 404) {
			return
		}

		if (!response.ok) {
			const errorMessage = `Failed to fetch assets from ${url}.\nStatus: ${response.status} - ${response.statusText}`
			throw new Error(errorMessage)
		}

		// Check if response is actually a zip file
		const contentType = response.headers.get("content-type")
		if (!contentType?.includes("application/zip")) {
			throw new Error(`Expected zip file but received: ${contentType}`)
		}

		const tempDir = path.join(process.cwd(), "temp")
		const tempZipPath = path.join(tempDir, `${assetsDirectory}-${Date.now()}.zip`)

		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true })
		}

		const fileStream = createWriteStream(tempZipPath)
		await pipeline(response.body!, fileStream)

		const publicDir = path.join(process.cwd(), "public")
		const extractPath = path.join(publicDir, assetsDirectory)

		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true })
		}

		// Remove existing assets directory (overwrite behaviour)
		if (fs.existsSync(extractPath)) {
			fs.rmSync(extractPath, { recursive: true, force: true })
		}

		// Extract the zip file to the assets path
		const zip = new AdmZip(tempZipPath)
		zip.extractAllTo(extractPath, true)

		fs.unlinkSync(tempZipPath)

		if (fs.existsSync(tempDir)) {
			try {
				fs.rmSync(tempDir, { recursive: true, force: true })
			} catch (cleanupError) {
				console.warn("Failed to cleanup temp directory:", cleanupError)
			}
		}
	} catch (error) {
		handleError(error)
	}
}

export const getAssets = async (assets: BlockAsset[]) => {
	for (const asset of assets) {
		const getAssetsSpinner = spinner(`Downloading assets for ${asset.componentName}`).start()
		await downloadAssets(asset.assetsDirectory)
		getAssetsSpinner.succeed()
	}
}

export type Color = "emerald" | "amber" | "violet" | "red" | "blue"

export type ColorData = {
	name: Color
	label: string
	cssVariables: {
		light: Record<string, string>
		dark: Record<string, string>
	}
}

export const getBrandColor = async (color: Color): Promise<ColorData> => {
	try {
		const response = await fetch(`${WEBSITE_URL}/r/themes/${color}.json`)
		if (!response.ok) {
			const errorMessage = `Failed to fetch data from ${response.url}.\nStatus: ${response.status} - ${response.statusText}`
			throw new Error(errorMessage)
		}
		const data: ColorData = await response.json()
		return data
	} catch (error) {
		throw new Error(`Failed to fetch data from ${color}.json: ${error instanceof Error ? error.message : "unknown error"}`)
	}
}

export type Font = "inter" | "geist" | "roboto"

export type FontData = {
	name: Font
	label: string
	importURL: string
	cssVariables: {
		"heading-font": string
		"body-font": string
	}
}

export const getFont = async (font: Font): Promise<FontData> => {
	try {
		const response = await fetch(`${WEBSITE_URL}/r/fonts/${font}.json`)
		if (!response.ok) {
			const errorMessage = `Failed to fetch data from ${response.url}.\nStatus: ${response.status} - ${response.statusText}`
			throw new Error(errorMessage)
		}
		const data: FontData = await response.json()
		return data
	} catch (error) {
		throw new Error(`Failed to fetch data from ${font}.json: ${error instanceof Error ? error.message : "unknown error"}`)
	}
}

/**
 * Resolves components and their registry dependencies recursively from the registry.
 * @param registryComponents
 * @param componentNames
 * @param visited
 * @returns flat list of the components with their dependencies also
 */
export async function resolveComponents(registryComponents: RegistryComponents, componentNames: string[], visited = new Set<string>()): Promise<RegistryComponents> {
	const flattenedComponents: RegistryComponents = []

	for (const name of componentNames) {
		if (visited.has(name)) continue
		visited.add(name)

		const componentEntry = registryComponents.find((entry) => entry.name === name)
		if (!componentEntry) continue

		flattenedComponents.push(componentEntry)

		if (componentEntry.registryDependencies?.length) {
			const dependencies = await resolveComponents(registryComponents, componentEntry.registryDependencies, visited)
			flattenedComponents.push(...dependencies)
		}
	}

	// Ensure unique components by name
	return flattenedComponents.filter((component, index, self) => self.findIndex((c) => c.name === component.name) === index)
}
