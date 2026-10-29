import assert from "node:assert/strict"
import { test } from "node:test"
import { NextRequest } from "next/server"
import { GET } from "./route"

test("exports Button and CompactButton overrides selected in the URL", async () => {
	const response = await GET(
		new NextRequest(
			"https://example.com/init?buttonPaddingPreset=lg&buttonRadiusPreset=sm&compactButtonRadiusPreset=md"
		)
	)
	assert.equal(response.status, 200)
	const { cssVars } = await response.json()
	assert.equal(cssVars.theme["--button-padding-x-md"], "14px")
	assert.equal(cssVars.theme["--button-radius-md"], "4px")
	assert.equal(cssVars.theme["--compact-button-radius-sm"], "6px")
	assert.equal(cssVars.theme["--compact-button-radius-md"], "6px")
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
	for (const name of [
		"buttonPaddingPreset",
		"buttonRadiusPreset",
		"compactButtonRadiusPreset",
	]) {
		const response = await GET(
			new NextRequest(`https://example.com/init?${name}=invalid`)
		)
		assert.equal(response.status, 400)
		const { issues } = await response.json()
		assert.ok(issues.some((issue: { path: string }) => issue.path === name))
	}
})
