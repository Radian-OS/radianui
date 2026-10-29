import variantCss from "./button-variant-css.json"

// Horizontal padding on each side, in pixels, keyed by preset then Button size.
export const BUTTON_PADDING_PRESETS = {
	xs: {
		xs: 6,
		sm: 8,
		md: 8,
		lg: 10,
		xl: 10,
		"2xl": 12,
	},
	sm: {
		xs: 8,
		sm: 10,
		md: 10,
		lg: 12,
		xl: 12,
		"2xl": 14,
	},
	md: {
		xs: 10,
		sm: 12,
		md: 12,
		lg: 14,
		xl: 14,
		"2xl": 16,
	},
	lg: {
		xs: 12,
		sm: 14,
		md: 14,
		lg: 16,
		xl: 16,
		"2xl": 18,
	},
	xl: {
		xs: 14,
		sm: 16,
		md: 16,
		lg: 18,
		xl: 18,
		"2xl": 20,
	},
} as const

export const BUTTON_RADIUS_PRESETS = {
	xs: {
		xs: 0,
		sm: 0,
		md: 0,
		lg: 0,
		xl: 0,
		"2xl": 0,
	},
	sm: {
		xs: 2,
		sm: 2,
		md: 4,
		lg: 4,
		xl: 4,
		"2xl": 4,
	},
	md: {
		xs: 6,
		sm: 6,
		md: 8,
		lg: 8,
		xl: 8,
		"2xl": 8,
	},
	lg: {
		xs: 8,
		sm: 8,
		md: 12,
		lg: 12,
		xl: 12,
		"2xl": 12,
	},
	xl: {
		xs: 999,
		sm: 999,
		md: 999,
		lg: 999,
		xl: 999,
		"2xl": 999,
	},
} as const

// Both CompactButton sizes use the same value for the shared Radius choice.
export const COMPACT_BUTTON_RADIUS_PRESETS = {
	xs: 0,
	sm: 4,
	md: 6,
	lg: 8,
	xl: 999,
} as const

export type ButtonPaddingPreset = keyof typeof BUTTON_PADDING_PRESETS
export type ButtonRadiusPreset = keyof typeof BUTTON_RADIUS_PRESETS

export const BUTTON_SIZES = [
	{ value: "xs", height: 28 },
	{ value: "sm", height: 32 },
	{ value: "md", height: 36 },
	{ value: "lg", height: 40 },
	{ value: "xl", height: 44 },
	{ value: "2xl", height: 48 },
] as const
export const BUTTON_APPEARANCES = [
	{ value: "strong", label: "Strong" },
	{ value: "soft", label: "Soft" },
	{ value: "outline", label: "Outline" },
	{ value: "ghost", label: "Ghost" },
	{ value: "link", label: "Link" },
	{ value: "glossy", label: "Glossy" },
	{ value: "glossy-inverted", label: "Glossy inverted" },
	{ value: "smooth", label: "Smooth" },
	{ value: "smooth-inverted", label: "Smooth inverted" },
] as const
export type ButtonDefaultSize = (typeof BUTTON_SIZES)[number]["value"]
export type ButtonAppearance = (typeof BUTTON_APPEARANCES)[number]["value"]

// Plain CSS is shared by the live preview and exported projects.
// Attribute selectors deliberately target text buttons, leaving icon/compact buttons alone.
export function buildButtonThemeCss(config: {
	buttonDefaultSize?: ButtonDefaultSize
	buttonAppearance?: ButtonAppearance
	buttonPaddingPreset?: ButtonPaddingPreset
	buttonRadiusPreset?: ButtonRadiusPreset
}): Record<string, Record<string, string> | string> {
	const css: Record<string, Record<string, string> | string> = {}
	const selector = "[data-radian-button]"
	const size = config.buttonDefaultSize
	if (size) {
		const height = BUTTON_SIZES.find((entry) => entry.value === size)!.height
		const padding = config.buttonPaddingPreset
			? BUTTON_PADDING_PRESETS[config.buttonPaddingPreset][size]
			: { xs: 8, sm: 8, md: 12, lg: 12, xl: 12, "2xl": 16 }[size]
		const radius = config.buttonRadiusPreset
			? `${BUTTON_RADIUS_PRESETS[config.buttonRadiusPreset][size]}px`
			: `var(--radius-control-${size === "xs" || size === "sm" ? "md" : "lg"})`
		css[selector] = {
			height: `${height}px !important`,
			"padding-inline": `${padding}px !important`,
			"padding-block": "0 !important",
			"font-size": `${size === "xs" ? 13 : size === "xl" || size === "2xl" ? 16 : 14}px !important`,
			gap: `${size === "xs" ? 4 : size === "sm" ? 6 : 8}px !important`,
			"--button-effective-radius": radius,
			"border-radius": `${radius} !important`,
		}
		css[`${selector} > svg`] = {
			width: `${size === "xs" ? 16 : size === "sm" ? 18 : size === "2xl" ? 24 : 20}px !important`,
			height: `${size === "xs" ? 16 : size === "sm" ? 18 : size === "2xl" ? 24 : 20}px !important`,
		}
	}
	if (config.buttonAppearance) {
		css[`${selector}::before, ${selector}::after`] = {
			content: "none !important",
		}
		for (const color of [
			"primary",
			"info",
			"success",
			"warning",
			"error",
			"neutral",
		]) {
			const target = `${selector}[data-color="${color}"]`
			const key =
				`${config.buttonAppearance}-${color}` as keyof typeof variantCss
			css[target] =
				`background-image:none !important; border:0 solid transparent !important; box-shadow:none !important; --tw-shadow:0 0 #0000 !important; text-decoration:none !important; ${variantCss[key]}`
		}
	}
	if (size) {
		const group = "[data-radian-button-group]"
		css[`${group} ${selector}`] = { "border-radius": "0 !important" }
		css[
			`${group} > :first-child${selector}, ${group} > :first-child ${selector}`
		] = {
			"border-top-left-radius": "var(--button-effective-radius) !important",
			"border-bottom-left-radius": "var(--button-effective-radius) !important",
		}
		css[
			`${group} > :last-child${selector}, ${group} > :last-child ${selector}`
		] = {
			"border-top-right-radius": "var(--button-effective-radius) !important",
			"border-bottom-right-radius": "var(--button-effective-radius) !important",
		}
	}
	return css
}
