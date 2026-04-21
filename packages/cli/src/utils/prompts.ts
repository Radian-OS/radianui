import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { AddOptions } from "@/commands/add"
import { InitOptions } from "@/commands/init"
import {
	COLORS,
	DEFAULT_BRAND_COLOR,
	DEFAULT_FONT,
	DEFAULT_FRAMEWORK,
	DEFAULT_PROJECT_NAME,
	FONTS,
	MAX_PROJECT_NAME_LENGTH,
} from "@/registry/constants"
import { txt } from "@/utils/colors"
import { FrameworkName } from "@/utils/frameworks"
import { handleError } from "@/utils/handleError"
import { logger } from "@/utils/logger"
import { Color, Font, getRegistryComponents } from "@/utils/registry"

export type ProjectPrompts = {
	projectName?: string
	useSrcDir: boolean
	framework: FrameworkName
	brandColor: Color
	font: Font
}

export type PromptForNewProject = ProjectPrompts & {
	projectName: string
}

export const promptForNewProject = async (
	options: InitOptions
): Promise<PromptForNewProject> => {
	if (options.defaultConfigurations) {
		return {
			projectName: DEFAULT_PROJECT_NAME,
			useSrcDir: true,
			framework: DEFAULT_FRAMEWORK,
			brandColor: DEFAULT_BRAND_COLOR,
			font: DEFAULT_FONT,
		}
	}

	// Helper function to check if project name already exists
	const isProjectNameTaken = async (name: string): Promise<boolean> => {
		const targetPath = path.join(options.cwd, name)
		return await fs.pathExists(targetPath)
	}

	// Helper function to get duplicate name error message
	const getDuplicateNameError = (name: string): string => {
		return `A project named ${txt.info(name)} already exists. Please try again with a different name.`
	}

	// Get project name - loop until valid name is provided
	let projectName: string
	if (options.projectName) {
		projectName = options.projectName
		if (await isProjectNameTaken(projectName)) {
			handleError(getDuplicateNameError(projectName))
		}
	} else {
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
				{
					onCancel: () => handlePromptCancel(),
				}
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

			projectName = name
			break
		}
	}

	// Get framework
	const framework: FrameworkName = options.next
		? "next-app"
		: options.vite
			? "vite"
			: (
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
						{
							onCancel: () => handlePromptCancel(),
						}
					)
				).framework

	// Get src dir preference (only for Next.js)
	const useSrcDir =
		framework === "next-app"
			? (options.useSrc ??
				(
					await prompts(
						{
							type: "confirm",
							name: "useSrcDir",
							message: "Would you like to use /src directory?",
							initial: true,
						},
						{
							onCancel: () => handlePromptCancel(),
						}
					)
				).useSrcDir)
			: true

	// Get brand color
	const { brandColor } = options.color
		? { brandColor: options.color }
		: await prompts(
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
				{
					onCancel: () => handlePromptCancel(),
				}
			)

	// Get font
	const { font } = options.font
		? { font: options.font }
		: await prompts(
				{
					type: "select",
					name: "font",
					message: "Which font would you like to use for your project?",
					choices: (() => {
						const defaultFont = FONTS.find(
							(font) => font.value === DEFAULT_FONT
						)
						const otherFonts = FONTS.filter(
							(font) => font.value !== DEFAULT_FONT
						)
						const sortedOtherFonts = otherFonts.sort((a, b) =>
							a.title.localeCompare(b.title)
						)
						const sortedFonts = defaultFont
							? [defaultFont, ...sortedOtherFonts]
							: sortedOtherFonts
						return sortedFonts.map((font) => ({
							title: font.title,
							value: font.value,
						}))
					})(),
					initial: 0,
				},
				{
					onCancel: () => handlePromptCancel(),
				}
			)

	return { projectName, useSrcDir, framework, brandColor, font }
}

export async function promptForExistingProject(
	options: InitOptions
): Promise<Pick<ProjectPrompts, "brandColor" | "font">> {
	const { brandColor } = options.color
		? { brandColor: options.color }
		: await prompts(
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
				{
					onCancel: () => handlePromptCancel(),
				}
			)

	const { font } = options.font
		? { font: options.font }
		: await prompts(
				{
					type: "select",
					name: "font",
					message: "Which font would you like to use for your project?",
					choices: FONTS.map((font) => ({
						title: font.title,
						value: font.value,
					})),
					initial: 0,
				},
				{
					onCancel: () => handlePromptCancel(),
				}
			)
	return { brandColor, font }
}
/**
 * Prompts the user to select components if they were not provided via CLI.
 *
 * @param options - The parsed command options.
 * @returns A promise resolving to an array of selected component names.
 */
export async function promptForComponents(
	options: AddOptions
): Promise<string[]> {
	try {
		const registryIndex = await getRegistryComponents()
		const componentNames = registryIndex
			.filter(
				(component) => component.type === "ui" || component.type === "animated"
			)
			.map((components) => components.name)

		if (options.all) {
			return componentNames
		}

		if (options.components?.length) {
			return options.components
		}

		const { components } = await prompts(
			{
				type: "multiselect",
				name: "components",
				message: "Which components would you like to add?",
				hint: "Space to select. A to toggle all. Enter to submit.",
				instructions: false,
				choices: componentNames.map((component) => ({
					title: component,
					value: component,
					selected: options.components?.includes(component),
				})),
			},
			{
				onCancel: () => handlePromptCancel(),
			}
		)
		return components as string[]
	} catch (error) {
		throw new Error("Failed to fetch available components.")
	}
}

export async function promptForProject(
	options: InitOptions,
	hasExistingProject: boolean,
	projectInfo?: {
		framework: { name: FrameworkName }
		hasSrcDir: boolean
	} | null
): Promise<ProjectPrompts> {
	if (hasExistingProject && projectInfo) {
		const { brandColor, font } = await promptForExistingProject(options)

		return {
			useSrcDir: projectInfo.hasSrcDir,
			framework: projectInfo.framework.name,
			brandColor,
			font,
		}
	}

	const newProjectPrompts = await promptForNewProject(options)

	return {
		projectName: newProjectPrompts.projectName,
		useSrcDir: newProjectPrompts.useSrcDir,
		framework: newProjectPrompts.framework,
		brandColor: newProjectPrompts.brandColor,
		font: newProjectPrompts.font,
	}
}

export function handlePromptCancel() {
	logger.break()
	logger.error("Aborted.")
	logger.error(new Error().stack ?? "")
	logger.break()
	process.exit(1)
}
