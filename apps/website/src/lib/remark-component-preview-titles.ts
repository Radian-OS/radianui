type MdxNode = {
	type?: string
	depth?: number
	name?: string
	value?: string
	children?: MdxNode[]
	attributes?: Array<{
		type: string
		name: string
		value?: string
	}>
}

function getNodeText(node: MdxNode): string {
	if (node.type === "text" || node.type === "inlineCode") {
		return node.value ?? ""
	}

	return node.children?.map(getNodeText).join("") ?? ""
}

function findExamplePreview(children: MdxNode[], headingIndex: number) {
	for (let index = headingIndex + 1; index < children.length; index += 1) {
		const node = children[index]

		if (node.type === "heading" && (node.depth ?? 0) <= 3) return undefined
		if (node.type === "mdxJsxFlowElement" && node.name === "ComponentPreview") {
			return node
		}
	}

	return undefined
}

/**
 * Uses each level-three heading in the Examples section as the title of the
 * ComponentPreview that follows it. The heading is then removed from the
 * rendered document so the example name appears once, in the preview header.
 */
export function remarkComponentPreviewTitles() {
	return (tree: MdxNode) => {
		const children = tree.children
		if (!children) return

		let insideExamples = false

		for (let index = 0; index < children.length; index += 1) {
			const node = children[index]

			if (node.type === "heading" && node.depth === 2) {
				insideExamples = getNodeText(node).trim().toLowerCase() === "examples"
				continue
			}

			if (!insideExamples || node.type !== "heading" || node.depth !== 3) {
				continue
			}

			const preview = findExamplePreview(children, index)
			if (!preview) continue

			const title = getNodeText(node).trim()
			if (!title) continue

			preview.attributes ??= []
			if (!preview.attributes.some((attribute) => attribute.name === "title")) {
				preview.attributes.push({
					type: "mdxJsxAttribute",
					name: "title",
					value: title,
				})
			}

			children.splice(index, 1)
			index -= 1
		}
	}
}
