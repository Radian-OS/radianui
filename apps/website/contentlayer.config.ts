import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import rehypePrettyCode from "rehype-pretty-code"
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

export default makeSource({
	contentDirPath: "./src/content",
	documentTypes: [Doc],
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
		],
	},
})
