import interSemibold from "./fonts/inter-semibold.json"

export type FontMap = Record<
	string,
	{
		data: Buffer | ArrayBuffer
		name: string
		weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
		style?: "normal" | "italic"
		lang?: string
	}
>
let loadedFonts: FontMap | null = null
const loadFontsRaw = async (): Promise<FontMap> => {
	return {
		"inter-semibold": {
			name: "Inter",
			data: Buffer.from(interSemibold.base64, "base64"),
			weight: 600,
			style: "normal",
		},
	}
}
export const loadFonts = async (): Promise<FontMap> => {
	if (loadedFonts) {
		return loadedFonts
	}
	loadedFonts = await loadFontsRaw()
	return loadedFonts
}
