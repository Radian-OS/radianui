// Each image loads independently. Retry through another jsDelivr edge rather
// than allowing a stalled request to block the rest of the gallery.
export function getBrandLogoPreviewSource(src: string, attempt: number) {
	if (attempt === 0) return src
	const url = new URL(src)
	const hosts = [
		"fastly.jsdelivr.net",
		"gcore.jsdelivr.net",
		"cdn.jsdelivr.net",
	]
	url.hostname = hosts[(attempt - 1) % hosts.length]
	if (attempt > hosts.length)
		url.searchParams.set("retry", String(Math.floor(attempt / hosts.length)))
	return url.toString()
}
