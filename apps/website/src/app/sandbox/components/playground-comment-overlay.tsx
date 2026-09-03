"use client"

import React from "react"
import { CommentForm, type CommentFormValues } from "./comment-form"
import { CommentPin } from "./comment-pin"
import type { SandboxComment } from "./types"
import type { DraftComment } from "./use-comments"

interface PlaygroundCommentOverlayProps {
	comments: SandboxComment[]
	draftComment: DraftComment | null
	onCancelDraft: () => void
	onSubmitDraft: (values: CommentFormValues) => Promise<void> | void
	onDeleteComment: (id: string) => Promise<void> | void
	isSubmitting?: boolean
	isVisible: boolean
}

export function PlaygroundCommentOverlay({
	comments,
	draftComment,
	onCancelDraft,
	onSubmitDraft,
	onDeleteComment,
	isSubmitting = false,
	isVisible,
}: PlaygroundCommentOverlayProps) {
	if (!isVisible) {
		return null
	}

	return (
		<div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
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
					className="pointer-events-auto absolute z-30 transition-all duration-150"
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
	)
}
