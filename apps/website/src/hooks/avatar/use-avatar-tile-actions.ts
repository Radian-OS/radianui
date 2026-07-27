"use client"

import { useState } from "react"
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
			const pngBlobPromise = createCompositeBlob(
				tone,
				src,
				shouldApplyShadow
			).then((blob) => {
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
				const blob = await createCompositeBlob(tone, src, shouldApplyShadow)
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

		const blob = await createCompositeBlob(tone, src, shouldApplyShadow)
		if (!blob) return
		const link = document.createElement("a")
		link.download = `avatar-${index + 1}.png`
		link.href = URL.createObjectURL(blob)
		link.click()
		URL.revokeObjectURL(link.href)
	}

	return { copied, handleCopy, handleDownload }
}
