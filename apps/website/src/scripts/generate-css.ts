import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Script lives at: src/scripts/generate-css.ts
// So we go up two levels to reach the project root (apps/website)
const PROJECT_ROOT: string = path.resolve(__dirname, "../../")

const SRC_CSS: string = path.join(PROJECT_ROOT, "src/css/globals.css")
const DEST_DIR: string = path.join(PROJECT_ROOT, "public/css")
const DEST_CSS: string = path.join(DEST_DIR, "globals.css")

function generate(): void {
	let content: string

	if (fs.existsSync(SRC_CSS)) {
		content = fs.readFileSync(SRC_CSS, "utf-8")
		console.log(`Read source: ${SRC_CSS}`)
	} else {
		console.warn(`  Source file not found at ${SRC_CSS}, using empty content.`)
		content = ""
	}

	//  Remove unwanted imports
	content = content.replace(/@import\s+["']\.\/website\.css["'];?\n?/g, "")
	content = content.replace(
		/@import\s+["'][^"']*registry\/styles\/style-[^"']+["'][^;\n]*;?\n?/g,
		""
	)

	// Remove unwanted @custom-variant declarations
	content = content.replace(
		/@custom-variant\s+style-(?:default|sera)\s+[^;]+;?\n?/g,
		""
	)

	// Collapse multiple blank lines into a single blank line
	content = content.replace(/\n{3,}/g, "\n\n")

	fs.mkdirSync(DEST_DIR, { recursive: true })
	fs.writeFileSync(DEST_CSS, content, "utf-8")

	console.log(` Generated: ${DEST_CSS}`)
}

generate()
