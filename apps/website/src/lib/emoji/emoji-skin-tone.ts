import { emojis, skinTones } from "./emoji-data"

export const emojiSkinToneEvent = "radian-emoji-skin-tone-change"
const storageKey = "radian-emoji-skin-tone"

export function readEmojiSkinTone() {
	try {
		const stored = localStorage.getItem(storageKey)
		if (stored === null) return -1
		const tone = Number(stored)
		return Number.isInteger(tone) && tone >= -1 && tone < skinTones.length
			? tone
			: -1
	} catch {
		return -1
	}
}

export function cacheCopiedEmojiSkinTone(character: string) {
	const base = character.replace(/\p{Emoji_Modifier}/gu, "")
	if (!emojis.some((item) => item.emoji === base && item.skin_tone_support))
		return
	const tone = skinTones.findIndex((item) => character.includes(item.modifier))
	try {
		localStorage.setItem(storageKey, String(tone))
	} catch {
		/* Preference storage is optional. */
	}
	window.dispatchEvent(new CustomEvent(emojiSkinToneEvent, { detail: tone }))
}
