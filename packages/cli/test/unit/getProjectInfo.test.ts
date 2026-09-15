import os from "os"
import path from "path"
import fs from "fs-extra"
import { describe, expect, it } from "vitest"
import { FRAMEWORKS } from "@/utils/frameworks"
import { getProjectInfo } from "@/utils/getProjectInfo"

describe("get project info", () => {
	it.each([
		{
			name: "next-app",
			type: {
				framework: FRAMEWORKS["next-app"],
				hasSrcDir: false,
				isRSC: true,
				isTsx: true,
				tailwindConfigFile: null,
				tailwindCssFile: "app/globals.css",
				utilityCssFile: null,
				aliasPrefix: "@",
			},
		},
		{
			name: "vite",
			type: {
				framework: FRAMEWORKS["vite"],
				hasSrcDir: true,
				isRSC: false,
				isTsx: true,
				tailwindConfigFile: null,
				tailwindCssFile: "src/globals.css",
				utilityCssFile: null,
				aliasPrefix: "@",
			},
		},
	])(
		"should read project info of $name when given project path",
		async ({ name, type }) => {
			expect(
				await getProjectInfo(
					path.resolve(__dirname, `../fixtures/frameworks/${name}`)
				)
			).toStrictEqual(type)
		}
	)

	it("detects utilityCssFile when utility.css is present", async () => {
		const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "radian-project-info-"))
		try {
			await fs.ensureDir(path.join(tempDir, "app"))
			await fs.writeFile(
				path.join(tempDir, "app", "globals.css"),
				'@import "tailwindcss";'
			)
			await fs.writeFile(
				path.join(tempDir, "app", "utility.css"),
				"/* utility colors */"
			)
			await fs.writeFile(path.join(tempDir, "next.config.ts"), "export default {}")

			const info = await getProjectInfo(tempDir)
			expect(info.utilityCssFile).toBeTruthy()
			expect(info.utilityCssFile).toContain("utility.css")
		} finally {
			await fs.remove(tempDir)
		}
	})

	it("returns null for utilityCssFile when utility.css is absent", async () => {
		const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "radian-project-info-"))
		try {
			await fs.ensureDir(path.join(tempDir, "app"))
			await fs.writeFile(
				path.join(tempDir, "app", "globals.css"),
				'@import "tailwindcss";'
			)
			await fs.writeFile(path.join(tempDir, "next.config.ts"), "export default {}")

			const info = await getProjectInfo(tempDir)
			expect(info.utilityCssFile).toBeNull()
		} finally {
			await fs.remove(tempDir)
		}
	})
})
