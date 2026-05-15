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
import { BASE_COLORS, BaseColorValue } from "@/registry/base-colors"
import { DEFAULT_CONFIG } from "@/registry/config"
import { FONTS, FontValue } from "@/registry/fonts"
import { ICON_LIBRARIES, IconLibrary } from "@/registry/icon-libraries"
import { PRIMARY_COLORS, PrimaryColorValue } from "@/registry/primary-colors"
import { RADIUS, RadiusValue } from "@/registry/radius"
import { STYLES, StyleValue } from "@/registry/styles"
import { TEMPLATES, Template } from "@/registry/templates"

const designSystemSearchParams = {
	primaryColor: parseAsStringLiteral<PrimaryColorValue>(
		PRIMARY_COLORS.map((color) => color.value)
	).withDefault(DEFAULT_CONFIG.primaryColor),
	baseColor: parseAsStringLiteral<BaseColorValue>(
		BASE_COLORS.map((color) => color.value)
	).withDefault(DEFAULT_CONFIG.baseColor),
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
	const mergedParams = {
		primaryColor: searchParams.get("primaryColor") ?? rawParams.primaryColor,
		baseColor: searchParams.get("baseColor") ?? rawParams.baseColor,
		headingFont: searchParams.get("headingFont") ?? rawParams.headingFont,
		bodyFont: searchParams.get("bodyFont") ?? rawParams.bodyFont,
		radius: searchParams.get("radius") ?? rawParams.radius,
		template: searchParams.get("template") ?? rawParams.template,
		style: searchParams.get("style") ?? rawParams.style,
		useSrcDir: searchParams.get("useSrcDir") ?? rawParams.useSrcDir,
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
