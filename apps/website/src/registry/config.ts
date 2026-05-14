import z from "zod"
import { ICON_LIBRARIES, IconLibrary } from "../lib/icon-libraries"
import { BASE_COLORS } from "./base-colors"
import { FONTS } from "./fonts"
import { PRIMARY_COLORS } from "./primary-colors"
import { RADIUS } from "./radius"
import { STYLES } from "./styles"
import { TEMPLATES } from "./templates"
import { THEMES } from "./themes"

const fontValues = FONTS.map((font) => font.value)
const radiusValues = RADIUS.map((radius) => radius.value)
const styleValues = STYLES.map((style) => style.value)

const cssValueSchema = z.union([z.string(), z.record(z.string(), z.string())])

const ICON_DEPENDENCIES: Record<IconLibrary, string[]> = {
	lucide: ["lucide-react"],
	hugeicons: ["@hugeicons/react", "@hugeicons/core-free-icons"],
}

export const registryConfigSchema = z.object({
	name: z.string(),
	cssVars: z.object({
		light: z.record(z.string(), z.string()),
		dark: z.record(z.string(), z.string()),
		theme: z.record(z.string(), z.string()),
	}),
	css: z.record(z.string(), cssValueSchema),
	dependencies: z.array(z.string()),
	registryDependencies: z.array(z.string()),
	config: z.object({
		iconLibrary: z.string(),
		template: z.enum(TEMPLATES),
		useSrcDir: z.boolean().default(true),
		style: z.enum(styleValues).default("default"),
	}),
})

export type RegistryConfig = z.infer<typeof registryConfigSchema>

export const themerConfigSchema = z
	.object({
		name: z.string().optional(),
		primaryColor: z
			.enum(PRIMARY_COLORS.map((color) => color.value))
			.nullable()
			.default(null),
		baseColor: z
			.enum(BASE_COLORS.map((color) => color.value))
			.nullable()
			.default(null),
		headingFont: z
			.enum(fontValues, {
				error: "Invalid font value",
			})
			.default("geist"),
		bodyFont: z
			.enum(fontValues, { error: "Invalid font value" })
			.default("inter"),
		template: z.enum(TEMPLATES).default("next"),
		radius: z
			.enum(radiusValues, {
				error: "Invalid radius value",
			})
			.default("medium"),
		style: z
			.enum(styleValues, {
				error: "Invalid style valiue",
			})
			.default("default"),
		useSrcDir: z.boolean().default(true),
		theme: z.enum(THEMES.map((theme) => theme.value)).default("default"),
		iconLibrary: z.enum(ICON_LIBRARIES).default("lucide"),
	})
	.refine((data) => data.theme !== null || data.primaryColor !== null, {
		message: "Either theme or primaryColor must be present",
	})

export type ThemerConfig = z.infer<typeof themerConfigSchema>

export const DEFAULT_CONFIG: ThemerConfig = {
	primaryColor: "violet-blue",
	headingFont: "geist",
	bodyFont: "inter",
	template: "next",
	radius: "medium",
	style: "default",
	name: "my-project",
	useSrcDir: true,
	theme: "default",
	iconLibrary: "lucide",
	baseColor: "default",
}

export type Preset = ThemerConfig & {
	name: string
	title: string
	description: string
}

export const PRESETS: Preset[] = [
	{
		name: "default",
		title: "Default",
		description: "Default preset",
		primaryColor: "violet-blue",
		headingFont: "geist",
		bodyFont: "inter",
		template: "next",
		radius: "medium",
		style: "default",
		useSrcDir: true,
		theme: "default",
		iconLibrary: "lucide",
		baseColor: "default",
	},
	{
		name: "sera",
		title: "Sera",
		description: "Sera preset",
		primaryColor: "violet-blue",
		headingFont: "playfair-display",
		bodyFont: "playfair-display",
		template: "next",
		radius: "medium",
		style: "sera",
		useSrcDir: true,
		theme: "default",
		iconLibrary: "lucide",
		baseColor: "default",
	},
]

