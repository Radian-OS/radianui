import { z } from "zod"

// Note: if you edit the schema here, you must also edit the schema in the
// apps/v4/public/schema/registry-item.json file.

export const registryConfigItemSchema = z.union([
	// Simple string format: "https://example.com/{name}.json"
	z.string().refine((s) => s.includes("{name}"), {
		message: "Registry URL must include {name} placeholder",
	}),
	// Advanced object format with auth options
	z.object({
		url: z.string().refine((s) => s.includes("{name}"), {
			message: "Registry URL must include {name} placeholder",
		}),
		params: z.record(z.string(), z.string()).optional(),
		headers: z.record(z.string(), z.string()).optional(),
	}),
])

export const registryConfigSchema = z.record(
	z.string().refine((key) => key.startsWith("@"), {
		message: "Registry names must start with @ (e.g., @v0, @acme)",
	}),
	registryConfigItemSchema
)

export const rawConfigSchema = z
	.object({
		$schema: z.string().optional(),
		style: z.string().default("default"),
		rsc: z.coerce.boolean().default(false),
		tsx: z.coerce.boolean().default(true),
		tailwind: z
			.object({
				config: z.string().optional(),
				css: z.string().default("app/globals.css"),
				baseColor: z.string().default("slate"),
				cssVariables: z.boolean().default(true),
				prefix: z.string().default("").optional(),
			})
			.default({
				css: "app/globals.css",
				baseColor: "slate",
				cssVariables: true,
				prefix: "",
			}),
		iconLibrary: z.string().optional(),
		rtl: z.coerce.boolean().default(false).optional(),
		menuColor: z
			.enum([
				"default",
				"inverted",
				"default-translucent",
				"inverted-translucent",
			])
			.default("default")
			.optional(),
		menuAccent: z.enum(["subtle", "bold"]).default("subtle").optional(),
		hasSrcDir: z.coerce.boolean().default(false).optional(),
		aliases: z.object({
			components: z.string(),
			utils: z.string(),
			ui: z.string().optional(),
			animated: z.string().optional(),
			lib: z.string().optional(),
			hooks: z.string().optional(),
		}),
		registries: registryConfigSchema.optional(),
	})
	.strict()

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

// TODO: type the key.
// Okay for now since I don't want a breaking change.
export const workspaceConfigSchema = z.record(z.string(), configSchema)

export const registryItemTypeSchema = z.enum([
	"registry:lib",
	"registry:block",
	"registry:component",
	"registry:ui",
	"registry:hook",
	"registry:page",
	"registry:file",
	"registry:theme",
	"registry:style",
	"registry:item",
	"registry:base",
	"registry:font",

	// Internal use only.
	"registry:example",
	"registry:internal",
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
		type: registryItemTypeSchema.exclude(["registry:file", "registry:page"]),
		target: z.string().optional(),
	}),
])

export const registryItemTailwindSchema = z.object({
	config: z
		.object({
			content: z.array(z.string()).optional(),
			theme: z.record(z.string(), z.any()).optional(),
			plugins: z.array(z.string()).optional(),
		})
		.optional(),
})

// Recursive type for CSS properties that supports empty objects at any level.
const cssValueSchema: z.ZodType<any> = z.lazy(() =>
	z.union([
		z.string(),
		z.array(z.union([z.string(), z.record(z.string(), z.string())])),
		z.record(z.string(), cssValueSchema),
	])
)

export const registryItemCssSchema = z.record(z.string(), cssValueSchema)

export const registryItemEnvVarsSchema = z.record(z.string(), z.string())

// Font metadata schema for registry:font items.
export const registryItemFontSchema = z.object({
	family: z.string(),
	provider: z.literal("google"),
	import: z.string(),
	variable: z.string(),
	weight: z.array(z.string()).optional(),
	subsets: z.array(z.string()).optional(),
	selector: z.string().optional(),
	dependency: z.string().optional(),
})

export const registryItemCssVarsSchema = z.object({
	theme: z.record(z.string(), z.string()).optional(),
	light: z.record(z.string(), z.string()).optional(),
	dark: z.record(z.string(), z.string()).optional(),
})

// Common fields shared by all registry items.
export const registryItemCommonSchema = z.object({
	$schema: z.string().optional(),
	extends: z.string().optional(),
	name: z.string(),
	title: z.string().optional(),
	author: z.string().min(2).optional(),
	description: z.string().optional(),
	dependencies: z.array(z.string()).optional(),
	devDependencies: z.array(z.string()).optional(),
	registryDependencies: z.array(z.string()).optional(),
	files: z.array(registryItemFileSchema).optional(),
	tailwind: registryItemTailwindSchema.optional(),
	cssVars: registryItemCssVarsSchema.optional(),
	css: registryItemCssSchema.optional(),
	envVars: registryItemEnvVarsSchema.optional(),
	meta: z.record(z.string(), z.any()).optional(),
	docs: z.string().optional(),
	categories: z.array(z.string()).optional(),
})

// registry:base has a config field, registry:font has a font field.
export const registryItemSchema = z.discriminatedUnion("type", [
	registryItemCommonSchema.extend({
		type: z.literal("registry:base"),
		config: rawConfigSchema.partial().optional(),
	}),
	registryItemCommonSchema.extend({
		type: z.literal("registry:font"),
		font: registryItemFontSchema,
	}),
	registryItemCommonSchema.extend({
		type: registryItemTypeSchema.exclude(["registry:base", "registry:font"]),
	}),
])

export type RegistryItem = z.infer<typeof registryItemSchema>

// Helper type for registry:font items specifically.
export type RegistryFontItem = Extract<RegistryItem, { type: "registry:font" }>

export const registryResolvedItemsTreeSchema = registryItemCommonSchema
	.pick({
		dependencies: true,
		devDependencies: true,
		files: true,
		tailwind: true,
		cssVars: true,
		css: true,
		envVars: true,
		docs: true,
	})
	.extend({
		fonts: z
			.array(
				registryItemCommonSchema.extend({
					type: z.literal("registry:font"),
					font: registryItemFontSchema,
				})
			)
			.optional(),
	})
