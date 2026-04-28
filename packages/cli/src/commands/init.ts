import { Command } from "commander"
import z from "zod"
import { mergeConfigs } from "@/config/merge"
import { executeInitFromConfig } from "@/executor/init"
import { COLORS, FONTS, STYLES } from "@/registry/constants"
import { resolveDetect } from "@/resolvers/detect"
import { resolveFlags } from "@/resolvers/flags"
import { resolvePreset } from "@/resolvers/preset"
import { promptForMissing } from "@/resolvers/prompts"
import { txt } from "@/utils/colors"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"

export const initOptionsSchema = z.object({
	cwd: z.string(),
	skipPrompts: z.boolean().optional(),
	defaultConfigurations: z.boolean().optional(),
	next: z.boolean().optional(),
	vite: z.boolean().optional(),
	projectName: z.string().optional(),
	useSrc: z.boolean().optional(),
	color: z.enum(COLORS.map((color) => color.value)).optional(),
	font: z.enum(FONTS.map((font) => font.value)).optional(),
	presetCode: z.string().optional(),
	style: z.enum(STYLES).optional(),
})

export type InitOptions = z.infer<typeof initOptionsSchema>

export const init = new Command()
	.name("init")
	.description("initializes your project with required dependencies")
	.argument("[project-name]", "the name of the project")
	.option("--next", "use next.js", false)
	.option("--vite", "use vite", false)
	.option("--useSrc", "use src directory")
	.option("--color <color>", "set brand color")
	.option("--font <font>", "set default font")
	.option("--preset <code>", "generate project from a generated preset")
	.option("--style <style>", "set style", "default")
	.option("-s, --skipPrompts", "skip confirmation prompts", false)
	.option("-d, --defaultConfigurations", "use default configurations", false)
	.option("-c, --cwd <cwd>", "current working directory", process.cwd())
	.action(async (projectNameArg, opts) => {
		try {
			const options = initOptionsSchema.parse({
				...opts,
				projectNameArg,
				presetCode: opts.preset,
			})

			if (options.next && options.vite) {
				logger.break()
				logger.error(
					"You cannot pass both --next and --vite options together. Please pass only one option."
				)
				logger.break()
				process.exit(1)
			}

			const { projectName } = await executeInit(options)

			logger.break()
			logger.info(
				`${txt.success("Success!")} Project initialization completed.`
			)
			logger.break()
			logger.log("Next steps:")
			if (projectName) {
				logger.log(`  cd ${txt.info(projectName)}`)
			}
			if (!options.presetCode) {
				logger.log(
					`  To add all components, run: ${txt.info("npx radianui add -a")}`
				)
			}
			logger.break()
		} catch (error) {
			handleError(error)
		}
	})

/**
 * Orchestrator: resolve config from all sources, then execute.
 */
export const executeInit = async (options: InitOptions) => {
	// Phase 1: Resolve — gather partial configs from each source
	const flags = resolveFlags(options)
	const preset = await resolvePreset(options.presetCode)
	const detected = await resolveDetect(options.cwd, !!options.presetCode)

	// Phase 2: Merge — flags > preset > detected (first defined wins)
	const merged = mergeConfigs(flags, preset, detected)

	// Phase 3: Prompt — fill in whatever is still missing
	const config = await promptForMissing(merged, {
		skipPrompts: options.skipPrompts,
		defaultConfigurations: options.defaultConfigurations,
	})

	// Phase 4: Execute — act on the fully-resolved config
	const result = await executeInitFromConfig(config)

	return { projectName: result.projectName }
}
