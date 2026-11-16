import { type PartialInitConfig } from "@/config/initSchema"
import { DEFAULT_ICON_LIBRARY, DEFAULT_PROJECT_NAME, DEFAULT_STYLE } from "@/registry/constants"
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
			projectName: preset.name ?? DEFAULT_PROJECT_NAME,
			framework:
				preset.config?.template === "vite" ? "vite" : "next-app",
			useSrcDir: preset.config?.useSrcDir ?? true,
			style: preset.config?.style ?? DEFAULT_STYLE,
			iconLibrary: preset.config?.iconLibrary ?? DEFAULT_ICON_LIBRARY,
		}
	} catch (err) {
		s.fail()
		throw err
	}
}
