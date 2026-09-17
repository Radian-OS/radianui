import emojiGroupsJson from "unicode-emoji-json/data-by-group.json"
import emojiComponentsJson from "unicode-emoji-json/data-emoji-components.json"

interface EmojiSource {
	emoji: string
	name: string
	slug: string
	emoji_version: string
	unicode_version: string
	skin_tone_support: boolean
}

interface EmojiGroupSource {
	name: string
	slug: string
	emojis: EmojiSource[]
}

export interface EmojiData extends EmojiSource {
	group: string
}

export interface EmojiGroup {
	name: string
	slug: string
	emojis: EmojiData[]
}

export const EMOJI_PAGE_PATH = "/resources/emoji"

export const emojiGroups: EmojiGroup[] = (
	emojiGroupsJson as EmojiGroupSource[]
).map((group) => ({
	...group,
	emojis: group.emojis.map((emoji) => ({ ...emoji, group: group.name })),
}))

export const emojis = emojiGroups.flatMap((group) => group.emojis)

const emojiBySlug = new Map(emojis.map((emoji) => [emoji.slug, emoji]))

const skinToneComponents = emojiComponentsJson as Record<string, string>

export const skinTones = [
	{ label: "Light skin tone", modifier: skinToneComponents.light_skin_tone },
	{
		label: "Medium-light skin tone",
		modifier: skinToneComponents.medium_light_skin_tone,
	},
	{ label: "Medium skin tone", modifier: skinToneComponents.medium_skin_tone },
	{
		label: "Medium-dark skin tone",
		modifier: skinToneComponents.medium_dark_skin_tone,
	},
	{ label: "Dark skin tone", modifier: skinToneComponents.dark_skin_tone },
] as const

const emojiModifierBasePattern = new RegExp("\\p{Emoji_Modifier_Base}", "u")

export function formatEmojiName(name: string) {
	return name.replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}

export function getEmojiBySlug(slug: string) {
	return emojiBySlug.get(slug) ?? null
}

export function getEmojiPagePath(emoji: EmojiData) {
	return `${EMOJI_PAGE_PATH}/${emoji.slug}`
}

export function getEmojiCodePoints(emoji: string) {
	return Array.from(emoji).map((character) => {
		const codePoint = character.codePointAt(0)
		if (codePoint === undefined) return ""
		return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`
	})
}

export function getEmojiUnicodeEscape(emoji: string) {
	return Array.from(emoji)
		.map((character) => {
			const codePoint = character.codePointAt(0)
			return codePoint === undefined
				? ""
				: `\\u{${codePoint.toString(16).toUpperCase()}}`
		})
		.join("")
}

export function getEmojiHtmlEntity(emoji: string) {
	return Array.from(emoji)
		.map((character) => {
			const codePoint = character.codePointAt(0)
			return codePoint === undefined
				? ""
				: `&#x${codePoint.toString(16).toUpperCase()};`
		})
		.join("")
}

export function getEmojiUriEncoded(emoji: string) {
	return encodeURIComponent(emoji)
}

function escapeMarkup(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
}

export function getEmojiHtmlSnippet(emoji: EmojiData) {
	return `<span role="img" aria-label="${escapeMarkup(emoji.name)}">${emoji.emoji}</span>`
}

export function getEmojiSvgMarkup(emoji: EmojiData, size = 512) {
	const label = escapeMarkup(`${formatEmojiName(emoji.name)} emoji`)
	const glyphSize = Math.round(size * 0.625)

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}"><title>${label}</title><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${glyphSize}" font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">${emoji.emoji}</text></svg>`
}

export function getEmojiShortcode(emoji: EmojiData) {
	return `:${emoji.slug}:`
}

export function getEmojiDescription(emoji: EmojiData) {
	const name = formatEmojiName(emoji.name)
	const skinToneDetail = emoji.skin_tone_support
		? " It supports the five Fitzpatrick skin tone modifiers."
		: ""

	return `${name} ${emoji.emoji} belongs to the ${emoji.group} group in the Unicode emoji dataset. It was introduced in Unicode ${emoji.unicode_version} and Emoji ${emoji.emoji_version}.${skinToneDetail} Copy and paste it, or use its Unicode, HTML, and JSX formats.`
}

export function getEmojiMetadataDescription(emoji: EmojiData) {
	const name = formatEmojiName(emoji.name)

	return `Copy and paste the ${name} emoji ${emoji.emoji}. View its ${emoji.group} group, Unicode ${emoji.unicode_version} and Emoji ${emoji.emoji_version} details, codepoints, and embed formats.`
}

export function getEmojiKeywords(emoji: EmojiData) {
	const displayName = formatEmojiName(emoji.name)
	const slugWords = emoji.slug.replaceAll("_", " ")

	return Array.from(
		new Set([
			displayName,
			`${displayName} emoji`,
			`${displayName} emoji meaning`,
			`${displayName} emoji copy and paste`,
			slugWords,
			emoji.group,
			`${emoji.group} emojis`,
			`Unicode ${emoji.unicode_version}`,
			`Emoji ${emoji.emoji_version}`,
		])
	)
}

export function getEmojiSkinToneVariants(emoji: EmojiData) {
	if (!emoji.skin_tone_support) return []

	return skinTones.map((tone) => {
		let insertedModifier = false
		const characters = Array.from(emoji.emoji)
		const variant = characters
			.map((character) => {
				if (!emojiModifierBasePattern.test(character)) return character

				insertedModifier = true
				return `${character}${tone.modifier}`
			})
			.join("")

		return {
			label: tone.label,
			emoji: insertedModifier
				? variant
				: `${characters[0] ?? emoji.emoji}${tone.modifier}${characters.slice(1).join("")}`,
		}
	})
}

export function getRelatedEmojis(emoji: EmojiData, limit = 8) {
	const group = emojiGroups.find((item) => item.name === emoji.group)
	if (!group) return []

	const index = group.emojis.findIndex((item) => item.slug === emoji.slug)
	const start = Math.max(
		0,
		Math.min(index - Math.floor(limit / 2), group.emojis.length - limit - 1)
	)

	return group.emojis
		.slice(start, start + limit + 1)
		.filter((item) => item.slug !== emoji.slug)
		.slice(0, limit)
}
