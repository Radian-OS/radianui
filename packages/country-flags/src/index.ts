import {
	type CountryCode,
	countryCodeToFlagId,
	flagsById,
} from "./generated/flag-data"

export { Flag, type FlagProps, type FlagShape } from "./flag"
export {
	countryCodes,
	type CountryCode,
	type FlagId,
} from "./generated/flag-data"

export function getCountryName(country: CountryCode) {
	const normalizedCountry = country.toUpperCase() as CountryCode
	const flagId = countryCodeToFlagId[normalizedCountry]

	return flagId ? flagsById[flagId].name : undefined
}
