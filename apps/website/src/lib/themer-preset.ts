import { useQueryStates } from "nuqs"
import { type Options, parseAsBoolean, parseAsStringLiteral } from "nuqs/server"
import { DEFAULT_CONFIG } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RADIUS, RadiusValue } from "@/registry/radius"
import { STYLES, Style } from "@/registry/styles"
import { TEMPLATES, Template } from "@/registry/templates"
import { THEMES, ThemeValue } from "@/registry/themes"

const designSystemSearchParams = {
	primaryColor: parseAsStringLiteral<PrimaryColorValue>(
		PRIMARY_COLORS.map((color) => color.value)
	).withDefault(DEFAULT_CONFIG.primaryColor!),
	headingFont: parseAsStringLiteral<FontValue>(
		FONTS.map((font) => font.value)
	).withDefault(DEFAULT_CONFIG.headingFont),
	bodyFont: parseAsStringLiteral<FontValue>(
		FONTS.map((font) => font.value)
	).withDefault(DEFAULT_CONFIG.bodyFont),
	radius: parseAsStringLiteral<RadiusValue>(
		RADIUS.map((r) => r.value)
	).withDefault(DEFAULT_CONFIG.radius),
	template: parseAsStringLiteral<Template>(TEMPLATES).withDefault(
		DEFAULT_CONFIG.template
	),
	style: parseAsStringLiteral<Style>(STYLES).withDefault(DEFAULT_CONFIG.style),
	useSrcDir: parseAsBoolean.withDefault(DEFAULT_CONFIG.useSrcDir),
	theme: parseAsStringLiteral<ThemeValue>(
		THEMES.map((theme) => theme.value)
	).withDefault(DEFAULT_CONFIG.theme),
}

export function useThemerPreset(options: Options = {}) {
	const [rawParams, setRawParams] = useQueryStates(designSystemSearchParams, {
		shallow: false,
		history: "push",
		...options,
	})

	return [rawParams, setRawParams] as const
}
