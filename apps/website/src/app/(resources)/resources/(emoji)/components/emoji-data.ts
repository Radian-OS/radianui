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
export const ALL_EMOJI_CATEGORY = "All Categories"

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

export interface EmojiSequenceInfo {
	label: string
	description: string
	codePointCount: number
}

export function getEmojiSequenceInfo(emoji: EmojiData): EmojiSequenceInfo {
	const characters = Array.from(emoji.emoji)
	const codePoints = characters.map(
		(character) => character.codePointAt(0) ?? 0
	)
	const codePointCount = codePoints.length
	const hasZeroWidthJoiner = codePoints.includes(0x200d)
	const hasKeycap = codePoints.includes(0x20e3)
	const hasEmojiPresentationSelector = codePoints.includes(0xfe0f)
	const hasTagCharacters = codePoints.some(
		(codePoint) => codePoint >= 0xe0020 && codePoint <= 0xe007f
	)
	const isRegionalIndicatorFlag =
		emoji.group === "Flags" &&
		codePoints.length === 2 &&
		codePoints.every(
			(codePoint) => codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff
		)

	if (isRegionalIndicatorFlag) {
		return {
			label: "Regional indicator flag sequence",
			description: "two regional-indicator code points",
			codePointCount,
		}
	}

	if (hasTagCharacters) {
		return {
			label: "Emoji tag sequence",
			description: `a tag-based flag sequence containing ${codePointCount} code points`,
			codePointCount,
		}
	}

	if (hasZeroWidthJoiner) {
		return {
			label: "Zero-width joiner sequence",
			description: `a ${codePointCount}-code-point zero-width joiner (ZWJ) sequence`,
			codePointCount,
		}
	}

	if (hasKeycap) {
		return {
			label: "Keycap sequence",
			description: `a keycap sequence containing ${codePointCount} code points`,
			codePointCount,
		}
	}

	if (codePointCount === 1) {
		return {
			label: "Single code point",
			description: "one Unicode code point",
			codePointCount,
		}
	}

	if (hasEmojiPresentationSelector) {
		return {
			label: "Emoji presentation sequence",
			description: `an emoji-presentation sequence containing ${codePointCount} code points`,
			codePointCount,
		}
	}

	return {
		label: "Multi-codepoint sequence",
		description: `a sequence containing ${codePointCount} Unicode code points`,
		codePointCount,
	}
}

export function getEmojiGroupPosition(emoji: EmojiData) {
	const group = emojiGroups.find((item) => item.name === emoji.group)
	const index =
		group?.emojis.findIndex((item) => item.slug === emoji.slug) ?? -1

	return {
		position: index >= 0 ? index + 1 : null,
		total: group?.emojis.length ?? null,
	}
}

function joinDisplayNames(items: EmojiData[]) {
	const names = items.map((item) => formatEmojiName(item.name))

	if (names.length <= 1) return names[0] ?? ""
	if (names.length === 2) return names.join(" and ")

	return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`
}

export function getEmojiMeaning(emoji: EmojiData) {
	const displayName = formatEmojiName(emoji.name)
	const officialLabel = `“${displayName}”`

	switch (emoji.group) {
		case "Smileys & Emotion":
			return `${emoji.emoji} depicts the expression or emotion described by its official Unicode name, ${officialLabel}. It works best as a reaction when that expression matches the tone of the surrounding message.`
		case "People & Body":
			return `${emoji.emoji} depicts ${emoji.name}, following the official Unicode label ${officialLabel}. It can add visual context to messages about people, gestures, roles, movement, or body language.`
		case "Animals & Nature":
			return `${emoji.emoji} represents ${emoji.name} in Unicode's Animals & Nature group. It can identify the subject directly or bring a nature-focused visual cue to a message.`
		case "Food & Drink":
			return `${emoji.emoji} represents ${emoji.name} in Unicode's Food & Drink group. It is useful when the named food, ingredient, meal, or drink is the subject of a message.`
		case "Travel & Places":
			return `${emoji.emoji} represents ${emoji.name} in Unicode's Travel & Places group. Use it when the named place, vehicle, landmark, weather condition, or travel idea is relevant.`
		case "Activities":
			return `${emoji.emoji} represents ${emoji.name} in Unicode's Activities group. It can label or emphasize conversations about the named sport, game, event, award, or pastime.`
		case "Objects":
			return `${emoji.emoji} depicts the object officially named ${officialLabel}. It works as a compact visual reference when that object or its function is part of the message.`
		case "Symbols":
			return `${emoji.emoji} is the Unicode symbol officially named ${officialLabel}. Its clearest interpretation comes from that label and the context in which the symbol appears.`
		case "Flags": {
			const subject = emoji.name.replace(/^flag\s+/i, "")
			return `${emoji.emoji} is the Unicode flag emoji for ${subject}. It is intended for text and messaging contexts; dedicated flag graphics are preferable when exact artwork or proportions matter.`
		}
		default:
			return `${emoji.emoji} is officially named ${officialLabel} in the Unicode emoji dataset and belongs to the ${emoji.group} group.`
	}
}

