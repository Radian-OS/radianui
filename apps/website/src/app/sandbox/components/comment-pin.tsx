"use client"

import React, { useState } from "react"
import { MessageSquare, Trash2, X } from "lucide-react"
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
			className="absolute z-20 transition-all duration-150"
			style={{
				left: `${comment.positionX}%`,
				top: `${comment.positionY}%`,
				transform: "translate(-50%, -50%)",
			}}>
			{/* Figma-style Numbered Pin Button */}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation()
					setIsOpen(!isOpen)
				}}
				aria-label={`View comment #${index + 1} from ${comment.authorName}`}
				className="bg-primary text-primary-fg ring-background hover:scale-115 group relative flex size-7 items-center justify-center rounded-full font-mono text-xs font-bold shadow-lg ring-2 transition-transform duration-150 active:scale-95">
				<span>{index + 1}</span>
				{/* Small pointer tail */}
				<span className="bg-primary absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rotate-45" />
			</button>

			{/* Comment Card Popover */}
			{isOpen && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="border-border bg-background animate-in fade-in zoom-in-95 absolute left-0 top-9 z-50 w-[300px] -translate-x-1/4 rounded-xl border p-4 shadow-2xl backdrop-blur-md duration-150">
					{/* Header */}
					<div className="border-border/60 flex items-center justify-between border-b pb-2">
						<div className="flex items-center gap-2">
							<div className="bg-primary text-primary-fg flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
								{index + 1}
							</div>
							<span className="text-foreground text-xs font-bold">
								{comment.authorName}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-fg-tertiary text-[10px]">
								{formatDate(comment.createdAt)}
							</span>
							<Button
								type="button"
								variant="ghost"
								color="neutral"
								size="28"
								onClick={() => setIsOpen(false)}
								className="text-fg-tertiary hover:text-foreground size-6 p-0">
								<X className="size-3.5" />
							</Button>
						</div>
					</div>

					{/* Tag badge */}
					<div className="mt-2 flex items-center gap-1">
						<span className="bg-fill3 text-primary rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold">
							&lt;{comment.elementTag}&gt;
						</span>
						{comment.elementSelector && (
							<span
								className="text-fg-tertiary truncate text-[10px]"
								title={comment.elementSelector}>
								{comment.elementSelector}
							</span>
						)}
					</div>

					{/* Comment Content */}
					<p className="text-foreground mt-2 text-xs leading-relaxed">
						{comment.content}
					</p>

					{/* Actions Footer */}
					<div className="border-border/50 mt-3 flex items-center justify-between border-t pt-2">
						<div className="text-fg-tertiary flex items-center gap-1 text-[11px]">
							<MessageSquare className="size-3" />
							<span>Feedback</span>
						</div>
						<Button
							type="button"
							variant="ghost"
							color="error"
							size="28"
							onClick={handleDelete}
							loading={isDeleting}
							className="h-6 gap-1 px-2 text-xs">
							<Trash2 className="size-3" />
							<span>Delete</span>
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
