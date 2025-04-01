interface GoogleFontResponse {
	items: GoogleFont[]
}

interface GoogleFont {
	family: string
	category: string
	variants: string[]
	subsets: string[]
}

export async function fetchAllCategories(): Promise<string[]> {
	try {
		const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBqC0iPLWLeOsKyhlmriYgRx_Sy4lIgE4Q"
		const response = await fetch(apiUrl)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = (await response.json()) as GoogleFontResponse

		// Explicitly type the map function and ensure type safety
		const categories = Array.from(
			new Set(data.items.map((font: GoogleFont) => font.category).filter((category): category is string => typeof category === "string"))
		)

		return categories
	} catch (error) {
		console.error("Error fetching font categories:", error)
		return []
	}
}

export async function fetchFontsByCategory(category: string): Promise<GoogleFont[]> {
	try {
		const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBqC0iPLWLeOsKyhlmriYgRx_Sy4lIgE4Q"
		const response = await fetch(apiUrl)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = (await response.json()) as GoogleFontResponse
		const fontsByCategory = data.items.filter((font: GoogleFont) => font.category === category)

		return fontsByCategory
	} catch (error) {
		console.error("Error fetching fonts by category:", error)
		return []
	}
}
