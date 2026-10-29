import assert from "node:assert/strict"
import { test } from "node:test"
import { NextRequest } from "next/server"
import { GET } from "./route"

test("exports Button and CompactButton overrides selected in the URL", async () => {
	const response = await GET(
		new NextRequest(
			"https://example.com/init?buttonPaddingPreset=lg&buttonRadiusPreset=sm"
		)
	)
	assert.equal(response.status, 200)
	const { cssVars } = await response.json()
	assert.equal(cssVars.theme["--button-padding-x-md"], "14px")
	assert.equal(cssVars.theme["--button-radius-md"], "4px")
	assert.equal(cssVars.theme["--compact-button-radius"], "4px")
})

test("omitted presets preserve the existing component defaults", async () => {
	const response = await GET(new NextRequest("https://example.com/init"))
	assert.equal(response.status, 200)
	const { cssVars } = await response.json()
	assert.ok(
		!Object.keys(cssVars.theme).some(
			(key) =>
				key.startsWith("--button-") || key.startsWith("--compact-button-")
		)
	)
})

test("rejects invalid component preset names", async () => {
	for (const name of ["buttonPaddingPreset", "buttonRadiusPreset"]) {
		const response = await GET(
			new NextRequest(`https://example.com/init?${name}=invalid`)
		)
		assert.equal(response.status, 400)
		const { issues } = await response.json()
		assert.ok(issues.some((issue: { path: string }) => issue.path === name))
	}
})

test("exports incoming color schemes together with Button settings", async () => {
	const query = new URLSearchParams({
		extraColorSchemes: JSON.stringify(["orange", "#FF0000"]),
		buttonPaddingPreset: "lg",
		buttonRadiusPreset: "sm",
		baseColor: "warm-gray",
	})
	const response = await GET(
		new NextRequest(`https://example.com/init?${query}`)
	)
	assert.equal(response.status, 200)
	const { cssVars } = await response.json()
	assert.ok(cssVars.light["--color-orange"])
	assert.ok(cssVars.dark["--color-orange"])
	assert.ok(cssVars.light["--color-red"])
	assert.ok(cssVars.dark["--color-red"])
	assert.equal(cssVars.theme["--button-padding-x-md"], "14px")
	assert.equal(cssVars.theme["--button-radius-md"], "4px")
	assert.equal(cssVars.theme["--compact-button-radius"], "4px")
})

test("rejects malformed or incorrectly shaped color-scheme parameters", async () => {
	for (const value of ["invalid JSON", '"orange"', "[42]"]) {
		const query = new URLSearchParams({ extraColorSchemes: value })
		const response = await GET(
			new NextRequest(`https://example.com/init?${query}`)
		)
		assert.equal(response.status, 400)
	}
})

test("exports all six preserved Button heights and replacement appearances", async () => {
	for (const [size, height] of [
		["xs", 28],
		["sm", 32],
		["md", 36],
		["lg", 40],
		["xl", 44],
		["2xl", 48],
	] as const) {
		const response = await GET(
			new NextRequest(
				`https://example.com/init?buttonDefaultSize=${size}&buttonAppearance=glossy&buttonPaddingPreset=lg&buttonRadiusPreset=sm`
			)
		)
		assert.equal(response.status, 200)
		const { css } = await response.json()
		assert.equal(css["[data-radian-button]"].height, `${height}px !important`)
		assert.match(
			css['[data-radian-button][data-color="primary"]'],
			/box-shadow/
		)
		assert.ok(css["[data-radian-button-group] [data-radian-button]"])
		assert.ok(
			!Object.keys(css).some(
				(selector) =>
					selector.includes("compact") || selector.includes("icon-btn")
			)
		)
	}
})

test("rejects invalid Button sizes and appearances", async () => {
	for (const field of ["buttonDefaultSize", "buttonAppearance"]) {
		const response = await GET(
			new NextRequest(`https://example.com/init?${field}=invalid`)
		)
		assert.equal(response.status, 400)
	}
})

test("exports only existing Button variants, including their interaction styles", async () => {
	for (const variant of [
		"strong",
		"soft",
		"outline",
		"ghost",
		"link",
		"glossy",
		"glossy-inverted",
		"smooth",
		"smooth-inverted",
	]) {
		const response = await GET(
			new NextRequest(`https://example.com/init?buttonAppearance=${variant}`)
		)
		assert.equal(response.status, 200)
		const { css } = await response.json()
		const body = css['[data-radian-button][data-color="primary"]']
		assert.equal(typeof body, "string")
		assert.match(body, /focus-visible/)
		assert.match(body, /!important/)
	}
	for (const variant of ["default", "fancy", "gradient"]) {
		const response = await GET(
			new NextRequest(`https://example.com/init?buttonAppearance=${variant}`)
		)
		assert.equal(response.status, 400)
	}
})

test("one Radius selection exports a shared CompactButton radius for both sizes", async () => {
	for (const [preset, radius] of Object.entries({
		xs: 0,
		sm: 4,
		md: 6,
		lg: 8,
		xl: 999,
	})) {
		const response = await GET(
			new NextRequest(`https://example.com/init?buttonRadiusPreset=${preset}`)
		)
		const { cssVars } = await response.json()
		assert.equal(cssVars.theme["--compact-button-radius"], `${radius}px`)
		assert.ok(!("--compact-button-radius-sm" in cssVars.theme))
		assert.ok(!("--compact-button-radius-md" in cssVars.theme))
	}
})
