import z from "zod"
import { FONTS, FontValue } from "./fonts"
import { PRIMARY_COLORS } from "./primary-colors"
import { RADIUS, RadiusValue } from "./radius"
import { STYLES } from "./styles"
import { TEMPLATES } from "./templates"

const fontValues = FONTS.map((font) => font.value) as [
	FontValue,
	...FontValue[],
]
const radiusValues = RADIUS.map((radius) => radius.value) as [
	RadiusValue,
	...RadiusValue[],
]

export const themerConfigSchema = z.object({
	name: z.string().optional(),
	primaryColor: z
		.enum(PRIMARY_COLORS.map((color) => color.value))
		.default("violet-blue"),
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
		.enum(STYLES, {
			error: "Invalid style valiue",
		})
		.default("default"),
	useSrcDir: z.boolean().default(true),
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
	},
	{
		name: "sera",
		title: "Sera",
		description: "Sera preset",
		primaryColor: "violet-blue",
		headingFont: "geist",
		bodyFont: "akatab",
		template: "next",
		radius: "medium",
		style: "sera",
		useSrcDir: true,
	},
]

const BASE_THEME = {
	light: {
		success: "oklch(0.6334 0.171 148.65)",
		"success-accent": "oklch(0.9685 0.0336 157.66)",
		"success-focus": "oklch(0.9489 0.0556 156.34)",
		"success-border": "oklch(0.7761 0.2117 148.55)",
		"success-hover": "oklch(0.6901 0.1748 149.64)",
		"success-text": "oklch(0.5388 0.1339 149.74)",

		error: "oklch(0.64 0.22 26.04)",
		"error-accent": "oklch(0.9465 0.0252 17.61)",
		"error-focus": "oklch(0.9133 0.0414 17.93)",
		"error-border": "oklch(0.719 0.1751 22.5)",
		"error-hover": "oklch(0.6786 0.2095 24.66)",
		"error-text": "oklch(0.5716 0.2125 27.27)",

		warning: "oklch(0.8016 0.1705 73.27)",
		"warning-accent": "oklch(0.9622 0.0384 83.83)",
		"warning-focus": "oklch(0.946 0.0574 85.03)",
		"warning-border": "oklch(0.7318 0.1522 75.09)",
		"warning-hover": "oklch(0.8342 0.1594 79.51)",
		"warning-text": "oklch(0.5461 0.1088 77.73)",

		info: "oklch(0.6092 0.2041 255.8)",
		"info-accent": "oklch(0.949 0.0213 245.85)",
		"info-focus": "oklch(0.9135 0.0358 249.52)",
		"info-border": "oklch(0.829 0.0811 248.83)",
		"info-hover": "oklch(0.6722 0.1615 251.56)",
		"info-text": "oklch(0.6092 0.2041 255.8)",

		bg: "oklch(1 0 0)",
		fill1: "oklch(0.9697 0.0017 247.84)",
		fill2: "oklch(0.9519 0.0029 264.54)",
		fill3: "oklch(0.9368 0.0029 264.54)",
		fill4: "oklch(0.906 0.0046 258.33)",

		fg: "oklch(0.2764 0.0079 264.44)",
		"fg-secondary": "oklch(0.5338 0.0202 264.39)",
		"fg-tertiary": "oklch(0.6726 0.0172 266.22)",
		"fg-disabled": "oklch(0.7408 0.0137 266.67)",
		"fg-inverse": "oklch(1 0 0)",

		border: "oklch(0.906 0.0046 258.33)",
		alpha: "color-mix(in srgb, oklch(0.144 0.0028 247.09), transparent 88%)",
		soft: "oklch(0.9368 0.0029 264.54)",
		"soft-alpha":
			"color-mix(in srgb, oklch(0.144 0.0028 247.09), transparent 92%)",

		"elevation-negative": "oklch(0.9764 0.0013 286.38)",
		"elevation-level1": "oklch(1 0 0)",
		"elevation-level2": "oklch(1 0 0)",

		"white-inverse": "oklch(1 0 0)",
		"black-inverse": "oklch(0.144 0.0028 247.09)",

		"fill1-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 96%)",
		"fill2-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 92%)",
		"fill3-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 88%)",
		"fill4-alpha":
			"color-mix(in srgb, oklch(0.3146 0.0336 248.94), transparent 84%)",

		sidebar: "var(--color-fill1)",
		"sidebar-fg": "var(--color-fg)",
		"sidebar-accent": "var(--color-fill1-alpha)",
		"sidebar-accent-fg": "var(--color-fg)",
		"sidebar-border": "var(--color-border)",
		"sidebar-ring": "var(--color-fg-secondary)",
	},
	dark: {
		success: "oklch(0.6334 0.171 148.65)",
		"success-accent": "oklch(0.271 0.0537 151.74)",
		"success-focus": "oklch(0.3887 0.0924 150.55)",
		"success-border": "oklch(0.5388 0.1339 149.74)",
		"success-hover": "oklch(0.6901 0.1748 149.64)",
		"success-text": "oklch(0.7761 0.2117 148.55)",

		error: "oklch(0.64 0.22 26.04)",
		"error-accent": "oklch(0.2567 0.0648 22.77)",
		"error-focus": "oklch(0.2973 0.0922 24.71)",
		"error-border": "oklch(0.4423 0.146 25.48)",
		"error-hover": "oklch(0.6786 0.2095 24.66)",
		"error-text": "oklch(0.719 0.1751 22.5)",

		warning: "oklch(0.8016 0.1705 73.27)",
		"warning-accent": "oklch(0.2663 0.0372 84.34)",
		"warning-focus": "oklch(0.3744 0.0636 81.14)",
		"warning-border": "oklch(0.5461 0.1088 77.73)",
		"warning-hover": "oklch(0.8342 0.1594 79.51)",
		"warning-text": "oklch(0.8342 0.1594 79.51)",

		info: "oklch(0.6092 0.2041 255.8)",
		"info-accent": "oklch(0.2544 0.0418 249.78)",
		"info-focus": "oklch(0.3147 0.0668 250.78)",
		"info-border": "oklch(0.5067 0.1401 252.67)",
		"info-hover": "oklch(0.6722 0.1615 251.56)",
		"info-text": "oklch(0.6722 0.1615 251.56)",

		bg: "oklch(0.144 0.0028 247.09)",
		fill1: "oklch(0.191 0.0043 264.47)",
		fill2: "oklch(0.2342 0.0065 258.36)",
		fill3: "oklch(0.2764 0.0079 264.44)",
		fill4: "oklch(0.3162 0.0099 260.71)",

		fg: "oklch(0.9764 0.0013 286.38)",
		"fg-secondary": "oklch(0.6726 0.0172 266.22)",
		"fg-tertiary": "oklch(0.5686 0.0213 265.87)",
		"fg-disabled": "oklch(0.4632 0.0174 264.39)",
		"fg-inverse": "oklch(0.2342 0.0065 258.36)",

		border: "oklch(0.2764 0.0079 264.44)",
		alpha: "color-mix(in srgb, oklch(1 0 0), transparent 88%)",
		soft: "oklch(0.2342 0.0065 258.36)",
		"soft-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 92%)",

		"elevation-negative": "oklch(0 0 0)",
		"elevation-level1": "oklch(0.191 0.0043 264.47)",
		"elevation-level2": "oklch(0.2342 0.0065 258.36)",

		"white-inverse": "oklch(0.144 0.0028 247.09)",
		"black-inverse": "oklch(1 0 0)",

		"fill1-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 90%)",
		"fill2-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 88%)",
		"fill3-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 84%)",
		"fill4-alpha":
			"color-mix(in srgb, oklch(0.8599 0.0294 266.34), transparent 80%)",

		sidebar: "var(--color-fill1)",
		"sidebar-fg": "var(--color-fg)",
		"sidebar-accent": "var(--color-fill1-alpha)",
		"sidebar-accent-fg": "var(--color-fg)",
		"sidebar-border": "var(--color-border)",
		"sidebar-ring": "var(--color-fg-secondary)",
	},
} as const

const cssValueSchema = z.union([z.string(), z.record(z.string(), z.string())])

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
	}),
})

export type RegistryConfig = z.infer<typeof registryConfigSchema>

export function buildRegistryConfig(config: ThemerConfig): RegistryConfig {
	const colorEntry = PRIMARY_COLORS.find((c) => c.value === config.primaryColor)
	const lightVars = colorEntry?.cssVars.light
	const darkVars = colorEntry?.cssVars.dark

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
		"lucide-react",
	]

	const registryDependencies = ["button"]

	const projectConfig = {
		name: config.name ?? DEFAULT_CONFIG.name!,
		cssVars: {
			light: { ...BASE_THEME.light, ...(lightVars || {}) },
			dark: { ...BASE_THEME.dark, ...(darkVars || {}) },
			theme,
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
			iconLibrary: "lucide-react",
			template: config.template,
			useSrcDir: config.useSrcDir,
		},
	}

	return projectConfig
}
