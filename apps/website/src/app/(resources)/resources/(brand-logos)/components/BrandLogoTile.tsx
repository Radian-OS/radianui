"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { BrandLogoTileMenu } from "./BrandLogoTileMenu"
import type { BrandLogoId, BrandLogoVariant } from "./brand-logos-data"
import {
	getBrandLogo,
	getBrandLogoHtmlMarkup,
	getBrandLogoNextImageMarkup,
	getBrandLogoSvgMarkup,
	getBrandLogoUrl,
} from "./brand-logos-data"

function blobToDataUrl(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(String(reader.result))
		reader.onerror = () => reject(reader.error)
		reader.readAsDataURL(blob)
	})
}

interface BrandLogoTileProps {
	id: BrandLogoId
	variant: BrandLogoVariant
	priority?: boolean
	onSelect: (id: BrandLogoId) => void
}

export function BrandLogoTile({
	id,
	variant,
	priority = false,
	onSelect,
}: BrandLogoTileProps) {
	const [copied, setCopied] = useState(false)
	const { resolvedTheme } = useTheme()
	const activeTheme = resolvedTheme === "dark" ? "dark" : "light"
	const brand = getBrandLogo(id)
	const pngUrl = getBrandLogoUrl(id, activeTheme, variant)
	const lightPngUrl = getBrandLogoUrl(id, "light", variant)
	const darkPngUrl = getBrandLogoUrl(id, "dark", variant)

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
			const response = await fetch(pngUrl)
			if (!response.ok) throw new Error("Logo request failed")
			const imageHref = await blobToDataUrl(await response.blob())
			await navigator.clipboard.writeText(
				getBrandLogoSvgMarkup(id, variant, imageHref)
			)
			showCopied("SVG")
		} catch {
			toast.error("Could not copy SVG")
		}
	}

	const copyPng = async () => {
		try {
			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(pngUrl, "PNG URL")
				return
			}

			const response = await fetch(pngUrl)
			if (!response.ok) throw new Error("Logo request failed")
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": await response.blob() }),
			])
			showCopied("PNG")
		} catch {
			toast.error("Could not copy PNG")
		}
	}

	return (
		<li className="group relative size-[142px] min-w-0">
			<Button
				size="32"
				color="neutral"
				variant="outline"
				className="bg-bg hover:bg-bg size-[142px] overflow-hidden rounded-xl p-0"
				aria-label={`View ${brand.name} ${variant} details`}
				onClick={() => onSelect(id)}>
				<img
					src={lightPngUrl}
					alt={`${brand.name} ${variant}`}
					width={variant === "icon" ? 64 : 240}
					height={64}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
					fetchPriority={priority ? "high" : "auto"}
					className={cn(
						"object-contain dark:hidden",
						variant === "icon" ? "size-12" : "h-12 w-[80%] max-w-45"
					)}
				/>
				<img
					src={darkPngUrl}
					alt=""
					width={variant === "icon" ? 64 : 240}
					height={64}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
					fetchPriority={priority ? "high" : "auto"}
					className={cn(
						"hidden object-contain dark:block",
						variant === "icon" ? "size-12" : "h-12 w-[80%] max-w-45"
					)}
				/>
			</Button>

			<BrandLogoTileMenu
				onCopyPng={copyPng}
				onCopySvg={copySvg}
				onCopyUrl={() => copyText(pngUrl, "CDN URL")}
				onCopyNextImage={() =>
					copyText(
						getBrandLogoNextImageMarkup(id, activeTheme, variant),
						"Next.js markup"
					)
				}
				onCopyHtmlImage={() =>
					copyText(
						getBrandLogoHtmlMarkup(id, activeTheme, variant),
						"HTML markup"
					)
				}
			/>

			<div className="absolute inset-x-0 top-[102px] z-20 px-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
				<Button
					size="28"
					color="neutral"
					variant="outline"
					className="bg-bg w-full"
					onClick={copySvg}>
					{copied ? "Copied" : "Copy SVG"}
				</Button>
			</div>
		</li>
	)
}
