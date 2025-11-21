import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import z from "zod"
import { preFlightInit } from "@/preflights/preFlightInit"
import { txt } from "@/utils/colors"
import { COLORS, FONTS } from "@/utils/constants"
import { FrameworkName } from "@/utils/frameworks"
import { getTailwindCssFilePath } from "@/utils/getProjectInfo"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { scaffoldNewProject, setupProjectConfig } from "@/utils/project"
import { handlePromptCancel, promptForProject } from "@/utils/prompts"
import { Color, Font } from "@/utils/registry"
import { spinner } from "@/utils/spinner"
import { GLOBAL_CSS_V4, UTILS } from "@/utils/templates"
import { updateCssWithTheme } from "@/utils/updaters/update-css"

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
	.option("-s, --skipPrompts", "skip confirmation prompts", false)
	.option("-d, --defaultConfigurations", "use default configurations", false)
	.option("-c, --cwd <cwd>", "current working directory", process.cwd())
	.action(async (projectNameArg, opts) => {
		try {
			const options = initOptionsSchema.parse({ ...opts, projectNameArg })

			// Check if both frameworks are passed
			if (options.next && options.vite) {
				logger.break()
				logger.error("You cannot pass both --next and --vite options together. Please pass only one option.")
				logger.break()
				process.exit(1)
			}

			const { projectName } = await executeInit(options)

			logger.break()
			logger.info(`${txt.success("Success!")} Project initialization completed.`)
			logger.break()
			logger.log("Next steps:")
			logger.log(`  cd ${txt.info(projectName)}`)
			logger.log(`  To add all components, run: ${txt.info("npx radianui add -a")}`)
			logger.break()
		} catch (error) {
			handleError(error)
		}
	})

export const createGlobalCssFile = async (projectDir: string, hasSrcDir: boolean, framework: FrameworkName) => {
	try {
		const cssPath = getTailwindCssFilePath(projectDir, hasSrcDir, framework)
		await fs.ensureFile(cssPath)
		await fs.writeFile(cssPath, GLOBAL_CSS_V4, "utf-8")
	} catch (error) {
		throw new Error(`Failed to create global CSS: ${error.message}`)
	}
}

export const updateGlobalCssVariables = async (projectDir: string, hasSrcDir: boolean, framework: FrameworkName, brandColor: Color, font: Font) => {
	const updateCssSpinner = spinner("Updating global CSS variables")
	try {
		const cssPath = getTailwindCssFilePath(projectDir, hasSrcDir, framework)
		updateCssSpinner.start()
		await updateCssWithTheme(cssPath, brandColor, font)
		updateCssSpinner.succeed()
	} catch (error) {
		updateCssSpinner.fail()
		throw new Error(`Failed to update global CSS variables: ${error}`)
	}
}

export const createUtils = async (projectDir: string, hasSrcDir: boolean, framework: FrameworkName) => {
	try {
		const baseDir = framework === "vite" ? path.join(projectDir, "src") : hasSrcDir ? path.join(projectDir, "src") : projectDir

		const utilsDir = path.join(baseDir, "lib")
		await fs.ensureDir(utilsDir)
		await fs.writeFile(path.join(utilsDir, "utils.ts"), UTILS, "utf8")
	} catch (error) {
		throw new Error(`Failed to create utils.ts: ${error}`)
	}
}

export const executeInit = async (options: InitOptions) => {
	const { projectInfo } = await preFlightInit(options)

	const hasExistingProject = !!projectInfo

	// Handle new project confirmation
	if (!hasExistingProject) {
		const confirmation = options.skipPrompts
			? { confirmNewProject: true }
			: await prompts(
					{
						type: "confirm",
						name: "confirmNewProject",
						message: `No package.json found at ${txt.bold(txt.info(options.cwd))}. Create a new project?`,
						initial: false,
					},
					{
						onCancel: () => handlePromptCancel(),
					}
				)

		if (!confirmation.confirmNewProject) process.exit()
	}

	// Get project prompts (adapts based on hasExistingProject)
	const projectPrompts = await promptForProject(options, hasExistingProject, projectInfo)

	// Handle existing project confirmation
	if (hasExistingProject) {
		const confirmation = options.skipPrompts
			? { confirmContinue: true }
			: await prompts(
					{
						type: "confirm",
						name: "confirmContinue",
						message: `${txt.warning(`${txt.bold("Warning:")} Your existing styles (CSS file) will be overridden.`)} Do you want to continue?`,
						initial: false,
					},
					{
						onCancel: () => handlePromptCancel(),
					}
				)

		if (!confirmation.confirmContinue) process.exit()
	}

	const { projectName, framework, useSrcDir, brandColor, font } = projectPrompts

	// Scaffold new project if needed
	let projectPath = options.cwd
	if (!hasExistingProject) {
		if (!projectName) {
			throw new Error("Project name is required to scaffold a new project.")
		}

		const { projectPath: newProjectPath } = await scaffoldNewProject(options, {
			projectName,
			useSrcDir,
			framework,
			brandColor,
			font,
		})
		projectPath = newProjectPath
	}

	// Setup project configuration (same for both new and existing projects)
	await setupProjectConfig(projectPath, framework, useSrcDir)

	// Update global CSS variables (same for both new and existing projects)
	await updateGlobalCssVariables(projectPath, useSrcDir, framework, brandColor, font)

	return { projectName, ...projectInfo }
}
