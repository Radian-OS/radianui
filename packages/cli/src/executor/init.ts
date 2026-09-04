import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { addComponentsToProject } from "@/commands/add"
import { type InitConfig } from "@/config/initSchema"
import { ICON_DEPENDENCIES } from "@/registry/constants"
import {
	getTemplateForFramework,
	resolveTemplate,
	templates,
} from "@/templates"
import type { TemplateOptions } from "@/templates"
import { txt } from "@/utils/colors"
import { createComponentsJson } from "@/utils/createComponentsJson"
import { createUtilsFile } from "@/utils/createUtilsFile"
import { installDependencies } from "@/utils/dependencyInstaller"
import { type FrameworkName } from "@/utils/frameworks"
import { generateThemeCss } from "@/utils/generateCss"
import { getConfig } from "@/utils/getConfig"
import { getGlobalCssV4, getUtilityCssV4 } from "@/utils/getGlobalCss"
import { getPackageManager } from "@/utils/getPackageManager"
import { getProjectInfo, getTailwindCssFilePath } from "@/utils/getProjectInfo"
import { handlePromptCancel } from "@/utils/prompts"
import { type Color, type Font } from "@/utils/registry"
import { getRegistryComponents, resolveComponents } from "@/utils/registry"
import { spinner } from "@/utils/spinner"
import { updateCssWithTheme } from "@/utils/updaters/updateCss"
import { updateCssWithPreset } from "@/utils/updaters/updateCssWithPreset"

/**
 * Executes init with a fully-resolved config.
 * No branching on "how did we get this config" — just acts on what's in it.
 */
export async function executeInitFromConfig(config: InitConfig) {
	let projectPath = config.cwd

	// ── Step 1: Scaffold (if new project) ─────────────────────────────────
	if (!config.isExistingProject) {
		projectPath = await scaffoldNewProject(config)
	}

	// ── Step 2: Create components.json (if needed) ────────────────────────
	if (!config.hasComponentsJson) {
		await createComponentsJson(
			projectPath,
			config.useSrcDir,
			config.style,
			config.iconLibrary
		)
	}

	// ── Step 2.5: Create utils file (if existing project) ────────────────
	if (config.isExistingProject) {
		await createUtilsFile(projectPath, config.useSrcDir)
	}

	// ── Step 3: Apply CSS ─────────────────────────────────────────────────
	const configSpinner = spinner("Setting up project configuration").start()
	await applyCss(config, projectPath)
	configSpinner.succeed()

	// ── Step 4: Install dependencies ──────────────────────────────────────
	const dependencies = config.preset?.config.dependencies?.length
		? config.preset.config.dependencies
		: [
			"class-variance-authority",
			"tw-animate-css",
			"radix-ui",
			...ICON_DEPENDENCIES[config.iconLibrary!],
		]
	await installDependencies(
		projectPath,
		dependencies,
		"Installing dependencies"
	)

	// ── Step 5: Install components ────────────────────────────────────────
	await installComponents(config, projectPath)

	// ── Step 6: Post-init (git init for new projects) ─────────────────────
	if (!config.isExistingProject) {
		const templateKey = getTemplateKey(config.framework)
		const template = resolveTemplate(templates[templateKey], {
			monorepo: false,
		})
		await template.postInit({ projectPath })
	}

	return { projectName: config.projectName, projectPath }
}

// ── Scaffold ──────────────────────────────────────────────────────────────

