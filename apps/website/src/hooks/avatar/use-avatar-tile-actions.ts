"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
	GRADIENT_MAP,
	SOLID_COLOR_MAP,
	generateEditableSvg,
	resolveRadianColor,
} from "@/constants/avatar-playground-utils"
import { AVATAR_SHADOW_MAP } from "@/constants/avatar-shadow-map"
import { createCompositeBlob } from "@/hooks/avatar/create-composite-blob"

interface UseAvatarTileActionsOptions {
	src: string
	index: number
	tone: string
	copyFormat: string
	shouldApplyShadow: boolean
}

export const useAvatarTileActions = ({
	src,
	index,
	tone,
	copyFormat,
	shouldApplyShadow,
}: UseAvatarTileActionsOptions) => {
	const [copied, setCopied] = useState(false)

	const markCopied = () => {
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	// Default copy (from main button)
	const handleCopy = async (e?: { stopPropagation?: () => void }) => {
		e?.stopPropagation?.()
		if (copyFormat === "editable-bg") {
			await handleCopyFigmaFrame()
			return
		}
		if (copyFormat === "image") {
			await handleCopyPng()
			return
		}
		if (copyFormat === "url") {
			await handleCopyUrlTransparent()
			return
		}
		if (copyFormat === "nextjs-image") {
			await handleCopyNextImageTag()
			return
		}
		if (copyFormat === "html-img") {
			await handleCopyHtmlImgTag()
			return
		}
		await handleCopyTransparentPng()
	}

	// 1. Copy PNG (composite with background + shadow)
	const handleCopyPng = async () => {
		try {
			const pngBlobPromise = createCompositeBlob(
				tone,
				src,
				shouldApplyShadow,
				index
			).then((blob) => {
				if (!blob) throw new Error("PNG generation failed")
				return blob
			})
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": pngBlobPromise }),
			])
			markCopied()
			toast.success("Copied PNG to clipboard")
		} catch {
			try {
				const blob = await createCompositeBlob(
					tone,
					src,
					shouldApplyShadow,
					index
				)
				if (!blob) return
				await navigator.clipboard.write([
					new ClipboardItem({ "image/png": blob }),
				])
				markCopied()
				toast.success("Copied PNG to clipboard")
			} catch {
				toast.error("Failed to copy PNG")
			}
		}
	}

	// 2. Copy Transparent PNG (raw avatar image without background)
	const handleCopyTransparentPng = async () => {
		try {
			const imgBlobPromise = fetch(src).then((res) => res.blob())
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": imgBlobPromise }),
			])
			markCopied()
			toast.success("Copied Transparent PNG to clipboard")
		} catch {
			try {
				const res = await fetch(src)
				const blob = await res.blob()
				await navigator.clipboard.write([
					new ClipboardItem({ [blob.type]: blob }),
				])
				markCopied()
				toast.success("Copied Transparent PNG to clipboard")
			} catch {
				await navigator.clipboard.writeText(src)
				markCopied()
				toast.success("Copied image URL to clipboard")
			}
		}
	}

	// 3. Figma Frame (editable SVG string)
	const handleCopyFigmaFrame = async () => {
		try {
			const svgBlobPromise = generateEditableSvg(tone, src, index).then(
				(svg) => {
					if (!svg) throw new Error("SVG generation failed")
					return new Blob([svg], { type: "text/plain" })
				}
			)
			await navigator.clipboard.write([
				new ClipboardItem({ "text/plain": svgBlobPromise }),
			])
			markCopied()
			toast.success("Copied Figma Frame to clipboard")
		} catch {
			try {
				const svg = await generateEditableSvg(tone, src, index)
				if (!svg) return
				await navigator.clipboard.writeText(svg)
				markCopied()
				toast.success("Copied Figma Frame to clipboard")
			} catch {
				toast.error("Failed to copy Figma Frame")
			}
		}
	}

	// 4. URL Transparent
	const handleCopyUrlTransparent = async () => {
		try {
			await navigator.clipboard.writeText(src)
			markCopied()
			toast.success("Copied transparent URL to clipboard")
		} catch {
			toast.error("Failed to copy URL")
		}
	}

	// Helper: resolve tone to a CSS background value for inline styles
	const getBackgroundCss = (): string => {
		if (SOLID_COLOR_MAP[tone])
			return `background-color: ${SOLID_COLOR_MAP[tone]};`
		const gradient = GRADIENT_MAP[tone]
		if (gradient) {
			if (gradient.base) {
				return `background-color: ${gradient.base}; background-image: linear-gradient(180deg, ${gradient.overlayFrom} 0%, ${gradient.overlayTo} 100%);`
			}
			return `background: linear-gradient(135deg, ${gradient.from}, ${gradient.to});`
		}
		if (tone.startsWith("grad-custom:")) {
			const parts = tone.split(":")
			return `background: linear-gradient(135deg, ${parts[1]}, ${parts[2]});`
		}
		if (tone.startsWith("radian:")) {
			const color = resolveRadianColor(tone)
			return `background-color: ${color};`
		}
		if (tone.startsWith("#")) return `background-color: ${tone};`
		if (tone.startsWith("http") || tone.startsWith("/")) {
			return `background-image: url(${tone}); background-size: cover; background-position: center;`
		}
		return ""
	}

	// 5. Next JS <Image> Tag
	const handleCopyNextImageTag = async () => {
		const bgCss = getBackgroundCss()
		const shadowSrc = AVATAR_SHADOW_MAP[index]

		const lines = [
			`<div style={{ position: "relative", width: 512, height: 512, overflow: "hidden"${
				bgCss
					? `, ${bgCss
							.split(";")
							.filter(Boolean)
							.map((s) => {
								const [k, ...v] = s.split(":")
								const camel = k
									.trim()
									.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
								return `${camel}: "${v.join(":").trim()}"`
							})
							.join(", ")}`
					: ""
			} }}>`,
			`  <Image src="${src}" alt="Avatar illustration ${index + 1}" fill style={{ objectFit: "cover" }} />`,
		]
		if (shadowSrc) {
			lines.push(
				`  <Image src="${shadowSrc}" alt="" fill style={{ objectFit: "cover", mixBlendMode: "hard-light", pointerEvents: "none" }} />`
			)
		}
		lines.push(`</div>`)

		const snippet = lines.join("\n")
		try {
			await navigator.clipboard.writeText(snippet)
			markCopied()
			toast.success("Copied Next.js <Image> tag")
		} catch {
			toast.error("Failed to copy Next.js tag")
		}
	}

	// 6. HTML <IMG> Tag
	const handleCopyHtmlImgTag = async () => {
		const bgCss = getBackgroundCss()
		const shadowSrc = AVATAR_SHADOW_MAP[index]

		const lines = [
			`<div style="position: relative; width: 512px; height: 512px; overflow: hidden;${bgCss ? ` ${bgCss}` : ""}">`,
			`  <img src="${src}" alt="Avatar illustration ${index + 1}" style="width: 100%; height: 100%; object-fit: cover;" />`,
		]
		if (shadowSrc) {
			lines.push(
				`  <img src="${shadowSrc}" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; mix-blend-mode: hard-light; pointer-events: none;" />`
			)
		}
		lines.push(`</div>`)

		const snippet = lines.join("\n")
		try {
			await navigator.clipboard.writeText(snippet)
			markCopied()
			toast.success("Copied HTML <img> tag")
		} catch {
			toast.error("Failed to copy HTML tag")
		}
	}

	// 7. Download PNG
	const handleDownload = async (e?: { stopPropagation?: () => void }) => {
		e?.stopPropagation?.()

		// if (copyFormat === "editable-bg") {
		// 	const svg = await generateEditableSvg(tone, src, index)
		// 	if (!svg) return
		// 	const blob = new Blob([svg], { type: "image/svg+xml" })
		// 	const link = document.createElement("a")
		// 	link.download = `avatar-${index + 1}-editable.svg`
		// 	link.href = URL.createObjectURL(blob)
		// 	link.click()
		// 	URL.revokeObjectURL(link.href)
		// 	toast.success("Downloading SVG...")
		// 	return
		// }

		const blob = await createCompositeBlob(
			tone,
			src,
			shouldApplyShadow,
			index,
			"jpeg"
		)
		if (!blob) return
		const link = document.createElement("a")
		link.download = `avatar-${index + 1}.jpg`
		link.href = URL.createObjectURL(blob)
		link.click()
		URL.revokeObjectURL(link.href)
		toast.success("Downloading JPG...")
	}

	return {
		copied,
		handleCopy,
		handleCopyPng,
		handleCopyTransparentPng,
		handleCopyFigmaFrame,
		handleCopyUrlTransparent,
		handleCopyNextImageTag,
		handleCopyHtmlImgTag,
		handleDownload,
	}
}
