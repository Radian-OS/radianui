import { type Preset } from "@/registry/schema"
import { PRESET_API_URL } from "./registry"

export async function fetchPreset(presetCode: string): Promise<Preset> {
	const res = await fetch(
		`${PRESET_API_URL}?id=${encodeURIComponent(presetCode)}`
	)
	if (!res.ok) {
		throw new Error(
			`Failed to fetch preset "${presetCode}": ${res.status} ${res.statusText}`
		)
	}
	return (await res.json()) as Preset
}
