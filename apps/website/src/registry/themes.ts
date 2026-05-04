export const THEMES = [
	{
		value: "default",
		label: "Default",
		description: "Default theme",
		cssVars: {
			light: {},
			dark: {},
			theme: {},
		},
	},
	{
		value: "bubblegum",
		label: "Bubblegum",
		description: "Cartoonish bubble gum",
		cssVars: {
			light: {
				"--color-primary": "oklch(0.6209 0.1801 348.14)",
				"--color-primary-fg": "oklch(0.9764 0.0013 286.38)",
				"--color-primary-border": "oklch(0.6147 0.1899 348.14)",
				"--color-primary-text": "oklch(0.6209 0.1801 348.14)",
				"--color-primary-accent": "oklch(0.8618 0.0493 348.14)",
				"--color-primary-hover": "oklch(0.6409 0.1601 348.14)",
				"--color-border": "oklch(0.6209 0.1801 348.14)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.6209 0.1801 348.14), transparent 88%)",
				"--color-card": "oklch(0.9498 0.05 86.89)",
				"--color-popover": "oklch(0.9498 0.05 86.89)",
				"--color-fg": "oklch(0.4712 0 0)",
				"--shadow-x": "3px",
				"--shadow-y": "3px",
				"--shadow-blur": "0px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "1.0",
				"--shadow-color": "hsl(325.78 58.18% 56.86% / 0.5)",
				"--shadow-2xs":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 0.50)",
				"--shadow-xs": "3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 0.50)",
				"--shadow-sm":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 1px 2px -1px hsl(325.7800 58.1800% 56.8600% / 1.00)",
				"--shadow":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 1px 2px -1px hsl(325.7800 58.1800% 56.8600% / 1.00)",
				"--shadow-md":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 2px 4px -1px hsl(325.7800 58.1800% 56.8600% / 1.00)",
				"--shadow-lg":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 4px 6px -1px hsl(325.7800 58.1800% 56.8600% / 1.00)",
				"--shadow-xl":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 8px 10px -1px hsl(325.7800 58.1800% 56.8600% / 1.00)",
				"--shadow-2xl":
					"3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 2.50)",
			},
			dark: {
				"--color-primary": "oklch(0.9195 0.0801 87.67)",
				"--color-primary-hover": "oklch(0.9 0.0543 87.67)",
				"--color-primary-border": "oklch(0.3907 0.0399 242.22)",
				"--color-primary-accent": "oklch(0.9029 0.0271 87.67)",
				"--color-primary-fg": "oklch(0.2497 0.0305 234.16)",
				"--color-primary-text": "oklch(0.7353 0.0395 87.67)",
				"--color-card": "oklch(0.2902 0.0299 233.54)",
				"--color-popover": "oklch(0.2902 0.0299 233.54)",
				"--color-border": "oklch(0.3907 0.0399 242.22)",
				"--shadow-x": "3px",
				"--shadow-y": "3px",
				"--shadow-blur": "0px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "1.0",
				"--shadow-color": "#324859",
				"--shadow-2xs":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 0.50)",
				"--shadow-xs": "3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 0.50)",
				"--shadow-sm":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 1px 2px -1px hsl(206.1538 28.0576% 27.2549% / 1.00)",
				"--shadow":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 1px 2px -1px hsl(206.1538 28.0576% 27.2549% / 1.00)",
				"--shadow-md":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 2px 4px -1px hsl(206.1538 28.0576% 27.2549% / 1.00)",
				"--shadow-lg":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 4px 6px -1px hsl(206.1538 28.0576% 27.2549% / 1.00)",
				"--shadow-xl":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 8px 10px -1px hsl(206.1538 28.0576% 27.2549% / 1.00)",
				"--shadow-2xl":
					"3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 2.50)",
			},
			theme: {
				"--shadow-2xs": "var(--shadow-2xs)",
				"--shadow-xs": "var(--shadow-xs)",
				"--shadow-sm": "var(--shadow-sm)",
				"--shadow": "var(--shadow)",
				"--shadow-md": "var(--shadow-md)",
				"--shadow-lg": "var(--shadow-lg)",
				"--shadow-xl": "var(--shadow-xl)",
				"--shadow-2xl": "var(--shadow-2xl)",
			},
		},
	},
] as const

export type ThemeValue = (typeof THEMES)[number]["value"]
