"use client"

import type { ReactNode } from "react"
import { Copy, Download, FileCode2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { EmojiCopyButton } from "./EmojiCopyButton"
import type { EmojiData } from "./emoji-data"
import {
	formatEmojiName,
	getEmojiCodePoints,
	getEmojiHtmlEntity,
	getEmojiHtmlSnippet,
	getEmojiShortcode,
	getEmojiSvgMarkup,
	getEmojiUnicodeEscape,
	getEmojiUriEncoded,
} from "./emoji-data"

const legibilitySizes = [16, 24, 32, 48, 64] as const
const svgExportSize = 512
const pngExportSize = 2048
const pngGlyphScale = 0.78

function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob)
	const anchor = document.createElement("a")
	anchor.href = url
	anchor.download = filename
	document.body.appendChild(anchor)
	anchor.click()
	anchor.remove()
	URL.revokeObjectURL(url)
}

function getEmojiFilename(emoji: EmojiData) {
	return `${emoji.slug}-emoji`
}

export function EmojiCopyActions({ emoji }: { emoji: EmojiData }) {
	const svgMarkup = getEmojiSvgMarkup(emoji, svgExportSize)
	const displayName = formatEmojiName(emoji.name)
	const formats = [
		{
			label: "Unicode codepoint",
			value: getEmojiCodePoints(emoji.emoji).join(" "),
		},
		{ label: "Unicode escape", value: getEmojiUnicodeEscape(emoji.emoji) },
		{ label: "HTML entity", value: getEmojiHtmlEntity(emoji.emoji) },
		{ label: "URI encoded", value: getEmojiUriEncoded(emoji.emoji) },
		{ label: "Shortcode", value: getEmojiShortcode(emoji) },
		{ label: "HTML", value: getEmojiHtmlSnippet(emoji) },
	]

	const downloadSvg = () => {
		downloadBlob(
			new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" }),
			`${getEmojiFilename(emoji)}.svg`
		)
		toast.success("SVG downloaded")
	}

	const downloadPng = () => {
		const canvas = document.createElement("canvas")
		canvas.width = pngExportSize
		canvas.height = pngExportSize
		const context = canvas.getContext("2d")

		if (!context) {
			toast.error("Could not create PNG")
			return
		}

		context.clearRect(0, 0, pngExportSize, pngExportSize)
		context.imageSmoothingEnabled = true
		context.imageSmoothingQuality = "high"
		context.font = `${Math.round(pngExportSize * pngGlyphScale)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`
		context.textAlign = "center"
		context.textBaseline = "middle"
		context.fillText(emoji.emoji, pngExportSize / 2, pngExportSize / 2)

		canvas.toBlob((blob) => {
			if (!blob) {
				toast.error("Could not create PNG")
				return
			}

			downloadBlob(blob, `${getEmojiFilename(emoji)}-${pngExportSize}px.png`)
			toast.success("PNG downloaded")
		}, "image/png")
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-wrap gap-2">
				<EmojiCopyButton
					value={emoji.emoji}
					successLabel="Emoji text"
					size="40"
					variant="strong">
					<Copy />
					Copy as Text
				</EmojiCopyButton>
				<EmojiCopyButton
					value={svgMarkup}
					successLabel="SVG"
					size="40"
					color="neutral"
					variant="outline">
					<FileCode2 />
					Copy SVG
				</EmojiCopyButton>
				<EmojiCopyButton
					value={getEmojiHtmlSnippet(emoji)}
					successLabel="HTML"
					size="40"
					color="neutral"
					variant="outline">
					Copy HTML
				</EmojiCopyButton>
				<EmojiCopyButton
					value={getEmojiCodePoints(emoji.emoji).join(" ")}
					successLabel="Unicode codepoint"
					size="40"
					color="neutral"
					variant="outline">
					Copy Unicode
				</EmojiCopyButton>
			</div>

			<div className="flex flex-wrap gap-2">
				<EmojiExportButton onClick={downloadSvg} icon={<Download />}>
					Download SVG
				</EmojiExportButton>
				<EmojiExportButton onClick={downloadPng} icon={<ImageIcon />}>
					Download PNG
				</EmojiExportButton>
				<span className="text-fg-tertiary self-center px-2 text-xs">
					PNG: transparent {pngExportSize} × {pngExportSize}px
				</span>
			</div>

			<div className="flex flex-col gap-3">
				<div>
					<h3 className="text-sm font-semibold">Copy-ready formats</h3>
					<p className="text-fg-secondary text-sm">
						Use the exact value required by your interface or source code.
					</p>
				</div>
				<Card className="gap-0 overflow-hidden p-0">
					{formats.map((format) => (
						<div
							key={format.label}
							className="border-soft grid min-w-0 gap-2 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-center">
							<span className="text-fg-secondary text-sm font-medium">
								{format.label}
							</span>
							<code className="bg-fill1 min-w-0 overflow-x-auto rounded-md px-2.5 py-2 text-xs whitespace-nowrap">
								{format.value}
							</code>
							<EmojiCopyButton
								value={format.value}
								successLabel={format.label}
								size="32"
								color="neutral"
								variant="ghost"
								aria-label={`Copy ${format.label}`}>
								<Copy />
							</EmojiCopyButton>
						</div>
					))}
				</Card>
			</div>

			<div className="flex flex-col gap-3">
				<div>
					<h3 className="text-sm font-semibold">UI legibility scale</h3>
					<p className="text-fg-secondary text-sm">
						Preview the {displayName} emoji at common interface sizes.
					</p>
				</div>
				<Card className="grid grid-cols-2 gap-0 overflow-hidden p-0 sm:grid-cols-5">
					{legibilitySizes.map((size) => (
						<div
							key={size}
							className="border-soft flex min-h-28 flex-col items-center justify-center gap-3 border-r border-b p-4 last:border-r-0 sm:border-b-0">
							<span
								style={{
									fontSize: size,
									lineHeight: `${Math.max(size, 24)}px`,
								}}
								aria-hidden="true">
								{emoji.emoji}
							</span>
							<span className="text-fg-tertiary text-xs">{size}px</span>
						</div>
					))}
				</Card>
			</div>
		</div>
	)
}

function EmojiExportButton({
	onClick,
	icon,
	children,
}: {
	onClick: () => void
	icon: ReactNode
	children: ReactNode
}) {
	return (
		<Button size="40" color="neutral" variant="outline" onClick={onClick}>
			{icon}
			{children}
		</Button>
	)
}
