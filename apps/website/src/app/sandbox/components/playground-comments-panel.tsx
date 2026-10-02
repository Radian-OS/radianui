"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, ListFilter, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs"
import {
	type PreviewKey,
	type SandboxComment,
	sandboxComponents,
} from "./types"

interface PlaygroundCommentsPanelProps {
	comments: SandboxComment[]
	activeComponent: PreviewKey
	isOpen?: boolean
	onClose?: () => void
	onToggleResolve: (id: string, resolved: boolean) => Promise<void> | void
	onDeleteComment?: (id: string) => Promise<void> | void
	onSelectComponent?: (component: PreviewKey) => void
	onFocusComment?: (commentId: string) => void
}

function formatRelativeTime(dateStr: string) {
	try {
		const date = new Date(dateStr)
		if (isNaN(date.getTime())) return "Just now"
		const now = new Date()
		const diffMs = now.getTime() - date.getTime()
		if (diffMs < 0) return "Just now"
		const diffMins = Math.floor(diffMs / (1000 * 60))
		if (diffMins < 1) return "Just now"
		if (diffMins < 60) return `${diffMins}m ago`
		const diffHours = Math.floor(diffMins / (1000 * 60 * 60))
		if (diffHours < 24) return `${diffHours}h ago`
		const diffDays = Math.floor(diffHours / 24)
		return `${diffDays}d ago`
	} catch {
		return "Just now"
	}
}

function CommentCard({
	comment,
	index,
	isFixed,
	isSelected,
	onToggleResolve,
	onSelectComment,
}: {
	comment: SandboxComment
	index: number
	isFixed: boolean
	isSelected?: boolean
	onToggleResolve: (id: string, resolved: boolean) => Promise<void> | void
	onSelectComment: (comment: SandboxComment) => void
}) {
	const cardRef = useRef<HTMLDivElement>(null)
	const displayIndex = `#${String(index + 1).padStart(2, "0")}`
	const componentConfig = sandboxComponents.find(
		(c) => c.id === comment.componentId
	)
	const componentLabel =
		componentConfig?.label || comment.componentId || "Component"

	useEffect(() => {
		if (isSelected && cardRef.current) {
			cardRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			})
		}
	}, [isSelected])

	const handleCardClick = () => {
		onSelectComment(comment)
	}

	return (
		<div
			ref={cardRef}
			key={comment.id}
			onClick={handleCardClick}
			className={cn(
				"group border-soft flex cursor-pointer flex-col gap-1.5 rounded-lg border-b border-dashed p-2.5 transition-all last:border-none",
				isSelected
					? "bg-fill1-alpha border-primary-border/60 ring-primary/20 ring-1"
					: "hover:bg-fill1-alpha/60"
			)}>
			{/* Header row: #01 • Component Label + Time + Checkbox */}
			<div className="text-fg-secondary flex items-center justify-between text-xs font-medium">
				<div className="flex min-w-0 items-center gap-1.5 truncate">
					<span className="shrink-0 font-mono text-[11px]">{displayIndex}</span>
					<span>•</span>
					<span
						className="text-fg truncate font-semibold capitalize"
						title={componentLabel}>
						{componentLabel}
					</span>
					{/* {comment.elementSelector &&
						comment.elementSelector !== componentLabel && (
							<>
								<span className="shrink-0">•</span>
								<span
									className="text-fg-secondary max-w-[80px] truncate text-[11px]"
									title={comment.elementSelector}>
									{comment.elementSelector}
								</span>
							</>
						)} */}
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<span>{formatRelativeTime(comment.createdAt)}</span>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation()
							onToggleResolve(comment.id, !isFixed)
						}}
						title={isFixed ? "Mark as unresolved" : "Mark as resolved"}
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

			{/* Comment Text Body */}
			<p
				className={cn(
					"text-xs leading-relaxed transition-opacity",
					isFixed ? "text-fg line-through opacity-75" : "text-fg-secondary"
				)}>
				{comment.content}
			</p>
		</div>
	)
}

function CommentsList({
	comments,
	searchQuery,
	selectedCommentId,
	onToggleResolve,
	onSelectComment,
}: {
	comments: SandboxComment[]
	searchQuery: string
	selectedCommentId: string | null
	onToggleResolve: (id: string, resolved: boolean) => Promise<void> | void
	onSelectComment: (comment: SandboxComment) => void
}) {
	const filtered = comments.filter((comment) => {
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase()
			const textMatch = comment.content.toLowerCase().includes(q)
			const authorMatch = comment.authorName.toLowerCase().includes(q)
			const tagMatch = (comment.elementSelector || "").toLowerCase().includes(q)
			const compMatch = (comment.componentId || "").toLowerCase().includes(q)
			const config = sandboxComponents.find((c) => c.id === comment.componentId)
			const labelMatch = (config?.label || "").toLowerCase().includes(q)
			return textMatch || authorMatch || tagMatch || compMatch || labelMatch
		}
		return true
	})

	if (filtered.length === 0) {
		return (
			<div className="text-fg-secondary py-12 text-center text-xs">
				No comments matching this filter.
			</div>
		)
	}

	return (
		<>
			{filtered.map((comment, index) => {
				const isFixed = comment.resolved || comment.status === "resolved"
				return (
					<CommentCard
						key={comment.id}
						comment={comment}
						index={index}
						isFixed={isFixed}
						isSelected={selectedCommentId === comment.id}
						onToggleResolve={onToggleResolve}
						onSelectComment={onSelectComment}
					/>
				)
			})}
		</>
	)
}

