"use client"

import React, { type RefObject } from "react"
import { cn } from "@/lib/utils"
import type { CommentFormValues } from "./comment-form"
import { PlaygroundCommentOverlay } from "./playground-comment-overlay"
import type {
	DeviceSize,
	SandboxComment,
	SandboxComponentConfig,
} from "./types"
import type { DraftComment } from "./use-comments"

interface PlaygroundPreviewProps {
	activeComponentConfig: SandboxComponentConfig
	deviceSize: DeviceSize
	iframeRef: RefObject<HTMLIFrameElement | null>
	comments: SandboxComment[]
	draftComment: DraftComment | null
	onCancelDraft: () => void
	onSubmitDraft: (values: CommentFormValues) => Promise<void> | void
	onDeleteComment: (id: string) => Promise<void> | void
	isSubmitting?: boolean
	isCommentsVisible: boolean
}

export function PlaygroundPreview({
	activeComponentConfig,
	deviceSize,
	iframeRef,
	comments,
	draftComment,
	onCancelDraft,
	onSubmitDraft,
	onDeleteComment,
	isSubmitting = false,
	isCommentsVisible,
}: PlaygroundPreviewProps) {
	return (
		<div className="flex flex-1 flex-col items-center overflow-y-auto">
			<div
				className={cn(
					"flex h-full min-h-[500px] flex-col gap-6 transition-all duration-300",
					deviceSize === "mobile" && "w-[375px]",
					deviceSize === "tablet" && "w-[768px]",
					deviceSize === "desktop" && "w-full"
				)}>
				{/* Component Preview Card */}
				<div className="text-fg flex flex-1 flex-col overflow-hidden">
					<div className="bg-bg text-fg relative flex flex-1 overflow-hidden">
						<iframe
							ref={iframeRef}
							key={activeComponentConfig.id}
							src={activeComponentConfig.previewRoute}
							className="bg-bg h-full w-full border-0"
							title={`${activeComponentConfig.label} Component Preview`}
						/>

						{/* Figma-like Comment Pins & Form Overlay */}
						<PlaygroundCommentOverlay
							iframeRef={iframeRef}
							activeComponentId={activeComponentConfig.id}
							deviceSize={deviceSize}
							comments={comments}
							draftComment={draftComment}
							onCancelDraft={onCancelDraft}
							onSubmitDraft={onSubmitDraft}
							onDeleteComment={onDeleteComment}
							isSubmitting={isSubmitting}
							isVisible={isCommentsVisible}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
