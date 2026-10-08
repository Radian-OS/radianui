import fs from "fs"
import { redirect } from "next/navigation"
import path from "path"
import { getCurrentUser } from "@/lib/auth"
import { PlaygroundClient } from "./playground-client"
import { sandboxComponents } from "./components/types"

// Function to read file content safely
function readFileContent(dirPath: string, fileName: string): string {
	try {
		const fullPath = path.join(dirPath, fileName)
		if (fs.existsSync(fullPath)) {
			return fs.readFileSync(fullPath, "utf-8")
		}
		return `// Error: File ${fileName} not found at ${fullPath}`
	} catch (error) {
		console.error(`Error reading ${fileName}:`, error)
		return `// Error reading file ${fileName}`
	}
}

export default async function PlaygroundPage() {
	const user = await getCurrentUser()
	// comment this section to disable auth
	if (!user) {
		redirect("/sandbox/auth/sign-in?callbackUrl=/sandbox")
	}

	const files: Record<string, Record<string, string>> = {}

	for (const comp of sandboxComponents) {
		const compKey = comp.filesKey || comp.id
		const compPath = path.join(process.cwd(), comp.path)
		files[compKey] = {}

		try {
			if (fs.existsSync(compPath)) {
				const dirFiles = fs.readdirSync(compPath)
				for (const file of dirFiles) {
					if (
						fs.statSync(path.join(compPath, file)).isFile() &&
						(file.endsWith(".ts") || file.endsWith(".tsx"))
					) {
						files[compKey][file] = readFileContent(compPath, file)
					}
				}
			}
		} catch (error) {
			console.error(`Error processing component ${compKey}:`, error)
		}
	}

	return <PlaygroundClient files={files} />
}
