"use server"

import {
	COMPONENT_TRANSFORMERS,
	type RegistryItem,
} from "@/lib/themer/transformers"
import { buildRegistryConfig, ThemerConfig } from "@/registry/config"
import { headers } from "next/headers"
import fs from "fs/promises"
import path from "path"

interface CreateProjectInput {
	params: ThemerConfig
}

export type CreateProjectResult = {
	id?: string
	error?: string
}

export async function createProjectAction(
	input: CreateProjectInput
): Promise<CreateProjectResult> {
	try {
		const { params } = input
		const style = params.style ?? "default"

		const isVite = params.template === "vite"
		const projectConfig = buildRegistryConfig({
			...params,
			name: params.name,
			template: params.template,
			useSrcDir: isVite ? true : params.useSrcDir,
		})

		const styleJsonPath = path.join(
			process.cwd(),
			`public/r/styles/${style}.json`
		)
		const styleContent = await fs.readFile(styleJsonPath, "utf-8")
		const registryItems = JSON.parse(styleContent) as RegistryItem[]

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

		const headersList = await headers()
		const userIp =
			headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
		const origin =
			headersList.get("origin") ?? process.env.NEXT_PUBLIC_WEBSITE_URL

		const blocksUrl = process.env.NEXT_PUBLIC_BLOCKS_URL
		if (!blocksUrl) {
			console.error(
				"NEXT_PUBLIC_BLOCKS_URL environment variable is not defined"
			)
			return { error: "Blocks service URL is not configured" }
		}

		const endpoint = `${blocksUrl.replace(/\/+$/, "")}/api/presets`

		const res = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-client-ip": userIp,
				...(origin ? { origin } : {}),
			},
			body: JSON.stringify({
				projectConfig,
				components: customComponents,
			}),
		})

		if (!res.ok) {
			const errorText = await res.text().catch(() => "")
			console.error(
				`[Preset Save Error] POST ${endpoint} returned ${res.status}:`,
				errorText
			)

			if (res.status === 429) {
				return {
					error:
						"You've reached the limit of 5 presets per day. Try again tomorrow.",
				}
			}
			return {
				error: errorText || `Failed to save config (${res.status})`,
			}
		}

		const data = (await res.json()) as { id: string }
		return { id: data.id }
	} catch (error) {
		console.error("[createProjectAction Error]:", error)
		const message =
			error instanceof Error ? error.message : "Failed to save project preset"
		return { error: message }
	}
}
