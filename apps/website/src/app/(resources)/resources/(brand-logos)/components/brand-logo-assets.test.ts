import assert from "node:assert/strict"
import test from "node:test"
import { fetchBrandLogoSvg } from "./brand-logo-assets"
import { createBrandLogoCatalog } from "./brand-logos-data"
const { getBrandLogoDisplayUrl, getBrandLogoSvgUrl } = createBrandLogoCatalog({
	categories: [
		{ slug: "frameworks", label: "Frameworks", count: 1, brands: ["react"] },
		{ slug: "technology", label: "Technology", count: 1, brands: ["sony"] },
	],
})

test("previews and SVG exports use the public CDN for every variant", async () => {
	const originalFetch = globalThis.fetch
	const urls: string[] = []
	globalThis.fetch = async (input) => {
		urls.push(String(input))
		return new Response('<svg xmlns="http://www.w3.org/2000/svg"/>')
	}
	try {
		for (const theme of ["light", "dark"] as const) {
			for (const colorway of ["colored", "neutral"] as const) {
				for (const variant of ["icon", "wordmark"] as const) {
					const expected = `https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/${theme}/${colorway}/frameworks/${variant}/react.svg`
					assert.equal(
						getBrandLogoDisplayUrl("react", theme, colorway, variant),
						expected
					)
					assert.equal(
						getBrandLogoSvgUrl("react", theme, colorway, variant),
						expected
					)
					await fetchBrandLogoSvg(expected)
					assert.equal(urls.at(-1), expected)
				}
			}
		}
		assert.equal(urls.length, 8)
	} finally {
		globalThis.fetch = originalFetch
	}
})

test("a failed CDN response can be retried without a proxy", async () => {
	const originalFetch = globalThis.fetch
	let calls = 0
	globalThis.fetch = async () => {
		calls++
		return calls === 1
			? new Response("Unavailable", { status: 503 })
			: new Response("<svg/>")
	}
	try {
		await assert.rejects(fetchBrandLogoSvg(getBrandLogoSvgUrl("sony")), /503/)
		assert.equal(await fetchBrandLogoSvg(getBrandLogoSvgUrl("sony")), "<svg/>")
		assert.equal(calls, 2)
	} finally {
		globalThis.fetch = originalFetch
	}
})
