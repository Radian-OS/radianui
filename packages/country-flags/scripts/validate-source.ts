import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null
}

const packageDirectory = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	".."
)
const manifestPath = path.join(packageDirectory, "source", "manifest.json")
const flagsDirectory = path.join(packageDirectory, "source", "flags")

const manifest: unknown = JSON.parse(await readFile(manifestPath, "utf8"))
const sourceFiles = (await readdir(flagsDirectory))
	.filter((file) => file.endsWith(".svg"))
	.sort()

assert.ok(isRecord(manifest), "The source manifest must be an object")
assert.equal(manifest.schemaVersion, 1, "Unsupported manifest schema version")
assert.equal(manifest.license, "MIT", "The source manifest must declare MIT")
assert.ok(Array.isArray(manifest.flags), "manifest.flags must be an array")

const ids = new Set<string>()
const files = new Set<string>()
const countryCodes = new Set<string>()

for (const [index, flag] of manifest.flags.entries()) {
	assert.ok(isRecord(flag), `Flag at index ${index} must be an object`)
	assert.ok(typeof flag.id === "string", `Flag at index ${index} has no ID`)
	assert.ok(
		typeof flag.name === "string",
		`Missing display name for ${flag.id}`
	)
	assert.ok(typeof flag.file === "string", `Missing file for ${flag.id}`)
	assert.ok(Array.isArray(flag.codes), `Missing country codes for ${flag.id}`)

	assert.match(flag.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid ID: ${flag.id}`)
	assert.ok(flag.name.trim(), `Missing display name for ${flag.id}`)
	assert.equal(flag.file, `${flag.id}.svg`, `File must match ID: ${flag.id}`)
	assert.ok(!ids.has(flag.id), `Duplicate flag ID: ${flag.id}`)
	assert.ok(!files.has(flag.file), `Duplicate flag file: ${flag.file}`)
	assert.equal(
		flag.codes.length > 0,
		flag.id !== "placeholder",
		`${flag.id} has an invalid number of country codes`
	)

	if (flag.circleViewBox !== undefined) {
		assert.ok(
			typeof flag.circleViewBox === "string",
			`Invalid circle viewBox for ${flag.id}`
		)
		const values = flag.circleViewBox.trim().split(/\s+/).map(Number)
		assert.equal(
			values.length,
			4,
			`${flag.id} circle viewBox must contain four numbers`
		)
		assert.ok(
			values.every(Number.isFinite),
			`${flag.id} circle viewBox contains an invalid number`
		)
		assert.ok(
			values[2] > 0 && values[3] > 0,
			`${flag.id} circle viewBox must have a positive size`
		)
		assert.equal(
			values[2],
			values[3],
			`${flag.id} circle viewBox must be square`
		)
	}

	for (const code of flag.codes) {
		assert.ok(typeof code === "string", `Invalid country code for ${flag.id}`)
		assert.match(
			code,
			/^(?:[A-Z]{2,8}|[A-Z]{2}-[A-Z0-9]{1,8})$/,
			`Invalid country code: ${code}`
		)
		assert.ok(!countryCodes.has(code), `Duplicate country code: ${code}`)
		countryCodes.add(code)
	}

	ids.add(flag.id)
	files.add(flag.file)
}

const manifestFiles = [...files].sort()
assert.deepEqual(
	manifestFiles,
	sourceFiles,
	"The manifest and source/flags directory must contain the same SVG files"
)

for (const file of sourceFiles) {
	const svg = await readFile(path.join(flagsDirectory, file), "utf8")

	assert.match(svg, /^<svg\b/, `${file} must start with an <svg> element`)
	assert.match(
		svg,
		/\bviewBox="0 0 24 24"/,
		`${file} must use viewBox 0 0 24 24`
	)
	assert.doesNotMatch(svg, /<script\b/i, `${file} contains a script element`)
	assert.doesNotMatch(
		svg,
		/<foreignObject\b/i,
		`${file} contains foreignObject`
	)
	assert.doesNotMatch(
		svg,
		/\son[a-z]+\s*=/i,
		`${file} contains an event handler`
	)
	assert.doesNotMatch(
		svg,
		/(?:href|src)=["'](?:https?:)?\/\//i,
		`${file} contains an external resource`
	)
}

console.log(`Validated ${sourceFiles.length} canonical flag SVGs.`)
