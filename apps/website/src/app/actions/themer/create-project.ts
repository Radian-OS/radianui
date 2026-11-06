"use server"

import {
	COMPONENT_TRANSFORMERS,
	type RegistryItem,
} from "@/lib/themer/transformers"
import { buildRegistryConfig, ThemerConfig } from "@/registry/config"
import fs from "fs/promises"
import path from "path"

interface CreateProjectInput {
	params: ThemerConfig
}

export async function createProjectAction(
	input: CreateProjectInput
): Promise<{ id: string }> {
	const { params } = input
	const style = params.style ?? "default"

	// Build standard registry config (CSS vars, fonts, dependencies)
	const isVite = params.template === "vite"
	const projectConfig = buildRegistryConfig({
		...params,
		name: params.name,
		template: params.template,
		useSrcDir: isVite ? true : params.useSrcDir,
	})

	// 2. Read local style JSON
	const styleJsonPath = path.join(
		process.cwd(),
		`public/r/styles/${style}.json`
	)
	const styleContent = await fs.readFile(styleJsonPath, "utf-8")
	const registryItems = JSON.parse(styleContent) as RegistryItem[]

	// Dynamically transform all customized components
	const customComponents: RegistryItem[] = []

	for (const [componentKey, componentConfig] of Object.entries(
		params.components ?? {}
	)) {
		if (!componentConfig) continue

		// Normalizes "Button" -> "button", "Card" -> "card", etc.
		const componentSlug = componentKey.toLowerCase()
		const transformer = COMPONENT_TRANSFORMERS[componentSlug]

		if (!transformer) continue

		const registryItem = registryItems.find(
			(item) => item.name.toLowerCase() === componentSlug
		)

		if (!registryItem) continue

		// Transform the matching .tsx component file
		const transformedFiles = registryItem.files.map((file) => {
			if (file.name === `${componentSlug}.tsx`) {
				return {
					...file,
					content: transformer(file.content, componentConfig),
				}
			}
			return file
		})

		customComponents.push({
			...registryItem,
			files: transformedFiles,
		})
	}

	// Send payload to backend
	const blocksUrl = process.env.NEXT_PUBLIC_BLOCKS_URL
	const res = await fetch(`${blocksUrl}/api/presets`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			projectConfig,
			components: customComponents,
		}),
	})
	if (!res.ok) {
		throw new Error(`Failed to save config (${res.status})`)
	}
	return (await res.json()) as { id: string }
}
