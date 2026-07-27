import fs from "fs-extra"
import path from "path"
import { Project, SourceFile } from "ts-morph"

function formatCode(code: string) {
	code = code
		.replaceAll("@/styles/default", "@/registry")
		.replaceAll("@/styles/sera", "@/registry")
	return code
}

export type RegistryType = "ui" | "component" | "page" | "hook" | "animated"

type RegistryItem = {
	name: string
	dependencies?: string[]
	registryDependencies?: string[]
	files: RegistryFile[]
	type: string
}

type RegistryFile = {
	name: string
	content: string
	type: RegistryType
}

const project = new Project({
	compilerOptions: {},
})

// Define constants for file paths and ignored dependencies
const IGNORED_DEPENDENCIES = [
	"react",
	"react-dom",
	"lucide-react",
	"class-variance-authority",
	"next",
]

const STYLES_DIRECTORY_PATH = path.resolve("src/styles")
const PUBLIC_STYLES_PATH = path.resolve("public/r/styles")

/**
 * Reads the content of a given file.
 */
async function getContent(filePath: string): Promise<string> {
	return await fs.readFile(filePath, "utf-8")
}

/**
 * Creates a TypeScript AST source file from the given file path.
 */
async function getSourceFile(filePath: string): Promise<SourceFile> {
	const content = await getContent(filePath)
	return project.createSourceFile(filePath, content, { overwrite: true })
}

/**
 * Extracts external dependencies (npm modules) from a component file.
 * Ignores predefined dependencies like React and other UI libraries.
 */
async function getDependencyArray(filePath: string): Promise<string[]> {
	const dependencies = new Set<string>()
	const sourceFile = await getSourceFile(filePath)

	sourceFile.getImportDeclarations().forEach((importDeclaration) => {
		const moduleName = importDeclaration.getModuleSpecifierValue()

		if (
			!moduleName.startsWith("@/") &&
			!moduleName.startsWith("./") &&
			!moduleName.startsWith("../")
		) {
			const baseModule =
				!moduleName.startsWith("@") && moduleName.includes("/")
					? moduleName.split("/")[0]
					: moduleName
			if (!IGNORED_DEPENDENCIES.includes(baseModule)) {
				dependencies.add(baseModule)
			}
		}
	})

	return Array.from(dependencies)
}

/**
 * Extracts registry dependencies (local component imports) from a file.
 * Filters out ignored dependencies and ensures only valid component references are added.
 */
async function getRegistryDependencyArray(filePath: string): Promise<string[]> {
	const registryDependencies = new Set<string>()
	const sourceFile = await getSourceFile(filePath)

	sourceFile.getImportDeclarations().forEach((importDeclaration) => {
		const moduleName = importDeclaration.getModuleSpecifierValue()

		if (IGNORED_DEPENDENCIES.includes(moduleName)) return

		// Check if import is a local component inside the registry or styles
		if (
			moduleName.startsWith("@/styles/") ||
			moduleName.startsWith("@/registry/ui/") ||
			moduleName.startsWith("./") ||
			moduleName.startsWith("../")
		) {
			const importedPath = path.resolve(path.dirname(filePath), moduleName)
			const importedFile = path
				.basename(importedPath)
				.replace(/\.(tsx?|js)$/, "")
			// Make sure we only add it if it doesn't map to a generic internal path like lib utils
			if (importedFile !== "utils") {
				registryDependencies.add(importedFile)
			}
		}
	})

	return Array.from(registryDependencies)
}

/**
 * Generates and writes the `<style>.json` registry files.
 * Scans all styles, extracts dependencies, and saves the structured output.
 */
async function writeStylesJSON() {
	try {
		// Ensure output directory exists
		await fs.ensureDir(PUBLIC_STYLES_PATH)

		// Get all style directories (e.g., default, sera)
		const styleDirs = await fs.readdir(STYLES_DIRECTORY_PATH)

		for (const styleName of styleDirs) {
			const stylePath = path.join(STYLES_DIRECTORY_PATH, styleName)

			// Only process directories
			const stat = await fs.stat(stylePath)
			if (
				!stat.isDirectory() ||
				styleName === "fonts" ||
				styleName === "themes"
			)
				continue

			const uiPath = path.join(stylePath, "ui")
			if (!(await fs.pathExists(uiPath))) continue

			const componentJSONContent: RegistryItem[] = []
			const uiComponents = await fs.readdir(uiPath)

			const items: {
				name: string
				type: RegistryType
			}[] = []

			uiComponents.map((component) =>
				items.push({ name: component, type: "ui" })
			)

			for (const component of items) {
				// Process only TypeScript component files
				if (!component.name.endsWith(".tsx")) continue

				const filePath = path.join(uiPath, component.name)

				const name = component.name.replace(/\.(tsx?|js)$/, "")

				// Extract dependencies and content asynchronously
				const [dependencyArray, registryDependencyArray, content] =
					await Promise.all([
						getDependencyArray(filePath),
						getRegistryDependencyArray(filePath),
						formatCode(await getContent(filePath)),
					])

				// Create the registry file object
				const registryFile: RegistryFile = {
					name: component.name,
					content: content,
					type: component.type,
				}

				// Construct the registry item
				const registryItem: RegistryItem = {
					name,
					files: [registryFile],
					...(dependencyArray.length > 0 && { dependencies: dependencyArray }),
					...(registryDependencyArray.length > 0 && {
						registryDependencies: registryDependencyArray,
					}),
					type: component.type,
				}

				componentJSONContent.push(registryItem)
			}

			const outputPath = path.join(PUBLIC_STYLES_PATH, `${styleName}.json`)
			// Write the collected registry data to the JSON file
			await fs.writeFile(
				outputPath,
				JSON.stringify(componentJSONContent, null, 2)
			)
			console.log(`Style JSON generated successfully at: ${outputPath}`)
		}
	} catch (error) {
		console.error("Error generating style JSON:", error)
	}
}

await writeStylesJSON()
