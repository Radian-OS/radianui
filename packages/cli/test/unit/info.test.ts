import os from "os"
import path from "path"
import fs from "fs-extra"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
	ProjectInfoReport,
	collectProjectInfo,
	getInstalledComponentsDetails,
	printProjectInfo,
} from "@/commands/info"
import { logger } from "@/utils/logger"
import { RADIAN_DOCS_URL, WEBSITE_URL } from "@/utils/registry"

describe("info command helpers", () => {
	let tempDir: string

	beforeEach(async () => {
		tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "radian-info-test-"))
	})

	afterEach(async () => {
		await fs.remove(tempDir)
	})

	describe("getInstalledComponentsDetails", () => {
		it("detects installed UI components and animated components", async () => {
			const uiDir = path.join(tempDir, "src", "components", "ui")
			const animatedDir = path.join(tempDir, "src", "components", "animated")
			await fs.ensureDir(uiDir)
			await fs.ensureDir(animatedDir)

			await fs.writeFile(path.join(uiDir, "button.tsx"), "// Button")
			await fs.writeFile(path.join(uiDir, "badge.tsx"), "// Badge")
			await fs.writeFile(path.join(uiDir, "index.ts"), "// Index")
			await fs.writeFile(path.join(animatedDir, "shine-border.tsx"), "// Shine")

			const components = await getInstalledComponentsDetails(tempDir, {
				$schema: "https://radianui.com/schema.json",
				style: "default",
				iconLibrary: "lucide",
				hasSrcDir: true,
				aliases: {
					components: "@/components",
					utils: "@/lib/utils",
					ui: "@/components/ui",
					animated: "@/components/animated",
				},
			})

			expect(components).toEqual(["badge", "button", "shine-border"])
		})

		it("returns empty array when UI folder does not exist", async () => {
			const components = await getInstalledComponentsDetails(tempDir, null)
			expect(components).toEqual([])
		})

		it("handles custom aliases for components directory", async () => {
			const customUiDir = path.join(tempDir, "custom", "ui")
			await fs.ensureDir(customUiDir)
			await fs.writeFile(path.join(customUiDir, "card.tsx"), "// Card")

			const components = await getInstalledComponentsDetails(tempDir, {
				$schema: "https://radianui.com/schema.json",
				style: "default",
				iconLibrary: "lucide",
				hasSrcDir: false,
				aliases: {
					components: "@/custom",
					utils: "@/lib/utils",
					ui: "@/custom/ui",
				},
			})

			expect(components).toEqual(["card"])
		})
	})

	describe("collectProjectInfo", () => {
		it("collects complete project report including config and URLs", async () => {
			await fs.mkdir(path.join(tempDir, "src"))
			await fs.writeJSON(path.join(tempDir, "components.json"), {
				$schema: "https://radianui.com/schema.json",
				style: "default",
				iconLibrary: "lucide",
				aliases: {
					components: "@/components",
					utils: "@/lib/utils",
				},
				hasSrcDir: true,
			})

			const report = await collectProjectInfo(tempDir)
			expect(report.docsUrl).toBe(RADIAN_DOCS_URL)
			expect(report.llmsTxtUrl).toBe(new URL("llms.txt", WEBSITE_URL).toString())
			expect(report.projectInfo.hasSrcDir).toBe(true)
			expect(report.config.style).toBe("default")
			expect(report.config.iconLibrary).toBe("lucide")
			expect(Array.isArray(report.installedComponents)).toBe(true)
		})

		it("detects installed components and utility CSS file if present", async () => {
			await fs.ensureDir(path.join(tempDir, "app"))
			await fs.writeFile(path.join(tempDir, "app", "globals.css"), '@import "tailwindcss";\n@import "./utility.css";')
			await fs.writeFile(path.join(tempDir, "app", "utility.css"), "/* utility colors */")
			await fs.ensureDir(path.join(tempDir, "components", "ui"))
			await fs.writeFile(path.join(tempDir, "components", "ui", "button.tsx"), "// Button")

			await fs.writeJSON(path.join(tempDir, "components.json"), {
				$schema: "https://radianui.com/schema.json",
				style: "default",
				iconLibrary: "lucide",
				aliases: {
					components: "@/components",
					utils: "@/lib/utils",
				},
				hasSrcDir: false,
			})

			const report = await collectProjectInfo(tempDir)
			expect(report.projectInfo.utilityCssFile).toBeTruthy()
			expect(report.installedComponents).toContain("button")
		})
	})

	describe("printProjectInfo", () => {
		it("prints full formatted output without throwing", () => {
			const logSpy = vi.spyOn(logger, "log").mockImplementation(() => {})
			const breakSpy = vi.spyOn(logger, "break").mockImplementation(() => {})

			const mockReport: ProjectInfoReport = {
				projectInfo: {
					framework: {
						name: "next-app",
						label: "Next.js",
						link: {
							installation: "https://radianui.com",
							tailwind: "https://tailwindcss.com",
						},
					},
					hasSrcDir: true,
					isRSC: true,
					isTsx: true,
					tailwindConfigFile: "tailwind.config.ts",
					tailwindCssFile: "app/globals.css",
					utilityCssFile: "app/utility.css",
					aliasPrefix: "@",
				},
				config: {
					$schema: "https://radianui.com/schema.json",
					style: "default",
					iconLibrary: "lucide",
					aliases: {
						components: "@/components",
						utils: "@/lib/utils",
						ui: "@/components/ui",
					},
					hasSrcDir: true,
				},
				installedComponents: ["badge", "button"],
				docsUrl: RADIAN_DOCS_URL,
				llmsTxtUrl: new URL("llms.txt", WEBSITE_URL).toString(),
			}

			printProjectInfo(mockReport)

			expect(logSpy).toHaveBeenCalled()
			expect(breakSpy).toHaveBeenCalled()

			const loggedText = logSpy.mock.calls.map((c) => c[0]).join("\n")
			expect(loggedText).toContain("Next.js")
			expect(loggedText).toContain("app/globals.css")
			expect(loggedText).toContain("app/utility.css")
			expect(loggedText).toContain("tailwind.config.ts")
			expect(loggedText).toContain("lucide")
			expect(loggedText).toContain("badge, button")

			logSpy.mockRestore()
			breakSpy.mockRestore()
		})

		it("handles missing optional fields and zero installed components", () => {
			const logSpy = vi.spyOn(logger, "log").mockImplementation(() => {})
			const breakSpy = vi.spyOn(logger, "break").mockImplementation(() => {})

			const mockReport: ProjectInfoReport = {
				projectInfo: {
					framework: {
						name: "manual",
						label: "Manual",
						link: {
							installation: "https://radianui.com",
							tailwind: "https://tailwindcss.com",
						},
					},
					hasSrcDir: false,
					isRSC: false,
					isTsx: false,
					tailwindConfigFile: null,
					tailwindCssFile: null,
					utilityCssFile: null,
					aliasPrefix: null,
				},
				config: {
					$schema: "https://radianui.com/schema.json",
					style: "default",
					iconLibrary: "lucide",
					aliases: {
						components: "@/components",
						utils: "@/lib/utils",
					},
				},
				installedComponents: [],
				docsUrl: RADIAN_DOCS_URL,
				llmsTxtUrl: new URL("llms.txt", WEBSITE_URL).toString(),
			}

			printProjectInfo(mockReport)

			expect(logSpy).toHaveBeenCalled()
			expect(breakSpy).toHaveBeenCalled()

			const loggedText = logSpy.mock.calls.map((c) => c[0]).join("\n")
			expect(loggedText).toContain("None")
			expect(loggedText).toContain("Not found")

			logSpy.mockRestore()
			breakSpy.mockRestore()
		})
	})
})
