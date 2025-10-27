import fs from "fs/promises"
import path from "path"

const sourcePath = path.resolve("./src/registry/example")
const outputPath = path.join(process.cwd(), "src/registry/example/example.json")

type ExampleFile = {
	name: string
	content: string
}

type ExampleItem = {
	name: string
	files: ExampleFile[]
}

// Function to process a component folder
async function processExampleFolder(componentFolder: string, componentName: string): Promise<ExampleItem> {
	const entries = await fs.readdir(componentFolder)
	const files: ExampleFile[] = []

	for (const entry of entries) {
		const entryPath = path.join(componentFolder, entry)
		const stat = await fs.stat(entryPath)

		if (stat.isFile()) {
			const rawCode = await fs.readFile(entryPath, "utf-8")
			const code = rawCode.replaceAll("@/registry/ui/", "@/components/ui/").replaceAll("@/registry/hooks/", "@/hooks/")

			files.push({
				name: `${componentName}/${path.basename(entry, path.extname(entry))}`,
				content: code,
			})
		}
	}

	return {
		name: componentName,
		files,
	}
}

async function generateExamplesJSON() {
	try {
		console.log("Processing example components...")
		const components = await fs.readdir(sourcePath)
		const examplesData: ExampleItem[] = []

		for (const component of components) {
			const componentFolder = path.join(sourcePath, component)
			const stat = await fs.stat(componentFolder)

			if (stat.isDirectory()) {
				const exampleItem = await processExampleFolder(componentFolder, component)
				examplesData.push(exampleItem)
			}
		}

		// Ensure output directory exists
		await fs.mkdir(path.dirname(outputPath), { recursive: true })

		// Write the examples.json file
		await fs.writeFile(outputPath, JSON.stringify(examplesData, null, 2), "utf-8")
		console.log(`Examples JSON generated successfully at: ${outputPath}`)
	} catch (error) {
		console.error("Error generating examples JSON:", error)
	}
}

// Execute the script
generateExamplesJSON()
