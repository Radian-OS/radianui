"use client"

import { useLayoutEffect, useState } from "react"

import { Copy } from "lucide-react"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/registry/ui/dialog"
import { Table, TableBody, TableCell, TableRow } from "@/registry/ui/table"
import { EmojiCopyActions } from "./EmojiCopyActions"
import { EmojiCopyButton } from "./EmojiCopyButton"
import { EmojiText } from "./EmojiText"
import {
	formatEmojiName,
	getEmojiCodePoints,
	getEmojiHtmlEntity,
	getEmojiHtmlSnippet,
	getEmojiShortcode,
	getEmojiUnicodeEscape,
	getEmojiUriEncoded,
	getRelatedEmojis,
	getEmojiSkinToneVariants,
	type EmojiData,
} from "./emoji-data"

interface EmojiDetailsDialogProps {
	emoji: EmojiData | null
	open: boolean
	onOpenChange: (open: boolean) => void
	onSelectEmoji: (emoji: EmojiData) => void
	supportedEmojiSlugs: Set<string> | null
}

export function EmojiDetailsDialog({
	emoji,
	open,
	onOpenChange,
	onSelectEmoji,
	supportedEmojiSlugs,
}: EmojiDetailsDialogProps) {
	const [relatedRow, setRelatedRow] = useState<HTMLDivElement | null>(null)
	const [relatedCount, setRelatedCount] = useState(1)
	useLayoutEffect(() => {
		if (!relatedRow) return
		const breakpoint = window.matchMedia("(min-width: 640px)")
		const measure = () => {
			const minimumSize = breakpoint.matches ? 58 : 44
			setRelatedCount(
				Math.max(
					1,
					Math.floor((relatedRow.clientWidth + 8) / (minimumSize + 8))
				)
			)
		}
		measure()
		const observer = new ResizeObserver(measure)
		observer.observe(relatedRow)
		breakpoint.addEventListener("change", measure)
		return () => {
			observer.disconnect()
			breakpoint.removeEventListener("change", measure)
		}
	}, [relatedRow])
	if (!emoji) return null
	const displayName = formatEmojiName(emoji.name)
	const related = getRelatedEmojis(emoji, 10).filter(
		(item) => !supportedEmojiSlugs || supportedEmojiSlugs.has(item.slug)
	)
	const variants = getEmojiSkinToneVariants(emoji)
	const details = [
		{ label: "Shortcode", value: getEmojiShortcode(emoji) },
		{ label: "Category", value: emoji.group },
		{ label: "Unicode", value: getEmojiCodePoints(emoji.emoji).join(" ") },
		{ label: "Unicode escape", value: getEmojiUnicodeEscape(emoji.emoji) },
		{ label: "HTML Entity", value: getEmojiHtmlEntity(emoji.emoji) },
		{ label: "URI Encoded", value: getEmojiUriEncoded(emoji.emoji) },
		{ label: "HTML", value: getEmojiHtmlSnippet(emoji) },
		{
			label: "Skin Tone Support",
			value: emoji.skin_tone_support ? "Yes" : "No",
		},
	]
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[calc(100dvh-2rem)] gap-6 overflow-y-auto rounded-xl p-6 sm:max-w-[720px]">
				<DialogHeader className="flex-row items-center gap-6 space-y-0 p-0">
					<span
						className="font-emoji bg-fill1 border-soft flex size-[78px] shrink-0 items-center justify-center rounded-lg border text-4xl"
						aria-hidden="true">
						{emoji.emoji}
					</span>
					<div className="flex min-w-0 flex-1 flex-col gap-2">
						<Badge
							size="20"
							variant="soft"
							color="neutral"
							className="w-fit max-w-full">
							<BadgeDot />
							{emoji.group}
						</Badge>
						<DialogTitle className="gap-2 text-xl font-semibold [&>span]:min-w-0 [&>span]:break-words">
							{displayName}
						</DialogTitle>
						<DialogDescription className="sr-only">
							Copy, download, and explore information about the {displayName}{" "}
							emoji.
						</DialogDescription>
					</div>
				</DialogHeader>
				<EmojiCopyActions emoji={emoji} compact />
				<section
					aria-labelledby="emoji-dialog-information"
					className="flex min-w-0 flex-col gap-3">
					<h2
						id="emoji-dialog-information"
						className="text-fg-secondary text-xs">
						Emoji Information
					</h2>
					<div className="border-soft overflow-hidden rounded-lg border">
						<Table className="table-fixed text-[13px]">
							<TableBody>
								{details.map((detail) => (
									<TableRow
										key={detail.label}
										className="group/row border-soft">
										<TableCell className="bg-fill1 text-fg-secondary border-soft group-hover/row:bg-fill2 w-[30%] border-r px-3 py-2 text-[13px] font-medium whitespace-normal transition-colors">
											{detail.label}
										</TableCell>
										<TableCell className="group-hover/row:bg-fill1 px-3 py-2 text-[13px] font-normal whitespace-normal transition-colors">
											<div className="flex min-w-0 items-center gap-2">
												<span className="min-w-0 flex-1 [overflow-wrap:anywhere] break-words">
													<EmojiText emoji={emoji} text={detail.value} />
												</span>
												{detail.label !== "Skin Tone Support" && (
													<EmojiCopyButton
														emoji={emoji.emoji}
														value={detail.value}
														successLabel={detail.label}
														size="32"
														variant="ghost"
														color="neutral"
														className="text-fg-tertiary shrink-0 px-1"
														aria-label={`Copy ${detail.label}`}>
														<Copy />
													</EmojiCopyButton>
												)}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</section>
				{variants.length > 0 && (
					<section
						aria-labelledby="emoji-dialog-tones"
						className="flex flex-col gap-3">
						<h2 id="emoji-dialog-tones" className="text-fg-secondary text-xs">
							Skin tone options
						</h2>
						<div className="flex flex-wrap gap-2">
							{variants.map((variant) => (
								<EmojiCopyButton
									key={variant.label}
									emoji={variant.emoji}
									value={variant.emoji}
									successLabel={variant.label}
									size="32"
									variant="outline"
									color="neutral"
									aria-label={`Copy ${variant.label}`}>
									<span className="font-emoji text-xl" aria-hidden="true">
										{variant.emoji}
									</span>
								</EmojiCopyButton>
							))}
						</div>
					</section>
				)}
				{related.length > 0 && (
					<section
						aria-labelledby="emoji-dialog-related"
						className="flex min-w-0 flex-col gap-3">
						<h2 id="emoji-dialog-related" className="text-fg-secondary text-xs">
							Related {emoji.group} emoji
						</h2>
						<div
							ref={setRelatedRow}
							className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,44px),1fr))] gap-2 sm:grid-cols-[repeat(auto-fit,minmax(58px,1fr))]">
							{related.slice(0, relatedCount).map((item) => (
								<Button
									key={item.slug}
									size="32"
									color="neutral"
									variant="outline"
									className="aspect-square h-auto w-full max-w-[58px] justify-self-center rounded-lg p-0"
									aria-label={`View ${formatEmojiName(item.name)} emoji details`}
									title={formatEmojiName(item.name)}
									onClick={() => onSelectEmoji(item)}>
									<span className="font-emoji text-2xl" aria-hidden="true">
										{item.emoji}
									</span>
								</Button>
							))}
						</div>
					</section>
				)}
			</DialogContent>
		</Dialog>
	)
}
