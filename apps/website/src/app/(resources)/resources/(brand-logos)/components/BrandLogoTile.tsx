"use client"

import { memo, useCallback, useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { fetchBrandLogoSvg, renderBrandLogoPng } from "./brand-logo-assets"
import { BrandLogoTileMenu } from "./BrandLogoTileMenu"
import { showBrandLogoToast } from "./BrandLogoToast"
import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"
import {
	getBrandLogo,
	getBrandLogoDisplayUrl,
	getBrandLogoFallbackUrl,
	getBrandLogoHtmlMarkup,
	getBrandLogoNextImageMarkup,
	getBrandLogoSvgUrl,
	registerBrandLogoFallback,
} from "./brand-logos-data"

interface BrandLogoTileProps {
	id: BrandLogoId
	variant: BrandLogoVariant
	colorway?: BrandLogoColorway
	priority?: boolean
	onSelect: (id: BrandLogoId) => void
}

export const BrandLogoTile = memo(function BrandLogoTile({
	id,
	variant,
	colorway = "colored",
	priority = false,
	onSelect,
}: BrandLogoTileProps) {
	const [copied, setCopied] = useState(false)
	const { resolvedTheme } = useTheme()
	const activeTheme = resolvedTheme === "dark" ? "dark" : "light"
	const brand = getBrandLogo(id)

	const lightSvgUrl = getBrandLogoSvgUrl(id, "light", colorway, variant)
	const darkSvgUrl = getBrandLogoSvgUrl(id, "dark", colorway, variant)
	const lightDisplayUrl = getBrandLogoDisplayUrl(id, "light", colorway, variant)
	const darkDisplayUrl = getBrandLogoDisplayUrl(id, "dark", colorway, variant)
	const activeSvgUrl = activeTheme === "dark" ? darkSvgUrl : lightSvgUrl
	const activeDisplayUrl =
		activeTheme === "dark" ? darkDisplayUrl : lightDisplayUrl

	const showCopied = useCallback(
		(format: string) => {
			setCopied(true)
			showBrandLogoToast({
				logoUrl: activeDisplayUrl,
				description: `${format} has been copied to your clipboard.`,
			})
			window.setTimeout(() => setCopied(false), 1600)
		},
		[activeDisplayUrl]
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
			const svgMarkup = await fetchBrandLogoSvg(
				id,
				activeTheme,
				colorway,
				variant
			)
			await navigator.clipboard.writeText(svgMarkup)
			showCopied("SVG code")
		} catch {
			toast.error("Could not copy SVG code")
		}
	}, [id, activeTheme, colorway, variant, showCopied])

	const copyPng = useCallback(async () => {
		try {
			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(activeSvgUrl, "CDN URL")
				return
			}

			const blob = await renderBrandLogoPng(id, activeTheme, colorway, variant)
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			])
			showCopied("PNG image")
		} catch {
			toast.error("Could not copy PNG image")
		}
	}, [id, activeTheme, colorway, variant, activeSvgUrl, copyText, showCopied])

	const handleCopyUrl = useCallback(() => {
		copyText(activeSvgUrl, "CDN URL")
	}, [copyText, activeSvgUrl])

	const handleCopyNextImage = useCallback(() => {
		copyText(
			getBrandLogoNextImageMarkup(id, activeTheme, colorway, variant),
			"Next.js markup"
		)
	}, [copyText, id, activeTheme, colorway, variant])

	const handleCopyHtmlImage = useCallback(() => {
		copyText(
			getBrandLogoHtmlMarkup(id, activeTheme, colorway, variant),
			"HTML markup"
		)
	}, [copyText, id, activeTheme, colorway, variant])

	return (
		<li className="group relative aspect-square w-full min-w-0">
			<Button
				size="32"
				color="neutral"
				variant="outline"
				className="bg-bg hover:bg-bg size-full overflow-hidden rounded-2xl p-0"
				aria-label={`View ${brand.name} ${variant} details`}
				onClick={() => onSelect(id)}>
				<img
					src={lightDisplayUrl}
					alt={`${brand.name} ${variant}`}
					width={variant === "icon" ? 24 : 180}
					height={variant === "icon" ? 24 : 48}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
					fetchPriority={priority ? "high" : "auto"}
					onError={(e) => {
						registerBrandLogoFallback(id)
						const fallback = getBrandLogoFallbackUrl(
							id,
							"light",
							colorway,
							variant
						)
						if (
							e.currentTarget.src !== fallback &&
							!e.currentTarget.src.endsWith(fallback)
						) {
							e.currentTarget.src = fallback
						}
					}}
					className={cn(
						"object-contain dark:hidden",
						variant === "icon" ? "size-[45%]" : "h-[28%] w-[82%]"
					)}
				/>
				<img
					src={darkDisplayUrl}
					alt=""
					width={variant === "icon" ? 24 : 180}
					height={variant === "icon" ? 24 : 48}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
					fetchPriority={priority ? "high" : "auto"}
					onError={(e) => {
						registerBrandLogoFallback(id)
						const fallback = getBrandLogoFallbackUrl(
							id,
							"dark",
							colorway,
							variant
						)
						if (
							e.currentTarget.src !== fallback &&
							!e.currentTarget.src.endsWith(fallback)
						) {
							e.currentTarget.src = fallback
						}
					}}
					className={cn(
						"hidden object-contain dark:block",
						variant === "icon" ? "size-[45%]" : "h-[28%] w-[82%]"
					)}
				/>
			</Button>

			<BrandLogoTileMenu
				onCopyPng={copyPng}
				onCopySvg={copySvg}
				onCopyUrl={handleCopyUrl}
				onCopyNextImage={handleCopyNextImage}
				onCopyHtmlImage={handleCopyHtmlImage}
			/>

			<div className="absolute inset-x-3 bottom-3 z-20 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
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
})
