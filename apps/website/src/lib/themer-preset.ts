import React from "react"
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import { useQueryStates } from "nuqs"
import {
	type Options,
	inferParserType,
	parseAsBoolean,
	parseAsStringLiteral,
} from "nuqs/server"
import { ICON_LIBRARIES, IconLibrary } from "@/lib/icon-libraries"
import { DEFAULT_CONFIG } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RADIUS, RadiusValue } from "@/registry/radius"
import { STYLES, StyleValue } from "@/registry/styles"
import { TEMPLATES, Template } from "@/registry/templates"
import { THEMES, ThemeValue } from "@/registry/themes"

const designSystemSearchParams = {
	primaryColor: parseAsStringLiteral<PrimaryColorValue>(
		PRIMARY_COLORS.map((color) => color.value)
	),
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
	style: parseAsStringLiteral<StyleValue>(
		STYLES.map((style) => style.value)
	).withDefault(DEFAULT_CONFIG.style),
	useSrcDir: parseAsBoolean.withDefault(DEFAULT_CONFIG.useSrcDir),
	theme: parseAsStringLiteral<ThemeValue>(
		THEMES.map((theme) => theme.value)
	).withDefault(DEFAULT_CONFIG.theme),
	iconLibrary: parseAsStringLiteral<IconLibrary>(ICON_LIBRARIES).withDefault(
		DEFAULT_CONFIG.iconLibrary
	),
}

export type DesignSystemSearchParams = inferParserType<
	typeof designSystemSearchParams
>

function resolvePresetParams(
	rawParams: DesignSystemSearchParams,
	searchParams: ReadonlyURLSearchParams
) {
	// Merge rawParams and searchParams, searchParams takes precedence
	// Extract searchParams first
	const theme = searchParams.get("theme") ?? rawParams.theme
	const primaryColor =
		searchParams.get("primaryColor") ??
		rawParams.primaryColor ??
		(theme === "default" ? DEFAULT_CONFIG.primaryColor : null)

	const mergedParams = {
		primaryColor,
		headingFont: searchParams.get("headingFont") ?? rawParams.headingFont,
		bodyFont: searchParams.get("bodyFont") ?? rawParams.bodyFont,
		radius: searchParams.get("radius") ?? rawParams.radius,
		template: searchParams.get("template") ?? rawParams.template,
		style: searchParams.get("style") ?? rawParams.style,
		useSrcDir: searchParams.get("useSrcDir") ?? rawParams.useSrcDir,
		theme,
		iconLibrary: searchParams.get("iconLibrary") ?? rawParams.iconLibrary,
	} as DesignSystemSearchParams
	return mergedParams
}

export function useThemerPreset(options: Options = {}) {
	const searchParams = useSearchParams()
	const [rawParams, setRawParams] = useQueryStates(designSystemSearchParams, {
		shallow: false,
		history: "push",
		...options,
	})

	const params = React.useMemo(
		() => resolvePresetParams(rawParams, searchParams),
		[rawParams, searchParams]
	)

	const setParams = React.useCallback(
		(params: Partial<DesignSystemSearchParams>) => {
			setRawParams(params)
		},
		[setRawParams]
	)

	return [params, setParams] as const
}
