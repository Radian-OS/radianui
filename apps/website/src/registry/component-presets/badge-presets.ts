import { z } from "zod"

export const BADGE_PADDING_PRESETS = {
	xs: { sm: 2, md: 4, lg: 4 },
	sm: { sm: 4, md: 6, lg: 6 },
	md: { sm: 6, md: 8, lg: 8 },
	lg: { sm: 8, md: 10, lg: 10 },
	xl: { sm: 10, md: 12, lg: 12 },
} as const

export const BADGE_RADIUS_PRESETS = {
	xs: { sm: 0, md: 0, lg: 0 },
	sm: { sm: 2, md: 2, lg: 4 },
	md: { sm: 4, md: 4, lg: 6 },
	lg: { sm: 6, md: 8, lg: 10 },
	xl: { sm: 999, md: 999, lg: 999 },
} as const

export const BADGE_SIZES = [
	{ value: "sm" },
	{ value: "md" },
	{ value: "lg" },
] as const

export const BADGE_VARIANTS = [
	{ value: "strong", label: "Strong" },
	{ value: "soft", label: "Soft" },
	{ value: "outline", label: "Outline" },
] as const

export const badgeConfigSchema = z.object({
	padding: z.enum(["xs", "sm", "md", "lg", "xl"]),
	radius: z.enum(["xs", "sm", "md", "lg", "xl"]),
	size: z.enum(["sm", "md", "lg"]),
	variant: z.enum(["strong", "soft", "outline"]),
})

export type BadgeConfig = z.infer<typeof badgeConfigSchema>
export type BadgeSize = BadgeConfig["size"]
export type BadgeVariant = BadgeConfig["variant"]
export type BadgePaddingPreset = BadgeConfig["padding"]
export type BadgeRadiusPreset = BadgeConfig["radius"]

export const DEFAULT_BADGE_CONFIG: BadgeConfig = {
	padding: "md",
	radius: "md",
	size: "md",
	variant: "soft",
}
