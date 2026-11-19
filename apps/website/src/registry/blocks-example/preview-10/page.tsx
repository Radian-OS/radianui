"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import {
	PanelLeft,
	Search,
	Share2,
	SquarePen,
	Images,
	Clock,
	BookOpen,
	Blocks,
	LayoutGrid,
	Copy,
	Check,
	RotateCw,
	ThumbsUp,
	ThumbsDown,
	Volume2,
	MoreHorizontal,
	Paperclip,
	Globe,
	ChevronDown,
	ArrowUp,
	SlidersHorizontal,
	Plus,
	Pencil,
	Pin,
	Lock,
	Archive,
	Trash2,
	FolderInput,
	ChevronRight,
	Sparkles,
	Share,
	MessageSquare,
} from "lucide-react"

import { Button, IconButton } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/styles/default/ui/sidebar"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────
// Datasets & Helper Components
// ──────────────────────────────────────────────

function RadianLogo({ className = "size-[26px]" }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("shrink-0", className)}>
			<path
				d="M35.2 0H12.8C5.73075 0 0 5.73075 0 12.8V35.2C0 42.2692 5.73075 48 12.8 48H35.2C42.2692 48 48 42.2692 48 35.2V12.8C48 5.73075 42.2692 0 35.2 0Z"
				fill="var(--color-primary)"
			/>
			<path
				d="M41.5168 16.9408C41.8032 17.0048 41.7296 17.6544 41.5744 17.9024C41.3024 18.3328 40.3776 18.9408 38.4048 19.928C29.7776 23.9328 21.8896 26.7072 11.0432 29.6032C9.64159 29.9776 8.59999 30.072 7.82399 30.072C7.04799 30.072 5.68639 29.808 6.69119 29.1328C7.69599 28.4576 8.15039 28.192 8.47039 28.0048C12.3664 25.8368 12.1808 24.2832 13.5296 20.3104C15.4896 13.8592 23.1792 10.888 29.1872 13.6656C31.3696 14.64 32.7504 16.3664 35.0944 16.9536C36.4176 17.288 38.3152 17.2592 39.704 17.1136C40.256 17.12 40.968 16.8176 41.5152 16.9408H41.5168ZM20.3728 23.6928C22.7728 22.8336 25.6032 21.8848 27.608 21.1136C28.2272 20.8736 28.8048 20.6944 29.4448 20.3936C29.7264 20.2592 29.992 20.0544 30.28 19.7632C31.176 18.8 28.6704 17.3968 27.9504 17.0112C23.1024 14.4704 17.3808 17.688 16.712 23.0336C16.5936 24.16 17.0208 24.632 18.128 24.3856C18.896 24.2208 19.6832 23.9312 20.3584 23.696L20.3712 23.6912L20.3728 23.6928Z"
				fill="white"
			/>
			<path
				d="M34.6224 25.9056C35.0624 26.824 34.6752 27.968 34.3904 28.896C33.8496 30.4512 32.9232 31.8192 31.7088 32.92C31.1072 33.488 30.464 33.9856 29.7264 34.3792C26.7168 36.0592 22.712 36.0176 19.7424 34.2736C18.5168 33.5456 16.8512 32.4848 17.7968 30.8576C18.1488 30.3328 18.6544 29.7392 19.2912 29.816C19.7344 29.8768 20.112 30.344 20.4672 30.6368C21.3872 31.4272 22.4176 31.896 23.6928 32.136C25.6176 32.4784 27.68 31.9088 29.176 30.664C30.3568 29.6688 31.1504 28.32 31.4176 26.7792C31.5136 26.2496 31.5712 25.4976 32.0176 25.2048C32.7552 24.7424 34.1984 25.112 34.616 25.8928L34.6208 25.9024L34.6224 25.9056Z"
				fill="white"
			/>
		</svg>
	)
}

