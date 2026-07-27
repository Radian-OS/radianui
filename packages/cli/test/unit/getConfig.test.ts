import path from "path"
import { describe, expect, it } from "vitest"
import { txt } from "@/utils/colors"
import { getConfig } from "@/utils/getConfig"

describe("get config", () => {
	it("should throw components.json missing error when config is none", async () => {
		await expect(
			getConfig(path.resolve(__dirname, "../fixtures/config-none"))
		).rejects.toThrow(
			"To add components, make sure you have a components.json file. Run npx radianui init to set it up."
		)
	})

	it("should throw invalid config error when config is invalid", async () => {
		await expect(
			getConfig(path.resolve(__dirname, "../fixtures/config-invalid"))
		).rejects.toThrow(
			`Error loading components.json configuration: Invalid ${txt.info("components.json")} file`
		)
	})
})
