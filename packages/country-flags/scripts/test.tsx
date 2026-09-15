import assert from "node:assert/strict"
import { renderToStaticMarkup } from "react-dom/server"
import {
	type CountryCode,
	Flag,
	countryCodes,
	getCountryName,
} from "../src/index"
import { isoCountryCodeSet } from "./iso-country-codes"

assert.ok(countryCodes.length > 0, "Expected supported ISO country codes")
assert.ok(
	countryCodes.every((code) => isoCountryCodeSet.has(code)),
	"The React API must expose only ISO 3166-1 alpha-2 codes"
)

const decorative = renderToStaticMarkup(<Flag country="NP" />)
assert.match(decorative, /aria-hidden="true"/)
assert.match(decorative, /data-flag="nepal"/)
assert.match(decorative, /data-shape="flat"/)
assert.match(decorative, /width="24"/)
assert.match(decorative, /viewBox="0 0 24 24"/)
assert.doesNotMatch(decorative, /role="img"/)

const labelled = renderToStaticMarkup(
	<Flag country="GB" size={32} aria-label="United Kingdom" />
)
assert.match(labelled, /aria-label="United Kingdom"/)
assert.match(labelled, /role="img"/)
assert.match(labelled, /width="32"/)
assert.match(labelled, /height="32"/)
assert.doesNotMatch(labelled, /aria-hidden/)

const circle = renderToStaticMarkup(<Flag country="GB" shape="circle" />)
assert.match(circle, /data-shape="circle"/)
assert.match(circle, /clip-path:circle\(50%\)/)
assert.match(circle, /viewBox="4.1378 4.1378 15.7244 15.7244"/)

const nepalCircle = renderToStaticMarkup(<Flag country="NP" shape="circle" />)
assert.match(nepalCircle, /viewBox="0 6.6207 10.7586 10.7586"/)

const unknown = renderToStaticMarkup(
	<Flag country={"unknown" as CountryCode} />
)
assert.match(unknown, /data-flag="placeholder"/)
assert.match(unknown, /#DEE0E3/)

assert.equal(getCountryName("NP"), "Nepal")
assert.equal(getCountryName("GB"), "United Kingdom")

if (false) {
	// @ts-expect-error The country prop is mandatory.
	;<Flag />
	// @ts-expect-error Country codes must use supported ISO alpha-2 codes.
	;<Flag country="EU" />
	// @ts-expect-error Only flat and circle shapes are available.
	;<Flag country="GB" shape="rounded" />
}

const repeatedFlagMarkup = renderToStaticMarkup(
	<>
		<Flag country="VI" />
		<Flag country="VI" />
	</>
)
const generatedIds = Array.from(
	repeatedFlagMarkup.matchAll(/id="(rf[^"]+)"/g),
	(match) => match[1]
)

assert.ok(generatedIds.length > 0, "Expected generated SVG definition IDs")
assert.equal(
	new Set(generatedIds).size,
	generatedIds.length,
	"Repeated flags must have unique SVG definition IDs"
)

console.log("Country flag component tests passed.")
