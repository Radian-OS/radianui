import { promises as fs } from "node:fs"
import { app } from "@/config/llms-config"

type RegistryItem = {
	name: string
	files: {
		name: string
		content: string
	}[]
}

async function build() {
	const data = await fs.readFile("src/registry/example/example.json", "utf8")
	const components: RegistryItem[] = JSON.parse(data)

	const lines: string[] = []

	lines.push(`# ${app.name} Components Examples`)
	lines.push("")

	for (const component of components) {
		const sectionTitle = component.name.charAt(0).toUpperCase() + component.name.slice(1)

		lines.push(`\n## ${sectionTitle}`)

		for (const file of component.files) {
			lines.push(`- [${file.name}](${app.url}/docs/${file.name}.md)`)
		}
	}

	await fs.writeFile("public/llms.txt", lines.join("\n"))
}

build()
