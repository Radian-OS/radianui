import { preFlightInit } from "@preflights/preFlightInit"
import { txt } from "@utils/colors"
import { FrameworkName } from "@utils/frameworks"
import { getTailwindCssFilePath } from "@utils/getProjectInfo"
import { handleError } from "@utils/handleError"
import { logger } from "@utils/logger"
import { scaffoldNewProject, setupProjectConfig } from "@utils/project"
import { promptForNewProject } from "@utils/prompts"
import { Color, Font } from "@utils/registry"
import { spinner } from "@utils/spinner"
import { GLOBAL_CSS_V4, UTILS } from "@utils/templates"
import { updateCssWithTheme } from "@utils/updaters/update-css"
import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import z from "zod"

export const PROJECT_DEPENDENCIES = ["tw-animate-css", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"]
export const VITE_EXTRA_DEPENDENCIES = ["@tailwindcss/vite"]

export const initOptionsSchema = z.object({
	cwd: z.string(),
	skipPrompts: z.boolean().optional(),
	defaultConfigurations: z.boolean().optional(),
	next: z.boolean().optional(),
	vite: z.boolean().optional(),
	projectName: z.string().optional(),
	useSrc: z.boolean().optional(),
	color: z.enum(["amber", "blue", "emerald", "red", "violet"]).optional(),
	font: z.enum(["inter", "roboto", "geist"]).optional(),
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
	.action(async (projectName, opts) => {
		try {
			const options = initOptionsSchema.parse({ ...opts, projectName })

			// Check if both frameworks are passed
			if (options.next && options.vite) {
				logger.break()
				logger.error("You cannot use both --next and --vite options together. Please pass only one option.")
				logger.break()
				process.exit(1)
			}

			await executeInit(options)

			logger.break()
			logger.info(`${txt.success("Success!")} Project initialization completed. You may now add components.`)
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

	if (!hasExistingProject) {
		// Create new project if there is no existing project
		const confirmation = options.skipPrompts
			? { confirmNewProject: true }
			: await prompts({
					type: "confirm",
					name: "confirmNewProject",
					message: `No package.json found at ${txt.bold(txt.info(options.cwd))}. Create a new project?`,
					initial: false,
				})

		if (!confirmation.confirmNewProject) process.exit()

		const projectPrompts = await promptForNewProject(options)

		const { projectPath } = await scaffoldNewProject(options, projectPrompts)

		await setupProjectConfig(projectPath, projectPrompts.framework, projectPrompts.useSrcDir)

		await updateGlobalCssVariables(projectPath, projectPrompts.useSrcDir, projectPrompts.framework, projectPrompts.brandColor, projectPrompts.font)
	} else {
		// Setup necessary configuration files & install dependencies only
		// if there is already an existing project
		logger.warn(`${txt.bold("Note:")} This will replace your global CSS file and add Radian OS styles and colors to your project`)
		await setupProjectConfig(options.cwd, projectInfo.framework.name, projectInfo.hasSrcDir)
	}

	return projectInfo
}
