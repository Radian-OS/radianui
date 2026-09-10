import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import {
	addAsset,
	convertAssetsToRegistryComponents,
	matchAssets,
} from "@/commands/add-asset"
import * as registryUtils from "@/utils/registry"
import type { RegistryComponent } from "@/utils/registry"
import { logger } from "@/utils/logger"

const sampleRegistry: RegistryComponent[] = [
	{
		name: "flag:US",
		description: "United States",
		type: "flag",
		files: [
			{
				name: "US.svg",
				content: "<svg>US</svg>",
				type: "flag",
				targetDir: "/assets/flags",
			},
		],
	},
	{
		name: "flag:CA-24x24",
		description: "Canada",
		type: "flag",
		files: [
			{
				name: "CA-24x24.svg",
				content: "<svg>CA</svg>",
				type: "flag",
				targetDir: "/assets/flags",
			},
		],
	},
	{
		name: "flag:JP",
		description: "Japan",
		type: "flag",
		files: [
			{
				name: "JP.svg",
				content: "<svg>JP</svg>",
				type: "flag",
				targetDir: "/assets/flags",
			},
		],
	},
]

describe("unit > addAsset", () => {
	describe("command definition", () => {
		it("has the correct name and options", () => {
			expect(addAsset.name()).toBe("add-asset")
			expect(addAsset.description()).toContain("add static assets")

			const options = addAsset.options.map((opt) => opt.long)
			expect(options).toContain("--all")
			expect(options).toContain("--yes")
			expect(options).toContain("--cwd")
			expect(options).toContain("--overwrite")
		})
	})

	describe("matchAssets", () => {
		it("matches by exact prefixed name", () => {
			const { matched, missing } = matchAssets(sampleRegistry, ["flag:US"])
			expect(matched).toHaveLength(1)
			expect(matched[0].name).toBe("flag:US")
			expect(missing).toHaveLength(0)
		})

		it("matches by un-prefixed name", () => {
			const { matched, missing } = matchAssets(sampleRegistry, ["US", "CA-24x24"])
			expect(matched).toHaveLength(2)
			expect(matched.map((m) => m.name)).toEqual(["flag:US", "flag:CA-24x24"])
			expect(missing).toHaveLength(0)
		})

		it("matches by filename with .svg extension", () => {
			const { matched, missing } = matchAssets(sampleRegistry, ["US.svg"])
			expect(matched).toHaveLength(1)
			expect(matched[0].name).toBe("flag:US")
			expect(missing).toHaveLength(0)
		})

		it("matches by country code prefix (e.g. CA for CA-24x24)", () => {
			const { matched, missing } = matchAssets(sampleRegistry, ["CA"])
			expect(matched).toHaveLength(1)
			expect(matched[0].name).toBe("flag:CA-24x24")
			expect(missing).toHaveLength(0)
		})

		it("matches by description case-insensitively", () => {
			const { matched, missing } = matchAssets(sampleRegistry, [
				"united states",
				"JAPAN",
			])
			expect(matched).toHaveLength(2)
			expect(matched.map((m) => m.name)).toEqual(["flag:US", "flag:JP"])
			expect(missing).toHaveLength(0)
		})

		it("tracks missing queries", () => {
			const { matched, missing } = matchAssets(sampleRegistry, ["US", "unknown-flag"])
			expect(matched).toHaveLength(1)
			expect(matched[0].name).toBe("flag:US")
			expect(missing).toEqual(["unknown-flag"])
		})

		it("does not duplicate if multiple queries match the same asset", () => {
			const { matched, missing } = matchAssets(sampleRegistry, [
				"US",
				"flag:US",
				"United States",
			])
			expect(matched).toHaveLength(1)
			expect(matched[0].name).toBe("flag:US")
			expect(missing).toHaveLength(0)
		})
	})

	describe("convertAssetsToRegistryComponents", () => {
		beforeEach(() => {
			vi.spyOn(registryUtils, "getAssetRegistry").mockResolvedValue(sampleRegistry)
		})

		afterEach(() => {
			vi.restoreAllMocks()
		})

		it("returns all components when options.all is true", async () => {
			const result = await convertAssetsToRegistryComponents(
				undefined,
				{ all: true },
				"flag"
			)
			expect(result).toHaveLength(3)
			expect(result).toEqual(sampleRegistry)
		})

		it("returns matched components for specific queries", async () => {
			const result = await convertAssetsToRegistryComponents(
				["US", "JP"],
				{ all: false },
				"flag"
			)
			expect(result).toHaveLength(2)
			expect(result.map((r) => r.name)).toEqual(["flag:US", "flag:JP"])
		})

		it("logs a warning when some queries are missing", async () => {
			const warnSpy = vi.spyOn(logger, "warn").mockImplementation(() => {})
			vi.spyOn(logger, "info").mockImplementation(() => {})

			const result = await convertAssetsToRegistryComponents(
				["US", "nonexistent"],
				{ all: false },
				"flag"
			)
			expect(result).toHaveLength(1)
			expect(result[0].name).toBe("flag:US")
			expect(warnSpy).toHaveBeenCalled()
		})

		it("exits with error if no components match", async () => {
			const exitSpy = vi
				.spyOn(process, "exit")
				.mockImplementation((() => {}) as any)
			vi.spyOn(logger, "error").mockImplementation(() => {})

			await convertAssetsToRegistryComponents(
				["totally-invalid"],
				{ all: false },
				"flag"
			)
			expect(exitSpy).toHaveBeenCalledWith(1)
		})
	})
})
