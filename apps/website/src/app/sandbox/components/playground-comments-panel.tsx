"use client"

import React, { useState } from "react"
import { Check, ListFilter, Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PreviewKey, SandboxComment } from "./types"

interface PlaygroundCommentsPanelProps {
	comments: SandboxComment[]
	activeComponent: PreviewKey
	isOpen?: boolean
	onClose?: () => void
	onToggleResolve: (id: string, resolved: boolean) => Promise<void> | void
	onDeleteComment?: (id: string) => Promise<void> | void
	onSelectComponent?: (component: PreviewKey) => void
	onNavigateToCode?: (file: string, lineNumber?: number) => void
}

function formatRelativeTime(dateStr: string) {
	try {
		const date = new Date(dateStr)
		const now = new Date()
		const diffMs = now.getTime() - date.getTime()
		const diffMins = Math.floor(diffMs / (1000 * 60))
		if (diffMins < 1) return "Just now"
		if (diffMins < 60) return `${diffMins}m ago`
		const diffHours = Math.floor(diffMins / 60)
		if (diffHours < 24) return `${diffHours}h ago`
		const diffDays = Math.floor(diffHours / 24)
		return `${diffDays}d ago`
	} catch {
		return "Just now"
	}
}

export function PlaygroundCommentsPanel({
	comments,
	activeComponent,
	isOpen,
	onClose,
	onToggleResolve,
	onDeleteComment,
	onSelectComponent,
	onNavigateToCode,
}: PlaygroundCommentsPanelProps) {
	const [activeTab, setActiveTab] = useState<"all" | "pending" | "fixed">("all")
	const [searchQuery, setSearchQuery] = useState("")
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	if (isOpen === false) return null

	const effectiveComments = comments

	const pendingCount = effectiveComments.filter(
		(c) => !c.resolved && c.status !== "resolved"
	).length
	const fixedCount = effectiveComments.filter(
		(c) => c.resolved || c.status === "resolved"
	).length
	const totalCount = effectiveComments.length

	const filteredComments = effectiveComments.filter((comment) => {
		const isFixed = comment.resolved || comment.status === "resolved"
		if (activeTab === "pending" && isFixed) return false
		if (activeTab === "fixed" && !isFixed) return false
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase()
			const textMatch = comment.content.toLowerCase().includes(q)
			const authorMatch = comment.authorName.toLowerCase().includes(q)
			const tagMatch = (comment.elementSelector || "").toLowerCase().includes(q)
			return textMatch || authorMatch || tagMatch
		}
		return true
	})

	return (
		<aside className="border-nsoft bg-bg z-20 flex h-full w-80 shrink-0 flex-col border-l transition-all duration-200">
			{/* Panel Top Header Bar - matching h-14 height of PlaygroundHeader */}
			<div className="border-soft flex h-14 shrink-0 items-center justify-between border-b px-4">
				<h3 className="text-fg text-base font-semibold tracking-tight">
					Comments
				</h3>
				<div className="flex items-center gap-1 text-neutral-400">
					<button
						type="button"
						onClick={() => setIsSearchOpen(!isSearchOpen)}
						aria-label="Search comments"
						className="hover:text-fg-secondary hover:bg-bg cursor-pointer rounded-md p-1.5 transition-colors">
						<Search className="size-4" />
					</button>
					<button
						type="button"
						aria-label="Filter comments"
						className="hover:text-fg-secondary hover:bg-bg cursor-pointer rounded-md p-1.5 transition-colors">
						<ListFilter className="size-4" />
					</button>
				</div>
			</div>

			{/* Sub-header Filter Tabs section */}
			<div className="border-soft flex shrink-0 flex-col gap-3 border-b p-4 pb-3">
				{/* Optional Expandable Search Field */}
				{isSearchOpen && (
					<div className="relative">
						<input
							type="text"
							placeholder="Search comments..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="bg-bg text-fg border-soft focus:ring-primary w-full rounded-lg border px-3 py-1.5 text-xs focus:ring-1 focus:outline-none"
							autoFocus
						/>
					</div>
				)}

				{/* Filter Tabs matching Image 1: All (19) | Pending (8) | Fixed (11) */}
				<div className="bg-bg flex items-center gap-1 rounded-lg p-1 text-xs">
					<button
						type="button"
						onClick={() => setActiveTab("all")}
						className={cn(
							"flex-1 rounded-md px-2 py-1 text-center font-medium transition-all",
							activeTab === "all"
								? "bg-bg text-fg shadow-xs"
								: "text-fg-secondary hover:text-fg"
						)}>
						All ({totalCount})
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("pending")}
						className={cn(
							"flex-1 rounded-md px-2 py-1 text-center font-medium transition-all",
							activeTab === "pending"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						)}>
						Pending ({pendingCount})
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("fixed")}
						className={cn(
							"flex-1 rounded-md px-2 py-1 text-center font-medium transition-all",
							activeTab === "fixed"
								? "bg-bg text-fg"
								: "text-fg-secondary hover:text-fg"
						)}>
						Fixed ({fixedCount})
					</button>
				</div>
			</div>

			{/* Comments List */}
			<div className="flex-1 space-y-4 overflow-y-auto p-4">
				{filteredComments.length === 0 ? (
					<div className="text-fg-secondary py-12 text-center text-xs">
						No comments matching this filter.
					</div>
				) : (
					filteredComments.map((comment, index) => {
						const isFixed = comment.resolved || comment.status === "resolved"
						const displayIndex = `#0${index + 1}`
						const elementLabel = comment.elementSelector || "Component"

						const handleCardClick = () => {
							const c = comment as SandboxComment
							if (c.componentId && onSelectComponent) {
								onSelectComponent(c.componentId as PreviewKey)
							}
							if (c.file && onNavigateToCode) {
								onNavigateToCode(c.file, c.lineNumber)
							}
						}

						return (
							<div
								key={comment.id}
								onClick={handleCardClick}
								className="group border-soft flex cursor-pointer flex-col gap-1.5 border-b border-dashed pb-4 transition-opacity last:border-none hover:opacity-90">
								{/* Header row: #01 • Hero-jambo + Checkbox + Time */}
								<div className="text-fg-secondary flex items-center justify-between text-xs font-medium">
									<div className="flex items-center gap-1.5 truncate">
										<span>{displayIndex}</span>
										<span>•</span>
										<span className="max-w-[140px] truncate capitalize">
											{elementLabel}
										</span>
									</div>
									<div className="flex shrink-0 items-center gap-2">
										<span>{formatRelativeTime(comment.createdAt)}</span>
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation()
												onToggleResolve(comment.id, !isFixed)
											}}
											title={isFixed ? "Mark as pending" : "Mark as fixed"}
											className={cn(
												"flex size-4 cursor-pointer items-center justify-center rounded border transition-colors",
												isFixed
													? "bg-primary border-primary-border text-fg"
													: "border-soft bg-bg hover:border-primary-border"
											)}>
											{isFixed && <Check className="size-3 stroke-[3]" />}
										</button>
									</div>
								</div>

								{/* Author Role */}
								<div className="text-fg text-xs leading-snug font-semibold">
									{comment.authorName}
								</div>

								{/* Comment Text Body */}
								<p
									className={cn(
										"text-xs leading-relaxed transition-opacity",
										isFixed
											? "text-fg line-through opacity-75"
											: "text-fg-secondary"
									)}>
									{comment.content}
								</p>
							</div>
						)
					})
				)}
			</div>
		</aside>
	)
}
