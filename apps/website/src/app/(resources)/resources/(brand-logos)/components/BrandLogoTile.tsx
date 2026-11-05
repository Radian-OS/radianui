"use client"

import { memo, useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Skeleton } from "@/registry/ui/skeleton"
import { brandLogoPreviewLoader } from "./brand-logo-preview-loader"
import { BrandLogoTileMenu } from "./BrandLogoTileMenu"
import { showBrandLogoToast } from "./BrandLogoToast"
import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
} from "./brand-logos-data"
import { useBrandLogoCatalog } from "./BrandLogoCatalogProvider"

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
	const {
		getBrandLogo,
		getBrandLogoPagePath,
		getBrandLogoDisplayUrl,
		getBrandLogoHtmlMarkup,
		getBrandLogoNextImageMarkup,
		getBrandLogoSvgUrl,
	} = useBrandLogoCatalog()
	const { resolvedTheme } = useTheme()
	const activeTheme = resolvedTheme === "dark" ? "dark" : "light"
	const previewUrl = getBrandLogoDisplayUrl(id, activeTheme, colorway, variant)
	const [copied, setCopied] = useState(false)
	const brand = getBrandLogo(id)

	const showCopied = useCallback(
		(format: string) => {
			setCopied(true)
			showBrandLogoToast({
				logoUrl: getBrandLogoDisplayUrl(id, currentTheme(), colorway, variant),
				description: `${format} has been copied to your clipboard.`,
			})
			window.setTimeout(() => setCopied(false), 1600)
		},
		[id, colorway, variant, getBrandLogoDisplayUrl]
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
				await fetchBrandLogoSvg(
					getBrandLogoSvgUrl(id, currentTheme(), colorway, variant)
				)
			)
			showCopied("SVG code")
		} catch {
			toast.error("Could not copy SVG code")
		}
	}, [id, colorway, variant, showCopied, getBrandLogoSvgUrl])

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
				getBrandLogoSvgUrl(id, currentTheme(), colorway, variant),
				variant
			)
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			])
			showCopied("PNG image")
		} catch {
			toast.error("Could not copy PNG image")
		}
	}, [id, colorway, variant, copyText, showCopied, getBrandLogoSvgUrl])

	const handleCopyUrl = useCallback(() => {
		void copyText(
			getBrandLogoSvgUrl(id, currentTheme(), colorway, variant),
			"CDN URL"
		)
	}, [copyText, id, colorway, variant, getBrandLogoSvgUrl])
	const handleCopyNextImage = useCallback(() => {
		void copyText(
			getBrandLogoNextImageMarkup(id, currentTheme(), colorway, variant),
			"Next.js markup"
		)
	}, [copyText, id, colorway, variant, getBrandLogoNextImageMarkup])
	const handleCopyHtmlImage = useCallback(() => {
		void copyText(
			getBrandLogoHtmlMarkup(id, currentTheme(), colorway, variant),
			"HTML markup"
		)
	}, [copyText, id, colorway, variant, getBrandLogoHtmlMarkup])

	return (
		<li className="group relative aspect-square w-full min-w-0">
			<Button
				size="sm"
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
					<BrandLogoPreview
						key={previewUrl}
						src={previewUrl}
						alt={`${brand.name} ${variant}`}
						className={
							variant === "icon" ? "size-12 shrink-0" : "h-[28%] w-full"
						}
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
					size="xs"
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

// The shared queue bounds image requests; successful URLs survive filter changes.
function BrandLogoPreview({
	src,
	alt,
	className,
}: {
	src: string
	alt: string
	className: string
}) {
	const [loaded, setLoaded] = useState(() => brandLogoPreviewLoader.has(src))
	const [recovery, setRecovery] = useState(0)
	useEffect(() => {
		const controller = new AbortController()
		let timer: ReturnType<typeof setTimeout> | undefined
		let attempt = 0
		const load = () => {
			void brandLogoPreviewLoader
				.load(src, controller.signal)
				.then(() => {
					if (!controller.signal.aborted) setLoaded(true)
				})
				.catch(() => {
					if (controller.signal.aborted) return
					timer = setTimeout(
						load,
						Math.min(1000 * 2 ** Math.min(attempt++, 5), 30000)
					)
				})
		}
		load()
		return () => {
			controller.abort()
			clearTimeout(timer)
		}
	}, [src, recovery])

	return (
		<span className={cn("relative", className)} aria-busy={!loaded}>
			{loaded ? (
				<img
					src={src}
					alt={alt}
					className="size-full object-contain"
					decoding="async"
					onError={() => {
						brandLogoPreviewLoader.forget(src)
						setLoaded(false)
						setRecovery((value) => value + 1)
					}}
				/>
			) : (
				<Skeleton
					aria-label={`Loading ${alt}`}
					className="absolute inset-0 animate-none rounded-md"
				/>
			)}
		</span>
	)
}
