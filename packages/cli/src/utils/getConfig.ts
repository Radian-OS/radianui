import { cosmiconfig } from "cosmiconfig"
import path from "path"
import { loadConfig } from "tsconfig-paths"
import { z } from "zod"
import { configSchema, rawConfigSchema } from "@/registry/schema"
import { resolveImport } from "@/utils/resolveImport"
import { txt } from "./colors"

export const DEFAULT_COMPONENTS = "@/components"
export const DEFAULT_UTILS = "@/lib/utils"

export const explorer = cosmiconfig("components", {
	searchPlaces: ["components.json"],
})

export type Config = z.infer<typeof configSchema>
export type RawConfig = z.infer<typeof rawConfigSchema>

export async function getConfig(cwd: string) {
	const config = await getRawConfig(cwd)

	if (!config) {
		return null
	}

	return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
	cwd: string,
	config: z.infer<typeof rawConfigSchema>
) {
	// Read tsconfig.json.
	const tsConfig = loadConfig(cwd)

	if (tsConfig.resultType === "failed") {
		throw new Error(
			`Failed to load "tsconfig.json". ${tsConfig.message ?? ""}`.trim()
		)
	}

	return configSchema.parse({
		...config,
		resolvedPaths: {
			cwd,
			utils: await resolveImport(config.aliases["utils"], tsConfig),
			components: await resolveImport(config.aliases["components"], tsConfig),
			ui: config.aliases["ui"]
				? await resolveImport(config.aliases["ui"], tsConfig)
				: path.resolve(
						(await resolveImport(config.aliases["components"], tsConfig)) ??
							cwd,
						"ui"
					),
			// TODO: Make this configurable.
			// For now, we assume the lib and hooks directories are one level up from the components directory.
			lib: config.aliases["lib"]
				? await resolveImport(config.aliases["lib"], tsConfig)
				: path.resolve(
						(await resolveImport(config.aliases["utils"], tsConfig)) ?? cwd,
						".."
					),
			hooks: config.aliases["hooks"]
				? await resolveImport(config.aliases["hooks"], tsConfig)
				: path.resolve(
						(await resolveImport(config.aliases["components"], tsConfig)) ??
							cwd,
						"..",
						"hooks"
					),
		},
	})
}

export async function getRawConfig(
	cwd: string
): Promise<z.infer<typeof rawConfigSchema> | null> {
	try {
		const configResult = await explorer.search(cwd)

		if (!configResult) {
			return null
		}

		const config = rawConfigSchema.parse(configResult.config)

		return config
	} catch (error) {
		const componentPath = `${cwd}/components.json`
		if (error instanceof Error && error.message.includes("reserved registry")) {
			throw error
		}
		throw new Error(
			`Invalid configuration found in ${txt.info(componentPath)}.`
		)
	}
}
