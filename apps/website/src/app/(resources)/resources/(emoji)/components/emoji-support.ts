import type { EmojiData } from "./emoji-data"
import { EMOJI_FONT_STACK, FLAG_EMOJI_FONT_FAMILY, emojis } from "./emoji-data"

const emojiVersionTests = [
	["🫪", 17],
	["🫩", 16],
	["🫨", 15],
	["🫠", 14],
	["🥲", 13],
	["🥻", 12],
	["🥰", 11],
	["🤩", 5],
	["👱‍♀️", 4],
	["🤣", 3],
	["👁️‍🗨️", 2],
	["😀", 1],
	["😐️", 0.7],
	["😃", 0.6],
] as const

const fontSize = 100
const sequenceWidthThreshold = 1.8
let supportedEmojisPromise: Promise<EmojiData[]> | null = null

function getColorFeature(text: string, color: string) {
	const canvas = document.createElement("canvas")
	canvas.width = 1
	canvas.height = 1

	const context = canvas.getContext("2d", { willReadFrequently: true })
	if (!context) throw new Error("Canvas is unavailable")

	context.textBaseline = "top"
	context.font = `${fontSize}px ${EMOJI_FONT_STACK}`
	context.fillStyle = color
	context.scale(0.01, 0.01)
	context.fillText(text, 0, 0)

	return context.getImageData(0, 0, 1, 1).data
}

function supportsColorEmoji(text: string) {
	const darkFeature = getColorFeature(text, "#000")
	const lightFeature = getColorFeature(text, "#fff")
	const darkValue = Array.from(darkFeature).join(",")
	const lightValue = Array.from(lightFeature).join(",")

	return darkValue === lightValue && !darkValue.startsWith("0,0,0,")
}

function detectSupportedEmojiVersion() {
	for (const [emoji, version] of emojiVersionTests) {
		if (supportsColorEmoji(emoji)) return version
	}

	return null
}

function needsSequenceCheck(emoji: string) {
	const codePoints = Array.from(
		emoji,
		(character) => character.codePointAt(0) ?? 0
	)
	const visibleCodePoints = codePoints.filter(
		(codePoint) => codePoint !== 0xfe0f && codePoint !== 0xfe0e
	)

	return (
		visibleCodePoints.length > 1 &&
		(codePoints.includes(0x200d) ||
			codePoints.includes(0x20e3) ||
			codePoints.some(
				(codePoint) => codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff
			) ||
			codePoints.some(
				(codePoint) => codePoint >= 0xe0020 && codePoint <= 0xe007f
			))
	)
}

function createSequenceSupportChecker() {
	const canvas = document.createElement("canvas")
	const context = canvas.getContext("2d")
	if (!context) return () => true

	context.font = `32px ${EMOJI_FONT_STACK}`
	const baselineWidth = context.measureText("😀").width

	return (emoji: string) => {
		if (!needsSequenceCheck(emoji) || baselineWidth <= 0) return true

		const width = context.measureText(emoji).width
		return width > 0 && width < baselineWidth * sequenceWidthThreshold
	}
}

async function detectSupportedEmojis() {
	await document.fonts.ready

	try {
		await document.fonts.load(`400 32px "${FLAG_EMOJI_FONT_FAMILY}"`, "🇺🇸")
	} catch {
		// Sequence measurement below filters regional flags if the font fails.
	}

	let supportedVersion: number | null
	try {
		supportedVersion = detectSupportedEmojiVersion()
	} catch {
		// Canvas may be blocked by anti-fingerprinting settings. In that case,
		// preserve the catalog instead of incorrectly hiding every emoji.
		supportedVersion = Number(emojiVersionTests[0][1])
	}

	// A failed color probe is inconclusive (for example, monochrome fonts).
	if (supportedVersion === null) return emojis

	const supportsSequence = createSequenceSupportChecker()

	return emojis.filter(
		(emoji) =>
			Number(emoji.emoji_version) <= supportedVersion &&
			supportsSequence(emoji.emoji)
	)
}

export function getSupportedEmojis() {
	if (!supportedEmojisPromise) {
		let timeout: number
		supportedEmojisPromise = Promise.race([
			detectSupportedEmojis(),
			new Promise<EmojiData[]>((resolve) => {
				timeout = window.setTimeout(() => resolve(emojis), 3000)
			}),
		])
			.catch(() => emojis)
			.finally(() => window.clearTimeout(timeout))
	}

	return supportedEmojisPromise
}
