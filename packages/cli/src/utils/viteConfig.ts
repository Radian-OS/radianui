import fs from "fs-extra"
import path from "path"
import { Project } from "ts-morph"
import { txt } from "@/utils/colors"

export const updateViteConfig = async (projectPath: string) => {
	const viteConfigPath = path.join(projectPath, "vite.config.ts")
	const viteTemplate = `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`

	try {
		if (await fs.pathExists(viteConfigPath)) {
			await fs.writeFile(viteConfigPath, viteTemplate, "utf8")
		}
	} catch (err) {
		throw new Error(`Failed to update vite.config.ts: ${err}`)
	}
}

export const updateViteEntryFile = async (projectDir: string) => {
	try {
		const mainTsxPath = path.join(projectDir, "src", "main.tsx")

		if (!(await fs.pathExists(mainTsxPath))) {
			throw new Error(`${txt.bold(txt.info("main.tsx"))} file not found.`)
		}

		// Read the existing main.tsx file
		const content = await fs.readFile(mainTsxPath, "utf8")

		// Use ts-morph to parse and manipulate the file
		const project = new Project({
			useInMemoryFileSystem: true,
		})

		const sourceFile = project.createSourceFile(mainTsxPath, content)

		// Check if ./index.css import already exists
		const existingImports = sourceFile.getImportDeclarations()
		const hasIndexCssImport = existingImports.some((imp) => {
			const moduleSpecifier = imp.getModuleSpecifierValue()
			return moduleSpecifier === "./index.css" || moduleSpecifier === "index.css"
		})

		if (!hasIndexCssImport) {
			sourceFile.addImportDeclaration({
				moduleSpecifier: "./index.css",
			})
		}

		// Write back the updated content
		await fs.writeFile(mainTsxPath, sourceFile.getFullText(), "utf8")
	} catch (err) {
		throw new Error(`Failed to update main.tsx: ${err instanceof Error ? err.message : String(err)}`)
	}
}
