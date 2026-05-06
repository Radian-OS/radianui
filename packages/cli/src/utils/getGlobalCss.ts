import { logger } from "@/utils/logger"

const GLOBAL_CSS_URL =
	process.env.RADIANUI_GLOBAL_CSS_URL ??
	"https://create.radianos.com/css/globals.css"

export async function getGlobalCssV4() {
	const globalCssUrl = GLOBAL_CSS_URL

	try {
		const response = await fetch(globalCssUrl)
		if (!response.ok) {
			throw new Error(
				`Failed to fetch global CSS from ${globalCssUrl}. Status: ${response.status} - ${response.statusText}`
			)
		}

		const content = await response.text()
		return content
	} catch (error) {
		logger.warn(
			`Unable to fetch global CSS template from ${globalCssUrl}. Using bundled template instead.`
		)
	}
}
