"use client"

import React, { type RefObject, useEffect, useRef, useState } from "react"
import { CommentForm, type CommentFormValues } from "./comment-form"
import { CommentPin } from "./comment-pin"
import type { DeviceSize, SandboxComment } from "./types"
import type { DraftComment } from "./use-comments"

interface PlaygroundCommentOverlayProps {
	iframeRef: RefObject<HTMLIFrameElement | null>
	activeComponentId?: string
	deviceSize?: DeviceSize
	comments: SandboxComment[]
	draftComment: DraftComment | null
	onCancelDraft: () => void
	onSubmitDraft: (values: CommentFormValues) => Promise<void> | void
	onDeleteComment: (id: string) => Promise<void> | void
	isSubmitting?: boolean
	isVisible: boolean
}

export function PlaygroundCommentOverlay({
	iframeRef,
	activeComponentId,
	deviceSize,
	comments,
	draftComment,
	onCancelDraft,
	onSubmitDraft,
	onDeleteComment,
	isSubmitting = false,
	isVisible,
}: PlaygroundCommentOverlayProps) {
	const contentLayerRef = useRef<HTMLDivElement>(null)
	const [dimensions, setDimensions] = useState<{
		width: number
		height: number
	}>({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		if (!isVisible) return

		let cleanupWin: (() => void) | null = null
		let resizeObserver: ResizeObserver | null = null

		const attachIframeListeners = () => {
			const iframe = iframeRef.current
			if (!iframe) return

			try {
				const win = iframe.contentWindow
				const doc = iframe.contentDocument
				if (!win || !doc) return

				cleanupWin?.()

				const updateTransform = () => {
					if (!contentLayerRef.current) return
					const scrollX = win.scrollX ?? doc.documentElement?.scrollLeft ?? 0
					const scrollY = win.scrollY ?? doc.documentElement?.scrollTop ?? 0
					contentLayerRef.current.style.transform = `translate3d(-${scrollX}px, -${scrollY}px, 0)`
				}

				const updateDimensions = () => {
					const width = Math.max(
						doc.documentElement?.scrollWidth || 0,
						doc.body?.scrollWidth || 0,
						iframe.clientWidth || 0
					)
					const height = Math.max(
						doc.documentElement?.scrollHeight || 0,
						doc.body?.scrollHeight || 0,
						iframe.clientHeight || 0
					)
					setDimensions((prev) => {
						if (prev.width === width && prev.height === height) return prev
						return { width, height }
					})
					updateTransform()
				}

				updateDimensions()

				win.addEventListener("scroll", updateTransform, { passive: true })
				win.addEventListener("resize", updateDimensions, { passive: true })

				if (typeof ResizeObserver !== "undefined" && doc.body) {
					resizeObserver = new ResizeObserver(() => {
						updateDimensions()
					})
					resizeObserver.observe(doc.body)
					if (doc.documentElement) {
						resizeObserver.observe(doc.documentElement)
					}
				}

				cleanupWin = () => {
					win.removeEventListener("scroll", updateTransform)
					win.removeEventListener("resize", updateDimensions)
					resizeObserver?.disconnect()
				}
			} catch (err) {
				console.error("Error setting up comment overlay scroll sync:", err)
			}
		}

		const iframe = iframeRef.current
		if (iframe) {
			attachIframeListeners()
			iframe.addEventListener("load", attachIframeListeners)
		}

		// Periodic check to capture asynchronous images/fonts loading
		const timer = setInterval(attachIframeListeners, 800)

		return () => {
			clearInterval(timer)
			cleanupWin?.()
			if (iframe) {
				iframe.removeEventListener("load", attachIframeListeners)
			}
		}
	}, [isVisible, activeComponentId, deviceSize, iframeRef])

	if (!isVisible) {
		return null
	}

	const layerWidth = dimensions.width > 0 ? `${dimensions.width}px` : "100%"
	const layerHeight = dimensions.height > 0 ? `${dimensions.height}px` : "100%"

	// Forward wheel scroll from pins/forms back to iframe so scrolling works seamlessly anywhere
	const handleWheel = (e: React.WheelEvent) => {
		const win = iframeRef.current?.contentWindow
		if (win) {
			win.scrollBy({ left: e.deltaX, top: e.deltaY, behavior: "auto" })
		}
	}

	return (
		<div
			onWheel={handleWheel}
			className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
			{/* Content layer that matches iframe document size and scrolls with it */}
			<div
				ref={contentLayerRef}
				className="pointer-events-none relative"
				style={{
					width: layerWidth,
					height: layerHeight,
					willChange: "transform",
				}}>
				{/* Existing Comment Pins (clickable via pointer-events-auto) */}
				{comments.map((comment, index) => (
					<div key={comment.id} className="pointer-events-auto">
						<CommentPin
							comment={comment}
							index={index}
							onDelete={onDeleteComment}
						/>
					</div>
				))}

				{/* Draft Comment Placement Pin & Form */}
				{draftComment && (
					<div
						className="pointer-events-auto absolute z-30"
						style={{
							left: `${draftComment.positionX}%`,
							top: `${draftComment.positionY}%`,
						}}>
						{/* Draft Pin Icon */}
						<div className="bg-primary text-primary-fg ring-background size-6.5 relative -left-3 -top-3 flex items-center justify-center rounded-full font-mono text-xs font-bold shadow-md ring-2">
							<span>+</span>
						</div>

						{/* Draft Form Card */}
						<div className="absolute left-0 top-5 -translate-x-1/4">
							<CommentForm
								elementTag={draftComment.elementTag}
								elementSelector={draftComment.elementSelector}
								onSubmit={onSubmitDraft}
								onCancel={onCancelDraft}
								isSubmitting={isSubmitting}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
