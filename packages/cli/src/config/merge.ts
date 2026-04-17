import { type PartialInitConfig } from "./initSchema"

/**
 * Merges multiple partial configs with left-to-right precedence.
 * The first source to define a field wins.
 *
 * Usage: merge(flags, preset, detected, defaults)
 *   → flags override preset, preset overrides detected, etc.
 */
export function mergeConfigs(
	...sources: PartialInitConfig[]
): PartialInitConfig {
	const result: PartialInitConfig = { cwd: "" }

	for (const source of sources) {
		for (const [key, value] of Object.entries(source)) {
			if (value !== undefined && (result as Record<string, unknown>)[key] === undefined) {
				;(result as Record<string, unknown>)[key] = value
			}
		}
		// cwd always takes the first non-empty value
		if (source.cwd && !result.cwd) {
			result.cwd = source.cwd
		}
	}

	return result
}
