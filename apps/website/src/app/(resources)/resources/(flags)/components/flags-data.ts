import { type FlagMetadata, flagMetadata } from "@radianui/flags/metadata"
import {
	type CountryCode,
	getCountryCallingCode,
	getCountries as getPhoneCountries,
} from "libphonenumber-js/min"

export const FLAG_CDN_ORIGIN = "https://cdn.jsdelivr.net"

export const FLAGS_PAGE_PATH = "/resources/flags"

const FLAG_CDN_ROOT =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/country-flags/src/64px"

export type FlagName = FlagMetadata["id"]
export type FlagShape = "flat" | "round"
export type FlagSize = 16 | 24 | 32 | 64 | 128 | 256 | 512

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

export function getFlagUrl(
	name: FlagName,
	shape: FlagShape = "flat",
	size: FlagSize = 64
) {
	const folder = shape === "round" ? "circle" : "flat"
	const cdnName = getFlagMetadata(name).cdnName
	return `${FLAG_CDN_ROOT.replace("/64px", `/${size}px`)}/${folder}/${encodeURIComponent(cdnName)}.png`
}

export function getFlagSvgMarkup(name: FlagName, imageHref: string) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" role="img" aria-label="${getFlagDisplayName(name)} flag"><image href="${imageHref}" width="64" height="64" /></svg>`
}

export function getFlagNextImageMarkup(
	name: FlagName,
	shape: FlagShape = "flat"
) {
	return `<Image src="${getFlagUrl(name, shape)}" alt="${getFlagDisplayName(name)} flag" width={48} height={48} />`
}

export function getFlagHtmlMarkup(name: FlagName, shape: FlagShape = "flat") {
	return `<img src="${getFlagUrl(name, shape)}" alt="${getFlagDisplayName(name)} flag" width="48" height="48" />`
}
