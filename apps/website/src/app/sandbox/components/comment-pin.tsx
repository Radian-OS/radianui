"use client"

import React, { useState } from "react"
import { Trash2, X } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import type { SandboxComment } from "./types"

interface CommentPinProps {
	comment: SandboxComment
	index: number
	onDelete: (id: string) => Promise<void> | void
}

function formatDate(dateStr: string) {
	try {
		const date = new Date(dateStr)
		return date.toLocaleDateString(undefined, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	} catch {
		return "Just now"
	}
}

export function CommentPin({ comment, index, onDelete }: CommentPinProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsDeleting(true)
		try {
			await onDelete(comment.id)
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<div
			className="absolute z-20"
			style={{
				left: `${comment.positionX}%`,
				top: `${comment.positionY}%`,
				transform: "translate(-50%, -50%)",
			}}>
			{/* Numbered Pin Button */}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation()
					setIsOpen(!isOpen)
				}}
				aria-label={`View comment #${index + 1} from ${comment.authorName}`}
				className="bg-primary text-primary-fg ring-background size-6.5 group relative flex items-center justify-center rounded-full font-mono text-xs font-bold shadow-md ring-2 transition-transform duration-150 hover:scale-110 active:scale-95">
				<span>{index + 1}</span>
				{/* Small pointer tail */}
				<span className="bg-primary absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rotate-45" />
			</button>

			{/* Comment Card Popover */}
			{isOpen && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="border-border bg-bg animate-in fade-in zoom-in-95 absolute left-0 top-8 z-50 w-72 -translate-x-1/4 rounded-xl border p-3 shadow-xl duration-150">
					{/* Header: Author + Time + Actions */}
					<div className="flex items-center justify-between gap-2 pb-2">
						<div className="flex min-w-0 items-center gap-2">
							<div className="bg-primary text-primary-fg flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
								{index + 1}
							</div>
							<div className="flex min-w-0 flex-col">
								<span className="text-fg truncate text-xs font-semibold">
									{comment.authorName}
								</span>
								<span className="text-fg-tertiary text-[10px]">
									{formatDate(comment.createdAt)}
								</span>
							</div>
						</div>

						<div className="flex shrink-0 items-center gap-1">
							<Button
								type="button"
								variant="ghost"
								color="error"
								size="28"
								onClick={handleDelete}
								loading={isDeleting}
								title="Delete comment"
								className="text-fg-tertiary hover:text-error">
								<Trash2 className="size-3.5" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								color="neutral"
								size="28"
								onClick={() => setIsOpen(false)}
								title="Close">
								<X className="size-3.5" />
							</Button>
						</div>
					</div>

					{/* Element context (if present) */}
					{comment.elementTag && (
						<div className="mb-1.5 flex items-center gap-1 overflow-hidden">
							<span className="bg-fill3 text-primary shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold">
								&lt;{comment.elementTag}&gt;
							</span>
							{comment.elementSelector && (
								<span
									className="text-fg-tertiary truncate font-mono text-[10px]"
									title={comment.elementSelector}>
									{comment.elementSelector}
								</span>
							)}
						</div>
					)}

					{/* Comment Content */}
					<p className="text-fg text-xs leading-relaxed">{comment.content}</p>
				</div>
			)}
		</div>
	)
}
