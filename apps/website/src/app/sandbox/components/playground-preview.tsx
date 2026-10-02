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
	onToggleResolveComment?: (
		id: string,
		resolved: boolean
	) => Promise<void> | void
	onNavigateToCode?: (file: string, lineNumber: number) => void
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
	onToggleResolveComment,
	onNavigateToCode,
	isSubmitting = false,
	isCommentsVisible,
}: PlaygroundPreviewProps) {
	return (
		<div className="bg-fill1 relative flex flex-1 flex-col items-center overflow-y-auto bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] p-6 dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]">
			<div
				className={cn(
					"relative flex h-full min-h-[600px] flex-col transition-all duration-300",
					deviceSize === "mobile" && "w-[375px]",
					deviceSize === "tablet" && "w-[768px]",
					deviceSize === "desktop" && "w-full max-w-none"
				)}>
				{/* Component Preview Floating Card matching Image 1 & 2 */}
				<div className="border-soft bg-bg relative flex flex-1 flex-col overflow-hidden rounded-2xl border">
					<div className="relative flex flex-1 overflow-hidden">
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
							onToggleResolveComment={onToggleResolveComment}
							onNavigateToCode={onNavigateToCode}
							isSubmitting={isSubmitting}
							isVisible={isCommentsVisible}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
