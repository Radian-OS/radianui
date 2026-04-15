import { logger } from "@/utils/logger"

export async function getGlobalCssV4() {
	const url =
		process.env.RADIANUI_GLOBAL_CSS_V4_URL ??
		"http://radianos.com/css/globals.css"

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(
				`Failed to fetch global CSS from ${url}. Status: ${response.status} - ${response.statusText}`
			)
		}

		const content = await response.text()
		return content
	} catch (error) {
		logger.warn(
			`Unable to fetch global CSS template from ${url}. Using bundled template instead.`
		)
	}
}
