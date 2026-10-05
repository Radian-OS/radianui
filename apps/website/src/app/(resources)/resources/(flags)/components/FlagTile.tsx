"use client"

import { type MouseEvent, memo, useCallback, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import { getFlagSvgMarkup, renderFlagPng } from "./flag-assets"
import { FlagImage } from "./FlagImage"
import { FlagTileMenu } from "./FlagTileMenu"
import { showFlagToast } from "./FlagToast"
import type { FlagName, FlagShape } from "./flags-data"
import {
	getFlagDisplayName,
	getFlagHtmlMarkup,
	getFlagNextImageMarkup,
	getFlagPagePath,
	getFlagSvgUrl,
} from "./flags-data"

interface FlagTileProps {
	name: FlagName
	shape: FlagShape
	priority?: boolean
	onSelect: (name: FlagName) => void
}

export const FlagTile = memo(function FlagTile({
	name,
	shape,
	priority = false,
	onSelect,
}: FlagTileProps) {
	const [copied, setCopied] = useState(false)
	const displayName = getFlagDisplayName(name)
	const flagUrl = getFlagSvgUrl(name)
	const previewSize = shape === "round" ? 40 : 48

	const showCopied = useCallback(
		(format: string) => {
			setCopied(true)
			showFlagToast({
				name,
				shape,
				description: `${format} has been copied to your clipboard.`,
			})
			window.setTimeout(() => setCopied(false), 1600)
		},
		[name, shape]
	)

	const copyText = useCallback(
		async (value: string, label: string) => {
			try {
				await navigator.clipboard.writeText(value)
				showCopied(label)
			} catch {
				toast.error(`Could not copy ${label}`)
			}
		},
		[showCopied]
	)

	const copySvg = useCallback(async () => {
		try {
			const svgMarkup = await getFlagSvgMarkup(name, shape)

			if (navigator.clipboard.write && "ClipboardItem" in window) {
				await navigator.clipboard.write([
					new ClipboardItem({
						"text/html": new Blob([svgMarkup], { type: "text/html" }),
						"text/plain": new Blob([svgMarkup], { type: "text/plain" }),
					}),
				])
			} else {
				await navigator.clipboard.writeText(svgMarkup)
			}

			showCopied("SVG")
		} catch {
			toast.error("Could not copy SVG")
		}
	}, [name, shape, showCopied])

	const copyPng = useCallback(async () => {
		try {
			const pngBlob = await renderFlagPng(name, shape, 64)
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": pngBlob }),
			])
			showCopied("PNG")
		} catch {
			toast.error("Could not copy PNG")
		}
	}, [name, shape, showCopied])

	const handleCopyUrl = useCallback(() => {
		copyText(flagUrl, "URL")
	}, [copyText, flagUrl])

	const handleCopyNextImage = useCallback(() => {
		copyText(getFlagNextImageMarkup(name, shape), "Next.js markup")
	}, [copyText, name, shape])

	const handleCopyHtmlImage = useCallback(() => {
		copyText(getFlagHtmlMarkup(name, shape), "HTML markup")
	}, [copyText, name, shape])

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

		event.preventDefault()
		onSelect(name)
	}

	return (
		<li className="group relative aspect-square w-full min-w-0 sm:size-[142px]">
			<Button
				asChild
				size="32"
				color="neutral"
				variant="outline"
				className="bg-bg hover:bg-bg size-full overflow-hidden rounded-xl p-0 pb-6">
				<Link
					href={getFlagPagePath(name)}
					prefetch={false}
					onClick={handleClick}
					aria-label={`View ${displayName} flag details`}>
					<FlagImage
						name={name}
						shape={shape}
						size={previewSize}
						loading={priority ? "eager" : "lazy"}
						decoding="async"
						fetchPriority={priority ? "high" : "auto"}
					/>
					<span className="text-fg-secondary absolute inset-x-2 bottom-3 truncate text-xs font-medium transition-opacity duration-200 group-focus-within:opacity-0 group-hover:opacity-0">
						{displayName}
					</span>
				</Link>
			</Button>

			<FlagTileMenu
				onCopyPng={copyPng}
				onCopySvg={copySvg}
				onCopyUrl={handleCopyUrl}
				onCopyNextImage={handleCopyNextImage}
				onCopyHtmlImage={handleCopyHtmlImage}
			/>

			<div className="absolute inset-x-0 bottom-0 z-20 p-2 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
				<Button
					size="28"
					color="neutral"
					variant="outline"
					className="bg-bg w-full"
					onClick={copySvg}>
					{copied ? "Copied" : "Copy"}
				</Button>
			</div>
		</li>
	)
})
