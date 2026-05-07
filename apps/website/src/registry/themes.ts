export const THEMES = [
	{
		value: "default",
		name: "Default",
		description:
			"Clean, neutral baseline for a familiar and distraction-free interface",
		cssVars: {
			light: {},
			dark: {},
			theme: {},
		},
	},
	{
		value: "bubblegum",
		name: "Bubblegum",
		description:
			"Playful, candy-colored theme with bold pinks and punchy contrast",
		cssVars: {
			light: {
				"--color-primary": "oklch(0.72 0.19 345)",
				"--color-primary-fg": "oklch(0.98 0.01 345)",
				"--color-primary-accent": "oklch(0.95 0.08 340)",
				"--color-primary-focus": "oklch(0.92 0.12 342)",
				"--color-primary-border": "oklch(0.78 0.16 343)",
				"--color-primary-hover": "oklch(0.68 0.21 346)",
				"--color-primary-text": "oklch(0.65 0.22 347)",

				"--color-success": "oklch(0.6334 0.171 148.65)",
				"--color-success-accent": "oklch(0.9685 0.0336 157.66)",
				"--color-success-focus": "oklch(0.9489 0.0556 156.34)",
				"--color-success-border": "oklch(0.7761 0.2117 148.55)",
				"--color-success-hover": "oklch(0.6901 0.1748 149.64)",
				"--color-success-text": "oklch(0.5388 0.1339 149.74)",

				"--color-error": "oklch(0.64 0.22 26.04)",
				"--color-error-accent": "oklch(0.9465 0.0252 17.61)",
				"--color-error-focus": "oklch(0.9133 0.0414 17.93)",
				"--color-error-border": "oklch(0.719 0.1751 22.5)",
				"--color-error-hover": "oklch(0.6786 0.2095 24.66)",
				"--color-error-text": "oklch(0.5716 0.2125 27.27)",

				"--color-warning": "oklch(0.8016 0.1705 73.27)",
				"--color-warning-accent": "oklch(0.9622 0.0384 83.83)",
				"--color-warning-focus": "oklch(0.946 0.0574 85.03)",
				"--color-warning-border": "oklch(0.7318 0.1522 75.09)",
				"--color-warning-hover": "oklch(0.8342 0.1594 79.51)",
				"--color-warning-text": "oklch(0.5461 0.1088 77.73)",

				"--color-info": "oklch(0.6092 0.2041 255.8)",
				"--color-info-accent": "oklch(0.949 0.0213 245.85)",
				"--color-info-focus": "oklch(0.9135 0.0358 249.52)",
				"--color-info-border": "oklch(0.829 0.0811 248.83)",
				"--color-info-hover": "oklch(0.6722 0.1615 251.56)",
				"--color-info-text": "oklch(0.6092 0.2041 255.8)",

				"--color-bg": "oklch(0.985 0.015 335)",
				"--color-fill1": "oklch(0.97 0.025 340)",
				"--color-fill2": "oklch(0.95 0.035 342)",
				"--color-fill3": "oklch(0.93 0.04 344)",
				"--color-fill4": "oklch(0.90 0.05 345)",

				"--color-fg": "oklch(0.35 0.08 325)",
				"--color-fg-secondary": "oklch(0.55 0.10 330)",
				"--color-fg-tertiary": "oklch(0.68 0.08 335)",
				"--color-fg-disabled": "oklch(0.75 0.06 338)",
				"--color-fg-inverse": "oklch(0.99 0.01 340)",

				"--color-border": "oklch(0.88 0.06 345)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.65 0.18 345), transparent 88%)",
				"--color-soft": "oklch(0.92 0.04 342)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.65 0.18 345), transparent 92%)",

				"--color-elevation-negative": "oklch(0.96 0.08 338)",
				"--color-elevation-level1": "oklch(0.99 0.008 340)",
				"--color-elevation-level2": "oklch(0.995 0.005 342)",

				"--color-white-inverse": "oklch(0.99 0.01 340)",
				"--color-black-inverse": "oklch(0.25 0.06 325)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.70 0.18 340), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.70 0.18 342), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.70 0.18 344), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.70 0.18 346), transparent 84%)",

				"--color-card": "var(--color-elevation-level1)",
				"--color-popover": "var(--color-elevation-level2)",

				"--color-sidebar": "var(--color-fill1)",
				"--color-sidebar-fg": "var(--color-fg)",
				"--color-sidebar-accent": "var(--color-fill1-alpha)",
				"--color-sidebar-accent-fg": "var(--color-fg)",
				"--color-sidebar-border": "var(--color-border)",
				"--color-sidebar-ring": "var(--color-fg-secondary)",

				"--heading-font": "var(--font-geist), system-ui, sans-serif",
				"--body-font": "var(--font-inter), system-ui, sans-serif",

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
				"--color-primary": "oklch(0.75 0.22 345)",
				"--color-primary-fg": "oklch(0.15 0.04 325)",
				"--color-primary-accent": "oklch(0.25 0.08 335)",
				"--color-primary-focus": "oklch(0.30 0.10 338)",
				"--color-primary-border": "oklch(0.65 0.18 343)",
				"--color-primary-hover": "oklch(0.78 0.24 346)",
				"--color-primary-text": "oklch(0.80 0.20 347)",

				"--color-bg": "oklch(0.18 0.04 330)",
				"--color-fill1": "oklch(0.22 0.05 332)",
				"--color-fill2": "oklch(0.26 0.06 335)",
				"--color-fill3": "oklch(0.30 0.07 338)",
				"--color-fill4": "oklch(0.35 0.08 340)",

				"--color-fg": "oklch(0.92 0.04 340)",
				"--color-fg-secondary": "oklch(0.75 0.08 342)",
				"--color-fg-tertiary": "oklch(0.60 0.10 344)",
				"--color-fg-disabled": "oklch(0.50 0.08 345)",
				"--color-fg-inverse": "oklch(0.15 0.04 325)",

				"--color-border": "oklch(0.35 0.08 340)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.75 0.20 345), transparent 88%)",
				"--color-soft": "oklch(0.28 0.06 336)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.75 0.20 345), transparent 92%)",

				"--color-elevation-negative": "oklch(0.25 0.08 335)",
				"--color-elevation-level1": "oklch(0.20 0.045 332)",
				"--color-elevation-level2": "oklch(0.22 0.05 334)",

				"--color-white-inverse": "oklch(0.15 0.04 325)",
				"--color-black-inverse": "oklch(0.92 0.04 340)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.75 0.22 340), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.75 0.22 342), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.75 0.22 344), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.75 0.22 346), transparent 84%)",

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
				// "--shadow-2xs": "var(--shadow-2xs)",
				// "--shadow-xs": "var(--shadow-xs)",
				// "--shadow-sm": "var(--shadow-sm)",
				// "--shadow": "var(--shadow)",
				// "--shadow-md": "var(--shadow-md)",
				// "--shadow-lg": "var(--shadow-lg)",
				// "--shadow-xl": "var(--shadow-xl)",
				// "--shadow-2xl": "var(--shadow-2xl)",
			},
		},
	},
	{
		value: "matcha",
		name: "Matcha",
		description:
			"Soft, calming green palette inspired by matcha for a fresh and balanced experience",
		cssVars: {
			light: {
				"--color-primary": "oklch(0.62 0.12 145)",
				"--color-primary-fg": "oklch(0.98 0.01 145)",
				"--color-primary-accent": "oklch(0.94 0.04 150)",
				"--color-primary-focus": "oklch(0.90 0.06 148)",
				"--color-primary-border": "oklch(0.68 0.10 146)",
				"--color-primary-hover": "oklch(0.58 0.14 144)",
				"--color-primary-text": "oklch(0.55 0.13 145)",

				"--color-success": "oklch(0.6334 0.171 148.65)",
				"--color-success-accent": "oklch(0.9685 0.0336 157.66)",
				"--color-success-focus": "oklch(0.9489 0.0556 156.34)",
				"--color-success-border": "oklch(0.7761 0.2117 148.55)",
				"--color-success-hover": "oklch(0.6901 0.1748 149.64)",
				"--color-success-text": "oklch(0.5388 0.1339 149.74)",

				"--color-error": "oklch(0.64 0.22 26.04)",
				"--color-error-accent": "oklch(0.9465 0.0252 17.61)",
				"--color-error-focus": "oklch(0.9133 0.0414 17.93)",
				"--color-error-border": "oklch(0.719 0.1751 22.5)",
				"--color-error-hover": "oklch(0.6786 0.2095 24.66)",
				"--color-error-text": "oklch(0.5716 0.2125 27.27)",

				"--color-warning": "oklch(0.8016 0.1705 73.27)",
				"--color-warning-accent": "oklch(0.9622 0.0384 83.83)",
				"--color-warning-focus": "oklch(0.946 0.0574 85.03)",
				"--color-warning-border": "oklch(0.7318 0.1522 75.09)",
				"--color-warning-hover": "oklch(0.8342 0.1594 79.51)",
				"--color-warning-text": "oklch(0.5461 0.1088 77.73)",

				"--color-info": "oklch(0.6092 0.2041 255.8)",
				"--color-info-accent": "oklch(0.949 0.0213 245.85)",
				"--color-info-focus": "oklch(0.9135 0.0358 249.52)",
				"--color-info-border": "oklch(0.829 0.0811 248.83)",
				"--color-info-hover": "oklch(0.6722 0.1615 251.56)",
				"--color-info-text": "oklch(0.6092 0.2041 255.8)",

				"--color-bg": "oklch(0.97 0.01 85)",
				"--color-fill1": "oklch(0.95 0.015 90)",
				"--color-fill2": "oklch(0.93 0.02 95)",
				"--color-fill3": "oklch(0.91 0.025 100)",
				"--color-fill4": "oklch(0.88 0.03 105)",

				"--color-fg": "oklch(0.32 0.06 150)",
				"--color-fg-secondary": "oklch(0.50 0.08 148)",
				"--color-fg-tertiary": "oklch(0.65 0.06 146)",
				"--color-fg-disabled": "oklch(0.72 0.04 145)",
				"--color-fg-inverse": "oklch(0.98 0.01 85)",

				"--color-border": "oklch(0.85 0.04 140)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.55 0.12 145), transparent 88%)",
				"--color-soft": "oklch(0.90 0.03 142)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.55 0.12 145), transparent 92%)",

				"--color-elevation-negative": "oklch(0.95 0.02 120)",
				"--color-elevation-level1": "oklch(0.985 0.005 90)",
				"--color-elevation-level2": "oklch(0.99 0.003 85)",

				"--color-white-inverse": "oklch(0.98 0.01 85)",
				"--color-black-inverse": "oklch(0.28 0.05 150)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.60 0.12 145), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.60 0.12 147), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.60 0.12 149), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.60 0.12 151), transparent 84%)",

				"--color-card": "var(--color-elevation-level1)",
				"--color-popover": "var(--color-elevation-level2)",

				"--color-sidebar": "var(--color-fill1)",
				"--color-sidebar-fg": "var(--color-fg)",
				"--color-sidebar-accent": "var(--color-fill1-alpha)",
				"--color-sidebar-accent-fg": "var(--color-fg)",
				"--color-sidebar-border": "var(--color-border)",
				"--color-sidebar-ring": "var(--color-fg-secondary)",

				"--heading-font": "var(--font-geist), system-ui, sans-serif",
				"--body-font": "var(--font-inter), system-ui, sans-serif",

				"--shadow-x": "3px",
				"--shadow-y": "3px",
				"--shadow-blur": "0px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "1.0",
				"--shadow-color": "hsl(145 30% 50% / 0.5)",
				"--shadow-2xs": "3px 3px 0px 0px hsl(145 30% 50% / 0.50)",
				"--shadow-xs": "3px 3px 0px 0px hsl(145 30% 50% / 0.50)",
				"--shadow-sm":
					"3px 3px 0px 0px hsl(145 30% 50% / 1.00), 3px 1px 2px -1px hsl(145 30% 50% / 1.00)",
				"--shadow":
					"3px 3px 0px 0px hsl(145 30% 50% / 1.00), 3px 1px 2px -1px hsl(145 30% 50% / 1.00)",
				"--shadow-md":
					"3px 3px 0px 0px hsl(145 30% 50% / 1.00), 3px 2px 4px -1px hsl(145 30% 50% / 1.00)",
				"--shadow-lg":
					"3px 3px 0px 0px hsl(145 30% 50% / 1.00), 3px 4px 6px -1px hsl(145 30% 50% / 1.00)",
				"--shadow-xl":
					"3px 3px 0px 0px hsl(145 30% 50% / 1.00), 3px 8px 10px -1px hsl(145 30% 50% / 1.00)",
				"--shadow-2xl": "3px 3px 0px 0px hsl(145 30% 50% / 2.50)",
			},
			dark: {
				"--color-primary": "oklch(0.68 0.14 145)",
				"--color-primary-fg": "oklch(0.15 0.03 150)",
				"--color-primary-accent": "oklch(0.22 0.05 148)",
				"--color-primary-focus": "oklch(0.28 0.07 146)",
				"--color-primary-border": "oklch(0.58 0.12 144)",
				"--color-primary-hover": "oklch(0.72 0.16 145)",
				"--color-primary-text": "oklch(0.75 0.14 146)",

				"--color-bg": "oklch(0.16 0.02 150)",
				"--color-fill1": "oklch(0.20 0.025 148)",
				"--color-fill2": "oklch(0.24 0.03 146)",
				"--color-fill3": "oklch(0.28 0.035 145)",
				"--color-fill4": "oklch(0.33 0.04 144)",

				"--color-fg": "oklch(0.90 0.03 140)",
				"--color-fg-secondary": "oklch(0.72 0.06 142)",
				"--color-fg-tertiary": "oklch(0.58 0.08 145)",
				"--color-fg-disabled": "oklch(0.48 0.06 146)",
				"--color-fg-inverse": "oklch(0.15 0.03 150)",

				"--color-border": "oklch(0.32 0.05 145)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.68 0.14 145), transparent 88%)",
				"--color-soft": "oklch(0.26 0.04 147)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.68 0.14 145), transparent 92%)",

				"--color-elevation-negative": "oklch(0.22 0.04 148)",
				"--color-elevation-level1": "oklch(0.18 0.022 150)",
				"--color-elevation-level2": "oklch(0.20 0.025 149)",

				"--color-white-inverse": "oklch(0.15 0.03 150)",
				"--color-black-inverse": "oklch(0.90 0.03 140)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.68 0.14 145), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.68 0.14 146), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.68 0.14 147), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.68 0.14 148), transparent 84%)",

				"--shadow-x": "3px",
				"--shadow-y": "3px",
				"--shadow-blur": "0px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "1.0",
				"--shadow-color": "#2a3a2e",
				"--shadow-2xs": "3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 0.50)",
				"--shadow-xs": "3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 0.50)",
				"--shadow-sm":
					"3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 1.00), 3px 1px 2px -1px hsl(135 28.0576% 27.2549% / 1.00)",
				"--shadow":
					"3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 1.00), 3px 1px 2px -1px hsl(135 28.0576% 27.2549% / 1.00)",
				"--shadow-md":
					"3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 1.00), 3px 2px 4px -1px hsl(135 28.0576% 27.2549% / 1.00)",
				"--shadow-lg":
					"3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 1.00), 3px 4px 6px -1px hsl(135 28.0576% 27.2549% / 1.00)",
				"--shadow-xl":
					"3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 1.00), 3px 8px 10px -1px hsl(135 28.0576% 27.2549% / 1.00)",
				"--shadow-2xl": "3px 3px 0px 0px hsl(135 28.0576% 27.2549% / 2.50)",
			},
			theme: {
				// "--shadow-2xs": "var(--shadow-2xs)",
				// "--shadow-xs": "var(--shadow-xs)",
				// "--shadow-sm": "var(--shadow-sm)",
				// "--shadow": "var(--shadow)",
				// "--shadow-md": "var(--shadow-md)",
				// "--shadow-lg": "var(--shadow-lg)",
				// "--shadow-xl": "var(--shadow-xl)",
				// "--shadow-2xl": "var(--shadow-2xl)",
			},
		},
	},
] as const

export type ThemeValue = (typeof THEMES)[number]["value"]
