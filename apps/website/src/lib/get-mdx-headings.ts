import GithubSlugger from "github-slugger"
import { remark } from "remark"
import { visit } from "unist-util-visit"

export type MdxHeading = {
	level: number
	text: string
	id: string
}
type GetHeadingsOptions = {
	minDepth?: number
	maxDepth?: number
}

/**
 * Extracts headings (h2/h3 by default) from MDX/Markdown code.
 * @param mdxCode The MDX or Markdown code as a string
 * @param options Optional: minDepth/maxDepth for heading levels (default: 2-3)
 * @returns Promise<MdxHeading[]>
 */
export async function getHeadingsFromMdx(
	mdxCode: string,
	options: GetHeadingsOptions = { minDepth: 2, maxDepth: 3 }
): Promise<MdxHeading[]> {
	const { minDepth = 2, maxDepth = 3 } = options
	const slugger = new GithubSlugger()
	const headings: MdxHeading[] = []

	// Helper to recursively extract all text from a node
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function extractText(node: any): string {
		if (!node) return ""
		if (node.type === "text" || node.type === "inlineCode") return node.value
		if (Array.isArray(node.children))
			return node.children.map(extractText).join("")
		return ""
	}

	// Remark plugin to collect headings
	function extractHeadingsPlugin() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (tree: any, file: any) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			visit(tree, "heading", (node: any) => {
				if (node.depth < minDepth || node.depth > maxDepth) return
				const text = extractText(node)
				if (!text) return
				const id = slugger.slug(text)
				headings.push({ level: node.depth, text, id })
			})
			file.data.headings = headings
		}
	}

	const file = await remark().use(extractHeadingsPlugin).process(mdxCode)
	return (file.data.headings as MdxHeading[]) || []
}
