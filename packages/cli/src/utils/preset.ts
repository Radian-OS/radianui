import { type Preset, presetSchema } from "@/registry/schema"
import { PRESET_API_URL } from "./registry"


export async function fetchPreset(presetCode: string): Promise<Preset> {
	const res = await fetch(
		`${PRESET_API_URL}/${encodeURIComponent(presetCode)}`
	)
	if (!res.ok) {
		throw new Error(
			`Failed to fetch preset "${presetCode}": ${res.status} ${res.statusText}`
		)
	}
	const data = await res.json()
	const preset = presetSchema.parse(data)

	if (!preset.id) {
		preset.id = presetCode
	}

	return preset
}
