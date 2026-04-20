import { type PartialInitConfig } from "@/config/initSchema"
import { type Preset } from "@/registry/schema"
import { fetchPreset } from "@/utils/preset"
import { spinner } from "@/utils/spinner"

/**
 * Fetches preset and extracts config values from it.
 * Returns empty partial if no preset code provided.
 */
export async function resolvePreset(
	presetCode?: string
): Promise<PartialInitConfig> {
	if (!presetCode) return { cwd: "" }

	const s = spinner(`Fetching preset ${presetCode}`).start()
	try {
		const preset = await fetchPreset(presetCode)
		s.succeed()

		return {
			cwd: "",
			preset,
			projectName: preset.name ?? preset.config?.name,
			framework:
				preset.config?.config?.template === "vite" ? "vite" : "next-app",
		}
	} catch (err) {
		s.fail()
		throw err
	}
}
