"use client"

import { useState } from "react"
import { Copy, Download, MoreHorizontal, Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button, CompactButton, IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import {
	AVATAR_BLEND_OPACITY,
	GRADIENT_MAP,
	SOLID_COLOR_MAP,
	generateEditableSvg,
	getImageBackgroundTint,
	resolveRadianColor,
} from "./avatar-playground-utils"

interface AvatarTileProps {
	src: string
	index: number
	toneStyle: React.CSSProperties
	tone: string
	copyFormat: string
}

export const AvatarTile = ({
	src,
	index,
	toneStyle,
	tone,
	copyFormat,
}: AvatarTileProps) => {
	const [copied, setCopied] = useState(false)
	const [open, setOpen] = useState<boolean>(false)
	const isNeutralBackground = tone === "neutral" || tone === "none"
	const imageBackgroundTint = getImageBackgroundTint(tone)
	const shouldApplyShadow =
		!isNeutralBackground && Object.keys(toneStyle).length > 0
	const shadowStyle = imageBackgroundTint
		? { backgroundColor: imageBackgroundTint }
		: toneStyle

	const createCompositeBlob = async (): Promise<Blob | null> => {
		const size = 512
		const canvas = document.createElement("canvas")
		canvas.width = size
		canvas.height = size
		const ctx = canvas.getContext("2d")
		if (!ctx) return null
		let backgroundImage: HTMLImageElement | null = null

		if (SOLID_COLOR_MAP[tone]) {
			ctx.fillStyle = SOLID_COLOR_MAP[tone]
			ctx.fillRect(0, 0, size, size)
		} else if (GRADIENT_MAP[tone]) {
			const g = GRADIENT_MAP[tone]
			if (g.base) {
				ctx.fillStyle = g.base
				ctx.fillRect(0, 0, size, size)
				const grad = ctx.createLinearGradient(0, 0, 0, size)
				grad.addColorStop(0, g.overlayFrom || "rgba(255, 255, 255, 0)")
				grad.addColorStop(1, g.overlayTo || "rgba(36, 46, 66, 0.16)")
				ctx.fillStyle = grad
				ctx.fillRect(0, 0, size, size)
			} else if (g.from && g.to) {
				const grad = ctx.createLinearGradient(0, 0, size, size)
				grad.addColorStop(0, g.from)
				grad.addColorStop(1, g.to)
				ctx.fillStyle = grad
				ctx.fillRect(0, 0, size, size)
			}
		} else if (tone.startsWith("grad-custom:")) {
			const parts = tone.split(":")
			const grad = ctx.createLinearGradient(0, 0, size, size)
			grad.addColorStop(0, parts[1])
			grad.addColorStop(1, parts[2])
			ctx.fillStyle = grad
			ctx.fillRect(0, 0, size, size)
		} else if (tone.startsWith("radian:")) {
			const color = resolveRadianColor(tone)
			ctx.fillStyle = color
			ctx.fillRect(0, 0, size, size)
		} else if (tone.startsWith("#")) {
			ctx.fillStyle = tone
			ctx.fillRect(0, 0, size, size)
		} else if (tone.startsWith("http") || tone.startsWith("/")) {
			try {
				const bgImg = new window.Image()
				bgImg.crossOrigin = "anonymous"
				bgImg.src = tone
				await new Promise<void>((resolve, reject) => {
					bgImg.onload = () => resolve()
					bgImg.onerror = reject
				})
				backgroundImage = bgImg
				ctx.drawImage(bgImg, 0, 0, size, size)
			} catch {
				// Background image failed to load, continue with transparent bg
			}
		} else if (tone !== "none") {
			// Fallback: fill white so the "Image" copy format is never transparent
			ctx.fillStyle = "#FFFFFF"
			ctx.fillRect(0, 0, size, size)
		}

		try {
			const avatarImg = new window.Image()
			avatarImg.crossOrigin = "anonymous"
			avatarImg.src = src
			await new Promise<void>((resolve, reject) => {
				avatarImg.onload = () => resolve()
				avatarImg.onerror = reject
			})

			ctx.drawImage(avatarImg, 0, 0, size, size)

			// The avatar source is opaque, so the Color Burn fill must be composited
			// above it to affect the exported pixels.
			if (shouldApplyShadow) {
				ctx.save()
				ctx.globalAlpha = AVATAR_BLEND_OPACITY
				ctx.globalCompositeOperation = "color-burn"
				if (
					imageBackgroundTint ||
					SOLID_COLOR_MAP[tone] ||
					tone.startsWith("#") ||
					tone.startsWith("radian:")
				) {
					ctx.fillStyle =
						imageBackgroundTint ||
						SOLID_COLOR_MAP[tone] ||
						(tone.startsWith("radian:") ? resolveRadianColor(tone) : tone)
					ctx.fillRect(0, 0, size, size)
				} else if (GRADIENT_MAP[tone]) {
					const gradient = GRADIENT_MAP[tone]
					if (gradient.base) {
						ctx.fillStyle = gradient.base
						ctx.fillRect(0, 0, size, size)
						const sheen = ctx.createLinearGradient(0, 0, 0, size)
						sheen.addColorStop(
							0,
							gradient.overlayFrom || "rgba(255, 255, 255, 0)"
						)
						sheen.addColorStop(
							1,
							gradient.overlayTo || "rgba(36, 46, 66, 0.16)"
						)
						ctx.fillStyle = sheen
						ctx.fillRect(0, 0, size, size)
					} else if (gradient.from && gradient.to) {
						const fill = ctx.createLinearGradient(0, 0, size, size)
						fill.addColorStop(0, gradient.from)
						fill.addColorStop(1, gradient.to)
						ctx.fillStyle = fill
						ctx.fillRect(0, 0, size, size)
					}
				} else if (tone.startsWith("grad-custom:")) {
					const [, from, to] = tone.split(":")
					const fill = ctx.createLinearGradient(0, 0, size, size)
					fill.addColorStop(0, from)
					fill.addColorStop(1, to)
					ctx.fillStyle = fill
					ctx.fillRect(0, 0, size, size)
				} else if (backgroundImage) {
					ctx.drawImage(backgroundImage, 0, 0, size, size)
				}
				ctx.restore()
			}
		} catch {
			return null
		}

		return new Promise((resolve) => canvas.toBlob(resolve, "image/png"))
	}

	const handleCopy = async (e: React.MouseEvent) => {
		e.stopPropagation()
		if (copyFormat === "editable-bg") {
			// Safari requires the ClipboardItem to be created synchronously
			// within the click handler. We pass a Promise for the blob so the
			// actual async work (fetching + base64 encoding) can happen after.
			const svgBlobPromise = generateEditableSvg(tone, src).then((svg) => {
				if (!svg) throw new Error("SVG generation failed")
				return new Blob([svg], { type: "text/plain" })
			})
			try {
				await navigator.clipboard.write([
					new ClipboardItem({ "text/plain": svgBlobPromise }),
				])
				setCopied(true)
				setTimeout(() => setCopied(false), 2500)
			} catch {
				// Fallback for browsers that don't support Promise in ClipboardItem
				const svg = await generateEditableSvg(tone, src)
				if (!svg) return
				await navigator.clipboard.writeText(svg)
				setCopied(true)
				setTimeout(() => setCopied(false), 2500)
			}
			return
		}
		if (copyFormat === "image") {
			const pngBlobPromise = createCompositeBlob().then((blob) => {
				if (!blob) throw new Error("PNG generation failed")
				return blob
			})
			try {
				await navigator.clipboard.write([
					new ClipboardItem({ "image/png": pngBlobPromise }),
				])
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			} catch {
				const blob = await createCompositeBlob()
				if (!blob) return
				await navigator.clipboard.write([
					new ClipboardItem({ "image/png": blob }),
				])
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			}
			return
		}
		try {
			const imgBlobPromise = fetch(src).then((res) => res.blob())
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": imgBlobPromise }),
			])
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch {
			try {
				const res = await fetch(src)
				const blob = await res.blob()
				await navigator.clipboard.write([
					new ClipboardItem({ [blob.type]: blob }),
				])
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			} catch {
				await navigator.clipboard.writeText(src)
			}
		}
	}

	const handleDownload = async (e: React.MouseEvent) => {
		e.stopPropagation()

		if (copyFormat === "editable-bg") {
			// Generate SVG with separate layers for Figma editing
			const svg = await generateEditableSvg(tone, src)
			if (!svg) return
			const blob = new Blob([svg], { type: "image/svg+xml" })
			const link = document.createElement("a")
			link.download = `avatar-${index + 1}-editable.svg`
			link.href = URL.createObjectURL(blob)
			link.click()
			URL.revokeObjectURL(link.href)
			return
		}

		const blob = await createCompositeBlob()
		if (!blob) return
		const link = document.createElement("a")
		link.download = `avatar-${index + 1}.png`
		link.href = URL.createObjectURL(blob)
		link.click()
		URL.revokeObjectURL(link.href)
	}

	return (
		<div
			className="border-soft bg-bg group relative isolate aspect-square w-full overflow-hidden rounded-xl border"
			style={toneStyle}>
			<Image
				src={src}
				alt={`Generated avatar ${index + 1}`}
				fill
				sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
				className="object-cover"
			/>
			{shouldApplyShadow && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 mix-blend-color-burn"
					style={{
						...shadowStyle,
						opacity: AVATAR_BLEND_OPACITY,
					}}
				/>
			)}
			{isNeutralBackground && (
				<div
					aria-hidden="true"
					className="dark:bg-bg/10 pointer-events-none absolute inset-0 hidden dark:block"
				/>
			)}

			<div
				className={cn(
					"absolute right-2 top-2 transition-opacity",
					open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				)}>
				<Dropdown open={open} onOpenChange={setOpen}>
					<DropdownTrigger asChild>
						<CompactButton
							aria-label="Button with Down Arrow"
							size="20"
							variant="ghost"
							color="neutral"
							onClick={(e) => e.stopPropagation()}>
							<MoreHorizontal className="size-4" />
						</CompactButton>
					</DropdownTrigger>

					<DropdownContent align="end" className="w-40">
						<DropdownItem onClick={handleCopy}>
							<Copy />
							Copy
						</DropdownItem>
						<DropdownItem onClick={handleDownload}>
							<Download />
							Download
						</DropdownItem>
						<DropdownItem>
							<Star />
							Favourite
						</DropdownItem>
					</DropdownContent>
				</Dropdown>
			</div>

			<div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
				<div className="hidden sm:block">
					<Button
						size="28"
						color="neutral"
						variant="strong"
						onClick={handleCopy}>
						{copied
							? copyFormat === "editable-bg"
								? "Paste in Figma"
								: "Copied"
							: "Copy"}
					</Button>
				</div>
				<IconButton
					aria-label="Copy Button"
					size="28"
					color="neutral"
					variant="strong"
					className="block sm:hidden"
					onClick={handleCopy}>
					<Copy />
				</IconButton>
			</div>
		</div>
	)
}
