import { describe, expect, it } from "vitest"
import { z } from "zod"
import { Project, SyntaxKind } from "ts-morph"
import fs from "node:fs"
import path from "node:path"
import {
	createComponentSettingsTransformer,
	transformComponentSettingsTransformer,
} from "@/utils/transformers/transformComponentSettings"
import type { TransformContext } from "@/utils/transformers/types"

const source = fs.readFileSync(
	path.resolve("../../apps/website/src/styles/default/ui/button.tsx"),
	"utf8"
)
function apply(
	button: NonNullable<TransformContext["componentSettings"]>["button"],
	content = source,
	name = "button.tsx"
) {
	const project = new Project({ useInMemoryFileSystem: true })
	const file = project.createSourceFile(name, content)
	const context = {
		sourceFile: file,
		filePath: name,
		componentSettings: { button },
	} as TransformContext
	if (transformComponentSettingsTransformer.enabled?.(context))
		transformComponentSettingsTransformer.transform(context)
	return file
}
describe("Button preset source defaults", () => {
	it("installs selected defaults while preserving Tailwind classes and explicit-prop precedence", () => {
		const file = apply({
			defaultSize: "lg",
			defaultVariant: "glossy",
			paddingPreset: "lg",
			radiusPreset: "sm",
		})
		const defaults = file
			.getVariableDeclarationOrThrow("buttonThemeDefaults")
			.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)
		expect(defaults.getPropertyOrThrow("defaultSize").getText()).toContain(
			'"lg"'
		)
		expect(defaults.getPropertyOrThrow("defaultVariant").getText()).toContain(
			'"glossy"'
		)
		const text = file.getFullText()
		expect(text).toContain('variantProp ?? theme.defaultVariant ?? "strong"')
		expect(text).toContain('sizeProp ?? theme.defaultSize ?? "md"')
		expect(text).toContain("innerChild.props.variant ?? variant")
		expect(text).toContain('theme.defaultVariant === "link"')
		expect(text).toContain("h-5 w-5 rounded-[var(--compact-button-radius")
		expect(text).toContain("h-6 w-6 rounded-[var(--compact-button-radius")
		expect(text).toContain("bg-primary")
		expect(text).not.toContain("height: 40px !important")
	})
	it("preserves defaults when no settings are selected", () => {
		expect(apply(undefined).getFullText()).toBe(source)
		expect(apply({ paddingPreset: "sm" }).getFullText()).toBe(source)
	})
	it("does not modify other components", () => {
		expect(
			apply(
				{ defaultSize: "lg" },
				"export const value = 1",
				"badge.tsx"
			).getFullText()
		).toBe("export const value = 1")
	})
	it("rejects invalid values and stale registries with actionable errors", () => {
		expect(() => apply({ defaultSize: "bad" as "lg" })).toThrow(
			"Invalid Button settings in preset (defaultSize)"
		)
		expect(() =>
			apply({ defaultVariant: "glossy" }, "function Button() {}")
		).toThrow("registry is outdated")
	})
})

describe("shared component-settings transformation", () => {
	it("preserves unselected defaults and is idempotent", () => {
		const original =
			'const buttonThemeDefaults = {defaultSize:"sm",defaultVariant:"outline",custom:true}'
		const first = apply({ defaultVariant: "glossy" }, original).getFullText()
		expect(first).toContain('defaultSize:"sm"')
		expect(first).toContain("custom:true")
		expect(first).toContain('defaultVariant:"glossy"')
		expect(apply({ defaultVariant: "glossy" }, first).getFullText()).toBe(first)
	})
	it("supports a different file and defaults object through a definition", () => {
		const transformer = createComponentSettingsTransformer([
			{
				key: "button",
				label: "Example",
				fileNames: ["example.tsx"],
				defaultsVariable: "exampleDefaults",
				defaultsSchema: z.object({
					defaultSize: z.enum(["sm", "lg"]).optional(),
				}),
			},
		])
		const project = new Project({ useInMemoryFileSystem: true })
		const file = project.createSourceFile(
			"example.tsx",
			"const exampleDefaults = {unchanged:true}"
		)
		const context = {
			sourceFile: file,
			filePath: "example.tsx",
			componentSettings: { button: { defaultSize: "lg" } },
		} as TransformContext
		expect(transformer.enabled?.(context)).toBe(true)
		transformer.transform(context)
		expect(file.getFullText()).toContain('defaultSize: "lg"')
		expect(file.getFullText()).toContain("unchanged:true")
	})
	it("does nothing for unrelated files even when called directly", () => {
		const project = new Project({ useInMemoryFileSystem: true })
		const file = project.createSourceFile("other.tsx", "const untouched = true")
		transformComponentSettingsTransformer.transform({
			sourceFile: file,
			filePath: "other.tsx",
			componentSettings: { button: { defaultSize: "lg" } },
		} as TransformContext)
		expect(file.getFullText()).toBe("const untouched = true")
	})
})
