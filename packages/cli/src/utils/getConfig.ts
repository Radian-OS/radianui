import { cosmiconfig } from "cosmiconfig"
import path from "path"
import { loadConfig } from "tsconfig-paths"
import { z } from "zod"
import { BUILTIN_REGISTRIES } from "@/registry/constants"
import { configSchema, rawConfigSchema } from "@/registry/schema"
import { getProjectInfo } from "@/utils/getProjectInfo"
import { highlighter } from "@/utils/highlighter"
import { resolveImport } from "@/utils/resolveImport"

export const DEFAULT_STYLE = "default"
export const DEFAULT_COMPONENTS = "@/components"
export const DEFAULT_UTILS = "@/lib/utils"
export const DEFAULT_TAILWIND_CSS = "app/globals.css"
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js"
export const DEFAULT_TAILWIND_BASE_COLOR = "slate"

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
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

	// Set default icon library if not provided.
	if (!config.iconLibrary) {
		config.iconLibrary = config.style === "new-york" ? "radix" : "lucide"
	}

	return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
	cwd: string,
	config: z.infer<typeof rawConfigSchema>
) {
	// Merge built-in registries with user registries
	config.registries = {
		...BUILTIN_REGISTRIES,
		...(config.registries || {}),
	}

	// Read tsconfig.json.
	const tsConfig = await loadConfig(cwd)

	if (tsConfig.resultType === "failed") {
		throw new Error(
			`Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${
				tsConfig.message ?? ""
			}`.trim()
		)
	}

	return configSchema.parse({
		...config,
		resolvedPaths: {
			cwd,
			tailwindConfig: config.tailwind.config
				? path.resolve(cwd, config.tailwind.config)
				: "",
			tailwindCss: path.resolve(cwd, config.tailwind.css),
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

		// Check if user is trying to override built-in registries
		if (config.registries) {
			for (const registryName of Object.keys(config.registries)) {
				if (registryName in BUILTIN_REGISTRIES) {
					throw new Error(
						`"${registryName}" is a built-in registry and cannot be overridden.`
					)
				}
			}
		}

		return config
	} catch (error) {
		const componentPath = `${cwd}/components.json`
		if (error instanceof Error && error.message.includes("reserved registry")) {
			throw error
		}
		throw new Error(
			`Invalid configuration found in ${highlighter.info(componentPath)}.`
		)
	}
}

export async function getTargetStyleFromConfig(cwd: string, fallback: string) {
	// Assume Tailwind v4 if no tailwind.config file is present.
	const fs = await import("fs-extra")
	const path = await import("path")
	const hasTailwindConfig =
		(await fs.default.pathExists(path.default.join(cwd, "tailwind.config.js"))) ||
		(await fs.default.pathExists(path.default.join(cwd, "tailwind.config.ts"))) ||
		(await fs.default.pathExists(path.default.join(cwd, "tailwind.config.mjs")))

	return hasTailwindConfig ? fallback : "new-york-v4"
}

export function getBase(style: string | undefined) {
	return style?.startsWith("base-") ? "base" : "radix"
}

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Creates a config object with sensible defaults.
 * Useful for universal registry items that bypass framework detection.
 *
 * @param partial - Partial config values to override defaults
 * @returns A complete Config object
 */
export function createConfig(partial?: DeepPartial<Config>): Config {
	const defaultConfig: Config = {
		resolvedPaths: {
			cwd: process.cwd(),
			tailwindConfig: "",
			tailwindCss: "",
			utils: "",
			components: "",
			ui: "",
			lib: "",
			hooks: "",
		},
		style: "",
		tailwind: {
			config: "",
			css: "",
			baseColor: "",
			cssVariables: false,
		},
		rsc: false,
		tsx: true,
		aliases: {
			components: "",
			utils: "",
		},
		registries: {
			...BUILTIN_REGISTRIES,
		},
	}

	// Deep merge the partial config with defaults
	if (partial) {
		return {
			...defaultConfig,
			...partial,
			resolvedPaths: {
				...defaultConfig.resolvedPaths,
				...(partial.resolvedPaths || {}),
			},
			tailwind: {
				...defaultConfig.tailwind,
				...(partial.tailwind || {}),
			},
			aliases: {
				...defaultConfig.aliases,
				...(partial.aliases || {}),
			},
			registries: {
				...defaultConfig.registries,
				...(partial.registries || {}),
			},
		}
	}

	return defaultConfig
}
