import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import z from "zod"
import { preFlightInit } from "@/preflights/preFlightInit"
import { COLORS, FONTS } from "@/registry/constants"
import {
	getTemplateForFramework,
	resolveTemplate,
	templates,
} from "@/templates"
import type { TemplateOptions } from "@/templates"
import { txt } from "@/utils/colors"
import { FrameworkName } from "@/utils/frameworks"
import { getPackageManager } from "@/utils/getPackageManager"
import { getTailwindCssFilePath } from "@/utils/getProjectInfo"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { handlePromptCancel, promptForProject } from "@/utils/prompts"
import { Color, Font } from "@/utils/registry"
import { spinner } from "@/utils/spinner"
import { COMPONENTS_JSON_CONFIG, GLOBAL_CSS_V4, UTILS } from "@/utils/templates"
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
			// Only show `cd` if a new project was created
			if (projectName) {
				logger.log(`  cd ${txt.info(projectName)}`)
			}
			logger.log(
				`  To add all components, run: ${txt.info("npx radianui add -a")}`
			)
			logger.break()
		} catch (error) {
			handleError(error)
		}
	})

/**
 * Write the global CSS file with the full RadianUI theme tokens.
 */
export const createGlobalCssFile = async (
	projectDir: string,
	hasSrcDir: boolean,
	framework: FrameworkName
) => {
	try {
		const cssPath = getTailwindCssFilePath(projectDir, hasSrcDir, framework)
		await fs.ensureFile(cssPath)
		await fs.writeFile(cssPath, GLOBAL_CSS_V4, "utf-8")
	} catch (error) {
		throw new Error(
			`Failed to create global CSS: ${error instanceof Error ? error.message : String(error)}`
		)
	}
}

/**
 * Apply brand color and font overrides to the global CSS.
 */
export const updateGlobalCssVariables = async (
	projectDir: string,
	hasSrcDir: boolean,
	framework: FrameworkName,
	brandColor: Color,
	font: Font
) => {
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

/**
 * Create the lib/utils.ts file with the cn() helper.
 */
export const createUtils = async (
	projectDir: string,
	hasSrcDir: boolean,
	framework: FrameworkName
) => {
	try {
		const baseDir =
			framework === "vite"
				? path.join(projectDir, "src")
				: hasSrcDir
					? path.join(projectDir, "src")
					: projectDir

		const utilsDir = path.join(baseDir, "lib")
		await fs.ensureDir(utilsDir)
		await fs.writeFile(path.join(utilsDir, "utils.ts"), UTILS, "utf8")
	} catch (error) {
		throw new Error(`Failed to create utils.ts: ${error}`)
	}
}

/**
 * Write the components.json configuration file.
 */
const writeComponentsJson = async (projectPath: string, hasSrcDir: boolean) => {
	const targetPath = path.resolve(projectPath, "components.json")
	const componentsJsonConfig = JSON.parse(COMPONENTS_JSON_CONFIG)
	componentsJsonConfig.hasSrcDir = hasSrcDir
	await fs.writeFile(
		targetPath,
		JSON.stringify(componentsJsonConfig, null, 2),
		"utf8"
	)
}

/**
 * Resolve template key from framework name.
 */
function getTemplateKey(framework: FrameworkName): "next" | "vite" {
	const key = getTemplateForFramework(framework)
	if (key && key in templates) {
		return key as "next" | "vite"
	}
	return framework === "vite" ? "vite" : "next"
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
	const projectPrompts = await promptForProject(
		options,
		hasExistingProject,
		projectInfo
	)

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

	// --- Scaffold new project using template system ---
	let projectPath = options.cwd
	if (!hasExistingProject) {
		if (!projectName) {
			throw new Error("Project name is required to scaffold a new project.")
		}

		projectPath = path.join(options.cwd, projectName)

		if (fs.existsSync(projectPath)) {
			throw new Error(`A project named ${projectName} already exists.`)
		}

		const packageManager = await getPackageManager(options.cwd, {
			withFallback: true,
		})

		// Use template system: git sparse-checkout the template skeleton
		const templateKey = getTemplateKey(framework)
		const template = resolveTemplate(templates[templateKey], {
			monorepo: false,
		})

		const templateOptions: TemplateOptions = {
			projectPath,
			packageManager,
			cwd: options.cwd,
		}

		await template.scaffold(templateOptions)

		// If useSrcDir is true, move template's app/, components/, hooks/, and lib/
		// directories into src/ and update tsconfig paths to point to ./src/*
		if (useSrcDir) {
			await fs.ensureDir(path.join(projectPath, "src"))

			const dirsToMove = ["app", "components", "hooks", "lib"]
			for (const dir of dirsToMove) {
				const sourceDir = path.join(projectPath, dir)
				const targetDir = path.join(projectPath, "src", dir)
				if (fs.existsSync(sourceDir)) {
					await fs.move(sourceDir, targetDir, { overwrite: true })
				}
			}

			// Update tsconfig.json paths for src directory
			const tsconfigPath = path.join(projectPath, "tsconfig.json")
			if (fs.existsSync(tsconfigPath)) {
				const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf-8"))
				if (tsconfig.compilerOptions?.paths) {
					tsconfig.compilerOptions.paths["@/*"] = ["./src/*"]
				}
				await fs.writeFile(
					tsconfigPath,
					JSON.stringify(tsconfig, null, 2) + "\n",
					"utf-8"
				)
			}
		}
	}

	// --- Post-scaffold: CLI writes config, utils, and CSS ---
	const configSpinner = spinner("Setting up project configuration").start()

	// Write components.json
	await writeComponentsJson(projectPath, useSrcDir)

	// Write lib/utils.ts
	await createUtils(projectPath, useSrcDir, framework)

	// Write the full global CSS (replaces the minimal @import "tailwindcss")
	await createGlobalCssFile(projectPath, useSrcDir, framework)

	configSpinner.succeed()

	// Apply brand color and font overrides to the CSS
	await updateGlobalCssVariables(
		projectPath,
		useSrcDir,
		framework,
		brandColor,
		font
	)

	// Run template post-init (git init + initial commit) for new projects
	if (!hasExistingProject) {
		const templateKey = getTemplateKey(framework)
		const template = resolveTemplate(templates[templateKey], {
			monorepo: false,
		})
		await template.postInit({ projectPath })
	}

	return { projectName, ...projectInfo }
}
