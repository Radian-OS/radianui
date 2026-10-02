"use client"

import React, { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Code, Copy, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AutoPositionedCard } from "./auto-positioned-card"
import { isCommentResolved, type SandboxComment } from "./types"

interface CommentPinProps {
	comment: SandboxComment
	index: number
	dimensions?: { width: number; height: number }
	scrollOffset?: { x: number; y: number }
	containerSize?: { width: number; height: number }
	onDelete: (id: string) => Promise<void> | void
	onNavigateToCode?: (file: string, lineNumber: number) => void
	onToggleResolve?: (id: string, resolved: boolean) => Promise<void> | void
	isFocused?: boolean
	onClearFocus?: () => void
}

function formatDate(dateStr: string) {
	try {
		const date = new Date(dateStr)
		if (isNaN(date.getTime())) return dateStr || "Just now"
		return date.toLocaleDateString(undefined, {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
		})
	} catch {
		return "Just now"
	}
}

export function CommentPin({
	comment,
	index,
	dimensions = { width: 0, height: 0 },
	scrollOffset = { x: 0, y: 0 },
	containerSize = { width: 0, height: 0 },
	onDelete,
	onNavigateToCode,
	onToggleResolve,
	isFocused,
	onClearFocus,
}: CommentPinProps) {
	const pinRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [isResolving, setIsResolving] = useState(false)
	const [copied, setCopied] = useState(false)
	const resolved = isCommentResolved(comment)

	// Auto-open and scroll into view when focused from the panel
	useEffect(() => {
		if (!isFocused) return
		setIsOpen(true)
		// Scroll the pin wrapper into view in the overlay container
		if (pinRef.current) {
			pinRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center",
			})
		}
		// Clear focus after a short delay so re-clicking the same comment works
		const timer = setTimeout(() => onClearFocus?.(), 600)
		return () => clearTimeout(timer)
	}, [isFocused, onClearFocus])

	// Close this pin when a different comment gets focused
	useEffect(() => {
		const handleOtherFocus = (e: Event) => {
			const customEvent = e as CustomEvent<{ commentId: string }>
			if (customEvent.detail.commentId !== comment.id) {
				setIsOpen(false)
			}
		}
		window.addEventListener("focus-comment", handleOtherFocus)
		return () => window.removeEventListener("focus-comment", handleOtherFocus)
	}, [comment.id])

	useEffect(() => {
		if (!isOpen) return
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsOpen(false)
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [isOpen])

	const handleDelete = async (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsDeleting(true)
		try {
			await onDelete(comment.id)
		} finally {
			setIsDeleting(false)
		}
	}

	const codeSnippet = comment.elementSelector || "bg-blue shadow-blue/10"
	const tagLabel = comment.elementTag ? `<${comment.elementTag}>` : "<div>"

	return (
		<div
			ref={pinRef}
			className={cn(
				"absolute z-20 transition-transform duration-300",
				isFocused && "scale-125"
			)}
			style={{
				left: `${comment.positionX}%`,
				top: `${comment.positionY}%`,
			}}>
			{/* Numbered Pin Button matching Image 3 */}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation()
					setIsOpen(!isOpen)
				}}
				aria-label={`View comment #${index + 1} from ${comment.authorName}`}
				className={cn(
					"relative -top-3.5 -left-3.5 flex size-7 cursor-pointer items-center justify-center rounded-full font-sans text-xs font-bold text-white shadow-lg ring-2 ring-white transition-transform duration-150 hover:scale-110 active:scale-95 dark:ring-neutral-900",
					resolved ? "bg-success" : "bg-primary"
				)}>
				<span>{index + 1}</span>
			</button>

			{/* Floating Comment Card Popup matching Image 3 */}
			{isOpen && (
				<AutoPositionedCard
					positionX={comment.positionX}
					positionY={comment.positionY}
					dimensions={dimensions}
					scrollOffset={scrollOffset}
					containerSize={containerSize}
					defaultCardWidth={310}
					className="absolute top-0 left-0 z-50">
					<div
						onClick={(e) => e.stopPropagation()}
						className="border-soft bg-bg animate-in fade-in zoom-in-95 flex w-80 max-w-full flex-col gap-3 rounded-2xl border p-4 shadow-2xl duration-150">
						{/* Card Header: Author Badge + Name + Timestamp + Actions */}
						<div className="flex items-center justify-between gap-2">
							<div className="flex min-w-0 items-center gap-2.5">
								<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
									{index + 1}
								</div>
								<div className="flex min-w-0 flex-col">
									<span className="truncate text-xs font-semibold text-neutral-900 dark:text-neutral-100">
										{comment.authorName}
									</span>
									<span className="text-[11px] text-neutral-400 dark:text-neutral-500">
										{formatDate(comment.createdAt)}
									</span>
								</div>
							</div>

							<div className="flex shrink-0 items-center gap-1">
								{onToggleResolve && (
									<button
										type="button"
										onClick={async (e) => {
											e.stopPropagation()
											setIsResolving(true)
											try {
												await onToggleResolve(comment.id, !resolved)
											} finally {
												setIsResolving(false)
											}
										}}
										title={resolved ? "Mark as Pending" : "Mark as Resolved"}
										className={cn(
											"cursor-pointer rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-emerald-600 dark:hover:bg-neutral-800 dark:hover:text-emerald-400",
											resolved && "text-emerald-600 dark:text-emerald-400"
										)}>
										<Check className="size-4 stroke-[2.5]" />
									</button>
								)}
								<button
									type="button"
									onClick={handleDelete}
									title="Delete comment"
									className="cursor-pointer rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-600 dark:hover:bg-neutral-800">
									<Trash2 className="size-4" />
								</button>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									title="Close popover"
									className="cursor-pointer rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200">
									<X className="size-4" />
								</button>
							</div>
						</div>

						{/* Tag & Code Snippet Container (Image 3) */}
						<div className="space-y-2 rounded-xl border border-neutral-200/80 bg-neutral-50 p-2.5 dark:border-neutral-700/70 dark:bg-neutral-800/60">
							<div className="flex items-center justify-between text-xs">
								<span className="rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-xs font-semibold text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400">
									{tagLabel}
								</span>
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(codeSnippet)
										setCopied(true)
										setTimeout(() => setCopied(false), 1500)
									}}
									className="flex cursor-pointer items-center gap-1 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200">
									{copied ? (
										<>
											<Check className="size-3 text-emerald-600" />
											<span className="font-semibold text-emerald-600">
												Copied
											</span>
										</>
									) : (
										<>
											<Copy className="size-3" />
											<span>Copy</span>
										</>
									)}
								</button>
							</div>
							<div className="overflow-x-auto rounded-lg border border-neutral-200/80 bg-white p-2 font-mono text-xs leading-relaxed text-neutral-800 select-all dark:border-neutral-700/60 dark:bg-neutral-900 dark:text-neutral-200">
								{codeSnippet}
							</div>
						</div>

						{/* Jump to Code Button if location present */}
						{comment.file && onNavigateToCode && (
							<button
								type="button"
								onClick={() =>
									onNavigateToCode(comment.file!, comment.lineNumber || 1)
								}
								className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800/40 dark:hover:bg-neutral-800">
								<div className="flex items-center gap-1.5 truncate font-mono text-neutral-700 dark:text-neutral-300">
									<Code className="size-3.5 shrink-0 text-indigo-600" />
									<span className="truncate">{comment.file}</span>
									{comment.lineNumber && (
										<span className="font-bold text-indigo-600">
											:{comment.lineNumber}
										</span>
									)}
								</div>
								<ArrowRight className="size-3 shrink-0 text-neutral-400" />
							</button>
						)}

						{/* Comment Content */}
						<p className="text-xs leading-relaxed font-normal text-neutral-800 dark:text-neutral-200">
							{comment.content}
						</p>
					</div>
				</AutoPositionedCard>
			)}
		</div>
	)
}
