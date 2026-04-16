import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import z from "zod"
import { preFlightInit } from "@/preflights/preFlightInit"
import {
	COLORS,
	DEFAULT_BRAND_COLOR,
	DEFAULT_FONT,
	FONTS,
} from "@/registry/constants"
import {
	getTemplateForFramework,
	resolveTemplate,
	templates,
} from "@/templates"
import type { TemplateOptions } from "@/templates"
import { txt } from "@/utils/colors"
import { createComponentsJson } from "@/utils/createComponentsJson"
import {
	installComponentDependencies,
	installDependencies,
} from "@/utils/dependencyInstaller"
import { FrameworkName } from "@/utils/frameworks"
import { generateThemeCss } from "@/utils/generateCss"
import { getGlobalCssV4 } from "@/utils/getGlobalCss"
import { getPackageManager } from "@/utils/getPackageManager"
import { getProjectInfo, getTailwindCssFilePath } from "@/utils/getProjectInfo"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { fetchPreset } from "@/utils/preset"
import { handlePromptCancel, promptForProject } from "@/utils/prompts"
import {
	Color,
	Font,
	getRegistryComponents,
	resolveComponents,
} from "@/utils/registry"
import { spinner } from "@/utils/spinner"
import { updateCssWithTheme } from "@/utils/updaters/updateCss"
import { updateCssWithPreset } from "@/utils/updaters/updateCssWithPreset"
import { addComponentsToProject } from "./add"

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
		const globalCss = await getGlobalCssV4()
		if (!globalCss) {
			throw new Error("Global CSS content is undefined")
		}
		await fs.writeFile(cssPath, globalCss, "utf-8")
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
	const { projectInfo, hasComponentsJson } = await preFlightInit(options)

	const hasExistingProject = !!projectInfo

	// If a preset code is provided, fetch it up front and skip all prompts.
	const preset = options.presetCode
		? await (async () => {
				const s = spinner(`Fetching preset ${options.presetCode}`).start()
				try {
					const p = await fetchPreset(options.presetCode!)
					s.succeed()
					return p
				} catch (err) {
					s.fail()
					throw err
				}
			})()
		: undefined

	// Existing project with components.json + preset: update theme in-place
	if (hasExistingProject && hasComponentsJson && preset) {
		const framework = projectInfo!.framework.name
		const useSrcDir = projectInfo!.hasSrcDir
		const projectPath = options.cwd

		const configSpinner = spinner("Applying preset theme").start()

		// Update existing CSS variables with preset values
		const cssPath = getTailwindCssFilePath(projectPath, useSrcDir, framework)
		await updateCssWithPreset(cssPath, preset)

		configSpinner.succeed()

		// Install preset dependencies
		if (preset.config.dependencies?.length) {
			await installDependencies(
				projectPath,
				preset.config.dependencies,
				"Installing preset dependencies"
			)
		}

		// Collect existing UI components and merge with preset registry dependencies
		const uiDir = path.resolve(
			projectPath,
			useSrcDir ? "src/components/ui" : "components/ui"
		)
		const existingComponents: string[] = []
		if (fs.existsSync(uiDir)) {
			const entries = await fs.readdir(uiDir)
			for (const entry of entries) {
				const name = entry.replace(/\.(tsx?|jsx?)$/, "")
				if (!existingComponents.includes(name)) {
					existingComponents.push(name)
				}
			}
		}

		const presetDeps = preset.config.registryDependencies ?? []
		const allComponentNames = [
			...new Set([...existingComponents, ...presetDeps]),
		]

		if (allComponentNames.length > 0) {
			const { updateComponents } = await prompts({
				type: "confirm",
				name: "updateComponents",
				message: `Update ${txt.bold(String(allComponentNames.length))} UI components (${allComponentNames.join(", ")})?`,
				initial: true,
			})

			if (!updateComponents) return { projectName: undefined, ...projectInfo }

			const allRegistry = await getRegistryComponents()
			const resolvedComponents = await resolveComponents(
				allRegistry,
				allComponentNames
			)
			await addComponentsToProject(
				resolvedComponents,
				{
					overwrite: true,
					all: true,
					yes: true,
					cwd: projectPath,
				},
				await getProjectInfo(projectPath)
			)
		}

		return { projectName: undefined, ...projectInfo }
	}

	// Handle new project confirmation
	if (!hasExistingProject && !preset) {
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
	const projectPrompts: Awaited<ReturnType<typeof promptForProject>> = preset
		? {
				projectName: preset.name ?? preset.config?.name ?? undefined,
				useSrcDir: projectInfo?.hasSrcDir ?? true,
				framework:
					preset.config?.config?.template === "vite" ? "vite" : "next-app",
				brandColor: DEFAULT_BRAND_COLOR,
				font: DEFAULT_FONT,
			}
		: await promptForProject(options, hasExistingProject, projectInfo)

	// Handle existing project confirmation
	if (hasExistingProject && !preset) {
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

	// --- Create components.json ---
	await createComponentsJson(projectPath, useSrcDir)

	// --- Post-scaffold: CLI writes config, utils, and CSS ---
	const configSpinner = spinner("Setting up project configuration").start()

	if (preset) {
		// Generate globals.css directly from the preset config.
		const cssPath = getTailwindCssFilePath(projectPath, useSrcDir, framework)
		await fs.ensureFile(cssPath)
		await fs.writeFile(cssPath, generateThemeCss(preset), "utf-8")
		// Install any extra dependencies required by the preset.
		if (preset.config.dependencies) {
			await installDependencies(
				projectPath,
				preset.config.dependencies,
				"Installing preset dependencies"
			)
		}

		// Install all registry components
		const allComponents = (await getRegistryComponents()).filter(
			(component) => component.type === "ui"
		)
		await addComponentsToProject(
			allComponents,
			{
				overwrite: true,
				all: true,
				yes: true,
				cwd: projectPath,
			},
			await getProjectInfo(projectPath)
		)

		configSpinner.succeed()
	} else {
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

		// Install button and badge only initially
		const validComponents = ["button", "badge"]

		const resolvedComponents = await resolveComponents(
			await getRegistryComponents(),
			validComponents
		)

		await addComponentsToProject(
			resolvedComponents,
			{
				overwrite: true,
				all: true,
				yes: true,
				cwd: projectPath,
			},
			await getProjectInfo(projectPath)
		)
	}

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
