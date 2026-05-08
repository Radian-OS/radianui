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

const leftPanelIndex = ICON_SLOT_REPLACEMENTS.findIndex(
	({ slot }) => slot === "left-panel"
)
const data = ICON_SLOT_REPLACEMENTS.slice(0, leftPanelIndex + 1)

// write JSON
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log("✅ Extracted & saved JSON at:", outputPath)
