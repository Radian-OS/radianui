import path from "path"
import { Command } from "commander"
import fs from "fs-extra"
import z from "zod"
import { txt } from "@/utils/colors"
import { RawConfig, getConfig } from "@/utils/getConfig"
import { getProjectInfo, ProjectInfo } from "@/utils/getProjectInfo"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { RADIAN_DOCS_URL, WEBSITE_URL } from "@/utils/registry"

export const info = new Command()
	.name("info")
	.description("display information about the current RadianUI project")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.option("--json", "output project information as JSON", false)
	.action(async (opts) => {
		try {
			const options = infoOptionsSchema.parse({
				...opts,
				cwd: path.resolve(opts.cwd),
			})

			const report = await collectProjectInfo(options.cwd)

			if (options.json) {
				console.log(JSON.stringify(report, null, 2))
				return
			}

			printProjectInfo(report)
		} catch (error) {
			handleError(error)
		}
	})


const infoOptionsSchema = z.object({
	cwd: z.string(),
	json: z.boolean().default(false),
})

export type InfoOptions = z.infer<typeof infoOptionsSchema>

export type ProjectInfoReport = {
	projectInfo: ProjectInfo
	config: RawConfig
	installedComponents: string[]
	docsUrl: string
	llmsTxtUrl: string
}

/**
 * Scans component UI and animated directories for installed components.
 */
export async function getInstalledComponentsDetails(
	cwd: string,
	rawConfig?: RawConfig | null
): Promise<string[]> {
	const components = new Set<string>()
	const searchDirs: string[] = []

	if (rawConfig) {
		const hasSrc = rawConfig.hasSrcDir ?? false
		if (rawConfig.aliases?.ui) {
			const sub = rawConfig.aliases.ui.replace(/^@\/?/, "")
			searchDirs.push(path.resolve(cwd, hasSrc ? "src" : "", sub))
			searchDirs.push(path.resolve(cwd, sub))
		}
		if (rawConfig.aliases?.components) {
			const sub = rawConfig.aliases.components.replace(/^@\/?/, "")
			searchDirs.push(path.resolve(cwd, hasSrc ? "src" : "", sub, "ui"))
			searchDirs.push(path.resolve(cwd, sub, "ui"))
		}
		if (rawConfig.aliases?.animated) {
			const sub = rawConfig.aliases.animated.replace(/^@\/?/, "")
			searchDirs.push(path.resolve(cwd, hasSrc ? "src" : "", sub))
			searchDirs.push(path.resolve(cwd, sub))
		}
	}

	// Default candidate directories
	searchDirs.push(
		path.resolve(cwd, "src", "components", "ui"),
		path.resolve(cwd, "components", "ui"),
		path.resolve(cwd, "src", "components", "animated"),
		path.resolve(cwd, "components", "animated")
	)

	const uniqueDirs = Array.from(new Set(searchDirs.map((d) => path.normalize(d))))

	for (const dir of uniqueDirs) {
		if (await fs.pathExists(dir)) {
			try {
				const entries = await fs.readdir(dir, { withFileTypes: true })
				for (const entry of entries) {
					if (entry.name.startsWith(".")) continue
					if (/^index\.(tsx?|jsx?)$/.test(entry.name)) continue

					if (entry.isFile()) {
						if (/\.(tsx?|jsx?)$/.test(entry.name)) {
							components.add(entry.name.replace(/\.(tsx?|jsx?)$/, ""))
						}
					} else if (entry.isDirectory()) {
						components.add(entry.name)
					}
				}
			} catch {
				// ignore
			}
		}
	}

	return Array.from(components).sort()
}

/**
 * Aggregates all project information into a single report object.
 */
export async function collectProjectInfo(cwd: string): Promise<ProjectInfoReport> {
	const rawConfig = await getConfig(cwd)

	const projectInfo = await getProjectInfo(cwd)
	const installedComponents = await getInstalledComponentsDetails(cwd, rawConfig)

	return {
		projectInfo,
		installedComponents,
		docsUrl: RADIAN_DOCS_URL,
		llmsTxtUrl: new URL('llms.txt', WEBSITE_URL).toString(),
		config: rawConfig
	}
}

/**
 * Prints formatted project information to the terminal.
 */
export function printProjectInfo(report: ProjectInfoReport): void {
	logger.break()
	logger.log(`  ${txt.bold(txt.cyan("RadianUI Project Information:"))}`)
	logger.break()

	const printRow = (label: string, value: string) => {
		logger.log(`  ${txt.dark((label + ":").padEnd(24))} ${value}`)
	}

	printRow("Framework", txt.light(report.projectInfo.framework.label))
	printRow(
		"Src directory",
		txt.light(report.projectInfo.hasSrcDir ? "Yes" : "No")
	)
	printRow(
		"Tailwind CSS",
		txt.light(report.projectInfo.tailwindCssFile ?? "Not found")
	)
	if (report.projectInfo.utilityCssFile) {
		printRow(
			"Utility colors CSS",
			txt.light(report.projectInfo.utilityCssFile)
		)
	}
	if (report.projectInfo.tailwindConfigFile) {
		printRow("Tailwind config", txt.light(report.projectInfo.tailwindConfigFile))
	}
	printRow("Import alias", txt.light(report.projectInfo.aliasPrefix ?? "None"))
	if (report.config?.style) {
		printRow("Style", txt.light(report.config.style))
	}
	if (report.config?.iconLibrary) {
		printRow("Icon library", txt.light(report.config.iconLibrary))
	}
	printRow("RTL support", txt.dark("Disabled"))
	if (report.config?.$schema) {
		printRow("Config schema", txt.light(report.config.$schema))
	}
	printRow("Docs link", txt.info(report.docsUrl))
	printRow("llms.txt link", txt.info(report.llmsTxtUrl))

	if (report.config?.aliases) {
		logger.break()
		logger.log(`  ${txt.bold("Component Target Aliases:")}`)
		for (const [key, val] of Object.entries(report.config.aliases)) {
			logger.log(`  ${txt.dark((key + ":").padEnd(24))} ${txt.light(val)}`)
		}
	}

	logger.break()
	const count = report.installedComponents.length
	logger.log(`  ${txt.bold(`Installed Components (${count}):`)}`)
	if (count === 0) {
		logger.log(`  ${txt.dark("None")}`)
	} else {
		logger.log(`  ${txt.light(report.installedComponents.join(", "))}`)
	}

	logger.break()
}
