import fs from "fs-extra"
import path from "path"
import { Project, SourceFile } from "ts-morph"

type RegistryItem = {
	name: string
	dependencies?: string[]
	registryDependencies?: string[]
	files: RegistryFile[]
	type: string
}

type RegistryFile = {
	name: string
	dir: string
	content: string
}

const project = new Project({
	compilerOptions: {},
})

// Define constants for file paths and ignored dependencies
const IGNORED_DEPENDENCIES = ["react", "react-dom", "lucide-react", "class-variance-authority"]

const UI_DIRECTORY_PATH = path.resolve("src/registry/ui")
const REGISTRY_PATH = path.resolve("src/app/api/components/components.json")

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

		if (!IGNORED_DEPENDENCIES.includes(moduleName) && !moduleName.startsWith("@/") && !moduleName.startsWith("./")) {
			dependencies.add(moduleName)
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

		// Check if import is a local component inside the registry
		if (moduleName.startsWith("@/registry/ui/") || moduleName.startsWith("./")) {
			const importedPath = path.resolve(path.dirname(filePath), moduleName)
			const importedFile = path.basename(importedPath).replace(/\.(tsx?|js)$/, "")
			registryDependencies.add(importedFile)
		}
	})

	return Array.from(registryDependencies)
}

/**
 * Retrieves a list of component file names from the UI registry directory.
 */
async function getRegistryComponents(): Promise<string[]> {
	return await fs.readdir(UI_DIRECTORY_PATH)
}

/**
 * Generates and writes the `components.json` registry file.
 * Scans all components, extracts dependencies, and saves the structured output.
 */
async function writeComponentJSON() {
	const componentJSONContent: RegistryItem[] = []
	const components = await getRegistryComponents()

	for (const component of components) {
		// Process only TypeScript component files
		if (!component.endsWith(".tsx")) continue

		const filePath = path.join(UI_DIRECTORY_PATH, component)
		const name = component.replace(/\.(tsx?|js)$/, "")

		// Extract dependencies and content asynchronously
		const [dependencyArray, registryDependencyArray, content] = await Promise.all([getDependencyArray(filePath), getRegistryDependencyArray(filePath), getContent(filePath)])

		// Create the registry file object
		const registryFile: RegistryFile = {
			name: component,
			dir: "components/ui",
			content: content,
		}

		// Construct the registry item
		const registryItem: RegistryItem = {
			name,
			files: [registryFile],
			...(dependencyArray.length > 0 && { dependencies: dependencyArray }),
			...(registryDependencyArray.length > 0 && {
				registryDependencies: registryDependencyArray,
			}),
			type: "ui",
		}

		componentJSONContent.push(registryItem)
	}

	// Write the collected registry data to the JSON file
	await fs.writeFile(REGISTRY_PATH, JSON.stringify(componentJSONContent, null, 2))
}

await writeComponentJSON()
