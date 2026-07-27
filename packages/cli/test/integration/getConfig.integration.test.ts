import fs from "fs-extra"
import os from "os"
import path from "path"
import { fileURLToPath } from "url"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { createComponentsJson } from "@/utils/createComponentsJson"
import { getConfig, getRawConfig } from "@/utils/getConfig"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixtures = path.resolve(__dirname, "../fixtures")

describe("integration > getConfig", () => {
	it("throws when components.json is missing", async () => {
		await expect(getConfig(path.join(fixtures, "config-none"))).rejects.toThrow(
			/components\.json/
		)
	})

	it("throws with an invalid components.json", async () => {
		await expect(
			getConfig(path.join(fixtures, "config-invalid"))
		).rejects.toThrow(/Invalid components\.json/i)
	})

	describe("with a freshly created components.json", () => {
		let tempDir: string

		beforeEach(async () => {
			tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-cfg-"))
			await fs.writeFile(
				path.join(tempDir, "package.json"),
				JSON.stringify({ name: "demo" })
			)
		})

		afterEach(async () => {
			await fs.rm(tempDir, { recursive: true, force: true })
		})

		it("createComponentsJson + getConfig round-trips with src=true", async () => {
			await createComponentsJson(tempDir, true, "default", "lucide")
			const config = await getConfig(tempDir)
			expect(config.hasSrcDir).toBe(true)
			expect(config.style).toBe("default")
			expect(config.iconLibrary).toBe("lucide")
			expect(config.aliases.components).toBe("@/components")
			expect(config.aliases.utils).toBe("@/lib/utils")
			expect(config.aliases.ui).toBe("@/components/ui")
			expect(config.aliases.animated).toBe("@/components/animated")
			expect(config.aliases.hooks).toBe("@/hooks")
			expect(config.aliases.lib).toBe("@/lib")
		})

		it("createComponentsJson + getConfig round-trips with src=false", async () => {
			await createComponentsJson(tempDir, false, "default", "lucide")
			const config = await getConfig(tempDir)
			expect(config.hasSrcDir).toBe(false)
			expect(config.style).toBe("default")
			expect(config.iconLibrary).toBe("lucide")
		})

		it("getRawConfig returns null when no config is found", async () => {
			const result = await getRawConfig(tempDir)
			expect(result).toBeNull()
		})

		it("getRawConfig throws with a user-friendly message on invalid config", async () => {
			await fs.writeFile(
				path.join(tempDir, "components.json"),
				JSON.stringify({ bad: true })
			)
			await expect(getRawConfig(tempDir)).rejects.toThrow(
				/Invalid configuration/
			)
		})
	})
})
