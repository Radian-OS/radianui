"use client"

import React, { useState } from "react"
import { Check, ListFilter, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs"
import type { PreviewKey, SandboxComment } from "./types"

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

function CommentCard({
	comment,
	index,
	isFixed,
	onToggleResolve,
	onFocusComment,
}: {
	comment: SandboxComment
	index: number
	isFixed: boolean
	onToggleResolve: (id: string, resolved: boolean) => Promise<void> | void
	onFocusComment?: (commentId: string) => void
}) {
	const displayIndex = `#0${index + 1}`
	const elementLabel = comment.elementSelector || "Component"

	const handleCardClick = () => {
		onFocusComment?.(comment.id)
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

			{/* Author Role */}
			<div className="text-fg text-xs leading-snug font-semibold">
				{comment.authorName}
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
	onToggleResolve,
	onFocusComment,
}: {
	comments: SandboxComment[]
	searchQuery: string
	onToggleResolve: (id: string, resolved: boolean) => Promise<void> | void
	onFocusComment?: (commentId: string) => void
}) {
	const filtered = comments.filter((comment) => {
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase()
			const textMatch = comment.content.toLowerCase().includes(q)
			const authorMatch = comment.authorName.toLowerCase().includes(q)
			const tagMatch = (comment.elementSelector || "").toLowerCase().includes(q)
			return textMatch || authorMatch || tagMatch
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
						onToggleResolve={onToggleResolve}
						onFocusComment={onFocusComment}
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

	if (isOpen === false) return null

	const effectiveComments = comments

	const unresolvedComments = effectiveComments.filter(
		(c) => !c.resolved && c.status !== "resolved"
	)
	const resolvedComments = effectiveComments.filter(
		(c) => c.resolved || c.status === "resolved"
	)

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

			{/* Tabs: Unresolved / Resolved */}
			<Tabs
				defaultValue="unresolved"
				className="flex min-h-0 flex-1 flex-col gap-0 py-2">
				<div className="shrink-0 px-4">
					<TabsList size="sm" width="full" className="border-none">
						<TabsTrigger value="unresolved">
							Unresolved ({unresolvedComments.length})
						</TabsTrigger>
						<TabsTrigger value="resolved">
							Resolved ({resolvedComments.length})
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent
					value="unresolved"
					className="flex-1 space-y-4 overflow-y-auto p-4">
					<CommentsList
						comments={unresolvedComments}
						searchQuery={searchQuery}
						onToggleResolve={onToggleResolve}
						onFocusComment={onFocusComment}
					/>
				</TabsContent>

				<TabsContent
					value="resolved"
					className="flex-1 space-y-4 overflow-y-auto p-4">
					<CommentsList
						comments={resolvedComments}
						searchQuery={searchQuery}
						onToggleResolve={onToggleResolve}
						onFocusComment={onFocusComment}
					/>
				</TabsContent>
			</Tabs>
		</aside>
	)
}
