import { config } from "dotenv"
import { promises as fs } from "node:fs"
import { app } from "@/config/llms-config"
import { NavigationItem, NavigationSection, navigationItems } from "@/config/navigation-config"

config({ path: ".env" })

// ===== Helpers =====

function toTitleCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function buildItemLine(item: NavigationItem): string {
	if (item.isExternal) return ""
	const label = item.isComingSoon ? `${item.title} (coming soon)` : item.title
	const description = item.description ? `${item.description}` : `Detailed documentation for ${item.title}`
	const url = item.isExternal ? item.url : `${item.url}.md`
	return `- [${label}](${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}): ${description}`
}

// ===== Builders =====

async function buildLlmsTxt(sections: NavigationSection[]) {
	const lines: string[] = []

	// Header
	lines.push(`# ${app.name} Documentation for LLMs`)
	lines.push("")
	lines.push(`> ${app.description}`)
	lines.push("")
	lines.push(
		"This documentation is designed for AI agents and LLMs, providing structured Markdown files optimized for context retrieval, semantic understanding, and automated code generation."
	)
	lines.push("")

	// Sections
	for (const section of sections) {
		if (section.title === "Blocks" || section.title === "Animations") continue
		lines.push(`## ${toTitleCase(section.title)}`)
		lines.push("")

		if (section.description) {
			lines.push(`> ${section.description}`)
			lines.push("")
		}

		for (const item of section.items) {
			// Skip disabled items without a valid URL
			if (item.disabled && !item.url) continue

			lines.push(buildItemLine(item))

			// Expand subItems as nested entries
			if (item.subItems?.length) {
				for (const sub of item.subItems) {
					const subDescription = `Detailed documentation for ${item.title} (${sub.title})`
					lines.push(`- [${item.title} — ${sub.title}](${process.env.NEXT_PUBLIC_WEBSITE_URL}${sub.url}.md): ${subDescription}`)
				}
			}
		}

		lines.push("")
	}

	await fs.writeFile("public/llms.txt", lines.join("\n"))
	console.log("✅ llms.txt built successfully")
}

// async function buildLlmsFullTxt(sections: NavigationSection[]) {
// 	const lines: string[] = []

// 	lines.push(`# ${app.name} — Full Documentation Index`)
// 	lines.push("")
// 	lines.push("> Complete flat index of all documentation pages.")
// 	lines.push("")

// 	for (const section of sections) {
// 		lines.push(`\n## ${toTitleCase(section.title)}`)
// 		lines.push("")

// 		for (const item of section.items) {
// 			if (item.disabled && !item.url) continue

// 			lines.push(buildItemLine(item))

// 			if (item.subItems?.length) {
// 				for (const sub of item.subItems) {
// 					lines.push(`  - [${item.title} — ${sub.title}](${process.env.NEXT_PUBLIC_WEBSITE_URL}${sub.url}.md): Detailed documentation for ${item.title} (${sub.title})`)
// 				}
// 			}
// 		}
// 	}

// 	await fs.writeFile("public/llms-full.txt", lines.join("\n"))
// 	console.log("✅ llms-full.txt built successfully")
// }

// ===== Entry =====

async function build() {
	await Promise.all([buildLlmsTxt(navigationItems) /*, buildLlmsFullTxt(navigationItems)*/])
}

build()
