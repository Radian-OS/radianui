import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { type InitConfig, type PartialInitConfig } from "@/config/initSchema"
import {
	COLORS,
	DEFAULT_BRAND_COLOR,
	DEFAULT_FONT,
	DEFAULT_PROJECT_NAME,
	FONTS,
	MAX_PROJECT_NAME_LENGTH,
	STYLES,
	Style,
} from "@/registry/constants"
import { txt } from "@/utils/colors"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { handlePromptCancel } from "@/utils/prompts"

/**
 * Prompts the user only for fields that are still missing in the partial config.
 * Returns a fully-resolved InitConfig.
 */
export async function promptForMissing(
	partial: PartialInitConfig,
	opts: { skipPrompts?: boolean; defaultConfigurations?: boolean }
): Promise<InitConfig> {
	const config = { ...partial } as Record<string, unknown>

	// If using defaults, fill everything without prompting
	if (opts.defaultConfigurations) {
		return {
			cwd: partial.cwd,
			projectName: (partial.projectName as string) ?? DEFAULT_PROJECT_NAME,
			framework: partial.framework ?? "next-app",
			useSrcDir: partial.useSrcDir ?? true,
			brandColor: partial.brandColor ?? DEFAULT_BRAND_COLOR,
			style: partial.style ?? "default",
			font: partial.font ?? DEFAULT_FONT,
			preset: partial.preset,
			isExistingProject: partial.isExistingProject ?? false,
			hasComponentsJson: partial.hasComponentsJson ?? false,
		}
	}

	// New project needs a name
	if (!partial.isExistingProject && !partial.projectName && !partial.preset) {
		config.projectName = await promptProjectName(partial.cwd)
	}

	// New project needs confirmation
	if (!partial.isExistingProject && !partial.preset) {
		const confirmation = opts.skipPrompts
			? { confirmNewProject: true }
			: await prompts(
					{
						type: "confirm",
						name: "confirmNewProject",
						message: `No package.json found at ${txt.bold(txt.info(partial.cwd))}. Create a new project?`,
						initial: false,
					},
					{ onCancel: () => handlePromptCancel() }
				)
		if (!confirmation.confirmNewProject) process.exit()
	}

	// Framework
	if (!config.framework) {
		config.framework = (
			await prompts(
				{
					type: "select",
					name: "framework",
					message: "Which framework do you want to use?",
					choices: [
						{ title: "Next.js", value: "next-app" },
						{ title: "Vite", value: "vite" },
					],
					initial: 0,
				},
				{ onCancel: () => handlePromptCancel() }
			)
		).framework
	}

	// src dir (only for Next.js, default true for vite)
	if (config.useSrcDir === undefined) {
		if (config.framework === "next-app") {
			config.useSrcDir = opts.skipPrompts
				? true
				: (
						await prompts(
							{
								type: "confirm",
								name: "useSrcDir",
								message: "Would you like to use /src directory?",
								initial: true,
							},
							{ onCancel: () => handlePromptCancel() }
						)
					).useSrcDir
		} else {
			config.useSrcDir = true
		}
	}

	// Brand color (skip if preset provides theme)
	if (!config.brandColor && !partial.preset) {
		config.brandColor = opts.skipPrompts
			? DEFAULT_BRAND_COLOR
			: (
					await prompts(
						{
							type: "select",
							name: "brandColor",
							message: "Which color would you like to use as your brand color?",
							choices: COLORS.map((color) => ({
								title: chalk.hex(color.hex)(color.title),
								value: color.value,
							})),
							initial: 11,
						},
						{ onCancel: () => handlePromptCancel() }
					)
				).brandColor
	}

	// Style (skip if preset provides style)
	if (!config.style && !partial.preset) {
		config.style = opts.skipPrompts
			? "default"
			: (
					await prompts(
						{
							type: "select",
							name: "style",
							message: "Which style would you like to use for your project?",
							choices: STYLES.map((style) => ({
								title: style,
								value: style,
							})),
							initial: 0,
						},
						{ onCancel: () => handlePromptCancel() }
					)
				).style
	}

	// Font (skip if preset provides theme)
	if (!config.font && !partial.preset) {
		config.font = opts.skipPrompts
			? DEFAULT_FONT
			: (
					await prompts(
						{
							type: "select",
							name: "font",
							message: "Which font would you like to use for your project?",
							choices: (() => {
								const defaultFont = FONTS.find((f) => f.value === DEFAULT_FONT)
								const otherFonts = FONTS.filter((f) => f.value !== DEFAULT_FONT)
								const sorted = otherFonts.sort((a, b) =>
									a.title.localeCompare(b.title)
								)
								return defaultFont ? [defaultFont, ...sorted] : sorted
							})().map((f) => ({ title: f.title, value: f.value })),
							initial: 0,
						},
						{ onCancel: () => handlePromptCancel() }
					)
				).font
	}

	// Existing project CSS override warning (only when no preset)
	if (partial.isExistingProject && !partial.preset) {
		const confirmation = opts.skipPrompts
			? { confirmContinue: true }
			: await prompts(
					{
						type: "confirm",
						name: "confirmContinue",
						message: `${txt.warning(`${txt.bold("Warning:")} Your existing styles (CSS file) will be overridden.`)} Do you want to continue?`,
						initial: false,
					},
					{ onCancel: () => handlePromptCancel() }
				)
		if (!confirmation.confirmContinue) process.exit()
	}

	return {
		cwd: partial.cwd,
		projectName: config.projectName as string | undefined,
		framework: config.framework as InitConfig["framework"],
		useSrcDir: config.useSrcDir as boolean,
		brandColor: (config.brandColor as string) ?? DEFAULT_BRAND_COLOR,
		style: (config.style as Style) ?? "default",
		font: (config.font as string) ?? DEFAULT_FONT,
		preset: partial.preset,
		isExistingProject: partial.isExistingProject ?? false,
		hasComponentsJson: partial.hasComponentsJson ?? false,
	}
}

async function promptProjectName(cwd: string): Promise<string> {
	const isProjectNameTaken = async (name: string): Promise<boolean> => {
		const targetPath = path.join(cwd, name)
		return await fs.pathExists(targetPath)
	}

	const getDuplicateNameError = (name: string): string => {
		return `A project named ${txt.info(name)} already exists. Please try again with a different name.`
	}

	while (true) {
		const result = await prompts(
			{
				type: "text",
				name: "projectName",
				message: "What would you like to name your project?",
				initial: DEFAULT_PROJECT_NAME,
				format: (value: string) => value.trim(),
				validate: (value: string): string | boolean => {
					const name = value.trim()
					if (name.length === 0) return "Project name cannot be empty."
					if (name.length > MAX_PROJECT_NAME_LENGTH)
						return `Project name must be less than ${MAX_PROJECT_NAME_LENGTH} characters.`
					return true
				},
			},
			{ onCancel: () => handlePromptCancel() }
		)

		if (!result?.projectName) {
			handlePromptCancel()
		}

		const name = result.projectName.trim()
		if (await isProjectNameTaken(name)) {
			logger.error(getDuplicateNameError(name))
			logger.break()
			continue
		}

		return name
	}
}