function CollapsedLogoTrigger() {
	const { toggleSidebar } = useSidebar()

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					onClick={toggleSidebar}
					aria-label="Toggle sidebar"
					className="group/logo text-fg-secondary hover:text-fg hover:bg-fill1 flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors">
					<span className="group-hover/logo:hidden">
						<RadianLogo className="size-[26px]" />
					</span>
					<span className="hidden group-hover/logo:flex group-hover/logo:items-center group-hover/logo:justify-center">
						<PanelLeft className="size-[18px]" />
					</span>
				</button>
			</TooltipTrigger>
			<TooltipContent side="right">Toggle sidebar</TooltipContent>
		</Tooltip>
	)
}

function ChatHeader({
	activeChatTitle,
	isPinned,
	onTogglePin,
}: {
	activeChatTitle: string
	isPinned: boolean
	onTogglePin: () => void
}) {
	return (
		<header className="bg-bg/80 flex h-14 shrink-0 items-center justify-between px-4 backdrop-blur-md">
			<div className="flex items-center gap-1.5">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="text-fg hover:bg-fill1 data-[state=open]:bg-fill1 flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-semibold outline-hidden transition-colors">
							<span>{activeChatTitle}</span>
							<ChevronDown className="text-fg-tertiary size-4" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="border-border/80 w-56 rounded-2xl border p-1.5 shadow-lg">
						<DropdownMenuItem className="cursor-pointer gap-2.5 rounded-lg px-3 py-2 text-[14px]">
							<Pencil className="text-fg-secondary size-4 shrink-0" />
							<span>Rename</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={onTogglePin}
							className="cursor-pointer gap-2.5 rounded-lg px-3 py-2 text-[14px]">
							<Pin
								className={cn(
									"size-4 shrink-0",
									isPinned ? "text-primary fill-current" : "text-fg-secondary"
								)}
							/>
							<span>{isPinned ? "Unpin chat" : "Pin chat"}</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer gap-2.5 rounded-lg px-3 py-2 text-[14px]">
							<Lock className="text-fg-secondary size-4 shrink-0" />
							<span>Lock chat</span>
						</DropdownMenuItem>
						<DropdownMenuDivider />
						<DropdownMenuItem className="cursor-pointer gap-2.5 rounded-lg px-3 py-2 text-[14px]">
							<Archive className="text-fg-secondary size-4 shrink-0" />
							<span>Archive</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="text-error focus:text-error focus:bg-error/10 cursor-pointer gap-2.5 rounded-lg px-3 py-2 text-[14px]">
							<Trash2 className="text-error size-4 shrink-0" />
							<span>Delete</span>
						</DropdownMenuItem>
						<DropdownMenuDivider />
						<DropdownMenuItem className="cursor-pointer justify-between gap-2.5 rounded-lg px-3 py-2 text-[14px]">
							<div className="flex items-center gap-2.5">
								<FolderInput className="text-fg-secondary size-4 shrink-0" />
								<span>Move to project</span>
							</div>
							<ChevronRight className="text-fg-tertiary size-4 shrink-0" />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Right section buttons (Image 2) */}
			<div className="flex items-center gap-1.5">
				<Button
					variant="ghost"
					color="neutral"
					size="sm"
					className="text-primary hover:text-primary hover:bg-fill1 cursor-pointer gap-1.5 rounded-lg px-2.5 py-1 text-sm font-medium">
					<Sparkles className="text-primary fill-primary/20 size-4" />
					<span>Upgrade</span>
				</Button>
				<IconButton
					variant="ghost"
					color="neutral"
					size="sm"
					aria-label="Share"
					className="text-fg-secondary hover:text-fg size-8 cursor-pointer rounded-lg">
					<Share className="size-4" />
				</IconButton>
			</div>
		</header>
	)
}

interface NavItem {
	id: string
	title: string
	icon: React.ComponentType<{ className?: string }>
}

