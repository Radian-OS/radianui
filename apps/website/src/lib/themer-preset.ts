import { useQueryStates } from "nuqs"
import { type Options, parseAsStringLiteral } from "nuqs/server"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { TEMPLATES, Template } from "@/registry/templates"

const designSystemSearchParams = {
	primaryColor: parseAsStringLiteral<PrimaryColorValue>(
		PRIMARY_COLORS.map((color) => color.value)
	).withDefault("violet-blue"),
	headingFont: parseAsStringLiteral<FontValue>(
		FONTS.map((font) => font.value)
	).withDefault("geist"),
	bodyFont: parseAsStringLiteral<FontValue>(
		FONTS.map((font) => font.value)
	).withDefault("inter"),
	template: parseAsStringLiteral<Template>(TEMPLATES).withDefault("next"),
}

export function useThemerPreset(options: Options = {}) {
	const [rawParams, setRawParams] = useQueryStates(designSystemSearchParams, {
		shallow: false,
		history: "push",
		...options,
	})

	return [rawParams, setRawParams] as const
}
