"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import { Skeleton } from "@/registry/ui/skeleton"
import { getBrandLogoPreviewSource } from "./brand-logo-preview-loader"
import { BrandLogoTileMenu } from "./BrandLogoTileMenu"
import { showBrandLogoToast } from "./BrandLogoToast"
import type {
	BrandLogoColorway,
	BrandLogoId,
	BrandLogoVariant,
	BrandLogoTheme,
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
	priority?: boolean
	theme?: BrandLogoTheme
}

export const BrandLogoTile = memo(function BrandLogoTile({
	id,
	variant,
	colorway = "colored",
	onSelect,
	priority = false,
	theme,
}: BrandLogoTileProps) {
	const {
		getBrandLogo,
		getBrandLogoPagePath,
		getBrandLogoDisplayUrl,
		getBrandLogoHtmlMarkup,
		getBrandLogoNextImageMarkup,
		getBrandLogoSvgUrl,
	} = useBrandLogoCatalog()
	const previewUrl = theme
		? getBrandLogoDisplayUrl(id, theme, colorway, variant)
		: undefined
	const [copied, setCopied] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
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
		<li
			className="group relative aspect-square w-full min-w-0"
			onPointerEnter={() => setShowMenu(true)}
			onFocusCapture={() => setShowMenu(true)}>
			<Button
				size="sm"
				color="neutral"
				variant="outline"
				className="bg-bg hover:bg-bg relative size-full overflow-hidden rounded-2xl px-0 py-0"
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
						priority={priority}
						src={previewUrl}
						alt={`${brand.name} ${variant}`}
						className={
							variant === "icon" ? "size-12 shrink-0" : "h-[28%] w-full"
						}
					/>
				</a>
			</Button>
			{showMenu && (
				<BrandLogoTileMenu
					onCopyPng={copyPng}
					onCopySvg={copySvg}
					onCopyUrl={handleCopyUrl}
					onCopyNextImage={handleCopyNextImage}
					onCopyHtmlImage={handleCopyHtmlImage}
				/>
			)}
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

// Render the actual image immediately so browser caching, request priority,
// and multiplexing work without a separate preload or global queue.
function BrandLogoPreview({
	src,
	alt,
	className,
	priority,
}: {
	src: string | undefined
	alt: string
	className: string
	priority: boolean
}) {
	const [attempt, setAttempt] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const imageRef = useRef<HTMLImageElement>(null)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const source = src ? getBrandLogoPreviewSource(src, attempt) : undefined
	const retry = useCallback(() => {
		if (timerRef.current !== null) clearTimeout(timerRef.current)
		timerRef.current = setTimeout(
			() => {
				setLoaded(false)
				setAttempt((value) => value + 1)
			},
			Math.min(250 * 2 ** Math.min(attempt, 6), 15000)
		)
	}, [attempt])

	useEffect(() => {
		if (!source) return
		const clearTimer = () => {
			if (timerRef.current !== null) clearTimeout(timerRef.current)
			timerRef.current = null
		}
		clearTimer()
		const image = imageRef.current
		if (image?.complete && image.naturalWidth > 0) {
			setLoaded(true)
		} else if (image?.complete) {
			retry()
		} else {
			// A stalled image retries independently of every other tile.
			timerRef.current = setTimeout(retry, 8000)
		}
		return clearTimer
	}, [source, retry])

	return (
		<span className={className} aria-busy={!loaded}>
			{!loaded && (
				<Skeleton
					aria-hidden="true"
					className="absolute inset-0 animate-none rounded-2xl"
				/>
			)}
			<img
				key={source}
				ref={imageRef}
				src={source}
				alt={alt}
				className="relative size-full object-contain"
				loading="eager"
				fetchPriority={priority ? "high" : "low"}
				decoding="async"
				onLoad={() => {
					if (timerRef.current !== null) clearTimeout(timerRef.current)
					setLoaded(true)
				}}
				onError={retry}
			/>
		</span>
	)
}
