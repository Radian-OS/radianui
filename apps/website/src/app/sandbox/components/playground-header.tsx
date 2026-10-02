"use client"

import React, { useEffect, useState } from "react"
import {
	ChevronRight,
	Code,
	ExternalLink,
	Eye,
	Laptop,
	Maximize,
	Monitor,
	Moon,
	Smartphone,
	SquareDashedMousePointer,
	Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "@/styles/default/ui/sidebar"
import {
	type DeviceSize,
	type SandboxComment,
	type SandboxComponentConfig,
	type ViewMode,
	isCommentResolved,
} from "./types"
import { Button } from "@/styles/default/ui/button"
import { Badge } from "@/registry/ui/badge"

interface PlaygroundHeaderProps {
	activeComponentConfig: SandboxComponentConfig
	activeFile: string
	viewMode: ViewMode
	onViewModeChange: (mode: ViewMode) => void
	deviceSize: DeviceSize
	onDeviceSizeChange: (size: DeviceSize) => void
	isCommentsPanelOpen: boolean
	onToggleCommentsPanel: () => void
	isCommentsVisible: boolean
	onToggleCommentsVisible: (visible: boolean) => void
	comments?: SandboxComment[]
	commentsCount?: number
	unresolvedCommentsCount?: number
	onRefreshComments?: () => void
}

export function PlaygroundHeader({
	activeComponentConfig,
	// activeFile,
	viewMode,
	onViewModeChange,
	deviceSize,
	onDeviceSizeChange,
	// isCommentsPanelOpen,
	onToggleCommentsPanel,
	// isCommentsVisible,
	// onToggleCommentsVisible,
	comments,
	commentsCount = 0,
	unresolvedCommentsCount,
	onRefreshComments,
}: PlaygroundHeaderProps) {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	// const [isCommentsMenuOpen, setIsCommentsMenuOpen] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Shortcut key Ctrl + C / Cmd + C to toggle comment mode
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
				const activeEl = document.activeElement as HTMLElement | null
				const isInput =
					activeEl?.tagName === "INPUT" ||
					activeEl?.tagName === "TEXTAREA" ||
					activeEl?.isContentEditable
				const hasSelection = Boolean(window.getSelection()?.toString())

				if (!isInput && !hasSelection) {
					e.preventDefault()
					onViewModeChange(viewMode === "inspect" ? "preview" : "inspect")
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [viewMode, onViewModeChange])

	// Format category label for breadcrumb (e.g. welcome-screen-section -> Signup)
	const categoryBreadcrumb = (() => {
		const cat = activeComponentConfig.category
		if (cat === "welcome-screen-section") return "Signup"
		if (cat === "hero-section") return "Hero"
		if (cat === "pricing-section") return "Pricing"
		if (cat === "cta-section") return "CTA"
		if (cat === "blog-section") return "Blog"
		if (cat === "faq-section") return "FAQ"
		if (cat === "testimonial-section") return "Testimonial"
		if (cat === "portfolio-section") return "Portfolio"
		if (cat === "table-section") return "Table"
		return "Blocks"
	})()

	const componentBreadcrumb =
		activeComponentConfig.label === "jambo-pricing"
			? "Jambo Signup"
			: activeComponentConfig.label

	// const handleShowComments = () => {
	// 	onToggleCommentsVisible(true)
	// 	if (!isCommentsPanelOpen) {
	// 		onToggleCommentsPanel()
	// 	}
	// 	onRefreshComments?.()
	// }

	// const handleHideComments = () => {
	// 	onToggleCommentsVisible(false)
	// }

	const handlePillClick = () => {
		onToggleCommentsPanel()
		onRefreshComments?.()
	}

	const unresolvedCount =
		unresolvedCommentsCount ??
		(comments
			? comments.filter((c) => !isCommentResolved(c)).length
			: commentsCount)

	return (
		<header className="border-soft bg-bg sticky top-0 z-10 flex h-14 items-center justify-between border-b p-2.5 px-4">
			{/* Breadcrumb Navigation matching Image 1: Free Blocks > Signup > Jambo Signup */}
			<div className="text-fg-secondary flex items-center gap-2 text-sm font-medium">
				<SidebarTrigger className="text-fg-secondary mr-1 rounded-lg p-1.5 transition-colors" />
				<span className="text-fg-secondary">Free Blocks</span>
				<ChevronRight className="text-fg-secondary size-3.5" />
				<span className="text-fg-tertiary">{categoryBreadcrumb}</span>
				<ChevronRight className="text-fg size-3.5" />
				<span className="text-fg truncate font-semibold">
					{componentBreadcrumb}
				</span>
			</div>

			{/* Right Toolbar matching Image 2 & Image 3 */}
			<div className="flex items-center gap-2">
				{/* Responsive View Switcher Group */}
				<div className="bg-fill1-alpha flex items-center gap-0.5 rounded-lg p-1">
					<button
						type="button"
						onClick={() => onDeviceSizeChange("desktop")}
						title="Desktop View (Full Width)"
						className={`cursor-pointer rounded-md p-1.5 transition-colors ${
							deviceSize === "desktop"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						}`}>
						<Monitor className="size-4" />
					</button>
					<button
						type="button"
						onClick={() => onDeviceSizeChange("tablet")}
						title="Tablet / Laptop View"
						className={`cursor-pointer rounded-md p-1.5 transition-colors ${
							deviceSize === "tablet"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						}`}>
						<Laptop className="size-4" />
					</button>
					<button
						type="button"
						onClick={() => onDeviceSizeChange("mobile")}
						title="Mobile View"
						className={`cursor-pointer rounded-md p-1.5 transition-colors ${
							deviceSize === "mobile"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						}`}>
						<Smartphone className="size-4" />
					</button>
					<button
						type="button"
						onClick={() =>
							onViewModeChange(viewMode === "inspect" ? "preview" : "inspect")
						}
						title={
							viewMode === "inspect"
								? "Exit Comment Mode (Ctrl + C)"
								: "Toggle Comment Mode (Ctrl + C)"
						}
						className={`cursor-pointer rounded-md p-1.5 transition-colors ${
							viewMode === "inspect"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						}`}>
						<SquareDashedMousePointer className="size-3.5" />
					</button>
				</div>

				{/* View Mode Switcher (Preview / Code) */}
				<div className="bg-fill1-alpha flex items-center gap-0.5 rounded-lg p-1">
					<button
						type="button"
						onClick={() => onViewModeChange("preview")}
						title="Preview Mode"
						className={`cursor-pointer rounded-md p-1.5 transition-colors ${
							viewMode === "preview"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						}`}>
						<Eye className="size-4" />
					</button>
					<button
						type="button"
						onClick={() => onViewModeChange("code")}
						title="Code Mode"
						className={`cursor-pointer rounded-md p-1.5 transition-colors ${
							viewMode === "code"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						}`}>
						<Code className="size-4" />
					</button>
				</div>

				{/* Quick Action Icons */}
				<div className="flex items-center gap-1">
					{activeComponentConfig.previewRoute && (
						<a
							href={activeComponentConfig.previewRoute}
							target="_blank"
							rel="noopener noreferrer"
							title="Open in new tab"
							className="text-fg-secondary hover:text-fg hover:bg-bg rounded-lg p-2 transition-colors">
							<Maximize className="size-4" />
						</a>
					)}
					{activeComponentConfig.referenceUrl && (
						<a
							href={activeComponentConfig.referenceUrl}
							target="_blank"
							rel="noopener noreferrer"
							title="Open in new tab"
							className="text-fg-secondary hover:text-fg hover:bg-bg rounded-lg p-2 transition-colors">
							<ExternalLink className="size-4" />
						</a>
					)}

					{/* Theme Switcher */}
					<button
						type="button"
						onClick={() =>
							setTheme(resolvedTheme === "light" ? "dark" : "light")
						}
						title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
						className="text-fg-secondary hover:text-fg hover:bg-bg cursor-pointer rounded-lg p-2 transition-colors">
						{mounted && resolvedTheme === "dark" ? (
							<Sun className="size-4" />
						) : (
							<Moon className="size-4" />
						)}
					</button>
				</div>

				{/* "Comments 8" Pill Button & Dropdown matching Image 1 & 2 */}
				<div className="relative flex items-center gap-1">
					<Button
						size="28"
						color="primary"
						variant="soft"
						type="button"
						onClick={handlePillClick}
						title="Toggle comments panel">
						<span>Comments</span>
						<Badge size="20" variant="outline">
							{unresolvedCount}
						</Badge>
					</Button>
				</div>
			</div>
		</header>
	)
}
