import { z } from "zod"
import { ICON_LIBRARIES, IconLibrary, STYLES, Style } from "./constants"

export const rawConfigSchema = z.object({
	$schema: z.string(),
	style: z.enum(STYLES),
	iconLibrary: z.enum(
		ICON_LIBRARIES.map((lib) => lib.value) as [
			IconLibrary,
			...IconLibrary[],
		]
	),
	hasSrcDir: z.coerce.boolean().default(false).optional(),
	aliases: z.object({
		components: z.string(),
		utils: z.string(),
		ui: z.string().optional(),
		animated: z.string().optional(),
		lib: z.string().optional(),
		hooks: z.string().optional(),
	}),
	presetId: z.string().optional(),
})

export const configSchema = rawConfigSchema.extend({
	resolvedPaths: z.object({
		cwd: z.string(),
		tailwindConfig: z.string(),
		tailwindCss: z.string(),
		utils: z.string(),
		components: z.string(),
		lib: z.string(),
		hooks: z.string(),
		ui: z.string(),
	}),
})

export const registryItemTypeSchema = z.enum([
	"registry:lib",
	"registry:block",
	"registry:component",
	"registry:ui",
	"registry:hook",
	"registry:page",
	"registry:file",
	"registry:theme",
])

export const registryItemFileSchema = z.discriminatedUnion("type", [
	// Target is required for registry:file and registry:page
	z.object({
		path: z.string(),
		content: z.string().optional(),
		type: z.enum(["registry:file", "registry:page"]),
		target: z.string(),
	}),
	z.object({
		path: z.string(),
		content: z.string().optional(),
		type: z.enum([
			"registry:lib",
			"registry:block",
			"registry:component",
			"registry:ui",
			"registry:hook",
			"registry:theme",
		]),
		target: z.string().optional(),
	}),
])

// Common fields shared by all registry items.
export const registryItemCommonSchema = z.object({
	files: z.array(registryItemFileSchema).optional(),
})

export const registryItemSchema = registryItemCommonSchema.extend({
	type: registryItemTypeSchema,
})

export type RegistryItem = z.infer<typeof registryItemSchema>

export const presetSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	cssVars: z.object({
		light: z.record(z.string(), z.string()).default({}),
		dark: z.record(z.string(), z.string()).default({}),
		theme: z.record(z.string(), z.string()).optional(),
	}),
	css: z
		.record(z.string(), z.union([z.string(), z.record(z.string(), z.string())]))
		.default({}),
	dependencies: z.array(z.string()).default([]),
	registryDependencies: z.array(z.string()).default([]),
	config: z.object({
		iconLibrary: z.enum(
			ICON_LIBRARIES.map((lib) => lib.value) as [
				IconLibrary,
				...IconLibrary[],
			]
		),
		template: z.string(),
		useSrcDir: z.boolean().default(true),
		style: z.enum(STYLES),
	}),
})

export type Preset = z.infer<typeof presetSchema>
