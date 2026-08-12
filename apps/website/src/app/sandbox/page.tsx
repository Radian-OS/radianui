import fs from "fs"
import type { Metadata } from "next"
import path from "path"
import { PlaygroundClient } from "./playground-client"

export const metadata: Metadata = {
	title: "Interactive Component Playground — Radian OS",
	description:
		"Explore Radian UI components in our interactive sandbox. Test live previews on mobile, tablet, and desktop viewports, read source code, and toggle light/dark modes.",
}

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

export default function PlaygroundPage() {
	const testDir = path.join(process.cwd(), "src/app/sandbox/test")
	const test2Dir = path.join(process.cwd(), "src/app/sandbox/test2")

	const testFiles = [
		"logo-section.tsx",
		"logo-marquee.tsx",
		"logo-icon.tsx",
		"page.tsx",
	]
	const test2Files = ["faq-section.tsx", "page.tsx"]

	const testData: Record<string, string> = {}
	const test2Data: Record<string, string> = {}

	for (const file of testFiles) {
		testData[file] = readFileContent(testDir, file)
	}

	for (const file of test2Files) {
		test2Data[file] = readFileContent(test2Dir, file)
	}

	const files = {
		test: testData,
		test2: test2Data,
	}

	return <PlaygroundClient files={files} />
}
