import {
	defineCollections,
	defineConfig,
	defineDocs,
	frontmatterSchema,
} from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import { z } from "zod"
import { transformers } from "@/lib/highlight-code"

// Docs collection — maps to src/content/docs/**/*.mdx
export const { docs, meta } = defineDocs({
	dir: "src/content/docs",
	docs: {
		schema: frontmatterSchema.extend({
			apiRef: z.string().optional(),
			source: z.string().optional(),
			externalSiteRef: z.string().optional(),
			externalSiteName: z.string().optional(),
			customLogo: z.string().optional(),
			links: z
				.object({
					github: z.object({ href: z.string() }).optional(),
					figma: z.object({ href: z.string() }).optional(),
					externalReference: z
						.array(
							z.object({
								label: z.string(),
								href: z.string(),
								icon: z.string().optional(),
							})
						)
						.optional(),
				})
				.optional(),
		}),
	},
})

// Blog collection
export const blog = defineCollections({
	type: "doc",
	dir: "src/content/blog",
	schema: frontmatterSchema.extend({
		date: z.coerce.date(),
		card: z.string().optional(),
		image: z.string().optional(),
		author: z
			.array(
				z.object({
					name: z.string(),
					link: z.string().optional(),
					avatar: z.string().optional(),
					username: z.string().optional(),
				})
			)
			.optional(),
	}),
})

export default defineConfig({
	mdxOptions: {
		rehypePlugins: (plugins) => {
			plugins.shift()
			plugins.push([
				rehypePrettyCode,
				{
					theme: {
						dark: "vesper",
						light: "github-light-default",
					},
					transformers,
				},
			])

			return plugins
		},
	},
})
