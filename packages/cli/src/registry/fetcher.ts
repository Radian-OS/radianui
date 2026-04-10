import { REGISTRY_URL } from "@/registry/constants"
import { RegistryError, RegistryFetchError } from "@/registry/errors"
import { registryItemSchema } from "@/registry/schema"

export async function fetchRegistry(
	paths: string[],
	options: { useCache?: boolean } = {}
) {
	const results = await Promise.all(
		paths.map(async (path) => {
			const url = isFullUrl(path) ? path : `${REGISTRY_URL}/${path}`

			try {
				const response = await fetch(url)

				if (!response.ok) {
					throw new RegistryFetchError(url, response.status)
				}

				return await response.json()
			} catch (error) {
				if (error instanceof RegistryError) {
					throw error
				}
				throw new RegistryFetchError(url)
			}
		})
	)

	return results
}

export async function fetchRegistryLocal(filePath: string) {
	const fs = await import("fs-extra")
	const content = await fs.default.readJson(filePath)
	return registryItemSchema.parse(content)
}

function isFullUrl(str: string) {
	try {
		new URL(str)
		return true
	} catch {
		return false
	}
}
