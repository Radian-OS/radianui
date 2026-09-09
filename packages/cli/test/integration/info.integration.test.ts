import path from "path"
import { fileURLToPath } from "url"
import { describe, expect, it, vi } from "vitest"
import { collectProjectInfo, info } from "@/commands/info"
import { RADIAN_DOCS_URL, WEBSITE_URL } from "@/utils/registry"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frameworkFixtures = path.resolve(__dirname, "../fixtures/frameworks")
const e2eFixtures = path.resolve(
	__dirname,
	"../../e2e/fixtures/radian-projects"
)

describe("integration > info command", () => {
	it("collects project info for Next.js fixture", async () => {
		const nextAppPath = path.join(frameworkFixtures, "next-app")
		const report = await collectProjectInfo(nextAppPath)

		expect(report.projectInfo.framework.name).toBe("next-app")
		expect(report.projectInfo.framework.label).toBe("Next.js")
		expect(report.projectInfo.hasSrcDir).toBe(false)
		expect(report.projectInfo.tailwindCssFile).toBe("app/globals.css")
		expect(report.projectInfo.aliasPrefix).toBe("@")
		expect(report.docsUrl).toBe(RADIAN_DOCS_URL)
		expect(report.llmsTxtUrl).toBe(new URL("llms.txt", WEBSITE_URL).toString())
		expect(report.config).toBeNull()
	})

	it("collects project info for Vite fixture", async () => {
		const vitePath = path.join(frameworkFixtures, "vite")
		const report = await collectProjectInfo(vitePath)

		expect(report.projectInfo.framework.name).toBe("vite")
		expect(report.projectInfo.framework.label).toBe("Vite")
		expect(report.projectInfo.hasSrcDir).toBe(true)
		expect(report.projectInfo.tailwindCssFile).toBe("src/globals.css")
		expect(report.projectInfo.aliasPrefix).toBe("@")
		expect(report.docsUrl).toBe(RADIAN_DOCS_URL)
		expect(report.llmsTxtUrl).toBe(new URL("llms.txt", WEBSITE_URL).toString())
		expect(report.config).toBeNull()
	})

	it("collects aliases and config from a Radian project with components.json", async () => {
		const radianProjectPath = path.join(e2eFixtures, "next-app-no-src")
		const report = await collectProjectInfo(radianProjectPath)

		expect(report.projectInfo.framework.name).toBe("next-app")
		expect(report.projectInfo.hasSrcDir).toBe(false)
		expect(report.projectInfo.tailwindCssFile).toBe("app/globals.css")
		expect(report.projectInfo.aliasPrefix).toBe("@")
		expect(report.docsUrl).toBe(RADIAN_DOCS_URL)
		expect(report.llmsTxtUrl).toBe(new URL("llms.txt", WEBSITE_URL).toString())

		expect(report.config).not.toBeNull()
		expect(report.config?.style).toBe("default")
		expect(report.config?.iconLibrary).toBe("lucide")
		expect(report.config?.aliases).toMatchObject({
			components: "@/components",
			utils: "@/lib/utils",
			ui: "@/components/ui",
		})
	})

	it("executes the info command with --json and outputs valid JSON", async () => {
		const radianProjectPath = path.join(e2eFixtures, "next-app-no-src")
		const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { })

		await info.parseAsync(["-c", radianProjectPath, "--json"], {
			from: "user",
		})

		expect(consoleLogSpy).toHaveBeenCalled()
		const jsonOutput = consoleLogSpy.mock.calls.find((call) => {
			try {
				const parsed = JSON.parse(call[0])
				return parsed && parsed.docsUrl === RADIAN_DOCS_URL
			} catch {
				return false
			}
		})

		expect(jsonOutput).toBeDefined()
		const parsed = JSON.parse(jsonOutput![0])
		expect(parsed.projectInfo.framework.name).toBe("next-app")
		expect(parsed.projectInfo.tailwindCssFile).toBe("app/globals.css")
		expect(parsed.projectInfo.aliasPrefix).toBe("@")
		expect(parsed.docsUrl).toBe(RADIAN_DOCS_URL)
		expect(parsed.llmsTxtUrl).toBe(new URL("llms.txt", WEBSITE_URL).toString())
		expect(parsed.config.style).toBe("default")
		expect(parsed.config.iconLibrary).toBe("lucide")
		expect(Array.isArray(parsed.installedComponents)).toBe(true)

		consoleLogSpy.mockRestore()
	})
})
