import { useCodeTreeContext } from "@/contexts/code-tree-context"
import { File, Folder, Tree } from "./file-tree"

export type FlatFile = {
	path: string
	content: string
}

type FileTreeNodeBase = {
	name: string
	path: string
}

export type FileNode = FileTreeNodeBase & {
	type: "file"
	content: string
}

export type FolderNode = FileTreeNodeBase & {
	type: "directory"
	children: FileTreeNode[]
}

export type FileTreeNode = FolderNode | FileNode

export function FileTreeWrapper({
	nodes,
	setShowLeftOverlay,
}: {
	nodes: FileTreeNode[]
	setShowLeftOverlay: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { setSelectedFile } = useCodeTreeContext()

	if (!nodes || nodes.length === 0) return <h1>Loading...</h1>

	const handleSelectFile = async (file: FileNode) => {
		setSelectedFile({
			path: file.path,
			content: file.content,
		})
		setShowLeftOverlay(false)
	}

	const expandedIds: string[] = []

	const renderedTrees = nodes.map((node) =>
		renderTree(node, { count: 1 }, handleSelectFile, expandedIds)
	)

	return (
		<Tree
			className="bg-bg overflow-hidden py-2"
			initialSelectedId="7"
			initialExpandedItems={expandedIds}
			onClick={(e) => e.stopPropagation()}>
			{renderedTrees}
		</Tree>
	)
}

function renderTree(
	node: FileTreeNode | null,
	idCounter: { count: number } = { count: 1 },
	handleSelectFile: (file: FileNode) => void,
	expandedIds: string[]
) {
	if (node === null) {
		return
	}

	const id = node.path

	if (node.type === "directory") {
		expandedIds.push(id)
		return (
			<Folder key={id} value={id} element={node.name}>
				{node.children.map((child) =>
					renderTree(child, idCounter, handleSelectFile, expandedIds)
				)}
			</Folder>
		)
	} else {
		return (
			<File
				key={id + node.name}
				value={id + node.name}
				onClick={() => {
					handleSelectFile(node)
				}}>
				<p>{node.name}</p>
			</File>
		)
	}
}
