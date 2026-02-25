import { promises as fs } from "node:fs"
import { app } from "@/config/llms-config"

type RegistryFile = {
	name: string
	content: string
	type?: string
}

type RegistryItem = {
	name: string
	files: RegistryFile[]
	dependencies?: string[]
	type?: string
}

async function buildComponents(components: RegistryItem[]) {
	const lines: string[] = []

	lines.push(`# ${app.name} Components`)
	lines.push("")
	lines.push("> These are the core UI component source files.")
	lines.push("")

	for (const component of components) {
		const sectionTitle = component.name.charAt(0).toUpperCase() + component.name.slice(1)
		lines.push(`\n## ${sectionTitle}`)

		if (component.dependencies?.length) {
			lines.push("")
			lines.push(`**Dependencies:** ${component.dependencies.join(", ")}`)
		}

		for (const file of component.files) {
			lines.push(`\n### ${file.name}`)
			lines.push("")
			lines.push("```tsx")
			lines.push(file.content.trimEnd())
			lines.push("```")
		}
	}

	await fs.writeFile("public/llms.txt", lines.join("\n"))
	console.log("✅ llms-components.txt built successfully")
}

async function buildExamples(examples: RegistryItem[]) {
	const lines: string[] = []

	lines.push(`# ${app.name} Component Examples`)
	lines.push("")
	lines.push("> These are usage examples for each component.")
	lines.push("")

	for (const component of examples) {
		const sectionTitle = component.name.charAt(0).toUpperCase() + component.name.slice(1)
		lines.push(`\n## ${sectionTitle}`)

		for (const file of component.files) {
			lines.push(`\n### [${file.name}]`)
			lines.push("")
			lines.push("```tsx")
			lines.push(file.content.trimEnd())
			lines.push("```")
		}
	}

	await fs.writeFile("public/llms-full.txt", lines.join("\n"))
	console.log("✅ llms-full.txt built successfully")
}

async function build() {
	const [examplesData, componentsData] = await Promise.all([
		fs.readFile("src/registry/example/example.json", "utf8"),
		fs.readFile("src/app/api/components/components.json", "utf8"),
	])

	const examples: RegistryItem[] = JSON.parse(examplesData)
	const components: RegistryItem[] = JSON.parse(componentsData)

	await Promise.all([buildComponents(components), buildExamples(examples)])
}

build()
