import { execa } from "execa"
import fs from "fs-extra"
import path from "path"
import { InitOptions, createGlobalCssFile, createUtils } from "@/commands/init"
import {
	PROJECT_DEPENDENCIES,
	VITE_EXTRA_DEPENDENCIES,
} from "@/registry/constants"
import { txt } from "@/utils/colors"
import { installDependencies } from "@/utils/dependencyInstaller"
import { FrameworkName } from "@/utils/frameworks"
import { getPackageManager } from "@/utils/getPackageManager"
import { PromptForNewProject } from "@/utils/prompts"
import { removeNextDefaultFont } from "@/utils/removeFont"
import { spinner } from "@/utils/spinner"
import {
	COMPONENTS_JSON_CONFIG,
	LAYOUT_NEXT,
	LAYOUT_VITE,
	NEXT_PAGE_TSX,
	THEME_PROVIDER_NEXT,
	THEME_PROVIDER_VITE,
	VITE_PAGE,
} from "@/utils/templates"
import {
	updateTsConfigAppForVite,
	updateTsConfigForVite,
} from "@/utils/tsConfig"
import { updateViteConfig, updateViteEntryFile } from "@/utils/viteConfig"

/**`
 * Handles creating project structure
 * for both vite and nextjs project
 * @param options
 * @returns projectPath of the newly created project
 */
export const scaffoldNewProject = async (
	options: InitOptions,
	projectPrompts: PromptForNewProject
): Promise<{ projectPath: string }> => {
	const { projectName, useSrcDir, framework } = projectPrompts

	const projectPath = path.join(options.cwd, projectName)

	await fs.access(options.cwd, fs.constants.W_OK)

	if (fs.existsSync(projectPath))
		throw new Error(`A project named ${projectName} already exists.`)

	const packageManager = await getPackageManager(options.cwd, {
		withFallback: true,
	})

	const createProjectSpinner = spinner(
		`Creating a new ${framework == "next-app" ? txt.info("Next.js") : txt.info("Vite")} project. This might take some time.`
	).start()

	if (framework === "next-app") {
		await execa(
			"npx",
			[
				"create-next-app",
				"--tailwind",
				"--eslint",
				"--typescript",
				"--app",
				projectName,
				`--use-${packageManager}`,
				useSrcDir ? "--src-dir" : "--no-src-dir",
				"--yes",
			],
			{ cwd: options.cwd, stdio: "ignore" }
		)
	} else {
		await execa(
			"npm",
			["create", "vite@latest", projectName, "--", "--template", "react-ts"],
			{
				cwd: options.cwd,
				stdio: "ignore",
			}
		)
		await execa(packageManager, ["install"], { cwd: projectPath })
	}

	createProjectSpinner.succeed()

	return { projectPath }
}

/**
 * Create config files and install dependencies
 * for both nextjs and vite project
 * @param options
 * @param hasSrcDir
 */
export const setupProjectConfig = async (
	projectPath: string,
	framework: FrameworkName,
	hasSrcDir: boolean
) => {
	// Common config in both frameworks
	const componentSpinner = spinner("Writing components.json file").start()
	const targetPath = path.resolve(projectPath, "components.json")

	const componentsJsonConfig = JSON.parse(COMPONENTS_JSON_CONFIG)
	componentsJsonConfig.hasSrcDir = hasSrcDir
	await fs.writeFile(
		targetPath,
		JSON.stringify(componentsJsonConfig, null, 2),
		"utf8"
	)
	componentSpinner.succeed()

	const configurationSpinner = spinner(
		"Setting up project configuration"
	).start()

	await createUtils(projectPath, hasSrcDir, framework)
	await createGlobalCssFile(projectPath, hasSrcDir, framework)

	if (framework.includes("next")) {
		await setupNextJsConfig(projectPath, hasSrcDir, framework)
	} else if (framework === "vite") {
		await setupViteConfig(projectPath)
	}

	configurationSpinner.succeed()

	const baseDeps = [...PROJECT_DEPENDENCIES, "@types/node"]

	if (framework.includes("next")) baseDeps.push("next-themes")

	const depsToInstall =
		framework === "vite" ? [...baseDeps, ...VITE_EXTRA_DEPENDENCIES] : baseDeps

	await installDependencies(projectPath, depsToInstall)
}

