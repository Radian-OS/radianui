import assert from "node:assert/strict"
import test from "node:test"
import { getBrandLogoPreviewSource } from "./brand-logo-preview-loader"

const src =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/ai/icon/claude.svg"

test("initial previews use the canonical cacheable CDN asset", () => {
	assert.equal(getBrandLogoPreviewSource(src, 0), src)
})

test("retries switch CDN edges without changing the logo variant", () => {
	const original = new URL(src)
	for (let attempt = 1; attempt < 10; attempt++) {
		const url = new URL(getBrandLogoPreviewSource(src, attempt))
		assert.equal(url.pathname, original.pathname)
		assert.equal(url.protocol, "https:")
		assert.notEqual(
			url.hostname,
			new URL(getBrandLogoPreviewSource(src, attempt - 1)).hostname
		)
	}
	assert.equal(new URL(getBrandLogoPreviewSource(src, 1)).search, "")
	assert.equal(
		new URL(getBrandLogoPreviewSource(src, 4)).searchParams.get("retry"),
		"1"
	)
})
