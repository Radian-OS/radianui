import { allDocs } from "contentlayer/generated"
import { NextRequest, NextResponse } from "next/server"
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

function buildFrontmatter(doc: (typeof allDocs)[number]): string {
	const lines: string[] = ["---"]

	lines.push(`title: ${doc.title}`)
	lines.push(`description: ${doc.description}`)

	if (doc.apiRef) lines.push(`apiRef: ${doc.apiRef}`)
	if (doc.source) lines.push(`source: ${doc.source}`)
	if (doc.externalSiteRef) lines.push(`externalSiteRef: ${doc.externalSiteRef}`)
	if (doc.externalSiteName)
		lines.push(`externalSiteName: ${doc.externalSiteName}`)
	if (doc.customLogo) lines.push(`customLogo: ${doc.customLogo}`)

	if (doc.links) {
		lines.push("links:")
		if (doc.links.github) {
			lines.push("  github:")
			lines.push(`    href: ${doc.links.github.href}`)
		}
		if (doc.links.externalReference && doc.links.externalReference.length > 0) {
			lines.push("  externalReference:")
			for (const ref of doc.links.externalReference) {
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

	const doc = allDocs.find((d) => d.slugAsParams === slugAsParams)

	if (!doc) {
		return new NextResponse(
			`# Not Found\n\nNo documentation found for: ${slugAsParams}`,
			{
				status: 404,
				headers: { "Content-Type": "text/plain; charset=utf-8" },
			}
		)
	}

	const frontmatter = buildFrontmatter(doc)
	const expandedBody = expandMdxComponents(doc.rawMdx)
	const fullContent = `${frontmatter}\n\n${expandedBody}`

	return new NextResponse(fullContent, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
