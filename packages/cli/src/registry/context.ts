/**
 * Global registry context for storing per-request headers.
 * Used by the fetcher to attach authentication headers.
 */
let _registryHeaders: Record<string, Record<string, string>> = {}

export function setRegistryHeaders(
	headers: Record<string, Record<string, string>>
) {
	_registryHeaders = headers
}

export function getRegistryHeaders() {
	return _registryHeaders
}

export function getHeadersForUrl(url: string): Record<string, string> {
	return _registryHeaders[url] ?? {}
}
