import { describe, expect, it } from "vitest"
import {
	rawConfigSchema,
	registryItemFileSchema,
	registryItemTypeSchema,
} from "@/registry/schema"

describe("rawConfigSchema", () => {
	it("parses a minimal valid configuration", () => {
		const parsed = rawConfigSchema.parse({
			$schema: "https://radianos.com/schema.json",
			style: "default",
			aliases: { components: "@/components", utils: "@/lib/utils" },
		})
		expect(parsed.aliases.components).toBe("@/components")
		expect(parsed.aliases.utils).toBe("@/lib/utils")
		expect(parsed.hasSrcDir).toBe(false)
		expect(parsed.style).toBe("default")
	})

	it("coerces hasSrcDir to a boolean", () => {
		const parsed = rawConfigSchema.parse({
			$schema: "https://radianos.com/schema.json",
			style: "default",
			aliases: { components: "@/components", utils: "@/lib/utils" },
			hasSrcDir: "true",
		})
		expect(parsed.hasSrcDir).toBe(true)
	})

	it("rejects missing required aliases", () => {
		expect(() =>
			rawConfigSchema.parse({
				$schema: "https://radianos.com/schema.json",
				aliases: { components: "@/components" },
			})
		).toThrow()
	})

	it("rejects missing $schema field", () => {
		expect(() =>
			rawConfigSchema.parse({
				aliases: { components: "@/components", utils: "@/lib/utils" },
			})
		).toThrow()
	})
})

describe("registryItemTypeSchema", () => {
	it("accepts every known registry:* type", () => {
		for (const t of [
			"registry:lib",
			"registry:block",
			"registry:component",
			"registry:ui",
			"registry:hook",
			"registry:page",
			"registry:file",
			"registry:theme",
		]) {
			expect(() => registryItemTypeSchema.parse(t)).not.toThrow()
		}
	})

	it("rejects unknown types", () => {
		expect(() => registryItemTypeSchema.parse("registry:unknown")).toThrow()
	})
})

describe("registryItemFileSchema", () => {
	it("requires a target for registry:file and registry:page", () => {
		expect(() =>
			registryItemFileSchema.parse({
				path: "foo.tsx",
				type: "registry:file",
			})
		).toThrow()

		expect(() =>
			registryItemFileSchema.parse({
				path: "foo.tsx",
				type: "registry:file",
				target: "app/foo.tsx",
			})
		).not.toThrow()
	})

	it("allows an optional target on non-file/page types", () => {
		expect(() =>
			registryItemFileSchema.parse({
				path: "button.tsx",
				type: "registry:ui",
			})
		).not.toThrow()
	})
})
