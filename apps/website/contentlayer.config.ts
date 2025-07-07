import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

export const Doc = defineDocumentType(() => ({
	name: "Doc",
	filePathPattern: `docs/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		apiRef: {
			type: "string",
			required: false,
		},
		source: {
			type: "string",
			required: false,
		},
		externalSiteRef: {
			type: "string",
			required: false,
		},
		externalSiteName: {
			type: "string",
			required: false,
		},
		customLogo: {
			type: "string",
			required: false,
		},
		keywords: {
			type: "list",
			of: { type: "string" },
			required: false,
		},
	},
	computedFields: {
		rawMdx: {
			type: "string",
			resolve: (doc: any) => doc.body.raw,
		},
		slug: {
			type: "string",
			resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
		},
		slugAsParams: {
			type: "string",
			resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
		},
	},
}))

const AuthorProperties = defineNestedType(() => ({
	name: "AuthorProperties",
	fields: {
		name: { type: "string", required: true },
		link: { type: "string", required: false },
		avatar: { type: "string", required: false },
		username: { type: "string", required: false },
	},
}))

export const Blog = defineDocumentType(() => ({
	name: "Blog",
	filePathPattern: `blog/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		date: { type: "date", required: true },
		card: { type: "string", required: false },
		image: { type: "string", required: false },
		author: { type: "list", of: AuthorProperties, required: false },
	},
	computedFields: {
		slug: {
			type: "string",
			resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
		},
		slugAsParams: {
			type: "string",
			resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
		},
		formattedDate: {
			type: "string",
			resolve: (doc) => {
				const date = new Date(doc.date)
				const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
				return date.toLocaleDateString("en-US", options)
			},
		},
	},
}))

export default makeSource({
	contentDirPath: "./src/content",
	documentTypes: [Doc, Blog],
	disableImportAliasWarning: true,
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			[
				rehypePrettyCode as any,
				{
					theme: "github-dark-default",
					keepBackground: false,
				},
			],
			rehypeSlug,
		],
	},
})
