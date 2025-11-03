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
	{ title: "Red", value: "red", hex: "#F53D3D" },
	{ title: "Orange", value: "orange", hex: "#F97316" },
	{ title: "Amber", value: "amber", hex: "#FFAA00" },
	{ title: "Yellow", value: "yellow", hex: "#DFBB0C" },
	{ title: "Neon", value: "neon", hex: "#7EB80A" },
	{ title: "Green", value: "green", hex: "#13AE13" },
	{ title: "Emerald", value: "emerald", hex: "#1DA54A" },
	{ title: "Teal", value: "teal", hex: "#12A580" },
	{ title: "Cyan", value: "cyan", hex: "#12A5A5" },
	{ title: "Light Blue", value: "light-blue", hex: "#067FF9" },
	{ title: "Blue", value: "blue", hex: "#4755EB" },
	{ title: "Violet Blue (Default)", value: "violet-blue", hex: "#623DF5" },
	{ title: "Purple", value: "purple", hex: "#803DF5" },
	{ title: "Dark Orchid", value: "dark-orchid", hex: "#BB33FF" },
	{ title: "Fuchsia", value: "fuchsia", hex: "#EB47EB" },
	{ title: "Magenta", value: "magenta", hex: "#E519A1" },
	{ title: "Rose", value: "rose", hex: "#F53D7A" },
]

const FONTS = [
	{ title: "Inter - Inter Display (Default)", value: "inter" },
	{ title: "Roboto", value: "roboto" },
	{ title: "Geist", value: "geist" },
	{ title: "DM Sans", value: "dm-sans" },
	{ title: "Open Sans", value: "open-sans" },
	{ title: "Rubik", value: "rubik" },
	{ title: "Lato", value: "lato" },
	{ title: "Manrope", value: "manrope" },
	{ title: "Raleway", value: "raleway" },
	{ title: "Work Sans", value: "work-sans" },
	{ title: "IBM Plex Sans", value: "ibm-plex-sans" },
	{ title: "Figtree", value: "figtree" },
]

const DEFAULT_FONT = "inter"

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
				initial: 11,
			})

	// Get font
	const { font } = options.font
		? { font: options.font }
		: await prompts({
				type: "select",
				name: "font",
				message: "Which font would you like to use for your project?",
				choices: (() => {
					const defaultFont = FONTS.find((font) => font.value === DEFAULT_FONT)
					const otherFonts = FONTS.filter((font) => font.value !== DEFAULT_FONT)
					const sortedOtherFonts = otherFonts.sort((a, b) => a.title.localeCompare(b.title))
					const sortedFonts = defaultFont ? [defaultFont, ...sortedOtherFonts] : sortedOtherFonts
					return sortedFonts.map((font) => ({
						title: font.title,
						value: font.value,
					}))
				})(),
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