const BASE_THEME = {
	light: {
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

		"--color-bg": "oklch(1 0 0)",
		"--color-fill1": "oklch(0.9697 0.0017 247.84)",
		"--color-fill2": "oklch(0.9519 0.0029 264.54)",
		"--color-fill3": "oklch(0.9368 0.0029 264.54)",
		"--color-fill4": "oklch(0.906 0.0046 258.33)",

		"--color-fg": "oklch(0.2764 0.0079 264.44)",
		"--color-fg-secondary": "oklch(0.5338 0.0202 264.39)",
		"--color-fg-tertiary": "oklch(0.6726 0.0172 266.22)",
		"--color-fg-disabled": "oklch(0.7408 0.0137 266.67)",
		"--color-fg-inverse": "oklch(1 0 0)",

		"--color-border": "oklch(0.906 0.0046 258.33)",
		"--color-alpha":
			"color-mix(in srgb, oklch(0.144 0.0028 247.09), transparent 88%)",
		"--color-soft": "oklch(0.9368 0.0029 264.54)",
		"--color-soft-alpha":
			"color-mix(in srgb, oklch(0.144 0.0028 247.09), transparent 92%)",

		"--color-elevation-negative": "oklch(0.9764 0.0013 286.38)",
		"--color-elevation-level1": "oklch(1 0 0)",
		"--color-elevation-level2": "oklch(1 0 0)",

		"--color-white-inverse": "oklch(1 0 0)",
		"--color-black-inverse": "oklch(0.144 0.0028 247.09)",

		"--color-fill1-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 96%)",
		"--color-fill2-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 92%)",
		"--color-fill3-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 96%)",
		"--color-fill4-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 84%)",

		"--color-sidebar": "var(--color-fill1)",
		"--color-sidebar-fg": "var(--color-fg)",
		"--color-sidebar-accent": "var(--color-fill1-alpha)",
		"--color-sidebar-accent-fg": "var(--color-fg)",
		"--color-sidebar-border": "var(--color-border)",
		"--color-sidebar-ring": "var(--color-fg-secondary)",
	},
	dark: {
		"--color-success": "oklch(0.6334 0.171 148.65)",
		"--color-success-accent": "oklch(0.271 0.0537 151.74)",
		"--color-success-focus": "oklch(0.3887 0.0924 150.55)",
		"--color-success-border": "oklch(0.5388 0.1339 149.74)",
		"--color-success-hover": "oklch(0.6901 0.1748 149.64)",
		"--color-success-text": "oklch(0.7761 0.2117 148.55)",

		"--color-error": "oklch(0.64 0.22 26.04)",
		"--color-error-accent": "oklch(0.2567 0.0648 22.77)",
		"--color-error-focus": "oklch(0.2973 0.0922 24.71)",
		"--color-error-border": "oklch(0.4423 0.146 25.48)",
		"--color-error-hover": "oklch(0.6786 0.2095 24.66)",
		"--color-error-text": "oklch(0.719 0.1751 22.5)",

		"--color-warning": "oklch(0.8016 0.1705 73.27)",
		"--color-warning-accent": "oklch(0.2663 0.0372 84.34)",
		"--color-warning-focus": "oklch(0.3744 0.0636 81.14)",
		"--color-warning-border": "oklch(0.5461 0.1088 77.73)",
		"--color-warning-hover": "oklch(0.8342 0.1594 79.51)",
		"--color-warning-text": "oklch(0.8342 0.1594 79.51)",

		"--color-info": "oklch(0.6092 0.2041 255.8)",
		"--color-info-accent": "oklch(0.2544 0.0418 249.78)",
		"--color-info-focus": "oklch(0.3147 0.0668 250.78)",
		"--color-info-border": "oklch(0.5067 0.1401 252.67)",
		"--color-info-hover": "oklch(0.6722 0.1615 251.56)",
		"--color-info-text": "oklch(0.6722 0.1615 251.56)",

		"--color-bg": "oklch(0.144 0.0028 247.09)",
		"--color-fill1": "oklch(0.191 0.0043 264.47)",
		"--color-fill2": "oklch(0.2342 0.0065 258.36)",
		"--color-fill3": "oklch(0.2764 0.0079 264.44)",
		"--color-fill4": "oklch(0.3162 0.0099 260.71)",

		"--color-fg": "oklch(0.9764 0.0013 286.38)",
		"--color-fg-secondary": "oklch(0.6726 0.0172 266.22)",
		"--color-fg-tertiary": "oklch(0.5686 0.0213 265.87)",
		"--color-fg-disabled": "oklch(0.4632 0.0174 264.39)",
		"--color-fg-inverse": "oklch(0.2342 0.0065 258.36)",

		"--color-border": "oklch(0.2764 0.0079 264.44)",
		"--color-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 88%)",
		"--color-soft": "oklch(0.2342 0.0065 258.36)",
		"--color-soft-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 92%)",

		"--color-elevation-negative": "oklch(0 0 0)",
		"--color-elevation-level1": "oklch(0.191 0.0043 264.47)",
		"--color-elevation-level2": "oklch(0.2342 0.0065 258.36)",

		"--color-white-inverse": "oklch(0.144 0.0028 247.09)",
		"--color-black-inverse": "oklch(1 0 0)",

		"--color-fill1-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 90%)",
		"--color-fill2-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 88%)",
		"--color-fill3-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 84%)",
		"--color-fill4-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 80%)",

		"--color-sidebar": "var(--color-fill1)",
		"--color-sidebar-fg": "var(--color-fg)",
		"--color-sidebar-accent": "var(--color-fill1-alpha)",
		"--color-sidebar-accent-fg": "var(--color-fg)",
		"--color-sidebar-border": "var(--color-border)",
		"--color-sidebar-ring": "var(--color-fg-secondary)",
	},
} as const