export function getEmojiDescription(emoji: EmojiData) {
	const displayName = formatEmojiName(emoji.name)
	const sequence = getEmojiSequenceInfo(emoji)
	const { position, total } = getEmojiGroupPosition(emoji)
	const relatedNames = joinDisplayNames(getRelatedEmojis(emoji, 3))
	const skinToneDetail = emoji.skin_tone_support
		? " It supports the five standardized emoji skin-tone modifiers."
		: ""
	const orderingDetail =
		position && total
			? ` In the package's official ordering, it is entry ${position} of ${total} in ${emoji.group}`
			: ` It belongs to the ${emoji.group} group`
	const neighborDetail = relatedNames ? `, near ${relatedNames}` : ""

	return `Unicode lists ${emoji.emoji} under the official name “${displayName}.” It is encoded as ${sequence.description} and is recorded in Unicode ${emoji.unicode_version} and Emoji ${emoji.emoji_version}.${orderingDetail}${neighborDetail}.${skinToneDetail}`
}

export interface EmojiFaqItem {
	question: string
	answer: string
}

function getEmojiUsageFaq(emoji: EmojiData): EmojiFaqItem {
	const displayName = formatEmojiName(emoji.name)

	switch (emoji.group) {
		case "Smileys & Emotion":
			return {
				question: `When should I use the ${displayName} emoji?`,
				answer: `Use ${emoji.emoji} when the expression named “${displayName}” matches the reaction or tone you want to add. Keep the surrounding words clear when the emotional intent could be ambiguous.`,
			}
		case "People & Body":
			return {
				question: `What contexts fit the ${displayName} emoji?`,
				answer: `${emoji.emoji} works in messages about ${emoji.name}, including closely related gestures, roles, actions, or body language.${
					emoji.skin_tone_support
						? " Choose a skin-tone option when a supported variant better fits the context."
						: ""
				}`,
			}
		case "Animals & Nature":
			return {
				question: `What can the ${displayName} emoji label?`,
				answer: `Use ${emoji.emoji} for content specifically involving ${emoji.name}, or as a visual cue in a broader animals, plants, weather, or nature context.`,
			}
		case "Food & Drink":
			return {
				question: `When is the ${displayName} emoji useful?`,
				answer: `${emoji.emoji} is useful in menus, recipes, meal plans, invitations, and conversations where ${emoji.name} is directly relevant.`,
			}
		case "Travel & Places":
			return {
				question: `How can I use the ${displayName} emoji?`,
				answer: `Use ${emoji.emoji} in travel plans, directions, weather updates, or place-related messages when ${emoji.name} is the intended visual reference.`,
			}
		case "Activities":
			return {
				question: `Where does the ${displayName} emoji work well?`,
				answer: `${emoji.emoji} works well in schedules, event announcements, results, and conversations connected to ${emoji.name}.`,
			}
		case "Objects":
			return {
				question: `What can the ${displayName} emoji communicate?`,
				answer: `Use ${emoji.emoji} as a compact reference to ${emoji.name}. If the object represents an action or concept in your interface, pair it with text so the intended meaning remains clear.`,
			}
		case "Symbols":
			return {
				question: `How should I use the ${displayName} symbol?`,
				answer: `Use ${emoji.emoji} when the symbol named “${displayName}” matches the intended meaning. Pair important symbolic controls or status messages with a text label for accessibility.`,
			}
		case "Flags":
			return {
				question: `Should I use the ${displayName} emoji as a flag graphic?`,
				answer: `${emoji.emoji} is appropriate in text and messaging. For interfaces that require consistent artwork, exact proportions, or selectable shapes, use the dedicated Flags resource instead.`,
			}
		default:
			return {
				question: `How can I use the ${displayName} emoji?`,
				answer: `Use ${emoji.emoji} when ${emoji.name} is relevant to the surrounding message, and pair it with clear text when the meaning is important.`,
			}
	}
}

export function getEmojiFaqItems(emoji: EmojiData): EmojiFaqItem[] {
	const displayName = formatEmojiName(emoji.name)
	const codepoints = getEmojiCodePoints(emoji.emoji).join(" ")
	const sequence = getEmojiSequenceInfo(emoji)
	const { position, total } = getEmojiGroupPosition(emoji)
	const related = getRelatedEmojis(emoji, 4)
	const relatedNames = joinDisplayNames(related)
	const sequenceQuestion =
		sequence.label === "Single code point"
			? `Is the ${displayName} emoji a single Unicode character?`
			: emoji.group === "Flags"
				? `How is the ${displayName} emoji encoded?`
				: `Why does the ${displayName} emoji use multiple code points?`
	const sequenceAnswer =
		sequence.label === "Single code point"
			? `Yes. ${displayName} uses one Unicode code point: ${codepoints}. The platform's emoji font draws that code point as ${emoji.emoji}.`
			: `${displayName} is encoded as ${sequence.description}: ${codepoints}. Platforms combine the complete sequence into the displayed ${emoji.emoji} glyph.`

	const items: EmojiFaqItem[] = [
		getEmojiUsageFaq(emoji),
		{
			question: sequenceQuestion,
			answer: sequenceAnswer,
		},
		{
			question: `When was the ${displayName} emoji added?`,
			answer: `The package records ${displayName} in Unicode ${emoji.unicode_version} and Emoji ${emoji.emoji_version}.${
				position && total
					? ` It appears as item ${position} of ${total} in the ${emoji.group} group.`
					: ""
			}`,
		},
	]

	if (emoji.skin_tone_support) {
		items.push({
			question: `Does the ${displayName} emoji support skin tones?`,
			answer: `Yes. ${displayName} supports the five standardized emoji skin-tone modifiers. Choose a variant above, then copy it as text or code.`,
		})
	} else if (relatedNames) {
		items.push({
			question: `Which emojis are related to ${displayName}?`,
			answer: `${displayName} is grouped near ${relatedNames} in the package's ${emoji.group} ordering. These are useful starting points when you need a closely related symbol.`,
		})
	}

	return items
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