const mainNavItems: NavItem[] = [
	{ id: "new-chat", title: "New chat", icon: SquarePen },
	{ id: "images", title: "Images", icon: Images },
	{ id: "scheduled", title: "Scheduled", icon: Clock },
	{ id: "library", title: "Library", icon: BookOpen },
	{ id: "plugins", title: "Plugins", icon: Blocks },
	{ id: "explore", title: "Explore", icon: LayoutGrid },
]

interface ChatItem {
	id: string
	title: string
}

const allChats: ChatItem[] = [
	{ id: "cat-behaviour", title: "Cat behaviour" },
	{ id: "design-slop", title: "Design Slop Replies" },
	{ id: "kpi-card-naming", title: "KPI Card Naming" },
	{ id: "mix-dashboard", title: "Mix Dashboard Designs" },
	{ id: "themer-preview", title: "Themer Preview Inspiration" },
	{ id: "pm-design-conflict", title: "PM Design Conflict Advice" },
	{ id: "reply-figma", title: "Reply to Figma Post" },
	{ id: "saas-growth", title: "SaaS Growth Strategies Q3" },
	{ id: "brand-architecture", title: "Brand Identity Architecture" },
	{ id: "react-19-server", title: "React 19 Server Actions Guide" },
	{ id: "design-tokens", title: "Design Tokens Migration Plan" },
	{ id: "customer-personas", title: "Customer Persona Matrix" },
	{ id: "quarterly-roadmap", title: "Quarterly Roadmap Summary" },
	{ id: "onboarding-flows", title: "Onboarding Flow Wireframes" },
	{ id: "tailwind-v4", title: "Tailwind v4 Variable Setup" },
	{ id: "multi-tenant-auth", title: "Multi-tenant Auth Workflows" },
	{ id: "perf-optimization", title: "Performance Optimization Tips" },
	{ id: "weekly-standup", title: "Weekly Standup Notes" },
	{ id: "competitive-matrix", title: "Competitive Analysis Matrix" },
]

interface Message {
	id: string
	role: "user" | "assistant"
	content: string
	liked?: boolean
	disliked?: boolean
}

const initialMessages: Message[] = [
	{
		id: "m-1",
		role: "user",
		content: "Why do cats act like they own the house?",
	},
	{
		id: "m-2",
		role: "assistant",
		content:
			"Because they genuinely believe they do. You're just the roommate who pays rent, buys groceries, and follows their very unreasonable demands. 😭",
	},
	{
		id: "m-3",
		role: "user",
		content: "So basically I'm the employee?",
	},
	{
		id: "m-4",
		role: "assistant",
		content:
			"Pretty much. Except your boss has no qualifications, sleeps 16 hours a day, and still expects room service. 😭",
	},
	{
		id: "m-5",
		role: "user",
		content: "That's actually embarrassing.",
	},
	{
		id: "m-6",
		role: "assistant",
		content:
			"The worst part? You'd still give them a raise in the form of better treats. 😭",
	},
	{
		id: "m-7",
		role: "user",
		content: "I love cats anyways",
	},
	{
		id: "m-8",
		role: "assistant",
		content:
			"And honestly, they know that too — which is why they get away with running the entire household.",
	},
]

const AVAILABLE_MODELS = [
	"GPT-5.4",
	"Claude 4.6 Opus",
	"Claude 4.6 Sonnet",
	"Gemini 3.1 Pro",
]

interface ChatSidebarProps {
	activeChat: string
	setActiveChat: (id: string) => void
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>
	pinnedChats: ChatItem[]
	recentChats: ChatItem[]
	handleTogglePin: (id: string) => void
}

