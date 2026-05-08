import fs from "fs"
import path from "path"

const filePath = "src/data/icon-slot.ts"
const outputPath = "public/r/icon/icon.json"

// ensure directory exists
const dir = path.dirname(outputPath)
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true })
	console.log("📁 Created directory:", dir)
}

// read file
const content = fs.readFileSync(filePath, "utf-8")

// extract ICON_SLOT_REPLACEMENTS only
const match = content.match(
	/ICON_SLOT_REPLACEMENTS\s*=\s*(\[[\s\S]*?\])\s*as const/
)

if (!match) {
	throw new Error("ICON_SLOT_REPLACEMENTS not found")
}

// convert TS → JS
const arrayString = match[1]

//  safe here (your own file)
const data = eval(arrayString)

// write JSON
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log("✅ Extracted & saved JSON at:", outputPath)
