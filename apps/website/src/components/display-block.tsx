import React from "react"
import fs from "fs/promises"
import path from "path"
import { formatCode } from "@/lib/format-code"
import { highlightCode } from "@/lib/highligh-code"
import { convertToFileTree } from "@/lib/registry"
import { Index } from "@/registry/blocks-example"
import { DisplayBlockClient } from "./display-block-client"
import { FlatFile } from "./file-tree-wrapper"

const getFilePathname = (
	type: "ui" | "components" | "hooks" | "page",
	filename: string,
	blockName: string
) => {
	if (type === "components") return "components/" + filename
	else if (type === "page")
		return "app/" + blockName.split("-")[0] + "/" + filename
	else if (type === "hooks") return "hooks/" + filename
	else return "components/" + filename
}

export const getBlock = React.cache(async (name: string) => {
	const block = Index[name]
	if (!block) return null

	const files = await Promise.all(
		block.files.map(
			async (file: {
				path: string
				target?: string
				type: "ui" | "components" | "hooks" | "page"
				name: string
			}) => {
				return {
					...file,
					content: await readFile(file.path),
				}
			}
		)
	)

	return {
		...block,
		files,
	}
})

const readFile = React.cache(async (filePath: string) => {
	let fullPath = ""
	try {
		fullPath = path.join(process.cwd(), "src", filePath)
		return await fs.readFile(fullPath, "utf-8")
	} catch (e) {
		console.error("Error reading file:", fullPath || filePath, e)
		return ""
	}
})

export async function DisplayBlock({
	name,
	title,
}: {
	name: string
	title: string
}) {
	const block = await getBlock(name)
	if (!block) return <h1>Block not found</h1>

	const mappedFiles: FlatFile[] = block.files.map((file) => ({
		content: formatCode(file.content),
		path: getFilePathname(file.type, file.name, name.split("-")[0]),
	}))

	const [nodes, highlightedFiles] = await Promise.all([
		getCachedFileTree(mappedFiles),
		getCachedHighlightedFiles(mappedFiles),
	])

	const highlightedFilesWithMappedPaths = highlightedFiles.map(
		(file, index) => ({
			...file,
			path: mappedFiles[index].path,
		})
	)

	return (
		<DisplayBlockClient
			title={title}
			name={name}
			nodes={nodes!}
			highlightedFiles={highlightedFilesWithMappedPaths}
			mappedFiles={mappedFiles}
		/>
	)
}

const getCachedFileTree = React.cache(async (mappedFiles: FlatFile[]) => {
	const nodes = convertToFileTree(mappedFiles)

	nodes.reverse()

	return nodes
})

const getCachedHighlightedFiles = React.cache(
	async (files: Array<{ path: string; target?: string; content: string }>) => {
		return await Promise.all(
			files.map(async (file) => ({
				...file,
				highlightedContent: await highlightCode(file.content ?? ""),
			}))
		)
	}
)
