import { REGISTRY_URL } from "@/registry/constants"

/**
 * Fetch the registry index (list of all available components).
 */
export async function getShadcnRegistryIndex(
	options: { useCache?: boolean } = {}
) {
	try {
		const response = await fetch(`${REGISTRY_URL}/index.json`)
		if (!response.ok) {
			return null
		}
		return await response.json()
	} catch {
		return null
	}
}

/**
 * Fetch base color theme data from the registry.
 */
export async function getRegistryBaseColor(name: string) {
	try {
		const response = await fetch(`${REGISTRY_URL}/colors/${name}.json`)
		if (!response.ok) {
			return null
		}
		return await response.json()
	} catch {
		return null
	}
}
