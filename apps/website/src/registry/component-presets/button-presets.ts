import { z } from "zod"

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
	{ value: "xs" },
	{ value: "sm" },
	{ value: "md" },
	{ value: "lg" },
	{ value: "xl" },
	{ value: "2xl" },
] as const
export const BUTTON_VARIANTS = [
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
export type ButtonSize = (typeof BUTTON_SIZES)[number]["value"]
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]["value"]

export const buttonConfigSchema = z.object({
	padding: z.enum(
		Object.keys(BUTTON_PADDING_PRESETS) as [
			ButtonPaddingPreset,
			...ButtonPaddingPreset[],
		]
	),
	radius: z.enum(
		Object.keys(BUTTON_RADIUS_PRESETS) as [
			ButtonRadiusPreset,
			...ButtonRadiusPreset[],
		]
	),
	size: z.enum(
		BUTTON_SIZES.map((s) => s.value) as [ButtonSize, ...ButtonSize[]]
	),
	variant: z.enum(
		BUTTON_VARIANTS.map((v) => v.value) as [ButtonVariant, ...ButtonVariant[]]
	),
})

export type ButtonConfig = z.infer<typeof buttonConfigSchema>
