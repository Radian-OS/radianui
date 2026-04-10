import { REGISTRY_URL } from "@/registry/constants"
import { parseRegistryAndItemFromString } from "@/registry/parser"
import { Config } from "@/utils/getConfig"

/**
 * Resolves a registry URL from a relative or absolute path.
 */
export function resolveRegistryUrl(path: string) {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path
	}
	return `${REGISTRY_URL}/${path}`
}

/**
 * Build the full URL and any authentication headers for a registry item.
 */
export function buildUrlAndHeadersForRegistryItem(
	item: string,
	config: Config
): { url: string; headers: Record<string, string> } | null {
	if (!item.startsWith("@")) {
		return null
	}

	const { registry, item: itemName } = parseRegistryAndItemFromString(item)

	if (!registry || !config.registries?.[registry]) {
		return null
	}

	const registryConfig = config.registries[registry]

	let url: string
	let headers: Record<string, string> = {}

	if (typeof registryConfig === "string") {
		url = registryConfig
			.replace("{name}", itemName)
			.replace("{style}", config.style ?? "new-york-v4")
	} else {
		url = registryConfig.url
			.replace("{name}", itemName)
			.replace("{style}", config.style ?? "new-york-v4")

		if (registryConfig.headers) {
			headers = { ...registryConfig.headers }
		}
	}

	return { url, headers }
}
