"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
	Briefcase,
	FileText,
	Folder,
	HelpCircle,
	MessageSquareQuote,
	Settings,
	Sparkles,
	Table,
	Tag,
	UserPlus,
	Zap,
	Layout,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/registry/ui/scroll-area"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
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
	useSidebar,
} from "@/styles/default/ui/sidebar"
import {
	type PreviewKey,
	type SandboxCategory,
	type SandboxComment,
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

interface SidebarCategoryDef {
	id: SandboxCategory
	label: string
	icon: React.ComponentType<{ className?: string }>
}

const SIDEBAR_CATEGORIES: SidebarCategoryDef[] = [
	{ id: "welcome-screen-section", label: "SIGNUP", icon: UserPlus },
	{ id: "sign-in-section", label: "SIGN IN", icon: UserPlus },
	{ id: "hero-section", label: "HERO", icon: Sparkles },
	{ id: "pricing-section", label: "PRICING", icon: Tag },
	{ id: "cta-section", label: "CTA", icon: Zap },
	{ id: "blog-section", label: "BLOG", icon: FileText },
	{ id: "faq-section", label: "FAQ", icon: HelpCircle },
	{ id: "testimonial-section", label: "TESTIMONIAL", icon: MessageSquareQuote },
	{ id: "portfolio-section", label: "PORTFOLIO", icon: Briefcase },
	{ id: "table-section", label: "TABLE", icon: Table },
	{ id: "setting-section", label: "SETTINGS", icon: Settings },
	{ id: "full-page", label: "FULL PAGE", icon: Layout },
	{ id: "other-sections", label: "OTHER", icon: Folder },
]

export function PlaygroundSidebar({
	activeComponent,
	onSelectComponent,
	comments = [],
}: PlaygroundSidebarProps) {
	const { state } = useSidebar()
	const isCollapsed = state === "collapsed"

	const activeCategory =
		sandboxComponents.find((c) => c.id === activeComponent)?.category ||
		"welcome-screen-section"

	const [openCategories, setOpenCategories] = useState<string[]>(
		activeCategory ? [activeCategory] : []
	)

	const pendingComments = comments.filter(
		(c) => !c.resolved && c.status !== "resolved"
	)

	const prevActiveRef = useRef(activeComponent)
	useEffect(() => {
		if (prevActiveRef.current !== activeComponent) {
			prevActiveRef.current = activeComponent
			if (activeCategory && !openCategories.includes(activeCategory)) {
				setOpenCategories((prev) => [...prev, activeCategory])
			}
		}
	}, [activeComponent, activeCategory, openCategories])

	return (
		<Sidebar
			theme="gray"
			collapsible="icon"
			className="border-soft bg-bg border-r">
			{/* Sidebar Header with logo.svg */}
			<SidebarHeader className="border-soft flex h-14 shrink-0 flex-row! items-center gap-3 border-b px-4 py-3">
				<Image
					src="/logo.svg"
					alt="Logo"
					width={28}
					height={28}
					className="size-7 shrink-0 rounded-lg shadow-xs"
				/>
				{!isCollapsed && (
					<span className="text-fg truncate text-base font-medium tracking-tight">
						UI Blocks Sandbox
					</span>
				)}
			</SidebarHeader>

			{/* Sidebar Accordion Categories */}
			<SidebarContent className="flex-1 overflow-hidden">
				<ScrollArea className="h-full px-2 py-3">
					<SidebarGroup className="p-0">
						<SidebarGroupContent>
							<Accordion
								type="multiple"
								value={openCategories}
								onValueChange={setOpenCategories}
								variant="open"
								// indicator="none"
								size="sm"
								className="w-full space-y-1">
								{SIDEBAR_CATEGORIES.map((category, catIndex) => {
									const items = sandboxComponents.filter(
										(item) => item.category === category.id
									)
									if (items.length === 0) return null

									const catPendingCount = pendingComments.filter((c) =>
										items.some((item) => item.id === c.componentId)
									).length
									const CategoryIcon = category.icon

									return (
										<React.Fragment key={category.id}>
											{catIndex > 0 && !isCollapsed && (
												<div className="border-soft my-1 border-t border-dashed" />
											)}
											<AccordionItem
												value={category.id}
												className="border-none">
												<AccordionTrigger
													className={cn(
														"text-fg-secondary flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-xs font-semibold tracking-wider uppercase transition-colors hover:no-underline [&_svg]:-order-1",
														isCollapsed && "justify-center px-0 py-1.5"
													)}>
													{isCollapsed ? (
														<div
															className="text-fg-secondary relative flex size-8 items-center justify-center rounded-lg"
															title={category.label}>
															<CategoryIcon className="size-4 shrink-0" />
															<span className="bg-primary absolute top-1 right-1 size-2 rounded-full ring-2" />
														</div>
													) : (
														<>
															<div className="flex min-w-0 items-center gap-1.5">
																<span>{category.label}</span>
															</div>
															<span className="bg-bg text-fg-secondary ml-auto rounded px-1.5 py-0.5 text-xs font-medium normal-case">
																{catPendingCount}
															</span>
														</>
													)}
												</AccordionTrigger>

												{!isCollapsed && (
													<AccordionContent className="px-0 pt-0.5 pb-1">
														<SidebarMenu className="space-y-0.5">
															{items.map((item) => {
																const isActive = activeComponent === item.id
																const itemPendingCount = pendingComments.filter(
																	(c) => c.componentId === item.id
																).length

																return (
																	<SidebarMenuItem
																		key={item.id}
																		className="relative">
																		<SidebarMenuButton
																			isActive={isActive}
																			variant="neutral"
																			onClick={() =>
																				onSelectComponent(
																					item.id,
																					item.defaultFile
																				)
																			}
																			className={cn(
																				"flex w-full cursor-pointer items-center justify-between rounded-lg py-1.5 pr-3 pl-7 text-xs font-medium transition-all",
																				isActive
																					? "bg-fill1-alpha text-primary-text hover:text-primary-text font-semibold"
																					: "text-fg-secondary hover:bg-fill1-alpha"
																			)}>
																			<span className="truncate">
																				{item.label}
																			</span>
																		</SidebarMenuButton>

																		{itemPendingCount > 0 && (
																			<SidebarMenuBadge
																				className={cn(
																					"bg-bg pointer-events-none rounded px-1.5 py-0.5 text-xs font-medium transition-all",
																					isActive
																						? "text-primary-text"
																						: "text-fg-secondary"
																				)}>
																				{itemPendingCount}
																			</SidebarMenuBadge>
																		)}
																	</SidebarMenuItem>
																)
															})}
														</SidebarMenu>
													</AccordionContent>
												)}
											</AccordionItem>
										</React.Fragment>
									)
								})}
							</Accordion>
						</SidebarGroupContent>
					</SidebarGroup>
				</ScrollArea>
			</SidebarContent>
		</Sidebar>
	)
}
