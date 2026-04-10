import fg from "fast-glob"
import fs from "fs-extra"
import path from "path"
import { loadConfig } from "tsconfig-paths"
import { FRAMEWORKS, Framework, FrameworkName } from "@/utils/frameworks"
import { logger } from "@/utils/logger"

const PROJECT_SHARED_IGNORE = [
	"**/node_modules/**",
	"dist",
	"build",
	".next",
	"public",
]

export type ProjectInfo = {
	framework: Framework
	hasSrcDir: boolean
	isRSC: boolean
	isTsx: boolean
	tailwindConfigFile: string | null
	tailwindCssFile: string | null
	aliasPrefix: string | null
}

export const getProjectInfo = async (cwd: string): Promise<ProjectInfo> => {
	const [
		configFiles,
		hasSrcDir,
		isTsx,
		tailwindConfigFile,
		tailwindCssFile,
		aliasPrefix,
	] = await Promise.all([
		getConfigFile(cwd),
		fs.pathExists(path.resolve(cwd, "src")),
		getIsTypescriptProject(cwd),
		getTailwindConfigFile(cwd),
		getTailwindCssFile(cwd),
		getAliasPrefixFromTsConfigFile(cwd),
	])

	const isUsingAppDir = await fs.pathExists(
		path.resolve(cwd, `${hasSrcDir ? "src/" : ""}app`)
	)

	const projectType: ProjectInfo = {
		framework: FRAMEWORKS["manual"],
		hasSrcDir,
		isRSC: false,
		isTsx,
		tailwindConfigFile,
		tailwindCssFile,
		aliasPrefix,
	}

	if (configFiles?.startsWith("next.config.")) {
		projectType.framework = isUsingAppDir
			? FRAMEWORKS["next-app"]
			: FRAMEWORKS["next-pages"]
		projectType.isRSC = isUsingAppDir
		return projectType
	}

	if (configFiles?.startsWith("vite.config.")) {
		projectType.framework = FRAMEWORKS["vite"]
		return projectType
	}

	return projectType
}

export const getConfigFile = async (cwd: string) => {
	const file = await fg.glob("**/{next,vite}.config.*", {
		cwd,
		deep: 3,
		ignore: PROJECT_SHARED_IGNORE,
	})

	if (!file.length) {
		return null
	}

	return file[0]
}

export const getTailwindConfigFile = async (cwd: string) => {
	const files = await fg.glob("tailwind.config.*", {
		cwd,
		deep: 3,
		ignore: PROJECT_SHARED_IGNORE,
	})

	if (!files.length) {
		return null
	}
	return files[0]
}

//This function works only for the v4 tailwind
export const getTailwindCssFile = async (cwd: string) => {
	const files = await fg.glob(["**/*.css", "**/*.scss"], {
		cwd,
		deep: 5,
		ignore: PROJECT_SHARED_IGNORE,
	})

	if (!files.length) {
		return null
	}

	for (const file of files) {
		const content = await fs.readFile(path.resolve(cwd, file), "utf-8")
		if (
			content.includes(`@import "tailwindcss"`) ||
			content.includes(`@import 'tailwindcss'`)
		) {
			return file
		}
	}

	return null
}

export const getTypescriptConfig = async () => {
	try {
		const tsconfig = await fs.readJSON(path.join("tsconfig.json"))
		if (!tsconfig) {
			logger.error("tsconfig.json file is missing.")
			process.exit(1)
		}
		return tsconfig
	} catch (error) {
		return null
	}
}

export const getIsTypescriptProject = async (cwd: string) => {
	const files = await fg.glob("tsconfig.*", {
		cwd,
		deep: 1,
		ignore: PROJECT_SHARED_IGNORE,
	})

	return files.length > 0
}

export const getAliasPrefixFromTsConfigFile = async (cwd: string) => {
	const tsConfigFile = loadConfig(cwd)

	if (tsConfigFile.resultType === "failed" || !tsConfigFile.paths) {
		return null
	}

	for (const [alias, paths] of Object.entries(tsConfigFile.paths)) {
		if (
			paths.includes("./*") ||
			paths.includes("./src/*") ||
			paths.includes("./app/*") ||
			paths.includes("./resources/js/*/")
		) {
			return alias[0] ?? null
		}
	}
	return null
}

export const getTailwindCssFilePath = (
	projectRoot: string,
	hasSrcDir: boolean,
	framework: FrameworkName
) => {
	let cssPath: string
	switch (framework) {
		case "vite":
			cssPath = path.join(projectRoot, "src", "index.css")
			break
		case "next-app":
			cssPath = hasSrcDir
				? path.join(projectRoot, "src", "app", "globals.css")
				: path.join(projectRoot, "app", "globals.css")
			break
		case "next-pages":
			cssPath = hasSrcDir
				? path.join(projectRoot, "src", "styles", "globals.css")
				: path.join(projectRoot, "styles", "globals.css")
			break
		default:
			throw new Error(`Unsupported framework: ${framework}`)
	}
	return cssPath
}
