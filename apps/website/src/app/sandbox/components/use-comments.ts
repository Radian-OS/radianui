"use client"

import { type RefObject, useCallback, useEffect, useState } from "react"
import type { CommentFormValues } from "./comment-form"
import type { PreviewKey, SandboxComment, ViewMode } from "./types"

export interface DraftComment {
	positionX: number
	positionY: number
	elementTag: string
	elementSelector: string
}

export function useComments(
	iframeRef: RefObject<HTMLIFrameElement | null>,
	componentId: PreviewKey,
	viewMode: ViewMode,
	isCommentsEnabled: boolean
) {
	const [comments, setComments] = useState<SandboxComment[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [draftComment, setDraftComment] = useState<DraftComment | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Fetch comments from database
	const fetchComments = useCallback(async () => {
		setIsLoading(true)
		try {
			const res = await fetch(
				`/api/sandbox/comments?componentId=${componentId}`
			)
			if (res.ok) {
				const data = await res.json()
				setComments(data.comments || [])
			}
		} catch (err) {
			console.error("Failed to fetch comments:", err)
		} finally {
			setIsLoading(false)
		}
	}, [componentId])

	useEffect(() => {
		fetchComments()
		setDraftComment(null)
	}, [fetchComments])

	// Add new comment
	const addComment = async (formValues: CommentFormValues) => {
		if (!draftComment) return
		setIsSubmitting(true)
		try {
			const res = await fetch("/api/sandbox/comments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					componentId,
					elementTag: draftComment.elementTag,
					elementSelector: draftComment.elementSelector,
					positionX: draftComment.positionX,
					positionY: draftComment.positionY,
					authorName: formValues.authorName,
					content: formValues.content,
				}),
			})

			if (res.ok) {
				const data = await res.json()
				if (data.comment) {
					setComments((prev) => [...prev, data.comment])
				}
				setDraftComment(null)
			}
		} catch (err) {
			console.error("Failed to add comment:", err)
		} finally {
			setIsSubmitting(false)
		}
	}

	// Delete comment
	const deleteComment = async (id: string) => {
		try {
			const res = await fetch(`/api/sandbox/comments?id=${id}`, {
				method: "DELETE",
			})
			if (res.ok) {
				setComments((prev) => prev.filter((c) => c.id !== id))
			}
		} catch (err) {
			console.error("Failed to delete comment:", err)
		}
	}

	// Attach click-to-comment listener to iframe when Comments is enabled
	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe) return

		const setupCommentListener = () => {
			try {
				const doc = iframe.contentDocument || iframe.contentWindow?.document
				if (!doc) return

				const existingStyle = doc.getElementById("sandbox-comments-style")
				if (existingStyle) existingStyle.remove()

				if (viewMode !== "inspect" || !isCommentsEnabled) return

				const style = doc.createElement("style")
				style.id = "sandbox-comments-style"
				style.textContent = `
					* {
						cursor: crosshair !important;
					}
					.sandbox-comment-target-hover {
						outline: 2px solid #3b82f6 !important;
						outline-offset: -1px !important;
					}
				`
				doc.head.appendChild(style)

				let lastHovered: HTMLElement | null = null

				const handleMouseOver = (e: MouseEvent) => {
					const target = e.target as HTMLElement | null
					if (!target || target === doc.body || target === doc.documentElement)
						return

					if (lastHovered && lastHovered !== target) {
						lastHovered.classList.remove("sandbox-comment-target-hover")
					}
					lastHovered = target
					target.classList.add("sandbox-comment-target-hover")
				}

				const handleMouseOut = (e: MouseEvent) => {
					const target = e.target as HTMLElement | null
					if (target && target === lastHovered) {
						target.classList.remove("sandbox-comment-target-hover")
						lastHovered = null
					}
				}

				const handleClick = (e: MouseEvent) => {
					e.preventDefault()
					e.stopPropagation()

					const target = e.target as HTMLElement | null
					if (!target) return

					const docWidth =
						doc.documentElement.clientWidth || doc.body.clientWidth || 800
					const docHeight =
						doc.documentElement.clientHeight || doc.body.clientHeight || 600

					// Calculate percentage coordinates relative to the iframe viewport
					const posX = Math.max(2, Math.min(98, (e.clientX / docWidth) * 100))
					const posY = Math.max(2, Math.min(98, (e.clientY / docHeight) * 100))

					const tag = target.tagName.toLowerCase()
					const classNames =
						typeof target.className === "string"
							? target.className
									.split(" ")
									.filter((c) => c && !c.includes("sandbox-"))
									.slice(0, 2)
									.map((c) => `.${c}`)
									.join("")
							: ""

					setDraftComment({
						positionX: Math.round(posX * 10) / 10,
						positionY: Math.round(posY * 10) / 10,
						elementTag: tag,
						elementSelector: classNames,
					})
				}

				doc.addEventListener("mouseover", handleMouseOver, true)
				doc.addEventListener("mouseout", handleMouseOut, true)
				doc.addEventListener("click", handleClick, true)

				return () => {
					doc.removeEventListener("mouseover", handleMouseOver, true)
					doc.removeEventListener("mouseout", handleMouseOut, true)
					doc.removeEventListener("click", handleClick, true)
					if (lastHovered) {
						lastHovered.classList.remove("sandbox-comment-target-hover")
					}
					const s = doc.getElementById("sandbox-comments-style")
					if (s) s.remove()
				}
			} catch (err) {
				console.error("Error setting up comment listener in iframe:", err)
			}
		}

		const cleanup = setupCommentListener()
		iframe.addEventListener("load", setupCommentListener)

		return () => {
			iframe.removeEventListener("load", setupCommentListener)
			cleanup?.()
		}
	}, [iframeRef, viewMode, isCommentsEnabled, componentId])

	return {
		comments,
		isLoading,
		draftComment,
		setDraftComment,
		isSubmitting,
		addComment,
		deleteComment,
		refreshComments: fetchComments,
	}
}
