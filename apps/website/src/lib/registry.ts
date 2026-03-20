import {
	FileNode,
	FileTreeNode,
	FlatFile,
	FolderNode,
} from "@/components/file-tree-wrapper"

export function convertToFileTree(mappedFiles: FlatFile[]): FileTreeNode[] {
	const pathToNode = new Map<string, FileTreeNode>()

	// Sort files by path depth to ensure parent directories are created first
	const sortedFiles = [...mappedFiles].sort(
		(a, b) => a.path.split("/").length - b.path.split("/").length
	)

	for (const file of sortedFiles) {
		const pathParts = file.path.split("/").filter(Boolean)

		// Create all parent directories first
		for (let i = 0; i < pathParts.length - 1; i++) {
			const parentPath = pathParts.slice(0, i + 1).join("/")

			if (!pathToNode.has(parentPath)) {
				const folderNode: FolderNode = {
					name: pathParts[i],
					path: parentPath,
					type: "directory",
					children: [],
				}
				pathToNode.set(parentPath, folderNode)
			}
		}

		// Create the file node
		const fileName = pathParts[pathParts.length - 1]
		const fileNode: FileNode = {
			path: file.path,
			name: fileName,
			type: "file",
			content: file.content,
		}
		pathToNode.set(file.path, fileNode)
	}

	// Build the tree structure
	const rootNodes: FileTreeNode[] = []

	for (const [path, node] of pathToNode) {
		const pathParts = path.split("/")

		if (pathParts.length === 1) {
			// Root level node
			rootNodes.push(node)
		} else {
			// Child node - find its parent
			const parentPath = pathParts.slice(0, -1).join("/")
			const parent = pathToNode.get(parentPath) as FolderNode

			if (parent && parent.type === "directory") {
				parent.children.push(node)
			}
		}
	}

	return rootNodes
}
