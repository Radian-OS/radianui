export const BASE_COLORS = [
	{
		value: "default",
		name: "Default",
		type: "registry:color",
		cssVars: {
			// Don't fill these values, they will be inherited from the globals.css file. This is just a placeholder to make sure the registry works correctly.
			light: {},
			dark: {},
		},
	},
	{
		value: "warm-gray",
		name: "Warm Gray",
		type: "registry:color",
		cssVars: {
			light: {
				"--color-bg-base": "oklch(1 0 0)",
				"--color-bg-fill1": "oklch(0.9769 0.0011 17.18)",
				"--color-bg-fill2": "oklch(0.9514 0.0032 17.21)",
				"--color-bg-fill3": "oklch(0.9363 0.0032 17.22)",
				"--color-bg-fill4": "oklch(0.9045 0.0055 17.26)",
				"--color-fg": "oklch(0.2753 0.009 17.71)",
				"--color-fg-secondary": "oklch(0.4608 0.0199 17.9)",
				"--color-fg-tertiary": "oklch(0.531 0.023 17.9)",
				"--color-fg-disabled": "oklch(0.7057 0.0177 17.58)",
				"--color-fg-inverse": "oklch(1 0 0)",
				"--color-border-soft": "oklch(0.9363 0.0032 17.22)",
				"--color-border-soft-alpha": "",
				"--color-border-alpha": "",
			},
			dark: {
				"--color-bg-base": "oklch(0.1424 0.0036 17.58)",
				"--color-bg-fill1": "oklch(0.1903 0.0049 17.59)",
				"--color-bg-fill2": "oklch(0.2322 0.0078 17.73)",
				"--color-bg-fill3": "oklch(0.2753 0.009 17.71)",
				"--color-bg-fill4": "oklch(0.3138 0.0116 17.79)",
				"--color-fg": "oklch(0.9769 0.0011 17.18)",
				"--color-fg-secondary": "oklch(0.8392 0.0089 17.33)",
				"--color-fg-tertiary": "oklch(0.7057 0.0177 17.58)",
				"--color-fg-disabled": "oklch(0.4975 0.0208 17.87)",
				"--color-fg-inverse": "oklch(0.2322 0.0078 17.73)",
				"--color-border-soft": "oklch(0.2322 0.0078 17.73)",
				"--color-border-soft-alpha": "",
				"--color-border-alpha": "",
			},
		},
	},
] as const

export type BaseColor = (typeof BASE_COLORS)[number]
export type BaseColorName = BaseColor["name"]
export type BaseColorValue = BaseColor["value"]
