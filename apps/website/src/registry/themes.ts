export const THEMES = [
	// MARK: default
	{
		value: "default",
		name: "Default",
		description:
			"Clean, neutral baseline for a familiar and distraction-free interface",
		fonts: {
			heading: "geist",
			body: "inter",
		},
		cssVars: {
			light: {},
			dark: {},
			theme: {},
		},
	},
	// MARK: bubblegum
	{
		value: "bubblegum",
		name: "Bubblegum",
		description:
			"Playful, candy-colored theme with bold pinks and punchy contrast",
		fonts: {
			heading: "sour-gummy",
			body: "nunito",
		},
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

				"--heading-font": "'Sour Gummy', system-ui, sans-serif",
				"--body-font": "'Nunito', system-ui, sans-serif",

				"--shadow-color": "hsl(325.78 58.18% 56.86% / 0.5)",
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

				"--shadow-color": "#324859",
			},
			theme: {
				"--shadow-x": "3px",
				"--shadow-y": "3px",
				"--shadow-blur": "0px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "1.0",
				"--shadow-2xs":
					"3px 3px 0px 0px color-mix(in srgb, var(--shadow-color), transparent 50%)",
				"--shadow-xs":
					"3px 3px 0px 0px color-mix(in srgb, var(--shadow-color), transparent 50%)",
				"--shadow-sm":
					"3px 3px 0px 0px var(--shadow-color), 3px 1px 2px -1px var(--shadow-color)",
				"--shadow":
					"3px 3px 0px 0px var(--shadow-color), 3px 1px 2px -1px var(--shadow-color)",
				"--shadow-md":
					"3px 3px 0px 0px var(--shadow-color), 3px 2px 4px -1px var(--shadow-color)",
				"--shadow-lg":
					"3px 3px 0px 0px var(--shadow-color), 3px 4px 6px -1px var(--shadow-color)",
				"--shadow-xl":
					"3px 3px 0px 0px var(--shadow-color), 3px 8px 10px -1px var(--shadow-color)",
				"--shadow-2xl":
					"3px 3px 0px 0px color-mix(in srgb, var(--shadow-color), transparent 60%)",
			},
		},
	},
	// MARK: matcha
	{
		value: "matcha",
		name: "Matcha",
		description:
			"Soft, calming green palette inspired by matcha for a fresh and balanced experience",
		fonts: {
			heading: "playfair-display",
			body: "merriweather-sans",
		},
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

				"--heading-font": "'Playfair Display', Georgia, serif",
				"--body-font": "'Merriweather Sans', system-ui, sans-serif",

				"--shadow-color": "hsl(145 30% 50% / 0.5)",
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

				"--shadow-color": "#2a3a2e",
			},
			theme: {
				"--shadow-x": "3px",
				"--shadow-y": "3px",
				"--shadow-blur": "0px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "1.0",
				"--shadow-2xs":
					"3px 3px 0px 0px color-mix(in srgb, var(--shadow-color), transparent 50%)",
				"--shadow-xs":
					"3px 3px 0px 0px color-mix(in srgb, var(--shadow-color), transparent 50%)",
				"--shadow-sm":
					"3px 3px 0px 0px var(--shadow-color), 3px 1px 2px -1px var(--shadow-color)",
				"--shadow":
					"3px 3px 0px 0px var(--shadow-color), 3px 1px 2px -1px var(--shadow-color)",
				"--shadow-md":
					"3px 3px 0px 0px var(--shadow-color), 3px 2px 4px -1px var(--shadow-color)",
				"--shadow-lg":
					"3px 3px 0px 0px var(--shadow-color), 3px 4px 6px -1px var(--shadow-color)",
				"--shadow-xl":
					"3px 3px 0px 0px var(--shadow-color), 3px 8px 10px -1px var(--shadow-color)",
				"--shadow-2xl":
					"3px 3px 0px 0px color-mix(in srgb, var(--shadow-color), transparent 60%)",
			},
		},
	},
	// MARK: noir
	{
		value: "noir",
		name: "Noir",
		description:
			"Sharp monochrome theme with electric lime accents and crisp editorial contrast",
		fonts: {
			heading: "space-grotesk",
			body: "dm-sans",
		},
		cssVars: {
			light: {
				"--color-primary": "oklch(0.78 0.2 128)",
				"--color-primary-fg": "oklch(0.12 0.015 250)",
				"--color-primary-accent": "oklch(0.93 0.12 126)",
				"--color-primary-focus": "oklch(0.88 0.16 127)",
				"--color-primary-border": "oklch(0.7 0.18 128)",
				"--color-primary-hover": "oklch(0.72 0.22 129)",
				"--color-primary-text": "oklch(0.47 0.16 130)",

				"--color-success": "oklch(0.6334 0.171 148.65)",
				"--color-success-accent": "oklch(0.9685 0.0336 157.66)",
				"--color-success-focus": "oklch(0.9489 0.0556 156.34)",
				"--color-success-border": "oklch(0.7761 0.2117 148.55)",
				"--color-success-hover": "oklch(0.6901 0.1748 149.64)",
				"--color-success-text": "oklch(0.5388 0.1339 149.74)",

				"--color-error": "oklch(0.62 0.24 25)",
				"--color-error-accent": "oklch(0.95 0.035 21)",
				"--color-error-focus": "oklch(0.91 0.055 22)",
				"--color-error-border": "oklch(0.7 0.19 24)",
				"--color-error-hover": "oklch(0.66 0.24 25)",
				"--color-error-text": "oklch(0.54 0.2 26)",

				"--color-warning": "oklch(0.82 0.17 83)",
				"--color-warning-accent": "oklch(0.96 0.045 88)",
				"--color-warning-focus": "oklch(0.93 0.07 88)",
				"--color-warning-border": "oklch(0.75 0.15 84)",
				"--color-warning-hover": "oklch(0.86 0.16 86)",
				"--color-warning-text": "oklch(0.52 0.11 83)",

				"--color-info": "oklch(0.66 0.16 215)",
				"--color-info-accent": "oklch(0.94 0.04 213)",
				"--color-info-focus": "oklch(0.9 0.065 214)",
				"--color-info-border": "oklch(0.76 0.11 215)",
				"--color-info-hover": "oklch(0.7 0.17 216)",
				"--color-info-text": "oklch(0.5 0.15 216)",

				"--color-bg": "oklch(0.985 0 0)",
				"--color-fill1": "oklch(0.955 0.004 250)",
				"--color-fill2": "oklch(0.925 0.006 250)",
				"--color-fill3": "oklch(0.885 0.008 250)",
				"--color-fill4": "oklch(0.835 0.01 250)",

				"--color-fg": "oklch(0.16 0.012 250)",
				"--color-fg-secondary": "oklch(0.38 0.018 250)",
				"--color-fg-tertiary": "oklch(0.55 0.014 250)",
				"--color-fg-disabled": "oklch(0.7 0.01 250)",
				"--color-fg-inverse": "oklch(0.985 0 0)",

				"--color-border": "oklch(0.82 0.01 250)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.16 0.012 250), transparent 88%)",
				"--color-soft": "oklch(0.9 0.007 250)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.16 0.012 250), transparent 92%)",

				"--color-elevation-negative": "oklch(0.94 0.005 250)",
				"--color-elevation-level1": "oklch(1 0 0)",
				"--color-elevation-level2": "oklch(0.97 0.003 250)",

				"--color-white-inverse": "oklch(0.985 0 0)",
				"--color-black-inverse": "oklch(0.12 0.015 250)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.16 0.012 250), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.16 0.012 250), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.16 0.012 250), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.16 0.012 250), transparent 84%)",

				"--color-card": "var(--color-elevation-level1)",
				"--color-popover": "var(--color-elevation-level2)",

				"--color-sidebar": "oklch(0.12 0.015 250)",
				"--color-sidebar-fg": "oklch(0.16 0.012 250)",
				"--color-sidebar-accent":
					"color-mix(in srgb, oklch(0.78 0.2 128), transparent 86%)",
				"--color-sidebar-border": "oklch(0.25 0.018 250)",
				"--color-sidebar-ring": "oklch(0.78 0.2 128)",

				"--heading-font": "'Space Grotesk', system-ui, sans-serif",
				"--body-font": "'DM Sans', system-ui, sans-serif",

				"--shadow-color": "hsl(230 18% 12% / 0.28)",
			},
			dark: {
				"--color-primary": "oklch(0.82 0.22 128)",
				"--color-primary-fg": "oklch(0.1 0.015 250)",
				"--color-primary-accent": "oklch(0.2 0.06 130)",
				"--color-primary-focus": "oklch(0.27 0.09 130)",
				"--color-primary-border": "oklch(0.68 0.18 128)",
				"--color-primary-hover": "oklch(0.88 0.23 128)",
				"--color-primary-text": "oklch(0.86 0.21 128)",

				"--color-bg": "oklch(0.095 0.012 250)",
				"--color-fill1": "oklch(0.145 0.015 250)",
				"--color-fill2": "oklch(0.19 0.017 250)",
				"--color-fill3": "oklch(0.24 0.018 250)",
				"--color-fill4": "oklch(0.31 0.02 250)",

				"--color-fg": "oklch(0.94 0.004 250)",
				"--color-fg-secondary": "oklch(0.76 0.012 250)",
				"--color-fg-tertiary": "oklch(0.59 0.015 250)",
				"--color-fg-disabled": "oklch(0.45 0.014 250)",
				"--color-fg-inverse": "oklch(0.1 0.015 250)",

				"--color-border": "oklch(0.28 0.018 250)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.94 0.004 250), transparent 88%)",
				"--color-soft": "oklch(0.22 0.016 250)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.94 0.004 250), transparent 92%)",

				"--color-elevation-negative": "oklch(0.13 0.016 250)",
				"--color-elevation-level1": "oklch(0.12 0.014 250)",
				"--color-elevation-level2": "oklch(0.16 0.016 250)",

				"--color-white-inverse": "oklch(0.1 0.015 250)",
				"--color-black-inverse": "oklch(0.94 0.004 250)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.82 0.22 128), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.82 0.22 128), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.82 0.22 128), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.82 0.22 128), transparent 84%)",

				"--color-sidebar": "oklch(0.075 0.01 250)",
				"--color-sidebar-fg": "var(--color-fg)",
				"--color-sidebar-accent":
					"color-mix(in srgb, oklch(0.82 0.22 128), transparent 86%)",
				"--color-sidebar-accent-fg": "oklch(0.86 0.21 128)",
				"--color-sidebar-border": "var(--color-border)",
				"--color-sidebar-ring": "var(--color-primary)",

				"--shadow-color": "#000000",
			},
			theme: {
				"--shadow-x": "0px",
				"--shadow-y": "12px",
				"--shadow-blur": "30px",
				"--shadow-spread": "-16px",
				"--shadow-opacity": "0.28",
				"--shadow-2xs":
					"0px 1px 2px 0px color-mix(in srgb, var(--shadow-color), transparent 82%)",
				"--shadow-xs":
					"0px 4px 8px -6px color-mix(in srgb, var(--shadow-color), transparent 65%)",
				"--shadow-sm":
					"0px 8px 18px -12px color-mix(in srgb, var(--shadow-color), transparent 52%)",
				"--shadow":
					"0px 12px 30px -16px color-mix(in srgb, var(--shadow-color), transparent 44%)",
				"--shadow-md":
					"0px 18px 42px -20px color-mix(in srgb, var(--shadow-color), transparent 38%)",
				"--shadow-lg":
					"0px 24px 56px -24px color-mix(in srgb, var(--shadow-color), transparent 34%)",
				"--shadow-xl":
					"0px 32px 72px -28px color-mix(in srgb, var(--shadow-color), transparent 30%)",
				"--shadow-2xl":
					"0px 40px 90px -32px color-mix(in srgb, var(--shadow-color), transparent 28%)",
			},
		},
	},
	// MARK: sketchbook
	{
		value: "sketchbook",
		name: "Sketchbook",
		description:
			"Hand-drawn monochrome theme with soft paper surfaces and warm highlight accents",
		fonts: {
			heading: "architects-daughter",
			body: "architects-daughter",
		},
		cssVars: {
			light: {
				"--color-primary": "oklch(0.4891 0 0)",
				"--color-primary-fg": "oklch(0.9551 0 0)",
				"--color-primary-accent": "oklch(0.9354 0.0456 94.8549)",
				"--color-primary-focus": "oklch(0.7058 0 0)",
				"--color-primary-border": "oklch(0.5538 0.0025 17.2320)",
				"--color-primary-hover": "oklch(0.4495 0 0)",
				"--color-primary-text": "oklch(0.4891 0 0)",

				"--color-success": "oklch(0.5693 0 0)",
				"--color-success-accent": "oklch(0.9354 0.0456 94.8549)",
				"--color-success-focus": "oklch(0.9006 0 0)",
				"--color-success-border": "oklch(0.6830 0 0)",
				"--color-success-hover": "oklch(0.4495 0 0)",
				"--color-success-text": "oklch(0.4015 0.0436 37.9587)",

				"--color-error": "oklch(0.6627 0.0978 20.0041)",
				"--color-error-accent": "oklch(0.9354 0.0456 94.8549)",
				"--color-error-focus": "oklch(0.9006 0 0)",
				"--color-error-border": "oklch(0.6627 0.0978 20.0041)",
				"--color-error-hover": "oklch(0.58 0.11 20.0041)",
				"--color-error-text": "oklch(0.6627 0.0978 20.0041)",

				"--color-warning": "oklch(0.7921 0 0)",
				"--color-warning-accent": "oklch(0.9354 0.0456 94.8549)",
				"--color-warning-focus": "oklch(0.9006 0 0)",
				"--color-warning-border": "oklch(0.6830 0 0)",
				"--color-warning-hover": "oklch(0.6830 0 0)",
				"--color-warning-text": "oklch(0.4015 0.0436 37.9587)",

				"--color-info": "oklch(0.5693 0 0)",
				"--color-info-accent": "oklch(0.9158 0 0)",
				"--color-info-focus": "oklch(0.9006 0 0)",
				"--color-info-border": "oklch(0.7058 0 0)",
				"--color-info-hover": "oklch(0.4495 0 0)",
				"--color-info-text": "oklch(0.4313 0 0)",

				"--color-bg": "oklch(0.9821 0 0)",
				"--color-fill1": "oklch(0.9551 0 0)",
				"--color-fill2": "oklch(0.9158 0 0)",
				"--color-fill3": "oklch(0.9006 0 0)",
				"--color-fill4": "oklch(0.8078 0 0)",

				"--color-fg": "oklch(0.3485 0 0)",
				"--color-fg-secondary": "oklch(0.4313 0 0)",
				"--color-fg-tertiary": "oklch(0.5538 0.0025 17.2320)",
				"--color-fg-disabled": "oklch(0.7058 0 0)",
				"--color-fg-inverse": "oklch(1.0000 0 0)",

				"--color-border": "oklch(0.5538 0.0025 17.2320)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.3485 0 0), transparent 88%)",
				"--color-soft": "oklch(0.9158 0 0)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.3485 0 0), transparent 92%)",

				"--color-elevation-negative": "oklch(0.9006 0 0)",
				"--color-elevation-level1": "oklch(1.0000 0 0)",
				"--color-elevation-level2": "oklch(1.0000 0 0)",

				"--color-white-inverse": "oklch(1.0000 0 0)",
				"--color-black-inverse": "oklch(0.3485 0 0)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.3485 0 0), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.3485 0 0), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.3485 0 0), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.3485 0 0), transparent 84%)",

				"--color-card": "oklch(1.0000 0 0)",
				"--color-popover": "oklch(1.0000 0 0)",

				"--color-sidebar": "oklch(0.9551 0 0)",
				"--color-sidebar-fg": "oklch(0.3485 0 0)",
				"--color-sidebar-accent": "oklch(0.9354 0.0456 94.8549)",
				"--color-sidebar-accent-fg": "oklch(0.4015 0.0436 37.9587)",
				"--color-sidebar-border": "oklch(0.8078 0 0)",
				"--color-sidebar-ring": "oklch(0.7058 0 0)",

				"--heading-font": "'Architects Daughter', system-ui, sans-serif",
				"--body-font": "'Architects Daughter', system-ui, sans-serif",

				"--shadow-color": "#000000",
			},
			dark: {
				"--color-primary": "oklch(0.7572 0 0)",
				"--color-primary-fg": "oklch(0.2891 0 0)",
				"--color-primary-accent": "oklch(0.9067 0 0)",
				"--color-primary-focus": "oklch(0.8078 0 0)",
				"--color-primary-border": "oklch(0.4276 0 0)",
				"--color-primary-hover": "oklch(0.8576 0 0)",
				"--color-primary-text": "oklch(0.8576 0 0)",

				"--color-success": "oklch(0.7572 0 0)",
				"--color-success-accent": "oklch(0.3904 0 0)",
				"--color-success-focus": "oklch(0.4676 0 0)",
				"--color-success-border": "oklch(0.6534 0 0)",
				"--color-success-hover": "oklch(0.8576 0 0)",
				"--color-success-text": "oklch(0.8576 0 0)",

				"--color-error": "oklch(0.7915 0.0491 18.2410)",
				"--color-error-accent": "oklch(0.3904 0 0)",
				"--color-error-focus": "oklch(0.4676 0 0)",
				"--color-error-border": "oklch(0.7915 0.0491 18.2410)",
				"--color-error-hover": "oklch(0.86 0.05 18.2410)",
				"--color-error-text": "oklch(0.7915 0.0491 18.2410)",

				"--color-warning": "oklch(0.9067 0 0)",
				"--color-warning-accent": "oklch(0.3904 0 0)",
				"--color-warning-focus": "oklch(0.4676 0 0)",
				"--color-warning-border": "oklch(0.6534 0 0)",
				"--color-warning-hover": "oklch(0.9521 0 0)",
				"--color-warning-text": "oklch(0.9067 0 0)",

				"--color-info": "oklch(0.7572 0 0)",
				"--color-info-accent": "oklch(0.3904 0 0)",
				"--color-info-focus": "oklch(0.4676 0 0)",
				"--color-info-border": "oklch(0.6534 0 0)",
				"--color-info-hover": "oklch(0.8576 0 0)",
				"--color-info-text": "oklch(0.8576 0 0)",

				"--color-bg": "oklch(0.2891 0 0)",
				"--color-fill1": "oklch(0.3211 0 0)",
				"--color-fill2": "oklch(0.3904 0 0)",
				"--color-fill3": "oklch(0.4676 0 0)",
				"--color-fill4": "oklch(0.5452 0 0)",

				"--color-fg": "oklch(0.8945 0 0)",
				"--color-fg-secondary": "oklch(0.8078 0 0)",
				"--color-fg-tertiary": "oklch(0.7058 0 0)",
				"--color-fg-disabled": "oklch(0.6534 0 0)",
				"--color-fg-inverse": "oklch(0.2891 0 0)",

				"--color-border": "oklch(0.4276 0 0)",
				"--color-alpha":
					"color-mix(in srgb, oklch(0.8945 0 0), transparent 88%)",
				"--color-soft": "oklch(0.3904 0 0)",
				"--color-soft-alpha":
					"color-mix(in srgb, oklch(0.8945 0 0), transparent 92%)",

				"--color-elevation-negative": "oklch(0.2478 0 0)",
				"--color-elevation-level1": "oklch(0.3211 0 0)",
				"--color-elevation-level2": "oklch(0.3211 0 0)",

				"--color-white-inverse": "oklch(0.2891 0 0)",
				"--color-black-inverse": "oklch(0.8945 0 0)",

				"--color-fill1-alpha":
					"color-mix(in srgb, oklch(0.8945 0 0), transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb, oklch(0.8945 0 0), transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb, oklch(0.8945 0 0), transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb, oklch(0.8945 0 0), transparent 84%)",

				"--color-card": "oklch(0.3211 0 0)",
				"--color-popover": "oklch(0.3211 0 0)",

				"--color-sidebar": "oklch(0.2478 0 0)",
				"--color-sidebar-fg": "oklch(0.8945 0 0)",
				"--color-sidebar-accent": "oklch(0.9067 0 0)",
				"--color-sidebar-accent-fg": "oklch(0.3211 0 0)",
				"--color-sidebar-border": "oklch(0.4276 0 0)",
				"--color-sidebar-ring": "oklch(0.8078 0 0)",

				"--shadow-color": "#000000",
			},
			theme: {
				"--radius-sm": "calc(0.625rem - 4px)",
				"--radius-md": "calc(0.625rem - 2px)",
				"--radius-lg": "0.625rem",
				"--radius-xl": "calc(0.625rem + 4px)",
				"--tracking-normal": "0.5px",
				"--shadow-x": "1px",
				"--shadow-y": "4px",
				"--shadow-blur": "5px",
				"--shadow-spread": "0px",
				"--shadow-opacity": "0.03",
				"--shadow-2xs": "1px 4px 5px 0px hsl(0 0% 0% / 0.01)",
				"--shadow-xs": "1px 4px 5px 0px hsl(0 0% 0% / 0.01)",
				"--shadow-sm":
					"1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 1px 2px -1px hsl(0 0% 0% / 0.03)",
				"--shadow":
					"1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 1px 2px -1px hsl(0 0% 0% / 0.03)",
				"--shadow-md":
					"1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 2px 4px -1px hsl(0 0% 0% / 0.03)",
				"--shadow-lg":
					"1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 4px 6px -1px hsl(0 0% 0% / 0.03)",
				"--shadow-xl":
					"1px 4px 5px 0px hsl(0 0% 0% / 0.03), 1px 8px 10px -1px hsl(0 0% 0% / 0.03)",
				"--shadow-2xl": "1px 4px 5px 0px hsl(0 0% 0% / 0.07)",
			},
		},
	},
] as const

export type ThemeValue = (typeof THEMES)[number]["value"]
