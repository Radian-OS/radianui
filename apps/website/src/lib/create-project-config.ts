import { PRIMARY_COLORS } from "@/registry/primary-colors"

export type ProjectOptions = {
	primaryColor: (typeof PRIMARY_COLORS)[number]["value"]
}

export type ProjectConfig = {
	cssVars: {
		light: Record<string, string>
		dark: Record<string, string>
	}
}

export const createProjectConfig = (options: ProjectOptions): ProjectConfig => {
	const lightVars = PRIMARY_COLORS.find(
		(color) => color.value === options.primaryColor
	)?.cssVars.light
	const darkVars = PRIMARY_COLORS.find(
		(color) => color.value === options.primaryColor
	)?.cssVars.dark

	return {
		cssVars: {
			light: lightVars || {},
			dark: darkVars || {},
		},
	}
}
