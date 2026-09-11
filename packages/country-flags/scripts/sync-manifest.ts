import assert from "node:assert/strict"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { isoCountryCodes } from "./iso-country-codes"

interface FlagEntry {
	id: string
	name: string
	file: string
	circleViewBox?: string
	codes?: string[]
}

interface FlagManifest {
	schemaVersion: number
	license: string
	copyright: string
	flags: FlagEntry[]
}

const codeOverrides: Record<string, readonly string[]> = {
	abkhazia: ["GE-AB"],
	"antigua-and-barbuda": ["AG"],
	"azores-islands": ["PT-20"],
	"balearic-islands": ["ES-IB"],
	"basque-country": ["ES-PV"],
	bonaire: ["BQ", "BQ-BO"],
	"bosnia-and-herzegovina": ["BA"],
	"british-columbia": ["CA-BC"],
	"canary-islands": ["ES-CN"],
	ceuta: ["ES-CE"],
	"cocos-islands": ["CC"],
	corsica: ["FR-20R"],
	"czech-republic": ["CZ"],
	"democratic-republic-of-the-congo": ["CD"],
	"east-timor": ["TL"],
	england: ["GB-ENG"],
	"european-union": ["EU"],
	"galapagos-islands": ["EC-W"],
	hawaii: ["US-HI"],
	"hong-kong": ["HK"],
	"ivory-coast": ["CI"],
	kosovo: ["XK"],
	macao: ["MO"],
	madeira: ["PT-30"],
	melilla: ["ES-ML"],
	myanmar: ["MM"],
	nato: ["NATO"],
	"northern-cyprus": ["CY-TRNC"],
	palestine: ["PS"],
	"rapa-nui": ["CL-VS"],
	"republic-of-macedonia": ["MK"],
	"republic-of-the-congo": ["CG"],
	"saba-island": ["BQ-SA"],
	"sahrawi-arab-democratic-republic": ["EH"],
	"saint-kitts-and-nevis": ["KN"],
	"sao-tome-and-principe": ["ST"],
	sardinia: ["IT-88"],
	scotland: ["GB-SCT"],
	"sint-eustatius": ["BQ-SE"],
	somaliland: ["SO-SL"],
	"south-ossetia": ["GE-SO"],
	"st-barts": ["BL"],
	"st-vincent-and-the-grenadines": ["VC"],
	swaziland: ["SZ"],
	tibet: ["CN-XZ"],
	transnistria: ["MD-PMR"],
	"trinidad-and-tobago": ["TT"],
	turkey: ["TR"],
	"turks-and-caicos-islands": ["TC"],
	"united-kingdom": ["GB"],
	"united-nations": ["UN"],
	"virgin-islands": ["VI"],
	wales: ["GB-WLS"],
}

const packageDirectory = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	".."
)
const manifestPath = path.join(packageDirectory, "source", "manifest.json")
const displayNames = new Intl.DisplayNames(["en"], { type: "region" })

function normalize(value: string) {
	return value
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "")
}

const countryCodeByName = new Map<string, string>()

for (const code of isoCountryCodes) {
	const name = displayNames.of(code)

	if (name && name !== code) {
		countryCodeByName.set(normalize(name), code)
	}
}

const manifest = JSON.parse(
	await readFile(manifestPath, "utf8")
) as FlagManifest
const missingOverrides: string[] = []

for (const flag of manifest.flags) {
	const override = codeOverrides[flag.id]
	const inferredCode = countryCodeByName.get(normalize(flag.name))
	const codes = override ?? (inferredCode ? [inferredCode] : undefined)

	if (codes) {
		flag.codes = [...codes]
	} else {
		missingOverrides.push(flag.id)
	}
}

assert.deepEqual(
	missingOverrides,
	[],
	`Add country-code overrides for: ${missingOverrides.join(", ")}`
)

await writeFile(manifestPath, `${JSON.stringify(manifest, null, "\t")}\n`)

console.log(`Synchronized country codes for ${manifest.flags.length} flags.`)
