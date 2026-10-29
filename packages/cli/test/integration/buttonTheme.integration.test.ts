import { afterEach, describe, expect, it } from "vitest"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import type { Preset } from "@/registry/schema"
import { updateCssWithPreset } from "@/utils/updaters/updateCssWithPreset"
import { generateThemeCss } from "@/utils/generateCss"

const dirs: string[] = []
afterEach(async () => {
	await Promise.all(
		dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true }))
	)
})
function preset(css: Preset["config"]["css"]): Preset {
	return {
		id: "button-theme",
		name: "Button theme",
		config: {
			name: "Button theme",
			cssVars: { light: {}, dark: {}, theme: {} },
			css,
			dependencies: [],
			registryDependencies: ["button"],
			config: {
				iconLibrary: "lucide",
				template: "next",
				style: "default",
				useSrcDir: true,
			},
		},
	}
}
const selector = "[data-radian-button]"

describe("Button theme exports", () => {
	it("writes the same override rules for new and existing projects without duplicates", async () => {
		const dir = await mkdtemp(path.join(tmpdir(), "button-theme-"))
		dirs.push(dir)
		const file = path.join(dir, "globals.css")
		await writeFile(
			file,
			"@theme { --radius-base:8px; } .dark {} .custom { color:red; }"
		)
		const selected = preset({ [selector]: { height: "44px !important" } })
		expect(generateThemeCss(selected)).toContain("height: 44px !important;")
		await updateCssWithPreset(file, selected)
		await updateCssWithPreset(file, selected)
		const result = await readFile(file, "utf8")
		expect(result.match(/\[data-radian-button\]/g)).toHaveLength(1)
		expect(result).toMatch(/height:\s*44px !important/)
		expect(result).toContain(".custom { color:red; }")
	})
	it("preserves nested Button hover and focus styles in both export paths", async () => {
		const dir = await mkdtemp(path.join(tmpdir(), "button-theme-"))
		dirs.push(dir)
		const file = path.join(dir, "globals.css")
		await writeFile(file, "@theme {} .dark {}")
		const selected = preset({
			[selector]:
				"color:var(--color-primary) !important; &:hover { background:var(--color-primary-accent) !important; } &:focus-visible { outline:2px solid var(--color-primary); }",
		})
		await updateCssWithPreset(file, selected)
		for (const text of [
			generateThemeCss(selected),
			await readFile(file, "utf8"),
		]) {
			expect(text).toContain("&:hover")
			expect(text).toContain("&:focus-visible")
			expect(text).toContain("!important")
		}
	})

	it("removes old managed rules when the override is reset", async () => {
		const dir = await mkdtemp(path.join(tmpdir(), "button-theme-"))
		dirs.push(dir)
		const file = path.join(dir, "globals.css")
		await writeFile(
			file,
			`@theme {} .dark {} ${selector} { height:48px !important; } .custom { padding:4px; }`
		)
		await updateCssWithPreset(file, preset({}))
		expect(await readFile(file, "utf8")).not.toContain(selector)
		expect(await readFile(file, "utf8")).toContain(".custom")
	})
})