const setupViteConfig = async (projectDir: string) => {
	try {
		const srcDir = path.join(projectDir, "src")
		const mainTsxPath = path.join(srcDir, "main.tsx")
		const appTsxPath = path.join(srcDir, "App.tsx")

		if (!(await fs.pathExists(srcDir))) {
			throw new Error(`Vite src directory not found at ${srcDir}`)
		}

		if (!(await fs.pathExists(mainTsxPath))) {
			throw new Error(`Main entry file not found at ${mainTsxPath}`)
		}

		if (!(await fs.pathExists(appTsxPath))) {
			throw new Error(`App component not found at ${appTsxPath}`)
		}

		// Ensure components directory exists
		await fs.ensureDir(path.join(srcDir, "components"))

		// Perform Vite-specific setup
		await Promise.all([
			updateTsConfigForVite(projectDir),
			updateViteConfig(projectDir),
			updateViteEntryFile(projectDir),
			updateTsConfigAppForVite(projectDir, "vite"),
			fs.writeFile(
				path.join(srcDir, "components", "theme-provider.tsx"),
				THEME_PROVIDER_VITE
			),
			fs.writeFile(path.join(srcDir, "layout.tsx"), LAYOUT_VITE),
			fs.writeFile(path.join(srcDir, "page.tsx"), VITE_PAGE),
		])

		// Update App.tsx to use Layout and Page
		const appTsxContent = `
import * as React from "react"
import Layout from "./layout"
import Page from "./page"

export default function App() {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}
`
		await fs.writeFile(appTsxPath, appTsxContent.trim(), "utf8")
	} catch (error) {
		throw new Error(`Vite setup failed: ${error.message}`)
	}
}

const setupNextJsConfig = async (
	projectDir: string,
	hasSrcDir: boolean,
	framework: FrameworkName
) => {
	try {
		let baseDirPath: string, baseFilePath: string
		switch (framework) {
			case "next-app":
				baseDirPath = hasSrcDir
					? path.join(projectDir, "src", "app")
					: path.join(projectDir, "app")
				baseFilePath = path.join(baseDirPath, "layout.tsx")

				await fs.ensureDir(
					path.join(
						hasSrcDir ? path.join(projectDir, "src") : projectDir,
						"components"
					)
				)
				await fs.writeFile(
					path.join(
						hasSrcDir ? path.join(projectDir, "src") : projectDir,
						"components",
						"theme-provider.tsx"
					),
					THEME_PROVIDER_NEXT
				)

				await fs.writeFile(path.join(baseDirPath, "layout.tsx"), LAYOUT_NEXT)

				await fs.writeFile(path.join(baseDirPath, "page.tsx"), NEXT_PAGE_TSX)

				break
			case "next-pages":
				baseDirPath = hasSrcDir
					? path.join(projectDir, "src", "pages")
					: path.join(projectDir, "pages")
				baseFilePath = path.join(baseDirPath, "index.tsx")
				break
			default:
				throw new Error(`Unsupported framework: ${framework}`)
		}

		if (!(await fs.pathExists(baseDirPath))) {
			throw new Error(`Directory not found at ${baseDirPath}`)
		}

		if (!(await fs.pathExists(baseFilePath))) {
			throw new Error(`File not found at ${baseFilePath}`)
		}

		// Remove default next font
		const content = await fs.readFile(baseFilePath, "utf-8")
		const removedFontContent = removeNextDefaultFont(content)
		await fs.writeFile(baseFilePath, removedFontContent)
	} catch (error) {
		throw new Error(`Next.js setup failed: ${error.message}`)
	}
}
