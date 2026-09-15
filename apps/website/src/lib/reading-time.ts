/**
 * Calculate estimated reading time from MDX/Markdown content.
 *
 * @param source Raw MDX or Markdown string
 * @param wordsPerMinute Reading speed in words per minute (default: 200)
 * @returns Formatted reading time string (e.g. "14 min read")
 */
export function calculateReadingTime(
	source?: string,
	wordsPerMinute = 200
): string {
	if (!source) return "1 min read"

	const clean = source
		// Strip YAML frontmatter
		.replace(/^---[\s\S]*?---/, "")
		// Strip HTML/JSX comments
		.replace(/{\/\*[\s\S]*?\*\/}/g, "")
		.replace(/<!--[\s\S]*?-->/g, "")
		// Strip code block fences but keep code content
		.replace(/```[a-zA-Z0-9_-]*\n/g, " ")
		.replace(/```/g, " ")
		// Replace markdown images: keep alt text
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
		// Replace markdown links: keep link text
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		// For JSX/HTML elements: extract readable attributes (title, description, alt, label)
		.replace(/<[^>]+>/g, (tag) => {
			const texts: string[] = []
			const attrMatches = tag.matchAll(
				/(?:title|description|alt|label)="([^"]+)"/g
			)
			for (const match of attrMatches) {
				texts.push(match[1])
			}
			return " " + texts.join(" ") + " "
		})
		// Strip markdown formatting symbols
		.replace(/[#*`_~|>-]/g, " ")
		.trim()

	const words = clean.split(/\s+/).filter(Boolean).length
	const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))

	return `${minutes} min read`
}
