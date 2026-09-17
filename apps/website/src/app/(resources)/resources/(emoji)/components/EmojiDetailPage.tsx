import { ArrowLeft, Flag } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import Footer from "@/components/home/footer"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/registry/ui/table"
import { ResourceFaq } from "../../components/ResourceDocs"
import { EmojiCopyActions } from "./EmojiCopyActions"
import { EmojiSkinToneVariants } from "./EmojiSkinToneVariants"
import type { EmojiData } from "./emoji-data"
import {
	EMOJI_PAGE_PATH,
	formatEmojiName,
	getEmojiCodePoints,
	getEmojiDescription,
	getEmojiPagePath,
	getRelatedEmojis,
} from "./emoji-data"

export function EmojiDetailPage({ emoji }: { emoji: EmojiData }) {
	const displayName = formatEmojiName(emoji.name)
	const relatedEmojis = getRelatedEmojis(emoji)
	const codepoints = getEmojiCodePoints(emoji.emoji).join(" ")
	const faqItems = [
		{
			question: `What does the ${displayName} emoji mean?`,
			answer: `${emoji.emoji} is officially named “${emoji.name}” in the emoji dataset and belongs to the ${emoji.group} group. Its intended tone can still depend on the message and context in which it appears.`,
		},
		{
			question: `How do I copy the ${displayName} emoji?`,
			answer: `Select “Copy as Text” above, then paste ${emoji.emoji} into any application or field that supports Unicode text.`,
		},
		{
			question: `Which Unicode version includes the ${displayName} emoji?`,
			answer: `${displayName} is included in Unicode ${emoji.unicode_version} and Emoji ${emoji.emoji_version}. Its codepoint${getEmojiCodePoints(emoji.emoji).length === 1 ? " is" : "s are"} ${codepoints}.`,
		},
		{
			question: `Does the ${displayName} emoji look different on other platforms?`,
			answer:
				"Yes. Unicode standardizes the character and meaning, but each platform designs its own artwork, so details can vary across Apple, Google, Microsoft, and other systems.",
		},
	]

	return (
		<div className="min-h-screen w-full">
			<Background>
				<header className="mx-auto flex w-full max-w-250 flex-col items-center gap-6 px-5 pt-12 pb-20 text-center md:pt-24 md:pb-28">
					<Button asChild size="32" color="neutral" variant="ghost">
						<Link href={EMOJI_PAGE_PATH}>
							<ArrowLeft />
							All emojis
						</Link>
					</Button>

					<span
						className="text-7xl leading-none md:text-8xl"
						aria-hidden="true">
						{emoji.emoji}
					</span>

					<Badge color="primary" variant="soft" size="28">
						{emoji.group}
					</Badge>

					<div className="flex max-w-190 flex-col items-center gap-4">
						<h1 className="heading-3">
							{displayName} Emoji <span aria-hidden="true">{emoji.emoji}</span>
						</h1>
						<p className="text-fg-secondary text-base">
							{getEmojiDescription(emoji)}
						</p>
					</div>
				</header>
			</Background>

			<article className="from-fill1 to-bg bg-linear-to-b px-5 py-12 sm:px-6 sm:py-20 md:py-28">
				<div className="mx-auto flex w-full max-w-250 flex-col gap-16 md:gap-24">
					<section
						aria-labelledby="emoji-copy-heading"
						className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<p className="text-primary-text text-sm font-medium">
								Copy & paste
							</p>
							<h2 id="emoji-copy-heading" className="heading-5">
								Use the {displayName} emoji
							</h2>
							<p className="text-fg-secondary">
								Copy, export, or use developer-ready formats, then preview
								common interface sizes.
							</p>
						</div>
						<EmojiCopyActions emoji={emoji} />
					</section>

					<section
						aria-labelledby="emoji-details-heading"
						className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<p className="text-primary-text text-sm font-medium">Details</p>
							<h2 id="emoji-details-heading" className="heading-5">
								Unicode information
							</h2>
						</div>

						<Card className="gap-0 p-0">
							<Table>
								<TableBody>
									<DetailRow
										label="Unicode codepoint"
										value={codepoints}
										code
									/>
									<DetailRow
										label="Emoji version"
										value={emoji.emoji_version}
									/>
									<DetailRow
										label="Unicode version"
										value={emoji.unicode_version}
									/>
									<DetailRow label="Category" value={emoji.group} />
									<DetailRow
										label="Skin tone support"
										value={emoji.skin_tone_support ? "Yes" : "No"}
									/>
								</TableBody>
							</Table>
						</Card>

						{emoji.group === "Flags" ? (
							<Alert color="primary" variant="soft-outline">
								<AlertIcon>
									<Flag />
								</AlertIcon>
								<AlertContent>
									<AlertTitle>Need a flag graphic?</AlertTitle>
									<AlertDescription>
										Looking for country flag icons and graphics instead of the
										emoji? Check out our{" "}
										<Link
											href="/resources/flags"
											className="font-medium underline underline-offset-4">
											Flags resource
										</Link>
										.
									</AlertDescription>
								</AlertContent>
							</Alert>
						) : null}
					</section>

					{emoji.skin_tone_support ? (
						<section
							aria-labelledby="emoji-skin-tones-heading"
							className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<p className="text-primary-text text-sm font-medium">
									Variants
								</p>
								<h2 id="emoji-skin-tones-heading" className="heading-5">
									Skin tone options
								</h2>
								<p className="text-fg-secondary">
									Choose any Fitzpatrick skin tone variant to copy it.
								</p>
							</div>
							<EmojiSkinToneVariants emoji={emoji} />
						</section>
					) : null}

					<section
						aria-labelledby="related-emojis-heading"
						className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<p className="text-primary-text text-sm font-medium">
								Explore more
							</p>
							<h2 id="related-emojis-heading" className="heading-5">
								Related {emoji.group} emojis
							</h2>
						</div>
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
							{relatedEmojis.map((relatedEmoji) => (
								<Link
									key={relatedEmoji.slug}
									href={getEmojiPagePath(relatedEmoji)}
									aria-label={`View ${formatEmojiName(relatedEmoji.name)} emoji details`}
									className="focus-visible:ring-primary rounded-xl focus-visible:ring-2 focus-visible:outline-none">
									<Card className="hover:bg-fill2 aspect-square h-full items-center justify-center p-0 text-center transition-colors">
										<span className="text-4xl" aria-hidden="true">
											{relatedEmoji.emoji}
										</span>
									</Card>
								</Link>
							))}
						</div>
					</section>

					<ResourceFaq id="emoji-detail-faq-heading" items={faqItems} />
				</div>
			</article>

			<Footer />
		</div>
	)
}

function DetailRow({
	label,
	value,
	code = false,
}: {
	label: string
	value: string
	code?: boolean
}) {
	return (
		<TableRow>
			<TableCell className="text-fg-secondary w-1/3 font-medium">
				{label}
			</TableCell>
			<TableCell className="break-words">
				{code ? <code>{value}</code> : value}
			</TableCell>
		</TableRow>
	)
}
