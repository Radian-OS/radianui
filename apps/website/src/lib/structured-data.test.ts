import assert from "node:assert/strict"
import test from "node:test"
import { getFlagImageStructuredData } from "./structured-data"

test("flag image metadata identifies the asset, license, and distribution credit", () => {
	const image =
		"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/country-flags/src/flags/nepal.svg"
	const url = "https://radianui.com/resources/flags/nepal"
	const schema = getFlagImageStructuredData({ name: "Nepal", url, image })
	const graph = schema["@graph"] as Array<Record<string, unknown>>
	const metadata = graph.find((item) => item["@type"] === "ImageObject")!
	assert.equal(metadata.contentUrl, image)
	assert.equal(metadata.url, url)
	assert.equal(
		metadata.license,
		"https://github.com/Radian-os/radian-resources/blob/main/README.md"
	)
	assert.equal(
		metadata.acquireLicensePage,
		"https://github.com/Radian-os/radian-resources/blob/main/packages/country-flags/README.md"
	)
	assert.equal(metadata.creditText, "Distributed by Radian OS")
	assert.equal(
		metadata.copyrightNotice,
		"Copyright remains with the respective rights holders. Distributed under the MIT License."
	)
	assert.doesNotThrow(() => JSON.parse(JSON.stringify(schema)))
})
