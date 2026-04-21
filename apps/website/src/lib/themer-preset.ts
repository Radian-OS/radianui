import { useQueryStates } from "nuqs"
import { type Options, parseAsBoolean, parseAsStringLiteral } from "nuqs/server"
import { DEFAULT_CONFIG } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RADIUS, RadiusValue } from "@/registry/radius"
import { TEMPLATES, Template } from "@/registry/templates"

const designSystemSearchParams = {
	primaryColor: parseAsStringLiteral<PrimaryColorValue>(
		PRIMARY_COLORS.map((color) => color.value)
	).withDefault(DEFAULT_CONFIG.primaryColor),
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
	useSrcDir: parseAsBoolean.withDefault(DEFAULT_CONFIG.useSrcDir),
}

export function useThemerPreset(options: Options = {}) {
	const [rawParams, setRawParams] = useQueryStates(designSystemSearchParams, {
		shallow: false,
		history: "push",
		...options,
	})

	return [rawParams, setRawParams] as const
}
