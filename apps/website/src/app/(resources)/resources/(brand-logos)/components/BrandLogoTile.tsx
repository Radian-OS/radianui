"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Skeleton } from "@/registry/ui/skeleton"
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

// CSS backgrounds cannot report failures. Keep retrying transient CDN errors,
// with a capped backoff, and cancel pending retries when filters remove a tile.
function BrandLogoPreview({
	src,
	alt,
	className,
}: {
	src: string
	alt: string
	className: string
}) {
	const [attempt, setAttempt] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const imageRef = useRef<HTMLImageElement>(null)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const retry = useCallback(() => {
		setLoaded(false)
		if (timer.current !== null) clearTimeout(timer.current)
		timer.current = setTimeout(
			() => {
				setAttempt((value) => value + 1)
			},
			Math.min(1000 * 2 ** Math.min(attempt, 5), 30000)
		)
	}, [attempt])
	useEffect(() => {
		// Cached images can finish before hydration attaches the load handler.
		const image = imageRef.current
		if (!image?.complete) return
		if (image.naturalWidth > 0) setLoaded(true)
		else retry()
	}, [retry])
	useEffect(
		() => () => {
			if (timer.current !== null) clearTimeout(timer.current)
		},
		[]
	)

	return (
		<span className={cn("relative", className)} aria-busy={!loaded}>
			{!loaded && (
				<Skeleton
					aria-hidden="true"
					className="absolute inset-0 animate-none rounded-md"
				/>
			)}
			<img
				ref={imageRef}
				src={attempt === 0 ? src : `${src}?retry=${attempt}`}
				alt={alt}
				className="relative size-full object-contain"
				onLoad={() => setLoaded(true)}
				loading="eager"
				decoding="async"
				onError={retry}
			/>
		</span>
	)
}
