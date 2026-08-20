import { blog as blogCollection, docs, meta } from "collections/server"
import { loader } from "fumadocs-core/source"
import { toFumadocsSource } from "fumadocs-mdx/runtime/server"

export const docsSource = loader({
	baseUrl: "/docs",
	source: toFumadocsSource(docs, meta),
})

export const blog = loader({
	baseUrl: "/blog",
	source: toFumadocsSource(blogCollection, []),
})
