"use client"

import { memo, useCallback, useState, type CSSProperties } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { BrandLogoTileMenu } from "./BrandLogoTileMenu"
import { showBrandLogoToast } from "./BrandLogoToast"
import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"
import {
	getBrandLogo,
	getBrandLogoPagePath,
	getBrandLogoDisplayUrl,
	getBrandLogoHtmlMarkup,
	getBrandLogoNextImageMarkup,
	getBrandLogoSvgUrl,
} from "./brand-logos-data"

function currentTheme() {
	return document.documentElement.classList.contains("dark")
		? ("dark" as const)
		: ("light" as const)
}

interface BrandLogoTileProps {
	id: BrandLogoId
	variant: BrandLogoVariant
	colorway?: BrandLogoColorway
	onSelect: (id: BrandLogoId) => void
}

export const BrandLogoTile = memo(function BrandLogoTile({
	id,
	variant,
	colorway = "colored",
	onSelect,
}: BrandLogoTileProps) {
	const [copied, setCopied] = useState(false)
	const brand = getBrandLogo(id)
	const previewStyle = {
		"--logo-light": `url("${getBrandLogoDisplayUrl(id, "light", colorway, variant)}")`,
		"--logo-dark": `url("${getBrandLogoDisplayUrl(id, "dark", colorway, variant)}")`,
	} as CSSProperties

	const showCopied = useCallback(
		(format: string) => {
			setCopied(true)
			showBrandLogoToast({
				logoUrl: getBrandLogoDisplayUrl(id, currentTheme(), colorway, variant),
				description: `${format} has been copied to your clipboard.`,
			})
			window.setTimeout(() => setCopied(false), 1600)
		},
		[id, colorway, variant]
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
			const { fetchBrandLogoSvg } = await import("./brand-logo-assets")
			await navigator.clipboard.writeText(
				await fetchBrandLogoSvg(id, currentTheme(), colorway, variant)
			)
			showCopied("SVG code")
		} catch {
			toast.error("Could not copy SVG code")
		}
	}, [id, colorway, variant, showCopied])

	const copyPng = useCallback(async () => {
		try {
			if (!navigator.clipboard.write || !("ClipboardItem" in window)) {
				await copyText(
					getBrandLogoSvgUrl(id, currentTheme(), colorway, variant),
					"CDN URL"
				)
				return
			}
			const { renderBrandLogoPng } = await import("./brand-logo-assets")
			const blob = await renderBrandLogoPng(
				id,
				currentTheme(),
				colorway,
				variant
			)
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			])
			showCopied("PNG image")
		} catch {
			toast.error("Could not copy PNG image")
		}
	}, [id, colorway, variant, copyText, showCopied])

	const handleCopyUrl = useCallback(() => {
		void copyText(
			getBrandLogoSvgUrl(id, currentTheme(), colorway, variant),
			"CDN URL"
		)
	}, [copyText, id, colorway, variant])
	const handleCopyNextImage = useCallback(() => {
		void copyText(
			getBrandLogoNextImageMarkup(id, currentTheme(), colorway, variant),
			"Next.js markup"
		)
	}, [copyText, id, colorway, variant])
	const handleCopyHtmlImage = useCallback(() => {
		void copyText(
			getBrandLogoHtmlMarkup(id, currentTheme(), colorway, variant),
			"HTML markup"
		)
	}, [copyText, id, colorway, variant])

	return (
		<li className="group relative aspect-square w-full min-w-0">
			<Button
				size="32"
				color="neutral"
				variant="outline"
				className="bg-bg hover:bg-bg size-full overflow-hidden rounded-2xl px-0 py-0"
				asChild>
				<a
					href={getBrandLogoPagePath(id)}
					aria-label={`View ${brand.name} logo details`}
					onClick={(event) => {
						if (
							event.button !== 0 ||
							event.metaKey ||
							event.ctrlKey ||
							event.shiftKey ||
							event.altKey
						)
							return
						event.preventDefault()
						onSelect(id)
					}}>
					<span
						role="img"
						aria-label={`${brand.name} ${variant}`}
						style={previewStyle}
						className={cn(
							"bg-[image:var(--logo-light)] bg-contain bg-center bg-no-repeat dark:bg-[image:var(--logo-dark)]",
							variant === "icon" ? "size-12 shrink-0" : "h-[28%] w-full"
						)}
					/>
				</a>
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
