import { cosmiconfig } from "cosmiconfig"
import { z } from "zod"
import { txt } from "@/utils/colors"

const explorer = cosmiconfig("components", {
	searchPlaces: ["components.json"],
})

const rawConfigSchema = z.object({
	hasSrcDir: z.boolean(),
	aliases: z.object({
		components: z.string(),
		utils: z.string(),
		ui: z.string(),
		animated: z.string().optional(),
		lib: z.string().optional(),
		hooks: z.string().optional(),
	}),
})

export const configSchema = rawConfigSchema.extend({
	resolvedPaths: z.object({
		cwd: z.string(),
		tailwindConfig: z.string(),
		tailwindCss: z.string(),
		utils: z.string(),
		components: z.string(),
		lib: z.string(),
		hooks: z.string(),
		ui: z.string(),
	}),
})

export type RawConfig = z.infer<typeof rawConfigSchema>
export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd = process.cwd()): Promise<RawConfig> {
	const result = await explorer.search(cwd)

	if (!result) {
		throw new Error(`To add components, make sure you have a ${txt.info("components.json")} file. Run ${txt.info("npx radianui init")} to set it up.`)
	}

	try {
		let parsed = rawConfigSchema.parse(result.config)

		// Provide fallback values
		parsed = {
			...parsed,
			aliases: {
				...parsed.aliases,
				animated: parsed.aliases.animated ?? "@/components/animated",
				hooks: parsed.aliases.hooks ?? "@/components/hooks",
				lib: parsed.aliases.lib ?? "@/components/lib",
			},
		}
		return parsed
	} catch (error) {
		throw new Error(`Error loading components.json configuration: Invalid components.json file`)
	}
}
