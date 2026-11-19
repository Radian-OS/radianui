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
} from "lucide-react"

import { Button, IconButton } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
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
} from "@/styles/default/ui/sidebar"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────
// Datasets
// ──────────────────────────────────────────────

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

interface RecentChat {
	id: string
	title: string
}

const recentChats: RecentChat[] = [
	{ id: "cat-behaviour", title: "Cat behaviour" },
	{ id: "design-slop", title: "Design Slop Replies" },
	{ id: "kpi-naming", title: "KPI Card Naming" },
	{ id: "mix-dashboard", title: "Mix Dashboard Designs" },
	{ id: "themer-preview", title: "Themer Preview Inspiration" },
	{ id: "pm-design-conflict", title: "PM Design Conflict Advice" },
	{ id: "reply-figma", title: "Reply to Figma Post" },
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
]

export default function Page() {
	const [activeChat, setActiveChat] = useState<string>("cat-behaviour")
	const [messages, setMessages] = useState<Message[]>(initialMessages)
	const [inputPrompt, setInputPrompt] = useState("")
	const [copiedId, setCopiedId] = useState<string | null>(null)
	const [activeModel, setActiveModel] = useState("OPT-5.4")
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

	return (
		<SidebarProvider className="bg-bg text-fg h-screen w-full overflow-hidden">
			{/* ══════════════════════════════════════════════
          1. CHATGPT SIDEBAR NAVIGATION
      ══════════════════════════════════════════════ */}
			<Sidebar variant="sidebar" className="border-border/60 bg-bg border-r">
				{/* Top Branding & Search / Toggle Actions */}
				<SidebarHeader className="border-border/40 flex flex-row items-center justify-between border-b p-3">
					<h2 className="heading-6 text-fg px-1 font-semibold tracking-tight">
						ChatGPT
					</h2>
					<div className="flex items-center gap-1">
						<IconButton
							variant="ghost"
							color="neutral"
							size="xs"
							className="text-fg-secondary hover:text-fg size-7"
							aria-label="Search chats">
							<Search className="size-4" />
						</IconButton>
						<SidebarTrigger className="text-fg-secondary hover:text-fg size-7" />
					</div>
				</SidebarHeader>

				<SidebarContent className="no-scrollbar px-2 py-3">
					{/* Primary Menu Items */}
					<SidebarGroup className="p-0">
						<SidebarMenu className="gap-0.5">
							{mainNavItems.map((item) => {
								const Icon = item.icon
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											size="md"
											className="text-sidebar-fg gap-2.5 font-medium">
											<Icon className="size-4 shrink-0" />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroup>

					{/* Projects Group */}
					<SidebarGroup className="p-0 pt-4">
						<SidebarGroupLabel className="text-fg-tertiary px-2 text-xs font-medium">
							Projects
						</SidebarGroupLabel>
						<SidebarGroupContent className="px-2 py-1">
							<span className="text-fg-tertiary text-xs">No projects</span>
						</SidebarGroupContent>
					</SidebarGroup>

					{/* Recents Group */}
					<SidebarGroup className="p-0 pt-4">
						<SidebarGroupLabel className="text-fg-tertiary px-2 text-xs font-medium">
							Recents
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="gap-0.5">
								{recentChats.map((chat) => {
									const isActive = activeChat === chat.id
									return (
										<SidebarMenuItem key={chat.id}>
											<SidebarMenuButton
												size="md"
												isActive={isActive}
												onClick={() => setActiveChat(chat.id)}
												className="text-sidebar-fg truncate font-medium">
												<span className="truncate">{chat.title}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				{/* Sidebar Footer with Simran Singh Profile */}
				<SidebarFooter className="border-border/40 border-t p-3">
					<div className="flex items-center justify-between gap-2">
						<div className="flex min-w-0 items-center gap-2.5">
							<Avatar
								size="sm"
								rounded="circle"
								className="border-border shrink-0 border">
								<AvatarImage
									src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/8.png"
									alt="Simran Singh"
								/>
								<AvatarFallback className="text-xs font-semibold">
									SS
								</AvatarFallback>
							</Avatar>
							<div className="flex min-w-0 flex-col">
								<span className="text-fg truncate text-sm font-semibold">
									Simran Singh
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
					</div>
				</SidebarFooter>
			</Sidebar>

			{/* ══════════════════════════════════════════════
          2. MAIN CHAT AREA
      ══════════════════════════════════════════════ */}
			<SidebarInset className="bg-bg flex h-screen flex-1 flex-col overflow-hidden">
				{/* Top Header Bar */}
				<header className="border-border/40 bg-bg/80 flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-md">
					<div className="flex items-center gap-2">
						<SidebarTrigger className="text-fg-secondary hover:text-fg" />
						<div className="flex items-center gap-1.5">
							<button
								type="button"
								className="text-fg hover:bg-fill1 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-base font-semibold transition-colors">
								<span>Cat behaviour</span>
								<ChevronDown className="text-fg-tertiary size-4" />
							</button>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<IconButton
							variant="ghost"
							color="neutral"
							size="sm"
							aria-label="Search conversation">
							<Search className="size-4" />
						</IconButton>
						<Button
							variant="strong"
							color="primary"
							size="sm"
							className="gap-1.5 rounded-xl px-3.5 text-xs font-semibold shadow-xs">
							<Share2 className="size-3.5" />
							<span>Share</span>
						</Button>
					</div>
				</header>

				{/* Scrollable Conversation Stream */}
				<div className="no-scrollbar flex-1 overflow-y-auto px-4 py-6">
					<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
						{messages.map((msg) => {
							const isUser = msg.role === "user"

							if (isUser) {
								return (
									<div key={msg.id} className="flex justify-end">
										<div className="bg-fill2 dark:bg-elevation-level2 text-fg max-w-[85%] rounded-3xl rounded-tr-md px-4.5 py-2.5 text-[15px] leading-relaxed break-words shadow-2xs sm:max-w-xl">
											{msg.content}
										</div>
									</div>
								)
							}

							return (
								<div
									key={msg.id}
									className="flex max-w-[95%] flex-col items-start gap-2 sm:max-w-2xl">
									<div className="text-fg text-[15px] leading-relaxed break-words">
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
											<Share2 className="size-3.5" />
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
					<div className="border-border/80 bg-elevation-level1 focus-within:border-primary/60 focus-within:ring-primary/20 relative flex flex-col rounded-3xl border p-3 shadow-xs transition-all focus-within:ring-2">
						<textarea
							value={inputPrompt}
							onChange={(e) => setInputPrompt(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="What do you want to know?"
							rows={1}
							className="placeholder:text-fg-tertiary text-fg max-h-36 min-h-[40px] w-full resize-none bg-transparent px-2 text-[15px] outline-none"
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
								<Button
									variant="outline"
									color="neutral"
									size="xs"
									onClick={() =>
										setActiveModel(
											activeModel === "OPT-5.4" ? "GPT-4o" : "OPT-5.4"
										)
									}
									className="border-border/70 bg-fill1/40 hover:bg-fill2 text-fg gap-1.5 rounded-full px-3 text-xs font-medium">
									<Globe className="text-fg-secondary size-3.5" />
									<span>{activeModel}</span>
									<ChevronDown className="text-fg-tertiary size-3" />
								</Button>
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