function ChatSidebar({
	activeChat,
	setActiveChat,
	setMessages,
	pinnedChats,
	recentChats,
	handleTogglePin,
}: ChatSidebarProps) {
	const { state } = useSidebar()
	const isCollapsed = state === "collapsed"

	return (
		<Sidebar
			variant="sidebar"
			collapsible="icon"
			className="border-border/60 bg-bg overflow-hidden border-r transition-[width] duration-300 ease-in-out [&>[data-slot=sidebar-container]]:transition-[width] [&>[data-slot=sidebar-container]]:duration-300 [&>[data-slot=sidebar-container]]:ease-in-out [&>[data-slot=sidebar-gap]]:transition-[width] [&>[data-slot=sidebar-gap]]:duration-300 [&>[data-slot=sidebar-gap]]:ease-in-out">
			{/* Top Branding & Search / Toggle Actions */}
			<SidebarHeader className="relative h-14 overflow-hidden p-3 group-data-[collapsible=icon]:p-2">
				<AnimatePresence mode="wait" initial={false}>
					{isCollapsed ? (
						<motion.div
							key="collapsed-header"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: "easeInOut" }}
							className="flex h-full w-full items-center justify-center">
							<CollapsedLogoTrigger />
						</motion.div>
					) : (
						<motion.div
							key="expanded-header"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: "easeInOut" }}
							className="flex h-full w-full items-center justify-between">
							<div className="flex items-center gap-2 px-1">
								<RadianLogo />
								<span className="font-heading text-fg text-base font-semibold tracking-tight">
									Radian
								</span>
							</div>
							<div className="flex items-center gap-1">
								<IconButton
									variant="ghost"
									color="neutral"
									size="xs"
									className="text-fg-secondary hover:text-fg size-7 cursor-pointer"
									aria-label="Search chats">
									<Search className="size-4" />
								</IconButton>
								<SidebarTrigger className="text-fg-secondary hover:text-fg size-7 cursor-pointer" />
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</SidebarHeader>

			<SidebarContent className="no-scrollbar overflow-hidden px-2 py-3">
				<AnimatePresence mode="wait" initial={false}>
					{isCollapsed ? (
						<motion.div
							key="collapsed-rail"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: "easeInOut" }}>
							<SidebarGroup className="p-0">
								<SidebarMenu className="items-center gap-1">
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="New chat"
											onClick={() => {
												setActiveChat("new")
												setMessages([])
											}}
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<SquarePen className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Search"
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<Search className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Chats"
											isActive={activeChat !== "new"}
											onClick={() => setActiveChat("cat-behaviour")}
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<MessageSquare className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Images"
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<Images className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Scheduled"
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<Clock className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Library"
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<BookOpen className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Plugins"
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<Blocks className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="md"
											tooltip="Explore"
											className="size-9 justify-center [&>svg]:size-[18px]!">
											<LayoutGrid className="size-[18px]" />
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroup>
						</motion.div>
					) : (
						<motion.div
							key="expanded-menu"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: "easeInOut" }}>
							{/* Actions List */}
							<SidebarGroup className="p-0">
								<SidebarMenu className="gap-1">
									<SidebarMenuItem>
										<SidebarMenuButton
											size="sm"
											onClick={() => {
												setActiveChat("new")
												setMessages([])
											}}
											className="h-8.5 rounded-lg text-[14px]">
											<SquarePen className="size-4" />
											<span>New chat</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="sm"
											className="h-8.5 rounded-lg text-[14px]">
											<Images className="size-4" />
											<span>Images</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="sm"
											className="h-8.5 rounded-lg text-[14px]">
											<Clock className="size-4" />
											<span>Scheduled</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="sm"
											className="h-8.5 rounded-lg text-[14px]">
											<BookOpen className="size-4" />
											<span>Library</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="sm"
											className="h-8.5 rounded-lg text-[14px]">
											<Blocks className="size-4" />
											<span>Plugins</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											size="sm"
											className="h-8.5 rounded-lg text-[14px]">
											<LayoutGrid className="size-4" />
											<span>Explore</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroup>

							{/* Projects Section */}
							<SidebarGroup className="p-0 pt-4">
								<SidebarGroupLabel className="text-fg-secondary text-[14px] font-medium">
									Projects
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<div className="text-fg-tertiary px-2 py-1 text-[14px]">
										No projects
									</div>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Pinned Section */}
							{pinnedChats.length > 0 && (
								<SidebarGroup className="p-0 pt-3">
									<SidebarGroupLabel className="text-fg-secondary text-[14px] font-medium">
										Pinned
									</SidebarGroupLabel>
									<SidebarGroupContent>
										<SidebarMenu className="gap-0.5">
											{pinnedChats.map((chat) => {
												const isActive = activeChat === chat.id
												return (
													<SidebarMenuItem
														key={chat.id}
														className="group/chat-item relative">
														<SidebarMenuButton
															size="sm"
															isActive={isActive}
															onClick={() => setActiveChat(chat.id)}
															className={cn(
																"h-8.5 w-full rounded-lg pr-14 text-[14px] font-normal transition-colors",
																isActive &&
																	"bg-fill2 dark:bg-elevation-level2 font-medium"
															)}>
															<Pin className="text-primary size-3.5 shrink-0 fill-current" />
															<span className="truncate">{chat.title}</span>
														</SidebarMenuButton>
														<div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover/chat-item:opacity-100">
															<Tooltip>
																<TooltipTrigger asChild>
																	<IconButton
																		variant="ghost"
																		color="neutral"
																		size="xs"
																		onClick={(e) => {
																			e.stopPropagation()
																			handleTogglePin(chat.id)
																		}}
																		className="text-fg-secondary hover:text-fg size-7 cursor-pointer rounded-md"
																		aria-label="Unpin chat">
																		<Pin className="text-primary size-3.5 fill-current" />
																	</IconButton>
																</TooltipTrigger>
																<TooltipContent
																	side="top"
																	sideOffset={4}
																	className="bg-fg text-bg dark:bg-elevation-level3 dark:text-fg rounded-full border-0 px-2.5 py-1 text-xs font-medium shadow-md">
																	Unpin chat
																</TooltipContent>
															</Tooltip>
															<IconButton
																variant="ghost"
																color="neutral"
																size="xs"
																className="text-fg-secondary hover:text-fg size-7 cursor-pointer rounded-md"
																aria-label="More options">
																<MoreHorizontal className="size-3.5" />
															</IconButton>
														</div>
													</SidebarMenuItem>
												)
											})}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							)}

							{/* Recents Section */}
							<SidebarGroup className="p-0 pt-3">
								<SidebarGroupLabel className="text-fg-secondary text-[14px] font-medium">
									Recents
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu className="gap-0.5">
										{recentChats.map((chat) => {
											const isActive = activeChat === chat.id
											return (
												<SidebarMenuItem
													key={chat.id}
													className="group/chat-item relative">
													<SidebarMenuButton
														size="sm"
														isActive={isActive}
														onClick={() => setActiveChat(chat.id)}
														className={cn(
															"h-8.5 w-full rounded-lg pr-14 text-[14px] font-normal transition-colors",
															isActive &&
																"bg-fill2 dark:bg-elevation-level2 font-medium"
														)}>
														<span className="truncate">{chat.title}</span>
													</SidebarMenuButton>
													<div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover/chat-item:opacity-100">
														<Tooltip>
															<TooltipTrigger asChild>
																<IconButton
																	variant="ghost"
																	color="neutral"
																	size="xs"
																	onClick={(e) => {
																		e.stopPropagation()
																		handleTogglePin(chat.id)
																	}}
																	className="text-fg-secondary hover:text-fg size-7 cursor-pointer rounded-md"
																	aria-label="Pin chat">
																	<Pin className="size-3.5" />
																</IconButton>
															</TooltipTrigger>
															<TooltipContent
																side="top"
																sideOffset={4}
																className="bg-fg text-bg dark:bg-elevation-level3 dark:text-fg rounded-full border-0 px-2.5 py-1 text-xs font-medium shadow-md">
																Pin chat
															</TooltipContent>
														</Tooltip>
														<IconButton
															variant="ghost"
															color="neutral"
															size="xs"
															className="text-fg-secondary hover:text-fg size-7 cursor-pointer rounded-md"
															aria-label="More options">
															<MoreHorizontal className="size-3.5" />
														</IconButton>
													</div>
												</SidebarMenuItem>
											)
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</motion.div>
					)}
				</AnimatePresence>
			</SidebarContent>

			{/* Sidebar Footer with Alex Morgan Profile */}
			<SidebarFooter className="border-border/40 overflow-hidden border-t p-3 group-data-[collapsible=icon]:p-2">
				<AnimatePresence mode="wait" initial={false}>
					{isCollapsed ? (
						<motion.div
							key="collapsed-footer"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: "easeInOut" }}
							className="flex items-center justify-center">
							<Tooltip>
								<TooltipTrigger asChild>
									<Avatar
										size="sm"
										rounded="circle"
										className="border-border shrink-0 cursor-pointer border">
										<AvatarImage
											src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
											alt="Alex Morgan"
										/>
										<AvatarFallback className="text-xs font-semibold">
											AM
										</AvatarFallback>
									</Avatar>
								</TooltipTrigger>
								<TooltipContent side="right">Alex Morgan (Free)</TooltipContent>
							</Tooltip>
						</motion.div>
					) : (
						<motion.div
							key="expanded-footer"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15, ease: "easeInOut" }}
							className="flex items-center justify-between gap-2">
							<div className="flex min-w-0 items-center gap-2.5 px-1">
								<Avatar
									size="sm"
									rounded="circle"
									className="border-border shrink-0 cursor-pointer border">
									<AvatarImage
										src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
										alt="Alex Morgan"
									/>
									<AvatarFallback className="text-xs font-semibold">
										AM
									</AvatarFallback>
								</Avatar>
								<div className="flex min-w-0 flex-col">
									<span className="text-fg truncate text-sm font-semibold">
										Alex Morgan
									</span>
									<span className="text-fg-tertiary text-xs">Free</span>
								</div>
							</div>
							<Button
								variant="outline"
								color="neutral"
								size="xs"
								className="shrink-0 rounded-full px-3 text-xs font-medium">
								Upgrade
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</SidebarFooter>
		</Sidebar>
	)
}

