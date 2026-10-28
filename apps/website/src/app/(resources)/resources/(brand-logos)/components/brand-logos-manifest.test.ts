import assert from "node:assert/strict"
import test from "node:test"
import { createBrandLogoCatalog } from "./brand-logos-data"
import {
	parseBrandLogosManifest,
	fetchBrandLogosManifest,
	BRAND_LOGOS_MANIFEST_URL,
} from "./brand-logos-manifest"
const manifest = {
	version: 2,
	format: "svg",
	pathTemplate: "src/{theme}/{colorway}/{category}/{variant}/{brand}.svg",
	themes: ["light", "dark"],
	colorways: ["colored", "neutral"],
	variants: ["icon", "wordmark"],
	categories: [{ slug: "technology", label: "Technology", brands: ["sony"] }],
}
test("upstream manifest supplies counts, search metadata and CDN paths", () => {
	const catalog = createBrandLogoCatalog(parseBrandLogosManifest(manifest))
	assert.equal(catalog.brandLogos.length, 1)
	assert.equal(catalog.BRAND_LOGO_ASSET_COUNT, 8)
	assert.equal(catalog.getBrandLogoFromSlug("SONY")?.name, "Sony")
	assert.equal(catalog.getBrandLogoFromSlug("unknown"), null)
	assert.equal(
		catalog.getBrandLogoSvgUrl("sony"),
		"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/technology/icon/sony.svg"
	)
})
test("invalid paths and duplicate brands are rejected", () => {
	assert.throws(() =>
		parseBrandLogosManifest({
			...manifest,
			categories: [{ slug: "../bad", label: "Bad", brands: ["sony"] }],
		})
	)
	assert.throws(() =>
		parseBrandLogosManifest({
			...manifest,
			categories: [
				{ slug: "technology", label: "Technology", brands: ["sony", "sony"] },
			],
		})
	)
})
test("manifest is fetched directly from CDN and HTTP failures are surfaced", async () => {
	const original = globalThis.fetch
	globalThis.fetch = async (url) => {
		assert.equal(url, BRAND_LOGOS_MANIFEST_URL)
		return Response.json(manifest)
	}
	try {
		assert.equal((await fetchBrandLogosManifest()).categories[0].count, 1)
		globalThis.fetch = async () => new Response("Unavailable", { status: 503 })
		await assert.rejects(fetchBrandLogosManifest(), /503/)
	} finally {
		globalThis.fetch = original
	}
})
