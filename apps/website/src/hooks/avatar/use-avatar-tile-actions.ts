"use client"

import { useState } from "react"
import { toast } from "sonner"
import { generateEditableSvg } from "@/constants/avatar-playground-utils"
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

	// 5. Next JS <Image> Tag
	const handleCopyNextImageTag = async () => {
		const snippet = `<Image src="${src}" alt="Avatar illustration ${index + 1}" width={512} height={512} />`
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
		const snippet = `<img src="${src}" alt="Avatar illustration ${index + 1}" width="512" height="512" />`
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

		if (copyFormat === "editable-bg") {
			const svg = await generateEditableSvg(tone, src, index)
			if (!svg) return
			const blob = new Blob([svg], { type: "image/svg+xml" })
			const link = document.createElement("a")
			link.download = `avatar-${index + 1}-editable.svg`
			link.href = URL.createObjectURL(blob)
			link.click()
			URL.revokeObjectURL(link.href)
			toast.success("Downloading SVG...")
			return
		}

		const blob = await createCompositeBlob(tone, src, shouldApplyShadow, index)
		if (!blob) return
		const link = document.createElement("a")
		link.download = `avatar-${index + 1}.png`
		link.href = URL.createObjectURL(blob)
		link.click()
		URL.revokeObjectURL(link.href)
		toast.success("Downloading PNG...")
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
