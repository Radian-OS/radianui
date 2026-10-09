"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarInset, SidebarProvider } from "@/styles/default/ui/sidebar"
import { useAuth } from "./auth/auth-context"
import { PlaygroundCodeViewer } from "./components/playground-code-viewer"
import { PlaygroundCommentsPanel } from "./components/playground-comments-panel"
import { PlaygroundHeader } from "./components/playground-header"
import { PlaygroundPreview } from "./components/playground-preview"
import { PlaygroundSidebar } from "./components/playground-sidebar"
import {
	type DeviceSize,
	type FilesData,
	type PreviewKey,
	type ViewMode,
	isCommentResolved,
	sandboxComponents,
} from "./components/types"
import { useComments } from "./components/use-comments"
import { useInspectMode } from "./components/use-inspect-mode"

export interface PlaygroundClientProps {
	files: FilesData
}

export function PlaygroundClient({ files }: PlaygroundClientProps) {
	const { user, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		// if (!isLoading && !user) {
		// 	router.replace("/sandbox/auth/sign-in?callbackUrl=/sandbox")
		// }
	}, [user, isLoading, router])

	const [activeComponent, setActiveComponent] =
		useState<PreviewKey>("signin-12")
	const [activeFile, setActiveFile] = useState<string>("page.tsx")
	const [viewMode, setViewMode] = useState<ViewMode>("preview")
	const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop")
	const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(true)
	const [isCommentsVisible, setIsCommentsVisible] = useState(true)
	const [targetLineNumber, setTargetLineNumber] = useState<number | null>(null)

	const iframeRef = useRef<HTMLIFrameElement>(null)

	const activeComponentConfig =
		sandboxComponents.find((c) => c.id === activeComponent) ||
		sandboxComponents[0]

	const componentFiles = files[activeComponentConfig.filesKey] || {}

	// DOM Inspect effect with source location preview on hover
	useInspectMode(
		iframeRef,
		viewMode,
		activeComponent,
		componentFiles,
		activeComponentConfig.defaultFile
	)

	// Shortcut key C to toggle comment mode (inspect mode) across window and iframe
	useEffect(() => {
		const toggleCommentMode = () => {
			setViewMode((prev) => (prev === "inspect" ? "preview" : "inspect"))
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (!e.ctrlKey && !e.metaKey && (e.key === "c" || e.key === "C")) {
				const activeEl = document.activeElement as HTMLElement | null
				const isInput =
					activeEl?.tagName === "INPUT" ||
					activeEl?.tagName === "TEXTAREA" ||
					activeEl?.isContentEditable
				const hasSelection = Boolean(window.getSelection()?.toString())

				if (!isInput && !hasSelection) {
					e.preventDefault()
					toggleCommentMode()
				}
			}
		}

		const handleMessage = (e: MessageEvent) => {
			if (e.data?.type === "TOGGLE_COMMENT_MODE") {
				toggleCommentMode()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("message", handleMessage)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("message", handleMessage)
		}
	}, [])

	// Figma-style comments hook
	const {
		allComments,
		comments,
		draftComment,
		setDraftComment,
		isSubmitting,
		addComment,
		deleteComment,
		toggleResolveComment,
		refreshComments,
	} = useComments(
		iframeRef,
		activeComponent,
		viewMode,
		isCommentsVisible,
		componentFiles,
		activeComponentConfig.defaultFile
	)

	const unresolvedCommentsCount = allComments.filter(
		(c) => !isCommentResolved(c)
	).length

	const handleSelectComponent = (
		component: PreviewKey,
		defaultFile?: string
	) => {
		setActiveComponent(component)
		const targetFile =
			defaultFile ??
			sandboxComponents.find((c) => c.id === component)?.defaultFile ??
			"page.tsx"
		setActiveFile(targetFile)
		setTargetLineNumber(null)
	}

	const handleSelectFile = (fileName: string) => {
		setActiveFile(fileName)
		setTargetLineNumber(null)
	}

	const handleNavigateToCode = (fileName: string, lineNumber?: number) => {
		setActiveFile(fileName)
		setTargetLineNumber(lineNumber ?? 1)
		setViewMode("code")
	}

	const handleFocusComment = (commentId: string) => {
		const targetComment = allComments.find((c) => c.id === commentId)
		if (
			targetComment?.componentId &&
			targetComment.componentId !== activeComponent
		) {
			handleSelectComponent(targetComment.componentId as PreviewKey)
		}
		// Switch to preview so the comment overlay is visible
		if (viewMode === "code") {
			setViewMode("preview")
		}
		// Ensure comments overlay is visible
		if (!isCommentsVisible) {
			setIsCommentsVisible(true)
		}
		// Dispatch a custom event so the overlay can scroll to + open the pin
		const dispatch = () => {
			window.dispatchEvent(
				new CustomEvent("focus-comment", { detail: { commentId } })
			)
		}
		dispatch()
		setTimeout(dispatch, 250)
		setTimeout(dispatch, 600)
	}

	return (
		<SidebarProvider className="h-svh" defaultWidth="16rem">
			<PlaygroundSidebar
				activeComponent={activeComponent}
				onSelectComponent={handleSelectComponent}
				comments={allComments}
				onToggleResolveComment={toggleResolveComment}
				onDeleteComment={deleteComment}
				onNavigateToCode={handleNavigateToCode}
			/>

			<SidebarInset className="relative flex min-h-0 flex-1 flex-row overflow-hidden bg-white dark:bg-neutral-950">
				{/* Main Left Workspace (Header + Preview/Code Viewer) */}
				<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
					<PlaygroundHeader
						activeComponentConfig={activeComponentConfig}
						activeFile={activeFile}
						viewMode={viewMode}
						onViewModeChange={setViewMode}
						deviceSize={deviceSize}
						onDeviceSizeChange={setDeviceSize}
						isCommentsPanelOpen={isCommentsPanelOpen}
						onToggleCommentsPanel={() =>
							setIsCommentsPanelOpen((prev) => !prev)
						}
						isCommentsVisible={isCommentsVisible}
						onToggleCommentsVisible={setIsCommentsVisible}
						comments={allComments}
						commentsCount={unresolvedCommentsCount}
						unresolvedCommentsCount={unresolvedCommentsCount}
						onRefreshComments={refreshComments}
					/>

					<div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
						{(viewMode === "preview" || viewMode === "inspect") && (
							<PlaygroundPreview
								activeComponentConfig={activeComponentConfig}
								deviceSize={deviceSize}
								iframeRef={iframeRef}
								comments={comments}
								draftComment={draftComment}
								onCancelDraft={() => setDraftComment(null)}
								onSubmitDraft={addComment}
								onDeleteComment={deleteComment}
								onToggleResolveComment={toggleResolveComment}
								onNavigateToCode={handleNavigateToCode}
								isSubmitting={isSubmitting}
								isCommentsVisible={isCommentsVisible}
							/>
						)}

						{viewMode === "code" && (
							<PlaygroundCodeViewer
								files={files}
								activeComponentConfig={activeComponentConfig}
								activeFile={activeFile}
								onSelectFile={handleSelectFile}
								targetLineNumber={targetLineNumber}
							/>
						)}
					</div>
				</div>

				{/* Right Comments Side Panel starting from the very top */}
				<PlaygroundCommentsPanel
					comments={allComments}
					activeComponent={activeComponent}
					isOpen={isCommentsPanelOpen}
					onToggleResolve={toggleResolveComment}
					onDeleteComment={deleteComment}
					onSelectComponent={handleSelectComponent}
					onFocusComment={handleFocusComment}
				/>
			</SidebarInset>
		</SidebarProvider>
	)
}
