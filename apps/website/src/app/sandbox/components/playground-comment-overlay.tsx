"use client"

import React, { type RefObject, useEffect, useRef, useState } from "react"
import { AutoPositionedCard } from "./auto-positioned-card"
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
	onToggleResolveComment?: (
		id: string,
		resolved: boolean
	) => Promise<void> | void
	onNavigateToCode?: (file: string, lineNumber: number) => void
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
	onToggleResolveComment,
	onNavigateToCode,
	isSubmitting = false,
	isVisible,
}: PlaygroundCommentOverlayProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const contentLayerRef = useRef<HTMLDivElement>(null)
	const [dimensions, setDimensions] = useState<{
		width: number
		height: number
	}>({
		width: 0,
		height: 0,
	})
	const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 })
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

	useEffect(() => {
		if (!containerRef.current) return
		const el = containerRef.current
		const updateSize = () => {
			if (el.clientWidth > 0 && el.clientHeight > 0) {
				setContainerSize({
					width: el.clientWidth,
					height: el.clientHeight,
				})
			}
		}
		updateSize()
		const ro = new ResizeObserver(updateSize)
		ro.observe(el)
		window.addEventListener("resize", updateSize)
		return () => {
			ro.disconnect()
			window.removeEventListener("resize", updateSize)
		}
	}, [deviceSize, dimensions])

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
					setScrollOffset({ x: scrollX, y: scrollY })
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
					if (containerRef.current) {
						setContainerSize({
							width: containerRef.current.clientWidth,
							height: containerRef.current.clientHeight,
						})
					}
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
					if (containerRef.current) {
						resizeObserver.observe(containerRef.current)
					}
				}

				cleanupWin = () => {
					win.removeEventListener("scroll", updateTransform)
					win.removeEventListener("resize", updateDimensions)
					resizeObserver?.disconnect()
				}
			} catch (err) {
				console.error("Error setting up iframe listeners:", err)
			}
		}

		attachIframeListeners()
		const iframe = iframeRef.current
		iframe?.addEventListener("load", attachIframeListeners)

		return () => {
			iframe?.removeEventListener("load", attachIframeListeners)
			cleanupWin?.()
		}
	}, [iframeRef, isVisible])

	if (!isVisible) return null

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
			ref={containerRef}
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
							dimensions={dimensions}
							scrollOffset={scrollOffset}
							containerSize={containerSize}
							onDelete={onDeleteComment}
							onToggleResolve={onToggleResolveComment}
							onNavigateToCode={onNavigateToCode}
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
						<div className="bg-primary text-primary-fg ring-bg relative -top-3 -left-3 flex size-6.5 items-center justify-center rounded-full font-mono text-xs font-bold shadow-md ring-2">
							<span>+</span>
						</div>

						{/* Draft Form Card with Auto-Adjustment */}
						<AutoPositionedCard
							positionX={draftComment.positionX}
							positionY={draftComment.positionY}
							dimensions={dimensions}
							scrollOffset={scrollOffset}
							containerSize={containerSize}
							defaultCardWidth={352}
							className="absolute top-0 left-0">
							<CommentForm
								elementTag={draftComment.elementTag}
								elementSelector={draftComment.elementSelector}
								elementContent={draftComment.elementContent}
								elementCode={draftComment.elementCode}
								parentTag={draftComment.parentTag}
								sourceLocation={draftComment.sourceLocation}
								onNavigateToCode={onNavigateToCode}
								onSubmit={onSubmitDraft}
								onCancel={onCancelDraft}
								isSubmitting={isSubmitting}
							/>
						</AutoPositionedCard>
					</div>
				)}
			</div>
		</div>
	)
}
