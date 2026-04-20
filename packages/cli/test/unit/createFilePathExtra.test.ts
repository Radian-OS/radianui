import path from "path"
import { describe, expect, it } from "vitest"
import { createFilePath } from "@/utils/createFilePath"
import type { RawConfig } from "@/utils/getConfig"
import type { RegistryComponentFile } from "@/utils/registry"

const baseConfig: RawConfig = {
	$schema: "",
	aliases: {
		components: "@/components",
		utils: "@/lib/utils",
		ui: "@/components/ui",
		animated: "@/components/animated",
		lib: "@/lib",
		hooks: "@/hooks",
	},
	hasSrcDir: true,
}

describe("createFilePath (next-app)", () => {
	const cwd = "/workspace/app"

	it("places a ui component in components/ui with src", () => {
		const file: RegistryComponentFile = {
			name: "button.tsx",
			type: "ui",
			content: "",
		}
		expect(createFilePath(file, cwd, "next-app", baseConfig)).toBe(
			path.join(cwd, "src", "components", "ui", "button.tsx")
		)
	})

	it("places a page inside app/<targetDir>/page.tsx", () => {
		const page: RegistryComponentFile = {
			name: "page.tsx",
			type: "page",
			content: "",
			targetDir: "hero",
		}
		expect(createFilePath(page, cwd, "next-app", baseConfig)).toBe(
			path.join(cwd, "src", "app", "hero", "page.tsx")
		)
	})

	it("omits the src segment when hasSrcDir is false", () => {
		const noSrc = { ...baseConfig, hasSrcDir: false }
		const file: RegistryComponentFile = {
			name: "input.tsx",
			type: "ui",
			content: "",
		}
		expect(createFilePath(file, cwd, "next-app", noSrc)).toBe(
			path.join(cwd, "components", "ui", "input.tsx")
		)
	})
})

describe("createFilePath (vite)", () => {
	const cwd = "/workspace/vite"

	it("places a page directly under the targetDir", () => {
		const page: RegistryComponentFile = {
			name: "index.tsx",
			type: "page",
			content: "",
			targetDir: "pages/hero",
		}
		expect(createFilePath(page, cwd, "vite", baseConfig)).toBe(
			path.join(cwd, "src", "pages", "hero", "index.tsx")
		)
	})

	it("places a ui component in components/ui with src", () => {
		const file: RegistryComponentFile = {
			name: "select.tsx",
			type: "ui",
			content: "",
		}
		expect(createFilePath(file, cwd, "vite", baseConfig)).toBe(
			path.join(cwd, "src", "components", "ui", "select.tsx")
		)
	})
})

describe("createFilePath (unsupported framework)", () => {
	it("throws on an unsupported framework", () => {
		const file: RegistryComponentFile = {
			name: "button.tsx",
			type: "ui",
			content: "",
		}
		expect(() =>
			createFilePath(file, "/x", "manual" as never, baseConfig)
		).toThrow(/Framework not supported/)
	})
})
