import Link from "next/link"
import { Card } from "@/registry/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/registry/ui/table"
import { EmojiFlagGuidance } from "./EmojiFlagGuidance"
import { EmojiText } from "./EmojiText"
import { EmojiSkinToneVariants } from "./EmojiSkinToneVariants"
import {
	formatEmojiName,
	getEmojiCodePoints,
	getEmojiHtmlEntity,
	getEmojiHtmlSnippet,
	getEmojiMeaning,
	getEmojiPagePath,
	getEmojiSequenceInfo,
	getEmojiShortcode,
	getEmojiUnicodeEscape,
	getEmojiUriEncoded,
	getRelatedEmojis,
	type EmojiData,
} from "./emoji-data"

const linkStyle =
	"text-fg-secondary hover:text-primary-text underline underline-offset-4"

export function EmojiReference({ emoji }: { emoji: EmojiData }) {
	const name = formatEmojiName(emoji.name)
	const sequence = getEmojiSequenceInfo(emoji)
	const facts = [
		["Character", emoji.emoji],
		["Unicode name", name],
		["Category", emoji.group],
		["Code points", getEmojiCodePoints(emoji.emoji).join(" ")],
		["Encoding", sequence.label],
		["Unicode version", emoji.unicode_version],
		["Emoji version", emoji.emoji_version],
		["Skin tone support", emoji.skin_tone_support ? "Yes" : "No"],
		["Shortcode", getEmojiShortcode(emoji)],
		["Unicode escape", getEmojiUnicodeEscape(emoji.emoji)],
		["HTML entity", getEmojiHtmlEntity(emoji.emoji)],
		["URI encoded", getEmojiUriEncoded(emoji.emoji)],
		["HTML", getEmojiHtmlSnippet(emoji)],
	]
	return (
		<article
			className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8"
			aria-labelledby="emoji-reference-heading">
			<nav
				aria-label="Breadcrumb"
				className="text-fg-secondary flex flex-wrap gap-2 text-sm">
				<Link href="/resources">Resources</Link>
				<span aria-hidden="true">/</span>
				<Link href="/resources/emoji">Emojis</Link>
				<span aria-hidden="true">/</span>
				<span aria-current="page">{name}</span>
			</nav>
			<section className="flex flex-col gap-3">
				<h2 id="emoji-reference-heading" className="text-xl font-semibold">
					About the {name} emoji
				</h2>
				<p className="text-fg-secondary">
					<EmojiText emoji={emoji} text={getEmojiMeaning(emoji)} />
				</p>
				<p className="text-fg-secondary">
					Copy the complete character sequence {emoji.emoji} when pasting into
					messages or code. Its appearance depends on the device and emoji font;
					exported PNG files preserve the appearance rendered by your browser.
				</p>
			</section>
			<section
				className="flex flex-col gap-3"
				aria-labelledby="emoji-reference-encoding">
				<h2 id="emoji-reference-encoding" className="text-lg font-semibold">
					Unicode and copy-ready formats
				</h2>
				<Card className="overflow-hidden p-0">
					<Table className="table-fixed">
						<TableBody>
							{facts.map(([label, value]) => (
								<TableRow key={label} className="border-soft">
									<TableCell className="bg-fill1 w-1/3 font-medium whitespace-normal">
										{label}
									</TableCell>
									<TableCell className="[overflow-wrap:anywhere] whitespace-normal">
										<EmojiText emoji={emoji} text={value} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
				<p className="text-fg-secondary text-sm">
					The shortcode is a readable label; shortcode support varies by app.
					Unicode text and the encoding values above describe the actual
					character sequence.
				</p>
			</section>
			{emoji.group === "Flags" && <EmojiFlagGuidance />}
			{emoji.skin_tone_support && (
				<section className="flex flex-col gap-3">
					<h2 className="text-lg font-semibold">{name} skin tone variants</h2>
					<EmojiSkinToneVariants emoji={emoji} />
				</section>
			)}
			<section className="flex flex-col gap-3">
				<h2 className="text-lg font-semibold">More {emoji.group} emojis</h2>
				<p className="text-fg-secondary text-sm">
					Nearby entries in the Unicode category, rather than interchangeable
					meanings.
				</p>
				<ul className="flex flex-wrap gap-x-6 gap-y-3">
					{getRelatedEmojis(emoji, 10).map((item) => (
						<li key={item.slug}>
							<Link
								prefetch={false}
								href={getEmojiPagePath(item)}
								className={linkStyle}>
								<span className="font-emoji">{item.emoji}</span>{" "}
								{formatEmojiName(item.name)}
							</Link>
						</li>
					))}
				</ul>
			</section>
			<Link href="/resources/emoji" className={linkStyle}>
				Browse all emojis
			</Link>
		</article>
	)
}
