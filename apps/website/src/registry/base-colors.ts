export const BASE_COLORS = [
	{
		value: "default",
		name: "Cool Gray (Default)",
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
				"--color-bg": "oklch(1 0 0)",
				"--color-fill1": "oklch(0.976 0.001 17.18)",
				"--color-fill2": "oklch(0.952 0.003 17.204)",
				"--color-fill3": "oklch(0.936 0.004 17.22)",
				"--color-fill4": "oklch(0.904 0.005 17.256)",

				"--color-fg": "oklch(0.274 0.01 17.766)",
				"--color-fg-secondary": "oklch(0.462 0.019 17.877)",
				"--color-fg-tertiary": "oklch(0.636 0.022 17.74)",
				"--color-fg-disabled": "oklch(0.705 0.017 17.57)",
				"--color-fg-inverse": "oklch(1 0 0)",

				"--color-soft": "oklch(0.936 0.004 17.22)",
				"--color-alpha":
					" color-mix(in srgb,oklch(0.302 0.038 263.737),transparent 88%)",
				"--color-soft-alpha":
					"color-mix(in srgb,oklch(0.302 0.038 263.737),transparent 92%)",
				"--color-border": "oklch(0.904 0.005 17.256)",

				"--color-elevation-negative": "oklch(0.976 0.001 17.18)",
				"--color-elevation-level1": "oklch(1 0 0)",
				"--color-elevation-level2": "oklch(1 0 0)",

				"--color-white-inverse": "oklch(1 0 0)",
				"--color-black-inverse": "oklch(0.144 0.003 17.491)",

				"--color-fill1-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 84%)",
			},
			dark: {
				"--color-bg": "oklch(0.144 0.003 17.491)",
				"--color-fill1": "oklch(0.19 0.005 17.633)",
				"--color-fill2": "oklch(0.233 0.008 17.714)",
				"--color-fill3": "oklch(0.274 0.01 17.766)",
				"--color-fill4": "oklch(0.314 0.012 17.802)",

				"--color-fg": "oklch(0.976 0.001 17.18)",
				"--color-fg-secondary": "oklch(0.839 0.009 17.338)",
				"--color-fg-tertiary": "oklch(0.705 0.017 17.57)",
				"--color-fg-disabled": "oklch(0.497 0.021 17.888)",
				"--color-fg-inverse": "oklch(0.233 0.008 17.714)",

				"--color-soft": "oklch(0.233 0.008 17.714)",
				"--color-alpha":
					" color-mix(in srgb,oklch(0.856 0.033 17.82,transparent 88%)",
				"--color-soft-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82,transparent 92%)",
				"--color-border": "oklch(0.274 0.01 17.766)",

				"--color-elevation-negative": "oklch(0 0 0)",
				"--color-elevation-level1": "oklch(0.19 0.005 17.633)",
				"--color-elevation-level2": "oklch(0.233 0.008 17.714)",

				"--color-white-inverse": "oklch(0.144 0.003 17.491)",
				"--color-black-inverse": "oklch(1 0 0)",

				"--color-fill1-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 90%)",
				"--color-fill2-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 88%)",
				"--color-fill3-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 84%)",
				"--color-fill4-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 80%)",
			},
		},
	},
	{
		value: "neutral-gray",
		name: "Neutral Gray",
		type: "registry:color",
		cssVars: {
			light: {
				"--color-bg": "oklch(1 0 0)",
				"--color-fill1": "oklch(0.977 0 0)",
				"--color-fill2": "oklch(0.954 0 0)",
				"--color-fill3": "oklch(0.939 0 0)",
				"--color-fill4": "oklch(0.908 0 0)",

				"--color-fg": "oklch(0.28 0 0)",
				"--color-fg-secondary": "oklch(0.474 0 0)",
				"--color-fg-tertiary": "oklch(0.649 0 0)",
				"--color-fg-disabled": "oklch(0.716 0 0)",
				"--color-fg-inverse": "oklch(1 0 0)",

				"--color-border": "oklch(0.908 0 0)",
				"--color-soft": "oklch(0.939 0 0)",
				"--color-alpha":
					" color-mix(in srgb,oklch(0.302 0.038 263.737),transparent 88%)",
				"--color-soft-alpha":
					"color-mix(in srgb,oklch(0.302 0.038 263.737),transparent 92%)",

				"--color-elevation-negative": "oklch(0.977 0 0)",
				"--color-elevation-level1": "oklch(1 0 0)",
				"--color-elevation-level2": "oklch(1 0 0)",

				"--color-white-inverse": "oklch(1 0 0)",
				"--color-black-inverse": "oklch(0.146 0 0)",

				"--color-fill1-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 96%)",
				"--color-fill2-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 92%)",
				"--color-fill3-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 88%)",
				"--color-fill4-alpha":
					"color-mix(in srgb,oklch(0.3 0.045 20.08),transparent 84%)",
			},
			dark: {
				"--color-bg": "oklch(0.146 0 0)",
				"--color-fill1": "oklch(0.193 0 0)",
				"--color-fill2": "oklch(0.238 0 0)",
				"--color-fill3": "oklch(0.28 0 0)",
				"--color-fill4": "oklch(0.321 0 0)",

				"--color-fg": "oklch(0.977 0 0)",
				"--color-fg-secondary": "oklch(0.845 0 0)",
				"--color-fg-tertiary": "oklch(0.716 0 0)",
				"--color-fg-disabled": "oklch(0.51 0 0)",
				"--color-fg-inverse": "oklch(0.238 0 0)",

				"--color-border": "oklch(0.28 0 0)",
				"--color-soft": "oklch(0.238 0 0)",
				"--color-alpha":
					" color-mix(in srgb,oklch(0.856 0.033 17.82,transparent 88%)",
				"--color-soft-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82,transparent 92%)",

				"--color-elevation-negative": "oklch(0 0 0)",
				"--color-elevation-level1": "oklch(0.193 0 0)",
				"--color-elevation-level2": "oklch(0.238 0 0)",

				"--color-white-inverse": "oklch(0.146 0 0)",
				"--color-black-inverse": "oklch(1 0 0)",

				"--color-fill1-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 90%)",
				"--color-fill2-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 88%)",
				"--color-fill3-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 84%)",
				"--color-fill4-alpha":
					"color-mix(in srgb,oklch(0.856 0.033 17.82 ),transparent 80%)",
			},
		},
	},
] as const

export type BaseColor = (typeof BASE_COLORS)[number]
export type BaseColorName = BaseColor["name"]
export type BaseColorValue = BaseColor["value"]

export const BASE_COLORS_MAP = Object.fromEntries(
	BASE_COLORS.map((c) => [c.value, c])
) as Record<BaseColorValue, BaseColor>