async function scaffoldNewProject(config: InitConfig): Promise<string> {
	const projectName = config.projectName
	if (!projectName) {
		throw new Error("Project name is required to scaffold a new project.")
	}

	const projectPath = path.join(config.cwd, projectName)

	if (fs.existsSync(projectPath)) {
		throw new Error(`A project named ${projectName} already exists.`)
	}

	const packageManager = await getPackageManager(config.cwd, {
		withFallback: true,
	})

	const templateKey = getTemplateKey(config.framework)
	const template = resolveTemplate(templates[templateKey], {
		monorepo: false,
	})

	const templateOptions: TemplateOptions = {
		projectPath,
		packageManager,
		cwd: config.cwd,
	}

	await template.scaffold(templateOptions)

	if (config.useSrcDir) {
		await fs.ensureDir(path.join(projectPath, "src"))

		const dirsToMove = ["app", "components", "hooks", "lib"]
		for (const dir of dirsToMove) {
			const sourceDir = path.join(projectPath, dir)
			const targetDir = path.join(projectPath, "src", dir)
			if (fs.existsSync(sourceDir)) {
				await fs.move(sourceDir, targetDir, { overwrite: true })
			}
		}

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

	return projectPath
}

// ── CSS ───────────────────────────────────────────────────────────────────

async function applyCss(config: InitConfig, projectPath: string) {
	const cssPath = getTailwindCssFilePath(
		projectPath,
		config.useSrcDir,
		config.framework
	)

	if (config.preset) {
		if (config.isExistingProject && config.hasComponentsJson) {
			// In-place update: merge preset values into existing CSS
			await updateCssWithPreset(cssPath, config.preset)
		} else {
			// Full write: generate complete CSS from preset
			await fs.ensureFile(cssPath)
			await fs.writeFile(cssPath, generateThemeCss(config.preset), "utf-8")
		}
	} else {
		// Manual: write base CSS then apply color/font overrides
		await fs.ensureFile(cssPath)
		const globalCss = await getGlobalCssV4()
		if (!globalCss) throw new Error("Global CSS content is undefined")
		await fs.writeFile(cssPath, globalCss, "utf-8")
		await updateCssWithTheme(
			cssPath,
			config.brandColor as Color,
			config.font as Font
		)

		const utilityCssPath = path.join(path.dirname(cssPath), "utility.css")
		const utilityCss = await getUtilityCssV4()
		if (utilityCss) {
			await fs.ensureFile(utilityCssPath)
			await fs.writeFile(utilityCssPath, utilityCss, "utf-8")
		}
	}
}

// ── Components ────────────────────────────────────────────────────────────

async function installComponents(config: InitConfig, projectPath: string) {
	const addOpts = {
		overwrite: true,
		all: true,
		yes: true,
		cwd: projectPath,
	}
	const projectInfo = await getProjectInfo(projectPath)

	const rawConfig = await getConfig(projectPath)

	if (config.preset) {
		if (config.isExistingProject && config.hasComponentsJson) {
			// Existing project with preset: merge existing ui/ components
			// with preset's registryDependencies, prompt user to update
			await updateExistingComponents(config, projectPath, addOpts, projectInfo)
		} else {
			// New project with preset: install all UI components
			const allComponents = (await getRegistryComponents(rawConfig)).filter(
				(c) => c.type === "ui"
			)
			await addComponentsToProject(allComponents, addOpts, projectInfo)
		}
	} else {
		// No preset: install button and badge as starters
		const resolvedComponents = await resolveComponents(
			await getRegistryComponents(rawConfig),
			["button", "badge"]
		)
		await addComponentsToProject(resolvedComponents, addOpts, projectInfo)
	}
}

async function updateExistingComponents(
	config: InitConfig,
	projectPath: string,
	addOpts: { overwrite: boolean; all: boolean; yes: boolean; cwd: string },
	projectInfo: Awaited<ReturnType<typeof getProjectInfo>>
) {
	const uiDir = path.resolve(
		projectPath,
		config.useSrcDir ? "src/components/ui" : "components/ui"
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

	const presetDeps = config.preset?.config.registryDependencies ?? []
	const allComponentNames = [...new Set([...existingComponents, ...presetDeps])]

	if (allComponentNames.length === 0) return

	const { updateComponents } = await prompts(
		{
			type: "confirm",
			name: "updateComponents",
			message: `Update ${txt.bold(String(allComponentNames.length))} UI components (${allComponentNames.join(", ")})?`,
			initial: true,
		},
		{ onCancel: () => handlePromptCancel() }
	)

	if (!updateComponents) return

	const rawConfig = await getConfig(projectPath)
	const allRegistry = await getRegistryComponents(rawConfig)
	const resolvedComponents = await resolveComponents(
		allRegistry,
		allComponentNames
	)
	await addComponentsToProject(resolvedComponents, addOpts, projectInfo)
}

// ── Helpers ───────────────────────────────────────────────────────────────

function getTemplateKey(framework: FrameworkName): "next" | "vite" {
	const key = getTemplateForFramework(framework)
	if (key && key in templates) {
		return key as "next" | "vite"
	}
	return framework === "vite" ? "vite" : "next"
}