/**
 * Normalizes primary color CSS variable keys so they always carry the
 * `--color-` prefix required by the design system.
 *
 * Most entries in `primary-colors.ts` use bare keys like `"primary"` or
 * `"primary-accent"`.  When those are written directly into a <style> block
 * they produce invalid declarations (e.g. `primary: oklch(…);`) that browsers
 * silently ignore.  Entries that already start with `--` (e.g. `--color-primary`)
 * are kept as-is.
 */
function normalizePrimaryColorVars(
	vars?: Readonly<Record<string, string>>
): Record<string, string> {
	if (!vars) return {}
	const result: Record<string, string> = {}
	for (const [key, value] of Object.entries(vars)) {
		result[key.startsWith("--") ? key : `--color-${key}`] = value
	}
	return result
}

const baseColorVarMap: Record<string, string> = {
	"--color-bg-base": "--color-bg",
	"--color-bg-fill1": "--color-fill1",
	"--color-bg-fill2": "--color-fill2",
	"--color-bg-fill3": "--color-fill3",
	"--color-bg-fill4": "--color-fill4",
	"--color-border-soft": "--color-soft",
	"--color-border-soft-alpha": "--color-soft-alpha",
	"--color-border-alpha": "--color-alpha",
}

function normalizeBaseColorVars(
	vars?: Readonly<Record<string, string>>
): Record<string, string> {
	if (!vars) return {}
	const result: Record<string, string> = {}

	for (const [key, value] of Object.entries(vars)) {
		if (!value) continue
		result[baseColorVarMap[key] ?? key] = value
	}

	return result
}