export default function Page() {
	const [activeChat, setActiveChat] = useState<string>("cat-behaviour")
	const [pinnedIds, setPinnedIds] = useState<string[]>([])
	const [messages, setMessages] = useState<Message[]>(initialMessages)
	const [inputPrompt, setInputPrompt] = useState("")
	const [copiedId, setCopiedId] = useState<string | null>(null)
	const [activeModel, setActiveModel] = useState<string>("GPT-5.4")
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleCopy = (id: string, text: string) => {
		navigator.clipboard.writeText(text)
		setCopiedId(id)
		setTimeout(() => setCopiedId(null), 2000)
	}

	const handleLike = (id: string) => {
		setMessages((prev) =>
			prev.map((msg) =>
				msg.id === id ? { ...msg, liked: !msg.liked, disliked: false } : msg
			)
		)
	}

	const handleDislike = (id: string) => {
		setMessages((prev) =>
			prev.map((msg) =>
				msg.id === id ? { ...msg, disliked: !msg.disliked, liked: false } : msg
			)
		)
	}

	const handleSendMessage = () => {
		if (!inputPrompt.trim()) return

		const newMsg: Message = {
			id: `m-${Date.now()}`,
			role: "user",
			content: inputPrompt.trim(),
		}

		setMessages((prev) => [...prev, newMsg])
		setInputPrompt("")

		// Simulate responsive assistant reply
		setTimeout(() => {
			const replyMsg: Message = {
				id: `m-${Date.now() + 1}`,
				role: "assistant",
				content:
					"They know you do! It is an unconditional contract: they provide purrs and judge your life decisions, and you provide snacks.",
			}
			setMessages((prev) => [...prev, replyMsg])
		}, 800)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	const handleTogglePin = (id: string) => {
		setPinnedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	const pinnedChats = allChats.filter((c) => pinnedIds.includes(c.id))
	const recentChats = allChats.filter((c) => !pinnedIds.includes(c.id))
	const activeChatTitle =
		allChats.find((c) => c.id === activeChat)?.title || "Cat behaviour"
	const isCurrentChatPinned = pinnedIds.includes(activeChat)

	return (
		<SidebarProvider className="bg-bg text-fg h-screen w-full overflow-hidden">
			{/* ══════════════════════════════════════════════
          1. RADIAN SIDEBAR NAVIGATION
      ══════════════════════════════════════════════ */}
			<ChatSidebar
				activeChat={activeChat}
				setActiveChat={setActiveChat}
				setMessages={setMessages}
				pinnedChats={pinnedChats}
				recentChats={recentChats}
				handleTogglePin={handleTogglePin}
			/>

			{/* ══════════════════════════════════════════════
          2. MAIN CHAT AREA
      ══════════════════════════════════════════════ */}
			<SidebarInset className="bg-bg flex h-screen flex-1 flex-col overflow-hidden">
				<ChatHeader
					activeChatTitle={activeChatTitle}
					isPinned={isCurrentChatPinned}
					onTogglePin={() => handleTogglePin(activeChat)}
				/>

				{/* Scrollable Conversation Stream */}
				<div className="no-scrollbar flex-1 overflow-y-auto py-6">
					<div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4">
						{messages.map((msg) => {
							const isUser = msg.role === "user"

							if (isUser) {
								return (
									<div
										key={msg.id}
										className="group/user-msg flex flex-col items-end gap-1">
										<div className="bg-fill2 dark:bg-elevation-level2 text-fg max-w-[85%] rounded-2xl px-5 py-2.5 text-[14px] leading-relaxed break-words shadow-2xs sm:max-w-xl">
											{msg.content}
										</div>
										{/* Action Icons Row for User Message */}
										<div className="text-fg-tertiary flex items-center justify-end gap-0.5 pt-0.5 opacity-0 transition-opacity group-hover/user-msg:opacity-100">
											<IconButton
												variant="ghost"
												color="neutral"
												size="xs"
												onClick={() => handleCopy(msg.id, msg.content)}
												className="hover:text-fg size-7 cursor-pointer rounded-lg"
												aria-label="Copy message">
												{copiedId === msg.id ? (
													<Check className="text-success size-3.5" />
												) : (
													<Copy className="size-3.5" />
												)}
											</IconButton>
											<IconButton
												variant="ghost"
												color="neutral"
												size="xs"
												className="hover:text-fg size-7 cursor-pointer rounded-lg"
												aria-label="Share message">
												<Share className="size-3.5" />
											</IconButton>
											<IconButton
												variant="ghost"
												color="neutral"
												size="xs"
												className="hover:text-fg size-7 cursor-pointer rounded-lg"
												aria-label="Edit message">
												<Pencil className="size-3.5" />
											</IconButton>
										</div>
									</div>
								)
							}

							return (
								<div
									key={msg.id}
									className="flex max-w-[95%] flex-col items-start gap-2 sm:max-w-2xl">
									<div className="text-fg text-[14px] leading-relaxed break-words">
										{msg.content}
									</div>

									{/* Action Icons Row */}
									<div className="text-fg-tertiary flex flex-wrap items-center gap-0.5 pt-0.5">
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											onClick={() => handleCopy(msg.id, msg.content)}
											className="hover:text-fg size-7 rounded-lg"
											aria-label="Copy response">
											{copiedId === msg.id ? (
												<Check className="text-success size-3.5" />
											) : (
												<Copy className="size-3.5" />
											)}
										</IconButton>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											onClick={() => {
												handleSendMessage()
											}}
											className="hover:text-fg size-7 rounded-lg"
											aria-label="Regenerate">
											<RotateCw className="size-3.5" />
										</IconButton>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											onClick={() => handleLike(msg.id)}
											className={cn(
												"hover:text-fg size-7 rounded-lg",
												msg.liked && "text-primary"
											)}
											aria-label="Good response">
											<ThumbsUp className="size-3.5" />
										</IconButton>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											onClick={() => handleDislike(msg.id)}
											className={cn(
												"hover:text-fg size-7 rounded-lg",
												msg.disliked && "text-error"
											)}
											aria-label="Bad response">
											<ThumbsDown className="size-3.5" />
										</IconButton>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											onClick={() => {
												if ("speechSynthesis" in window) {
													const utterance = new SpeechSynthesisUtterance(
														msg.content
													)
													window.speechSynthesis.speak(utterance)
												}
											}}
											className="hover:text-fg size-7 rounded-lg"
											aria-label="Read aloud">
											<Volume2 className="size-3.5" />
										</IconButton>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											className="hover:text-fg size-7 rounded-lg"
											aria-label="Share response">
											<Share className="size-3.5" />
										</IconButton>
										<IconButton
											variant="ghost"
											color="neutral"
											size="xs"
											className="hover:text-fg size-7 rounded-lg"
											aria-label="More options">
											<MoreHorizontal className="size-3.5" />
										</IconButton>
									</div>
								</div>
							)
						})}
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* ══════════════════════════════════════════════
            3. FLOATING PROMPT INPUT CONTAINER
        ══════════════════════════════════════════════ */}
				<div className="mx-auto w-full max-w-3xl px-4 pb-4">
					<div className="border-border/80 bg-elevation-level1 focus-within:border-primary/60 focus-within:ring-primary/20 relative flex flex-col rounded-2xl border p-3 shadow-xs transition-all focus-within:ring-2">
						<textarea
							value={inputPrompt}
							onChange={(e) => setInputPrompt(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="What do you want to know?"
							rows={1}
							data-gramm="false"
							data-enable-grammarly="false"
							data-sider="false"
							data-monica="false"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck={false}
							className="placeholder:text-fg-tertiary text-fg max-h-36 min-h-[40px] w-full resize-none bg-transparent px-2 text-[14px] outline-none"
						/>
						<div className="flex items-center justify-between pt-2">
							<div className="flex items-center gap-1.5">
								<IconButton
									variant="ghost"
									color="neutral"
									size="sm"
									className="text-fg-secondary hover:text-fg size-8 rounded-full"
									aria-label="Attach file">
									<Paperclip className="size-4" />
								</IconButton>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											color="neutral"
											size="xs"
											className="border-border/70 bg-fill1/40 hover:bg-fill2 data-[state=open]:bg-fill2 text-fg cursor-pointer gap-1.5 rounded-full px-3 text-xs font-medium">
											<Globe className="text-fg-secondary size-3.5" />
											<span>{activeModel}</span>
											<ChevronDown className="text-fg-tertiary size-3 transition-transform duration-200 data-[state=open]:rotate-180" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side="top"
										align="start"
										sideOffset={8}
										className="border-border/80 bg-elevation-level1 w-52 rounded-2xl border p-1.5 shadow-lg">
										{AVAILABLE_MODELS.map((model) => {
											const isSelected = activeModel === model
											return (
												<DropdownMenuItem
													key={model}
													onClick={() => setActiveModel(model)}
													className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-[14px]">
													<span>{model}</span>
													{isSelected && (
														<Check className="text-fg size-4 shrink-0" />
													)}
												</DropdownMenuItem>
											)
										})}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							<IconButton
								variant="strong"
								color="primary"
								size="sm"
								disabled={!inputPrompt.trim()}
								onClick={handleSendMessage}
								className="size-8 rounded-full shadow-2xs disabled:opacity-40"
								aria-label="Send message">
								<ArrowUp className="size-4" />
							</IconButton>
						</div>
					</div>
					<p className="text-fg-tertiary pt-2 text-center text-xs">
						AI can make mistakes. Check important info.
					</p>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
