"use client"

import { Flag, X } from "lucide-react"
import Link from "next/link"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import { Badge } from "@/registry/ui/badge"
import { Button, IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import {
	Drawer,
	DrawerBody,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/registry/ui/drawer"
import { Table, TableBody, TableCell, TableRow } from "@/registry/ui/table"
import { ResourceFaq } from "../../components/ResourceDocs"
import { EmojiCopyActions } from "./EmojiCopyActions"
import { EmojiSkinToneVariants } from "./EmojiSkinToneVariants"
import type { EmojiData } from "./emoji-data"
import {
	formatEmojiName,
	getEmojiCodePoints,
	getEmojiDescription,
	getEmojiFaqItems,
	getEmojiMeaning,
	getEmojiSequenceInfo,
	getEmojiShortcode,
	getRelatedEmojis,
} from "./emoji-data"

interface EmojiDetailsDrawerProps {
	emoji: EmojiData | null
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelectEmoji: (emoji: EmojiData) => void
}

export function EmojiDetailsDrawer({
	emoji,
	open,
	onOpenChange,
	onSelectEmoji,
}: EmojiDetailsDrawerProps) {
	if (!emoji) return null

	const displayName = formatEmojiName(emoji.name)
	const relatedEmojis = getRelatedEmojis(emoji)
	const codepoints = getEmojiCodePoints(emoji.emoji).join(" ")
	const sequence = getEmojiSequenceInfo(emoji)
	const faqItems = getEmojiFaqItems(emoji)

	return (
		<Drawer
			open={open}
			onOpenChange={onOpenChange}
			direction="right"
			variant="float"
			backdrop="overlay">
			<DrawerContent className="w-[calc(100%-1rem)] max-w-[900px] gap-0 p-0">
				<DrawerHeader className="border-soft relative flex-row items-center gap-4 border-b p-5 pr-16 sm:p-6 sm:pr-16">
					<span
						className="flex size-16 shrink-0 items-center justify-center text-5xl leading-none"
						aria-hidden="true">
						{emoji.emoji}
					</span>
					<div className="flex min-w-0 flex-1 flex-col gap-1.5">
						<Badge color="primary" variant="soft" size="24" className="w-fit">
							{emoji.group}
						</Badge>
						<DrawerTitle className="truncate">{displayName} Emoji</DrawerTitle>
						<DrawerDescription>
							Unicode {emoji.unicode_version} · Emoji {emoji.emoji_version}
						</DrawerDescription>
					</div>
					<DrawerClose>
						<IconButton
							size="36"
							color="neutral"
							variant="ghost"
							className="absolute top-4 right-4"
							aria-label="Close emoji details">
							<X />
						</IconButton>
					</DrawerClose>
				</DrawerHeader>

				<DrawerBody>
					<div className="flex flex-col gap-12 p-5 sm:p-6">
						<section
							aria-labelledby="emoji-drawer-copy-heading"
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<p className="text-primary-text text-sm font-medium">
									Copy & export
								</p>
								<h2 id="emoji-drawer-copy-heading" className="heading-6">
									Use the {displayName} emoji
								</h2>
							</div>
							<EmojiCopyActions emoji={emoji} />
						</section>

						<section
							aria-labelledby="emoji-drawer-details-heading"
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<p className="text-primary-text text-sm font-medium">Details</p>
								<h2 id="emoji-drawer-details-heading" className="heading-6">
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
										<DetailRow label="Encoding type" value={sequence.label} />
										<DetailRow
											label="Shortcode"
											value={getEmojiShortcode(emoji)}
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
								aria-labelledby="emoji-drawer-skin-tones-heading"
								className="flex flex-col gap-5">
								<div className="flex flex-col gap-2">
									<p className="text-primary-text text-sm font-medium">
										Variants
									</p>
									<h2
										id="emoji-drawer-skin-tones-heading"
										className="heading-6">
										Skin tone options
									</h2>
								</div>
								<EmojiSkinToneVariants emoji={emoji} />
							</section>
						) : null}

						<section
							aria-labelledby="emoji-drawer-related-heading"
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<p className="text-primary-text text-sm font-medium">
									Explore more
								</p>
								<h2 id="emoji-drawer-related-heading" className="heading-6">
									Related {emoji.group} emojis
								</h2>
							</div>
							<div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
								{relatedEmojis.map((relatedEmoji) => (
									<Button
										key={relatedEmoji.slug}
										size="32"
										color="neutral"
										variant="outline"
										className="aspect-square h-auto w-full p-0 text-3xl"
										aria-label={`View ${formatEmojiName(relatedEmoji.name)} emoji details`}
										onClick={() => onSelectEmoji(relatedEmoji)}>
										<span aria-hidden="true">{relatedEmoji.emoji}</span>
									</Button>
								))}
							</div>
						</section>

						<section
							aria-labelledby={`emoji-drawer-about-${emoji.slug}`}
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<p className="text-primary-text text-sm font-medium">
									About this emoji
								</p>
								<h2
									id={`emoji-drawer-about-${emoji.slug}`}
									className="heading-6">
									What {displayName} represents
								</h2>
							</div>
							<div className="text-fg-secondary flex flex-col gap-4">
								<p>{getEmojiMeaning(emoji)}</p>
								<p>{getEmojiDescription(emoji)}</p>
							</div>
						</section>

						<ResourceFaq
							id={`emoji-drawer-faq-${emoji.slug}`}
							items={faqItems}
						/>
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
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