export function PlaygroundCommentsPanel({
	comments,
	activeComponent,
	isOpen,
	onClose,
	onToggleResolve,
	onDeleteComment,
	onSelectComponent,
	onFocusComment,
}: PlaygroundCommentsPanelProps) {
	const [searchQuery, setSearchQuery] = useState("")
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
		null
	)

	// Listen for focus-comment events from window
	useEffect(() => {
		const handleFocus = (e: Event) => {
			const customEvent = e as CustomEvent<{ commentId: string }>
			if (customEvent.detail?.commentId) {
				setSelectedCommentId(customEvent.detail.commentId)
			}
		}
		window.addEventListener("focus-comment", handleFocus)
		return () => window.removeEventListener("focus-comment", handleFocus)
	}, [])

	if (isOpen === false) return null

	// Sort comments from newer to older (most recent first)
	const sortedComments = [...comments].sort((a, b) => {
		const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
		const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
		return timeB - timeA
	})

	// Always show all comments
	const effectiveComments = sortedComments

	const unresolvedComments = effectiveComments.filter(
		(c) => !c.resolved && c.status !== "resolved"
	)
	const resolvedComments = effectiveComments.filter(
		(c) => c.resolved || c.status === "resolved"
	)

	const handleSelectComment = (comment: SandboxComment) => {
		setSelectedCommentId(comment.id)
		// Switch to preview of that comment's component
		if (comment.componentId && onSelectComponent) {
			onSelectComponent(comment.componentId as PreviewKey)
		}
		// Open the pin and scroll to it in preview overlay
		onFocusComment?.(comment.id)
	}

	return (
		<aside className="border-nsoft bg-bg z-20 flex h-full w-80 shrink-0 flex-col border-l transition-all duration-200">
			{/* Panel Top Header Bar - matching h-14 height of PlaygroundHeader */}
			<div className="border-soft flex h-14 shrink-0 items-center justify-between border-b px-4">
				<h3 className="text-fg text-base font-semibold tracking-tight">
					Comments
				</h3>
				<div className="text-fg flex items-center gap-1">
					<button
						type="button"
						onClick={() => setIsSearchOpen(!isSearchOpen)}
						aria-label="Search comments"
						className={cn(
							"hover:text-fg-secondary hover:bg-bg cursor-pointer rounded-md p-1.5 transition-colors",
							isSearchOpen && "bg-fill1-alpha text-fg"
						)}>
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

			{/* Search input field if open */}
			{isSearchOpen && (
				<div className="border-soft border-b px-4 py-2">
					<div className="relative">
						<Search className="text-fg-secondary absolute top-2 left-2.5 size-3.5" />
						<input
							type="text"
							placeholder="Search comments, authors, tags..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="border-soft bg-bg text-fg placeholder:text-fg-secondary focus:border-primary-border w-full rounded-md border py-1 pr-7 pl-8 text-xs focus:outline-none"
							autoFocus
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={() => setSearchQuery("")}
								className="text-fg-secondary hover:text-fg absolute top-2 right-2 cursor-pointer">
								<X className="size-3.5" />
							</button>
						)}
					</div>
				</div>
			)}

			{/* Tabs: Unresolved / Resolved */}
			<Tabs
				defaultValue="unresolved"
				className="flex min-h-0 flex-1 flex-col gap-0 py-2">
				<div className="shrink-0 px-4">
					<TabsList size="sm" width="full" className="border-none">
						<TabsTrigger value="unresolved">
							Unresolved ({unresolvedComments.length})
						</TabsTrigger>
						{/* resolved number not showing  */}
						<TabsTrigger value="resolved">Resolved</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent
					value="unresolved"
					className="flex-1 space-y-2 overflow-y-auto p-4">
					<CommentsList
						comments={unresolvedComments}
						searchQuery={searchQuery}
						selectedCommentId={selectedCommentId}
						onToggleResolve={onToggleResolve}
						onSelectComment={handleSelectComment}
					/>
				</TabsContent>

				<TabsContent
					value="resolved"
					className="flex-1 space-y-2 overflow-y-auto p-4">
					<CommentsList
						comments={resolvedComments}
						searchQuery={searchQuery}
						selectedCommentId={selectedCommentId}
						onToggleResolve={onToggleResolve}
						onSelectComment={handleSelectComment}
					/>
				</TabsContent>
			</Tabs>
		</aside>
	)
}
