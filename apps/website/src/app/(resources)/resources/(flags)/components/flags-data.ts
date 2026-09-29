import { type FlagMetadata, flagMetadata } from "@radianui/flags/metadata"
import {
	type CountryCode,
	getCountryCallingCode,
	getCountries as getPhoneCountries,
} from "libphonenumber-js/min"

export const FLAG_CDN_ORIGIN = "https://cdn.jsdelivr.net"

export const FLAGS_PAGE_PATH = "/resources/flags"

const FLAG_CDN_ROOT =
	"https://cdn.jsdelivr.net/gh/Radian-OS/radian-resources@main/packages/country-flags/src/flags"

export type FlagName = FlagMetadata["id"]
export type FlagShape = "flat" | "round"
export type FlagSize = 16 | 24 | 32 | 64 | 128 | 256 | 512
export type FlagViewBox = readonly [
	x: number,
	y: number,
	width: number,
	height: number,
]

export const FLAG_PNG_SIZES: readonly FlagSize[] = [
	16, 24, 32, 64, 128, 256, 512,
]

export const FLAG_SVG_VIEW_BOX: FlagViewBox = [0, 0, 24, 24]

const DEFAULT_CIRCLE_VIEW_BOX: FlagViewBox = [4.1378, 4.1378, 15.7244, 15.7244]
const circleViewBoxOverrides: Partial<Record<FlagName, FlagViewBox>> = {
	nepal: [0, 6.6207, 10.7586, 10.7586],
}

export const flagNames: FlagName[] = [...flagMetadata]
	.sort((first, second) => first.cdnName.localeCompare(second.cdnName, "en"))
	.map((flag) => flag.id)

const flagMetadataById = new Map<FlagName, FlagMetadata>(
	flagMetadata.map((flag) => [flag.id, flag])
)
const phoneCountryCodes = new Set<string>(getPhoneCountries())

function getFlagMetadata(name: FlagName) {
	const metadata = flagMetadataById.get(name)

	if (!metadata) {
		throw new Error(`Missing flag metadata for ${name}`)
	}

	return metadata
}

export function getFlagDisplayName(name: FlagName) {
	return getFlagMetadata(name).name
}

export function getFlagCountryCodes(name: FlagName): readonly string[] {
	return getFlagMetadata(name).codes
}

export function getFlagAssetCode(name: FlagName) {
	const [assetCode] = getFlagCountryCodes(name)

	if (!assetCode) {
		throw new Error(`Missing CLI asset code for ${name}`)
	}

	return assetCode
}

export function getFlagCallingCodes(name: FlagName) {
	const callingCodes = getFlagCountryCodes(name).flatMap((countryCode) => {
		const phoneCountryCode = countryCode.match(/^([A-Z]{2})(?:-|$)/)?.[1]
		if (!phoneCountryCode || !phoneCountryCodes.has(phoneCountryCode)) return []

		return [`+${getCountryCallingCode(phoneCountryCode as CountryCode)}`]
	})

	return Array.from(new Set(callingCodes))
}

export function getFlagSearchTerms(name: FlagName) {
	const metadata = getFlagMetadata(name)

	return [
		metadata.id,
		metadata.name,
		metadata.cdnName,
		...metadata.codes,
		...getFlagCallingCodes(name),
	]
}

export function getFlagSlug(name: FlagName) {
	return name
}

export function getFlagNameFromSlug(slug: string) {
	const normalizedSlug = slug.toLowerCase() as FlagName
	return flagMetadataById.has(normalizedSlug) ? normalizedSlug : null
}

export function getFlagPagePath(name: FlagName) {
	return `${FLAGS_PAGE_PATH}/${getFlagSlug(name)}`
}

export function getFlagSvgUrl(name: FlagName) {
	return `${FLAG_CDN_ROOT}/${encodeURIComponent(getFlagMetadata(name).id)}.svg`
}

export function getFlagViewBox(name: FlagName, shape: FlagShape): FlagViewBox {
	return shape === "round"
		? (circleViewBoxOverrides[name] ?? DEFAULT_CIRCLE_VIEW_BOX)
		: FLAG_SVG_VIEW_BOX
}

export function getFlagImageLayout(name: FlagName, size: number) {
	const [x, y, width] = getFlagViewBox(name, "round")
	const imageSize = (size * FLAG_SVG_VIEW_BOX[2]) / width

	return {
		imageSize,
		left: (-x * size) / width,
		top: (-y * size) / width,
	}
}

function formatNumber(value: number) {
	return Number(value.toFixed(3))
}

export function getFlagNextImageMarkup(
	name: FlagName,
	shape: FlagShape = "flat"
) {
	const url = getFlagSvgUrl(name)
	const alt = `${getFlagDisplayName(name)} flag`

	if (shape === "flat") {
		return `<Image unoptimized src="${url}" alt="${alt}" width={48} height={48} />`
	}

	const { imageSize, left, top } = getFlagImageLayout(name, 48)
	const intrinsicSize = Math.ceil(imageSize)

	return `<span style={{ position: "relative", display: "inline-block", width: 48, height: 48, overflow: "hidden", borderRadius: "9999px" }}><Image unoptimized src="${url}" alt="${alt}" width={${intrinsicSize}} height={${intrinsicSize}} style={{ position: "absolute", width: ${formatNumber(imageSize)}, height: ${formatNumber(imageSize)}, left: ${formatNumber(left)}, top: ${formatNumber(top)}, maxWidth: "none" }} /></span>`
}

export function getFlagHtmlMarkup(name: FlagName, shape: FlagShape = "flat") {
	const url = getFlagSvgUrl(name)
	const alt = `${getFlagDisplayName(name)} flag`

	if (shape === "flat") {
		return `<img src="${url}" alt="${alt}" width="48" height="48" />`
	}

	const { imageSize, left, top } = getFlagImageLayout(name, 48)
	const intrinsicSize = Math.ceil(imageSize)

	return `<span style="position:relative;display:inline-block;width:48px;height:48px;overflow:hidden;border-radius:9999px"><img src="${url}" alt="${alt}" width="${intrinsicSize}" height="${intrinsicSize}" style="position:absolute;width:${formatNumber(imageSize)}px;height:${formatNumber(imageSize)}px;left:${formatNumber(left)}px;top:${formatNumber(top)}px;max-width:none" /></span>`
}
