import fs from "fs"
import path from "path"
import { ICON_SLOT_REPLACEMENTS } from "@/data/icon-slot"

const outputPath = "public/r/icon/icon.json"

// ensure directory exists
const dir = path.dirname(outputPath)
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true })
	console.log("📁 Created directory:", dir)
}

// write JSON
fs.writeFileSync(outputPath, JSON.stringify(ICON_SLOT_REPLACEMENTS, null, 2))

console.log("Saved IconJSON at:", outputPath)