export function buildRegistryConfig(config: ThemerConfig): RegistryConfig {
	const primaryColor =
		config.primaryColor ??
		(config.theme === "default" ? DEFAULT_CONFIG.primaryColor : null)
	const colorEntry = PRIMARY_COLORS.find((c) => c.value === primaryColor)
	const lightVars = normalizePrimaryColorVars(colorEntry?.cssVars.light)
	const darkVars = normalizePrimaryColorVars(colorEntry?.cssVars.dark)

	const themeEntry = THEMES.find((t) => t.value === config.theme)
	const themeCssVars = themeEntry?.cssVars

	const baseColorEntry = BASE_COLORS.find((c) => c.value === config.baseColor)
	const baseLightVars = normalizeBaseColorVars(baseColorEntry?.cssVars.light)
	const baseDarkVars = normalizeBaseColorVars(baseColorEntry?.cssVars.dark)

	const theme: Record<string, string> = {}

	const headingFont = FONTS.find((font) => font.value === config.headingFont)
	const bodyFont = FONTS.find((font) => font.value === config.bodyFont)

	if (config.headingFont)
		theme["--heading-font"] = headingFont?.font.family || ""

	if (config.bodyFont) theme["--body-font"] = bodyFont?.font.family || ""

	const radius = RADIUS.find((r) => r.value === config.radius)
	if (radius) {
		for (const [key, value] of Object.entries(radius.radius)) {
			theme[`--radius-${key}`] = value
		}
	}

	const dependencies = [
		"class-variance-authority",
		"tw-animate-css",
		"radix-ui",
		...ICON_DEPENDENCIES[config.iconLibrary],
	]

	const registryDependencies = ["button"]

	const projectConfig = {
		name: config.name ?? DEFAULT_CONFIG.name!,
		cssVars: {
			light: {
				...BASE_THEME.light,
				...(themeCssVars?.light || {}),
				...(lightVars || {}),
				...baseLightVars,
			},
			dark: {
				...BASE_THEME.dark,
				...(themeCssVars?.dark || {}),
				...(darkVars || {}),
				...baseDarkVars,
			},
			theme: {
				...theme,
				...(themeCssVars?.theme || {}),
			},
		},
		css: {
			...(headingFont?.font.googleFontsUrl && {
				[`@import url('${headingFont.font.googleFontsUrl}')`]: {},
			}),
			...(bodyFont?.font.googleFontsUrl &&
				bodyFont.font.googleFontsUrl !== headingFont?.font.googleFontsUrl && {
					[`@import url('${bodyFont.font.googleFontsUrl}')`]: {},
				}),
			"@import 'tailwindcss'": {},
			"@import 'tw-animate-css'": {},
			"@custom-variant dark (&:is(.dark *))": {},
			"@layer base": {
				body: "@apply font-body bg-bg text-fg;",
				"button, [role='button'], input[type='button'], input[type='submit'], input[type='reset']":
					"-webkit-transform: translateZ(0); transform: translateZ(0); -webkit-backface-visibility: hidden; backface-visibility: hidden; will-change: auto;",
				"button[class*='bg-gradient'], [role='button'][class*='bg-gradient']":
					"will-change: background-image;",
			},
			"@utility font-heading": "font-family: var(--heading-font);",
			"@utility font-body": "font-family: var(--body-font);",
			"@utility heading-1":
				"@apply font-heading text-[2.25rem] font-semibold leading-[2.75rem]; @media (width >=theme(--breakpoint-sm)) { font-size: 3rem; line-height: 3.5rem; } @media (width >=theme(--breakpoint-lg)) { font-size: 4rem; line-height: 4.5rem; }",
			"@utility heading-2":
				"@apply font-heading text-[2rem] font-semibold leading-[2.5rem]; @media (width >=theme(--breakpoint-sm)) { font-size: 2.5rem; line-height: 3rem; } @media (width >=theme(--breakpoint-lg)) { font-size: 3rem; line-height: 3.5rem; }",
			"@utility heading-3":
				"@apply font-heading text-[1.875rem] font-semibold leading-[2.375rem]; @media (width >=theme(--breakpoint-sm)) { font-size: 2.25rem; line-height: 2.75rem; } @media (width >=theme(--breakpoint-lg)) { font-size: 2.5rem; line-height: 3rem; }",
			"@utility heading-4":
				"@apply font-heading text-[1.75rem] font-semibold leading-[2.25rem]; @media (width >=theme(--breakpoint-sm)) { font-size: 1.875rem; line-height: 2.375rem; } @media (width >=theme(--breakpoint-lg)) { font-size: 2rem; line-height: 2.5rem; }",
			"@utility heading-5":
				"@apply font-heading text-[1.5rem] font-semibold leading-[2rem];",
			"@utility heading-6":
				"@apply font-heading text-[1.25rem] font-semibold leading-[1.75rem];",
			"@utility body-15": "@apply font-body text-[0.9375rem] leading-[1.375];",
			"@utility text-sm-p": "@apply font-body text-sm leading-[1.25rem];",
			"@utility body-13":
				"@apply font-body text-[0.8125rem] leading-[1.125rem];",
			"@utility no-scrollbar":
				"-ms-overflow-style: none; scrollbar-width: none; &::-webkit-scrollbar { display: none; }",
		},
		dependencies,
		registryDependencies,
		config: {
			iconLibrary: config.iconLibrary,
			template: config.template,
			useSrcDir: config.useSrcDir,
			style: config.style,
		},
	}

	return projectConfig
}
