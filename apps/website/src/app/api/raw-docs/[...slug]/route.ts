import fs from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { docsSource } from "@/lib/source"
import Examples from "@/registry/example/example.json"

// Flatten all example files into a single lookup map: path -> source code
const exampleMap = new Map<string, string>(
	Examples.flatMap(
		(group: { name: string; files: { name: string; content: string }[] }) =>
			group.files.map((f) => [f.name, f.content])
	)
)

/**
 * Replace <ComponentPreview path="..." /> with the actual TSX source code block.
 * Any other unknown MDX components are left as-is.
 */
function expandMdxComponents(rawMdx: string): string {
	// Replace <ComponentPreview path="some/path" /> with fenced code block
	const expanded = rawMdx.replace(
		/<ComponentPreview\s+path="([^"]+)"[^/]*\/>/g,
		(_match, path: string) => {
			const code = exampleMap.get(path)
			if (!code) return `<!-- ComponentPreview: ${path} (source not found) -->`
			return `\`\`\`tsx\n${code}\n\`\`\``
		}
	)

	return expanded
}

function buildFrontmatter(doc: any): string {
	const lines: string[] = ["---"]

	lines.push(`title: ${doc.data.title}`)
	lines.push(`description: ${doc.data.description}`)

	if (doc.data.apiRef) lines.push(`apiRef: ${doc.data.apiRef}`)
	if (doc.data.source) lines.push(`source: ${doc.data.source}`)
	if (doc.data.externalSiteRef)
		lines.push(`externalSiteRef: ${doc.data.externalSiteRef}`)
	if (doc.data.externalSiteName)
		lines.push(`externalSiteName: ${doc.data.externalSiteName}`)
	if (doc.data.customLogo) lines.push(`customLogo: ${doc.data.customLogo}`)

	if (doc.data.links) {
		lines.push("links:")
		if (doc.data.links.github) {
			lines.push("  github:")
			lines.push(`    href: ${doc.data.links.github.href}`)
		}
		if (doc.data.links.figma) {
			lines.push("  figma:")
			lines.push(`    href: ${doc.data.links.figma.href}`)
		}
		if (
			doc.data.links.externalReference &&
			doc.data.links.externalReference.length > 0
		) {
			lines.push("  externalReference:")
			for (const ref of doc.data.links.externalReference) {
				lines.push(`    - label: ${ref.label}`)
				lines.push(`      href: ${ref.href}`)
				if (ref.icon) lines.push(`      icon: ${ref.icon}`)
			}
		}
	}

	lines.push("---")
	return lines.join("\n")
}

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> }
) {
	const { slug } = await params
	const slugAsParams = slug.join("/")

	const doc = docsSource.getPage(slug)

	if (!doc) {
		return new NextResponse(
			`# Not Found\n\nNo documentation found for: ${slugAsParams}`,
			{
				status: 404,
				headers: { "Content-Type": "text/plain; charset=utf-8" },
			}
		)
	}

	const filePath = path.join(process.cwd(), "src/content/docs", doc.path)
	const rawMdx = fs.existsSync(/*turbopackIgnore: true*/ filePath)
		? fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8")
		: ""
	// Remove the frontmatter from rawMdx if present
	const rawBody = rawMdx.replace(/^---\n[\s\S]*?\n---\n/, "")

	const frontmatter = buildFrontmatter(doc)
	const expandedBody = expandMdxComponents(rawBody)
	const fullContent = `${frontmatter}\n\n${expandedBody}`

	return new NextResponse(fullContent, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
