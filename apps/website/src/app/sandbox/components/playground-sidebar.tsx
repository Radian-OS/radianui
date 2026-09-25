"use client"

import React, { useEffect, useRef, useState } from "react"
import {
	ArrowRight,
	Blocks,
	BookOpen,
	Briefcase,
	Check,
	Clock,
	Code,
	Compass,
	CreditCard,
	FileText,
	Folder,
	HelpCircle,
	Layout,
	LogIn,
	Mail,
	MessageSquare,
	MousePointerClick,
	RotateCcw,
	Settings,
	Sparkles,
	Table2,
	Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
import { Avatar, AvatarFallback } from "@/styles/default/ui/avatar"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/styles/default/ui/dialog"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
import {
	type CommentStatusFilter,
	type PreviewKey,
	type SandboxCategory,
	type SandboxComment,
	isCommentResolved,
	sandboxComponents,
} from "./types"

interface PlaygroundSidebarProps {
	activeComponent: PreviewKey
	onSelectComponent: (component: PreviewKey, defaultFile: string) => void
	comments?: SandboxComment[]
	onToggleResolveComment?: (
		id: string,
		resolved: boolean
	) => Promise<void> | void
	onDeleteComment?: (id: string) => Promise<void> | void
	onNavigateToCode?: (file: string, lineNumber?: number) => void
}

interface CategoryGroup {
	id: SandboxCategory
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const CATEGORIES: CategoryGroup[] = [
	{
		id: "full-page",
		label: "Full Page",
		icon: Layout,
	},
	{
		id: "hero-section",
		label: "Hero Section",
		icon: Sparkles,
	},
	{
		id: "pricing-section",
		label: "Pricing Section",
		icon: CreditCard,
	},
	{
		id: "blog-section",
		label: "Blog Section",
		icon: BookOpen,
	},
	{
		id: "contact-section",
		label: "Contact Section",
		icon: Mail,
	},
	{
		id: "cta-section",
		label: "CTA Section",
		icon: MousePointerClick,
	},
	{
		id: "faq-section",
		label: "FAQ Section",
		icon: HelpCircle,
	},
	{
		id: "form-section",
		label: "Form Section",
		icon: FileText,
	},
	{
		id: "setting-section",
		label: "Setting Section",
		icon: Settings,
	},
	{
		id: "welcome-screen-section",
		label: "Welcome Screen",
		icon: LogIn,
	},
	{
		id: "guided-tour-section",
		label: "Guided Tour",
		icon: Compass,
	},
	{
		id: "portfolio-section",
		label: "Portfolio Section",
		icon: Briefcase,
	},
	{
		id: "table-section",
		label: "Table Section",
		icon: Table2,
	},
	{
		id: "other-sections",
		label: "Other Sections",
		icon: Blocks,
	},
]

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

function getInitials(name: string) {
	if (!name) return "U"
	const parts = name.trim().split(/\s+/)
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function PlaygroundSidebar({
	activeComponent,
	onSelectComponent,
	comments = [],
	onToggleResolveComment,
	onDeleteComment,
	onNavigateToCode,
}: PlaygroundSidebarProps) {
	const activeCategory =
		sandboxComponents.find((c) => c.id === activeComponent)?.category ||
		"hero-section"

	const [openCategories, setOpenCategories] = useState<string[]>([
		"full-page",
		"hero-section",
		"pricing-section",
		"blog-section",
		"contact-section",
		"cta-section",
		"faq-section",
		"guided-tour-section",
		"portfolio-section",
		"other-sections",
	])

	// Auto-expand category ONLY when activeComponent changes to a different component
	// This allows the user to close/collapse the current active category accordion freely!
	const prevActiveComponentRef = useRef(activeComponent)
	useEffect(() => {
		if (prevActiveComponentRef.current !== activeComponent) {
			prevActiveComponentRef.current = activeComponent
			if (activeCategory && !openCategories.includes(activeCategory)) {
				setOpenCategories((prev) => [...prev, activeCategory])
			}
		}
	}, [activeComponent, activeCategory, openCategories])

	// Three-state resolution filter: "all" | "pending" | "resolved"
	const [statusFilter, setStatusFilter] = useState<CommentStatusFilter>("all")

	// Modal state for viewing all comment data when clicked
	const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false)
	const [selectedComponentForModal, setSelectedComponentForModal] = useState<
		string | null
	>(null)
	const [togglingId, setTogglingId] = useState<string | null>(null)
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const handleOpenComments = (componentId: string | null = null) => {
		setSelectedComponentForModal(componentId)
		setIsCommentsModalOpen(true)
	}

	// Compute counts across all comments
	const totalAllComments = comments.length
	const totalPendingComments = comments.filter(
		(c) => !isCommentResolved(c)
	).length
	const totalResolvedComments = comments.filter((c) =>
		isCommentResolved(c)
	).length

	// Comments matching the active three-state filter
	const filteredComments = comments.filter((c) => {
		if (statusFilter === "pending") return !isCommentResolved(c)
		if (statusFilter === "resolved") return isCommentResolved(c)
		return true
	})

	// Comments to display inside the modal dialog
	const modalScopeComments = (
		selectedComponentForModal
			? comments.filter((c) => c.componentId === selectedComponentForModal)
			: comments
	).filter((c) => {
		if (statusFilter === "pending") return !isCommentResolved(c)
		if (statusFilter === "resolved") return isCommentResolved(c)
		return true
	})

	const selectedModalComponentConfig = selectedComponentForModal
		? sandboxComponents.find((c) => c.id === selectedComponentForModal)
		: null

	return (
		<>
			<Sidebar theme="gray" collapsible="icon">
				{/* Sidebar Header */}
				<SidebarHeader className="border-border bg-fill2 flex flex-col gap-2.5 border-b p-3.5 group-data-[state=collapsed]:items-center group-data-[state=collapsed]:p-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="bg-primary text-primary-fg shadow-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black shadow-md">
								R
							</div>
							<span className="text-sm font-semibold group-data-[state=collapsed]:hidden">
								Sandbox
							</span>
						</div>

						{/* Comments Quick Counter in Header */}
						<button
							type="button"
							onClick={() => handleOpenComments(null)}
							title="View comments overview"
							className="text-fg-secondary hover:text-fg flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs transition-colors group-data-[state=collapsed]:hidden">
							<MessageSquare className="text-primary size-3.5" />
							<span className="text-[11px] font-semibold">
								{statusFilter === "all"
									? totalAllComments
									: statusFilter === "pending"
										? totalPendingComments
										: totalResolvedComments}
							</span>
						</button>
					</div>

					{/* 3-State Filter: All, Pending, Resolved */}
					<div className="flex flex-col gap-1.5 group-data-[state=collapsed]:hidden">
						<div className="text-fg-secondary flex items-center justify-between px-0.5 text-[11px] font-medium">
							<span className="flex items-center gap-1 text-[11px]">
								<span>Review Filter</span>
							</span>
							{totalAllComments > 0 && (
								<button
									type="button"
									onClick={() => handleOpenComments(null)}
									className="text-primary hover:text-primary-hover cursor-pointer text-[10px] font-semibold transition-colors">
									View all data
								</button>
							)}
						</div>

						<Tabs
							value={statusFilter}
							onValueChange={(val) =>
								setStatusFilter(val as CommentStatusFilter)
							}
							className="w-full">
							<TabsList className="bg-fill3/80 grid h-7 w-full grid-cols-3 p-0.5">
								<TabsTrigger
									value="all"
									className="h-6 gap-1 px-1 text-[10px] font-semibold tracking-tight"
									title="All comments">
									<span>All</span>
									<span className="font-mono text-[9px] opacity-75">
										({totalAllComments})
									</span>
								</TabsTrigger>
								<TabsTrigger
									value="pending"
									className="h-6 gap-1 px-1 text-[10px] font-semibold tracking-tight data-[state=active]:text-amber-500"
									title="Pending comments">
									<span>Pending</span>
									<span className="font-mono text-[9px] opacity-75">
										({totalPendingComments})
									</span>
								</TabsTrigger>
								<TabsTrigger
									value="resolved"
									className="h-6 gap-1 px-1 text-[10px] font-semibold tracking-tight data-[state=active]:text-emerald-500"
									title="Resolved comments">
									<span>Resolved</span>
									<span className="font-mono text-[9px] opacity-75">
										({totalResolvedComments})
									</span>
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</SidebarHeader>

				{/* Sidebar Navigation */}
				<SidebarContent className="flex-1 overflow-y-auto px-2.5 py-3 group-data-[state=collapsed]:mt-4 group-data-[state=collapsed]:p-0">
					<SidebarGroup className="p-0">
						<SidebarGroupContent>
							<Accordion
								type="multiple"
								value={openCategories}
								onValueChange={setOpenCategories}
								variant="open"
								indicator="chevron"
								size="sm"
								className="w-full space-y-1.5">
								{CATEGORIES.map((category) => {
									const items = sandboxComponents.filter(
										(item) => item.category === category.id
									)
									if (items.length === 0) return null

									const categoryCommentCount = filteredComments.filter((c) =>
										items.some((it) => it.id === c.componentId)
									).length

									return (
										<AccordionItem
											key={category.id}
											value={category.id}
											className="border-none">
											<AccordionTrigger
												className={cn(
													"hover:bg-fill3/60 group/trigger text-fg-secondary hover:text-fg flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors hover:no-underline",
													"group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-1",
													"[&>.AccordionChevron]:text-fg-tertiary [&>.AccordionChevron]:size-3.5 group-data-[state=collapsed]:[&>.AccordionChevron]:hidden"
												)}>
												<div className="flex min-w-0 items-center gap-2 group-data-[state=collapsed]:justify-center">
													<category.icon className="text-fg-tertiary group-hover/trigger:text-primary size-3.5 shrink-0 transition-colors" />
													<span className="truncate group-data-[state=collapsed]:hidden">
														{category.label}
													</span>
													<span className="bg-fill3 text-fg-tertiary shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold normal-case group-data-[state=collapsed]:hidden">
														{items.length}
													</span>
													{categoryCommentCount > 0 && (
														<span
															className={cn(
																"py-0.2 flex shrink-0 items-center gap-0.5 rounded-full px-1.5 font-mono text-[9px] font-bold group-data-[state=collapsed]:hidden",
																statusFilter === "pending" &&
																	"border border-amber-500/25 bg-amber-500/15 text-amber-500",
																statusFilter === "resolved" &&
																	"border border-emerald-500/25 bg-emerald-500/15 text-emerald-500",
																statusFilter === "all" &&
																	"bg-primary/15 text-primary border-primary/25 border"
															)}
															title={`${categoryCommentCount} ${statusFilter} comment${categoryCommentCount === 1 ? "" : "s"}`}>
															<MessageSquare className="size-2.5" />
															{categoryCommentCount}
														</span>
													)}
												</div>
											</AccordionTrigger>
											<AccordionContent className="px-0.5 pt-0.5 pb-1">
												<SidebarMenu className="space-y-0.5">
													{items.map((item) => {
														const isActive = activeComponent === item.id
														const itemCommentsCount = filteredComments.filter(
															(c) => c.componentId === item.id
														).length

														return (
															<SidebarMenuItem key={item.id}>
																<SidebarMenuButton
																	isActive={isActive}
																	variant={isActive ? "strong" : "neutral"}
																	tooltip={item.path}
																	onClick={() =>
																		onSelectComponent(item.id, item.defaultFile)
																	}
																	className={cn(
																		"group flex w-full items-center justify-start gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-all duration-200",
																		!isActive &&
																			"hover:bg-fill3 text-fg-secondary hover:text-fg",
																		"group-data-[state=collapsed]:p-2!"
																	)}>
																	<Folder
																		className={cn(
																			"size-3.5 shrink-0 transition-colors",
																			isActive ? "text-white" : "text-primary"
																		)}
																	/>
																	<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
																		{item.label}
																	</span>
																</SidebarMenuButton>

																{/* Display number of comments based on resolved status filter */}
																{itemCommentsCount > 0 && (
																	<SidebarMenuBadge
																		onClick={(e) => {
																			e.stopPropagation()
																			handleOpenComments(item.id)
																		}}
																		title={`Click to view ${itemCommentsCount} ${statusFilter} comment${itemCommentsCount === 1 ? "" : "s"} for ${item.label}`}
																		className={cn(
																			"pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95",
																			statusFilter === "pending" &&
																				"border-amber-500/35 bg-amber-500/15 font-semibold text-amber-500",
																			statusFilter === "resolved" &&
																				"border-emerald-500/35 bg-emerald-500/15 font-semibold text-emerald-500",
																			statusFilter === "all" &&
																				"border-border bg-fill2 text-fg hover:bg-fill3"
																		)}>
																		{itemCommentsCount}
																	</SidebarMenuBadge>
																)}
															</SidebarMenuItem>
														)
													})}
												</SidebarMenu>
											</AccordionContent>
										</AccordionItem>
									)
								})}
							</Accordion>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>

			{/* All Comment Data Viewer Dialog (Opens when clicked) */}
			<Dialog open={isCommentsModalOpen} onOpenChange={setIsCommentsModalOpen}>
				<DialogContent className="border-border bg-bg flex max-h-[85vh] w-full max-w-2xl flex-col gap-4 overflow-hidden rounded-2xl p-5 shadow-2xl">
					<DialogHeader className="border-border/70 gap-1 border-b pb-3 text-left">
						<div className="flex items-center justify-between gap-3 pr-6">
							<div className="flex items-center gap-2">
								<div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-lg">
									<MessageSquare className="size-4" />
								</div>
								<div>
									<DialogTitle className="text-fg text-base font-bold">
										{selectedModalComponentConfig
											? `Comments for "${selectedModalComponentConfig.label}"`
											: "All Sandbox Comments"}
									</DialogTitle>
									<DialogDescription className="text-fg-secondary text-xs">
										{selectedModalComponentConfig
											? `Review and manage all comment text data for ${selectedModalComponentConfig.label}`
											: "Review and manage all comment text data across all sandbox components"}
									</DialogDescription>
								</div>
							</div>

							<Badge
								color={
									statusFilter === "pending"
										? "warning"
										: statusFilter === "resolved"
											? "success"
											: "neutral"
								}
								size="24"
								className="shrink-0 font-mono text-xs font-semibold">
								{modalScopeComments.length}{" "}
								{statusFilter === "all"
									? "total"
									: statusFilter === "pending"
										? "pending"
										: "resolved"}
							</Badge>
						</div>

						{/* 3-State Filter Switcher inside Dialog */}
						<div className="mt-2.5 flex items-center justify-between gap-2">
							<Tabs
								value={statusFilter}
								onValueChange={(val) =>
									setStatusFilter(val as CommentStatusFilter)
								}
								className="w-full sm:w-auto">
								<TabsList className="bg-fill2 h-7 p-0.5">
									<TabsTrigger
										value="all"
										className="h-6 px-2.5 text-xs font-semibold">
										All (
										{selectedComponentForModal
											? comments.filter(
													(c) => c.componentId === selectedComponentForModal
												).length
											: totalAllComments}
										)
									</TabsTrigger>
									<TabsTrigger
										value="pending"
										className="h-6 px-2.5 text-xs font-semibold data-[state=active]:text-amber-500">
										Pending (
										{selectedComponentForModal
											? comments.filter(
													(c) =>
														c.componentId === selectedComponentForModal &&
														!isCommentResolved(c)
												).length
											: totalPendingComments}
										)
									</TabsTrigger>
									<TabsTrigger
										value="resolved"
										className="h-6 px-2.5 text-xs font-semibold data-[state=active]:text-emerald-500">
										Resolved (
										{selectedComponentForModal
											? comments.filter(
													(c) =>
														c.componentId === selectedComponentForModal &&
														isCommentResolved(c)
												).length
											: totalResolvedComments}
										)
									</TabsTrigger>
								</TabsList>
							</Tabs>

							{selectedComponentForModal && (
								<button
									type="button"
									onClick={() => setSelectedComponentForModal(null)}
									className="text-primary hover:text-primary-hover cursor-pointer text-xs font-semibold">
									Show all components
								</button>
							)}
						</div>
					</DialogHeader>

					{/* Modal Body: List of all comment text cards */}
					<DialogBody className="flex-1 space-y-3.5 overflow-y-auto py-1 pr-1">
						{modalScopeComments.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="bg-fill2 text-fg-tertiary mb-3 flex size-12 items-center justify-center rounded-full">
									<MessageSquare className="size-6" />
								</div>
								<p className="text-fg text-sm font-semibold">
									No {statusFilter !== "all" ? statusFilter : ""} comments found
								</p>
								<p className="text-fg-tertiary mt-1 max-w-xs text-xs">
									{statusFilter === "pending"
										? "All comments on this component are marked as resolved!"
										: statusFilter === "resolved"
											? "There are no resolved comments yet."
											: "Click inspect in the preview toolbar to leave feedback."}
								</p>
							</div>
						) : (
							modalScopeComments.map((comment) => {
								const resolved = isCommentResolved(comment)
								const isToggling = togglingId === comment.id
								const isDeleting = deletingId === comment.id

								return (
									<Card
										key={comment.id}
										className={cn(
											"border-border bg-fill1/40 hover:border-border-hover relative gap-0 overflow-hidden p-0 shadow-xs transition-colors",
											resolved && "bg-fill1/20 border-emerald-500/20"
										)}>
										<CardContent className="space-y-2.5 p-4">
											{/* Comment Card Header: Author, Time, Component, Status Badge, Actions */}
											<div className="flex items-start justify-between gap-3">
												<div className="flex min-w-0 items-center gap-2.5">
													<Avatar
														size="32"
														rounded="circle"
														className="border-border border">
														<AvatarFallback className="bg-fill3 text-fg text-xs font-semibold">
															{getInitials(comment.authorName)}
														</AvatarFallback>
													</Avatar>
													<div className="flex min-w-0 flex-col">
														<div className="flex items-center gap-2">
															<span className="text-fg truncate text-xs font-semibold">
																{comment.authorName}
															</span>
															{/* Resolution Status Badge */}
															<Badge
																color={resolved ? "success" : "warning"}
																size="20"
																className="gap-1 text-[10px] font-semibold">
																{resolved ? (
																	<>
																		<Check className="size-2.5" />
																		Resolved
																	</>
																) : (
																	<>
																		<Clock className="size-2.5" />
																		Pending
																	</>
																)}
															</Badge>
														</div>
														<span className="text-fg-tertiary text-[10px]">
															{formatDate(comment.createdAt)}
															{comment.componentId && (
																<span className="text-primary ml-1.5 font-mono text-[10px]">
																	@{comment.componentId}
																</span>
															)}
														</span>
													</div>
												</div>

												{/* Resolve and Delete Actions */}
												<div className="flex shrink-0 items-center gap-1.5">
													{onToggleResolveComment && (
														<Button
															type="button"
															variant="soft"
															color={resolved ? "neutral" : "success"}
															size="28"
															loading={isToggling}
															onClick={async () => {
																setTogglingId(comment.id)
																try {
																	await onToggleResolveComment(
																		comment.id,
																		!resolved
																	)
																} finally {
																	setTogglingId(null)
																}
															}}
															title={
																resolved
																	? "Mark as Pending"
																	: "Mark as Resolved"
															}
															className="gap-1 text-xs">
															{resolved ? (
																<>
																	<RotateCcw className="size-3" />
																	<span>Reopen</span>
																</>
															) : (
																<>
																	<Check className="size-3" />
																	<span>Resolve</span>
																</>
															)}
														</Button>
													)}

													{onDeleteComment && (
														<Button
															type="button"
															variant="ghost"
															color="error"
															size="28"
															loading={isDeleting}
															onClick={async () => {
																setDeletingId(comment.id)
																try {
																	await onDeleteComment(comment.id)
																} finally {
																	setDeletingId(null)
																}
															}}
															title="Delete comment"
															className="text-fg-tertiary hover:text-error">
															<Trash2 className="size-3.5" />
														</Button>
													)}
												</div>
											</div>

											{/* Element Target Context (if present) */}
											{comment.elementTag && (
												<div className="border-border/60 bg-fill2/50 rounded-lg border p-2 text-xs">
													<div className="mb-1 flex items-center gap-1.5">
														<span className="bg-fill3 text-primary rounded px-1.5 py-0.5 font-mono text-[10px] font-bold">
															&lt;{comment.elementTag}&gt;
														</span>
														{comment.elementSelector && (
															<span className="text-fg-tertiary max-w-[320px] truncate font-mono text-[10px]">
																{comment.elementSelector}
															</span>
														)}
													</div>
													{comment.elementContent && (
														<p className="text-fg-secondary line-clamp-2 text-[11px] italic">
															&ldquo;{comment.elementContent}&rdquo;
														</p>
													)}
												</div>
											)}

											{/* Source Code Location Link */}
											{comment.file && onNavigateToCode && (
												<button
													type="button"
													onClick={() => {
														const cfg = sandboxComponents.find(
															(c) => c.id === comment.componentId
														)
														if (cfg) {
															onSelectComponent(cfg.id, comment.file!)
														}
														onNavigateToCode(
															comment.file!,
															comment.lineNumber || 1
														)
														setIsCommentsModalOpen(false)
													}}
													title={`Jump to ${comment.file}:${comment.lineNumber || 1} in code viewer`}
													className="border-border bg-fill2/70 hover:bg-fill3 hover:border-primary/40 group flex w-full cursor-pointer items-center justify-between rounded-lg border px-2.5 py-1.5 text-left transition-colors">
													<div className="flex items-center gap-1.5 font-mono text-xs">
														<Code className="text-primary size-3.5" />
														<span className="text-fg group-hover:text-primary font-semibold">
															{comment.file}
															{comment.lineNumber && (
																<span className="text-primary font-bold">
																	:{comment.lineNumber}
																</span>
															)}
														</span>
													</div>
													<div className="text-primary flex items-center gap-1 text-[11px] font-semibold">
														<span>Go to line</span>
														<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
													</div>
												</button>
											)}

											{/* ALL DATA OF THE COMMENT TEXT */}
											<div className="border-border/50 border-t pt-2">
												<p className="text-fg text-xs leading-relaxed font-normal whitespace-pre-wrap select-text">
													{comment.content}
												</p>
											</div>

											{/* Switch to this component button if not currently active */}
											{comment.componentId !== activeComponent && (
												<div className="flex justify-end pt-1">
													<Button
														type="button"
														variant="outline"
														size="28"
														onClick={() => {
															const cfg = sandboxComponents.find(
																(c) => c.id === comment.componentId
															)
															if (cfg) {
																onSelectComponent(cfg.id, cfg.defaultFile)
															}
															setIsCommentsModalOpen(false)
														}}
														className="gap-1 text-xs">
														<span>Open {comment.componentId}</span>
														<ArrowRight className="size-3" />
													</Button>
												</div>
											)}
										</CardContent>
									</Card>
								)
							})
						)}
					</DialogBody>
				</DialogContent>
			</Dialog>
		</>
	)
}
