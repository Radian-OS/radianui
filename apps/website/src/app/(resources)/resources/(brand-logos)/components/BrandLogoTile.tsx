"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"
import { BrandLogoTileMenu } from "./BrandLogoTileMenu"
import type { BrandLogoId, BrandLogoVariant } from "./brand-logos-data"
import {
	getBrandLogo,
	getBrandLogoHtmlMarkup,
	getBrandLogoNextImageMarkup,
	getBrandLogoUrl,
} from "./brand-logos-data"

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
	const svgUrl = getBrandLogoUrl(id, activeTheme, variant, "svg")
	const lightSvgUrl = getBrandLogoUrl(id, "light", variant, "svg")
	const darkSvgUrl = getBrandLogoUrl(id, "dark", variant, "svg")

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
			const response = await fetch(svgUrl)
			if (!response.ok) throw new Error("Logo request failed")
			await navigator.clipboard.writeText(await response.text())
			showCopied("SVG")
		} catch {
			toast.error("Could not copy SVG")
		}
	}

	const copyPng = async () => {
		const pngUrl = getBrandLogoUrl(id, activeTheme, variant, "png")
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
		<li className="group relative min-w-0">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size="32"
						color="neutral"
						variant="outline"
						className="bg-bg h-[142px] w-full overflow-hidden rounded-xl p-0"
						aria-label={`View ${brand.name} ${variant} details`}
						onClick={() => onSelect(id)}>
						<img
							src={lightSvgUrl}
							alt={`${brand.name} ${variant}`}
							width={variant === "icon" ? 48 : 180}
							height={48}
							loading="eager"
							decoding="async"
							fetchPriority={priority ? "high" : "auto"}
							className={cn(
								"object-contain dark:hidden",
								variant === "icon" ? "size-12" : "h-12 w-[80%] max-w-45"
							)}
						/>
						<img
							src={darkSvgUrl}
							alt=""
							width={variant === "icon" ? 48 : 180}
							height={48}
							loading="eager"
							decoding="async"
							fetchPriority={priority ? "high" : "auto"}
							className={cn(
								"hidden object-contain dark:block",
								variant === "icon" ? "size-12" : "h-12 w-[80%] max-w-45"
							)}
						/>
					</Button>
				</TooltipTrigger>
				<TooltipContent
					theme="light"
					side="top"
					className="z-110 text-xs whitespace-nowrap">
					{brand.name}
				</TooltipContent>
			</Tooltip>

			<BrandLogoTileMenu
				onCopyPng={copyPng}
				onCopySvg={copySvg}
				onCopyUrl={() => copyText(svgUrl, "CDN URL")}
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

			<p className="text-fg-secondary mt-2 truncate px-1 text-center text-xs font-medium">
				{brand.name}
			</p>
		</li>
	)
}
