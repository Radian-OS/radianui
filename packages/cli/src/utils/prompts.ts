import chalk from "chalk"
import prompts from "prompts"
import { AddOptions } from "@/commands/add"
import { InitOptions } from "@/commands/init"
import { FrameworkName } from "@/utils/frameworks"
import { Color, Font, getRegistryComponents } from "@/utils/registry"

export type PromptForNewProject = {
	projectName: string
	useSrcDir: boolean
	framework: FrameworkName
	brandColor: Color
	font: Font
}

const COLORS = [
	{ title: "Red", value: "red", hex: "#EF4444" },
	{ title: "Orange", value: "orange", hex: "#F97316" },
	{ title: "Amber", value: "amber", hex: "#F59E0B" },
	{ title: "Yellow", value: "yellow", hex: "#EAB308" },
	{ title: "Neon", value: "neon", hex: "#39FF14" },
	{ title: "Green", value: "green", hex: "#22C55E" },
	{ title: "Emerald", value: "emerald", hex: "#10B981" },
	{ title: "Teal", value: "teal", hex: "#14B8A6" },
	{ title: "Cyan", value: "cyan", hex: "#06B6D4" },
	{ title: "Light Blue", value: "light-blue", hex: "#0EA5E9" },
	{ title: "Blue", value: "blue", hex: "#3B82F6" },
	{ title: "Violet Blue (Default)", value: "violet-blue", hex: "#6366F1" },
	{ title: "Purple", value: "purple", hex: "#A855F7" },
	{ title: "Dark Orchid", value: "dark-orchid", hex: "#9932CC" },
	{ title: "Fuchsia", value: "fuchsia", hex: "#D946EF" },
	{ title: "Magenta", value: "magenta", hex: "#FF00FF" },
	{ title: "Rose", value: "rose", hex: "#F43F5E" },
]

export const promptForNewProject = async (options: InitOptions): Promise<PromptForNewProject> => {
	if (options.defaultConfigurations) {
		return {
			projectName: "my-app",
			useSrcDir: true,
			framework: "next-app",
			brandColor: "amber",
			font: "inter",
		}
	}

	// Get project name
	const projectName =
		options.projectName ||
		(
			await prompts({
				type: "text",
				name: "projectName",
				message: "What would you like to name your project?",
				initial: "my-app",
				format: (value: string) => value.trim(),
				validate: (value: string) => (value.length > 128 ? "Name should be less than 128 characters." : true),
			})
		).projectName

	// Get framework
	const framework: FrameworkName = options.next
		? "next-app"
		: options.vite
			? "vite"
			: (
					await prompts({
						type: "select",
						name: "framework",
						message: "Which framework do you want to use?",
						choices: [
							{ title: "Next.js", value: "next-app" },
							{ title: "Vite", value: "vite" },
						],
						initial: 0,
					})
				).framework

	// Get src dir preference (only for Next.js)
	const useSrcDir =
		framework === "next-app"
			? options.useSrc ||
				(
					await prompts({
						type: "confirm",
						name: "useSrcDir",
						message: "Would you like to use /src directory?",
						initial: true,
					})
				).useSrcDir
			: true

	// Get brand color
	const { brandColor } = options.color
		? { brandColor: options.color }
		: await prompts({
				type: "select",
				name: "brandColor",
				message: "Which color would you like to use as your brand color?",
				choices: COLORS.map((color) => ({
					title: chalk.hex(color.hex)(color.title),
					value: color.value,
				})),
				initial: 0,
			})

	// Get font
	const { font } = options.font
		? { font: options.font }
		: await prompts({
				type: "select",
				name: "font",
				message: "Which font would you like to use for your project?",
				choices: [
					{ title: "Inter - Inter Display (Default)", value: "inter" },
					{ title: "Roboto", value: "roboto" },
					{ title: "Geist", value: "geist" },
				],
				initial: 0,
			})

	return { projectName, useSrcDir, framework, brandColor, font }
}

/**
 * Prompts the user to select components if they were not provided via CLI.
 *
 * @param options - The parsed command options.
 * @returns A promise resolving to an array of selected component names.
 */
export async function promptForComponents(options: AddOptions): Promise<string[]> {
	try {
		const registryIndex = await getRegistryComponents()
		const componentNames = registryIndex.filter((component) => component.type === "ui" || component.type === "animated").map((components) => components.name)

		if (options.all) {
			return componentNames
		}

		if (options.components?.length) {
			return options.components
		}

		const { components } = await prompts({
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
		})
		return components as string[]
	} catch (error) {
		throw new Error("Failed to fetch available components.")
	}
}
