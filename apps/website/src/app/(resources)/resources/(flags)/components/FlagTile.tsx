"use client"

import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { FlagTileMenu } from "./FlagTileMenu"
import type { FlagName, FlagShape } from "./flags-data"
import {
	getFlagDisplayName,
	getFlagHtmlMarkup,
	getFlagNextImageMarkup,
	getFlagSvgMarkup,
	getFlagUrl,
} from "./flags-data"

interface FlagTileProps {
	name: FlagName
	shape: FlagShape
	priority?: boolean
	onSelect: (name: FlagName) => void
}

function blobToDataUrl(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(String(reader.result))
		reader.onerror = () => reject(reader.error)
		reader.readAsDataURL(blob)
	})
}

export function FlagTile({
	name,
	shape,
	priority = false,
	onSelect,
}: FlagTileProps) {
	const [copied, setCopied] = useState(false)
	const displayName = getFlagDisplayName(name)
	const flagUrl = getFlagUrl(name, shape)
	const previewSize = shape === "round" ? 32 : 48

	const showCopied = (format: string) => {
		setCopied(true)
		toast.success(`${format} copied to clipboard`)
		window.setTimeout(() => setCopied(false), 1600)
	}

	const copyText = async (value: string, label: string) => {
		try {
			await navigator.clipboard.writeText(value)
			showCopied(label)
		} catch {
			toast.error(`Could not copy ${label}`)
		}
	}

	const copySvg = async () => {
		try {
			const response = await fetch(flagUrl)
			if (!response.ok) throw new Error("Flag request failed")

			const imageHref = await blobToDataUrl(await response.blob())
			const svgMarkup = getFlagSvgMarkup(name, imageHref)

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
	}

	const copyPng = async () => {
		try {
			const response = await fetch(flagUrl)
			if (!response.ok) throw new Error("Flag request failed")

			const imageBlob = await response.blob()
			const pngBlob =
				imageBlob.type === "image/png"
					? imageBlob
					: new Blob([imageBlob], { type: "image/png" })
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": pngBlob }),
			])
			showCopied("PNG")
		} catch {
			toast.error("Could not copy PNG")
		}
	}

	return (
		<li className="group relative size-[142px] shrink-0">
			<Button
				size="32"
				color="neutral"
				variant="outline"
				className="bg-bg hover:bg-bg size-[142px] overflow-hidden rounded-xl p-0"
				aria-label={`View ${displayName} flag details`}
				onClick={() => onSelect(name)}>
				<img
					src={flagUrl}
					alt={`${displayName} flag`}
					width={previewSize}
					height={previewSize}
					loading="eager"
					decoding="async"
					fetchPriority={priority ? "high" : "auto"}
					className={cn(
						"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain",
						shape === "round" ? "size-8" : "size-12"
					)}
				/>
				<span className="text-fg-secondary absolute inset-x-2 bottom-3 truncate text-xs font-medium transition-opacity duration-200 group-focus-within:opacity-0 group-hover:opacity-0">
					{displayName}
				</span>
			</Button>

			<FlagTileMenu
				onCopyPng={copyPng}
				onCopySvg={copySvg}
				onCopyUrl={() => copyText(flagUrl, "URL")}
				onCopyNextImage={() =>
					copyText(getFlagNextImageMarkup(name, shape), "Next.js markup")
				}
				onCopyHtmlImage={() =>
					copyText(getFlagHtmlMarkup(name, shape), "HTML markup")
				}
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
}
