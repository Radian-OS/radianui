import fs from "fs-extra"
import os from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { addComponentsToProject } from "@/commands/add"
import type { AddOptions } from "@/commands/add"
import type { ProjectInfo } from "@/utils/getProjectInfo"
import type { RegistryComponents } from "@/utils/registry"

describe("integration > addAsset file creation", () => {
	let tempDir: string

	const sampleAssetComponents: RegistryComponents = [
		{
			name: "flag:US",
			description: "United States",
			type: "flag",
			files: [
				{
					name: "US.svg",
					content: '<svg width="24" height="24"><path d="M0 0h24v24H0z"/></svg>',
					type: "flag",
					targetDir: "/assets/flags",
				},
			],
		},
	]

	const mockProjectInfo: ProjectInfo = {
		framework: {
			name: "next-app",
			label: "Next.js",
			link: { installation: "", tailwind: "" },
		},
		isRSC: true,
		isTsx: true,
		hasSrcDir: true,
		aliasPrefix: "@",
		tailwindConfigFile: "tailwind.config.ts",
		tailwindCssFile: "app/globals.css",
		utilityCssFile: null,
	}

	beforeEach(async () => {
		tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-asset-test-"))

		// Set up mock package.json and components.json
		await fs.writeJSON(path.join(tempDir, "package.json"), {
			name: "test-app",
			dependencies: { react: "^19.0.0" },
		})

		await fs.writeJSON(path.join(tempDir, "components.json"), {
			$schema: "https://radianui.com/schema.json",
			style: "default",
			iconLibrary: "lucide",
			hasSrcDir: true,
			aliases: {
				components: "@/components",
				utils: "@/lib/utils",
				ui: "@/components/ui",
			},
		})
	})

	afterEach(async () => {
		await fs.rm(tempDir, { recursive: true, force: true })
	})

	it("creates SVG asset files in public/assets/flags directory", async () => {
		const options: AddOptions = {
			cwd: tempDir,
			yes: true,
			all: false,
			overwrite: false,
			components: ["flag:US"],
		}

		await addComponentsToProject(
			sampleAssetComponents,
			options,
			mockProjectInfo
		)

		const expectedFilePath = path.join(tempDir, "public", "assets", "flags", "US.svg")
		expect(await fs.pathExists(expectedFilePath)).toBe(true)

		const content = await fs.readFile(expectedFilePath, "utf-8")
		expect(content).toBe(sampleAssetComponents[0].files[0].content)
	})

	it("skips existing files when overwrite is false", async () => {
		const expectedFilePath = path.join(tempDir, "public", "assets", "flags", "US.svg")
		await fs.ensureDir(path.dirname(expectedFilePath))
		await fs.writeFile(expectedFilePath, "ORIGINAL_CONTENT", "utf-8")

		const options: AddOptions = {
			cwd: tempDir,
			yes: true,
			all: false,
			overwrite: false,
			components: ["flag:US"],
		}

		await addComponentsToProject(
			sampleAssetComponents,
			options,
			mockProjectInfo
		)

		const content = await fs.readFile(expectedFilePath, "utf-8")
		expect(content).toBe("ORIGINAL_CONTENT")
	})

	it("overwrites existing files when overwrite is true", async () => {
		const expectedFilePath = path.join(tempDir, "public", "assets", "flags", "US.svg")
		await fs.ensureDir(path.dirname(expectedFilePath))
		await fs.writeFile(expectedFilePath, "OLD_CONTENT", "utf-8")

		const options: AddOptions = {
			cwd: tempDir,
			yes: true,
			all: false,
			overwrite: true,
			components: ["flag:US"],
		}

		await addComponentsToProject(
			sampleAssetComponents,
			options,
			mockProjectInfo
		)

		const content = await fs.readFile(expectedFilePath, "utf-8")
		expect(content).toBe(sampleAssetComponents[0].files[0].content)
	})
})
