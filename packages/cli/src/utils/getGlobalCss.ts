import { logger } from "@/utils/logger"

const GLOBAL_CSS_URL =
	process.env.RADIANUI_GLOBAL_CSS_URL ?? "https://radianos.com/css/globals.css"

const UTILITY_CSS_URL =
	process.env.RADIANUI_UTILITY_CSS_URL ?? "https://radianos.com/css/utility.css"

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

export async function getUtilityCssV4() {
	const utilityCssUrl = UTILITY_CSS_URL

	try {
		const response = await fetch(utilityCssUrl)
		if (!response.ok) {
			throw new Error(
				`Failed to fetch utility CSS from ${utilityCssUrl}. Status: ${response.status} - ${response.statusText}`
			)
		}

		const content = await response.text()
		return content
	} catch (error) {
		logger.warn(
			`Unable to fetch utility CSS template from ${utilityCssUrl}.`
		)
	}
}

