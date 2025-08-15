import fs from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const file = searchParams.get("file")

		if (!file) {
			return NextResponse.json({ error: "File parameter is required" }, { status: 400 })
		}

		// Security: Prevent directory traversal attacks
		if (file.includes("..") || file.startsWith("/") || file.includes("\\")) {
			return NextResponse.json({ error: "Invalid file path" }, { status: 400 })
		}

		// Construct the full path relative to the project root
		const fullPath = path.join(process.cwd(), file)

		// Check if file exists
		if (!fs.existsSync(fullPath)) {
			return NextResponse.json({ error: "File not found" }, { status: 404 })
		}

		// Read the file content
		const content = fs.readFileSync(fullPath, "utf-8")

		return NextResponse.json({ content })
	} catch (error) {
		console.error("Error reading file:", error)
		return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
	}
}
