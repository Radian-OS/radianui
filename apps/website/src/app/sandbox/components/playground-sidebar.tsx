"use client"

import React, { useEffect, useState } from "react"
import {
	Blocks,
	BookOpen,
	Briefcase,
	Compass,
	CreditCard,
	Folder,
	HelpCircle,
	FileText,
	Layout,
	LogIn,
	Mail,
	MousePointerClick,
	Settings,
	Sparkles,
	Table2,
} from "lucide-react"
import { cn } from "@/lib/utils"
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
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import {
	type PreviewKey,
	type SandboxCategory,
	sandboxComponents,
} from "./types"

interface PlaygroundSidebarProps {
	activeComponent: PreviewKey
	onSelectComponent: (component: PreviewKey, defaultFile: string) => void
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

export function PlaygroundSidebar({
	activeComponent,
	onSelectComponent,
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

	// Auto-expand category if activeComponent changes and its category is closed
	useEffect(() => {
		if (activeCategory && !openCategories.includes(activeCategory)) {
			setOpenCategories((prev) => [...prev, activeCategory])
		}
	}, [activeCategory, openCategories])

	return (
		<Sidebar theme="gray" collapsible="icon">
			{/* Sidebar Header */}
			<SidebarHeader className="border-border bg-fill2 flex flex-col gap-1 border-b p-4 group-data-[state=collapsed]:items-center group-data-[state=collapsed]:p-4">
				<div className="flex items-center gap-2">
					<div className="bg-primary text-primary-fg shadow-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black shadow-md">
						R
					</div>
					<span className="font-semibold group-data-[state=collapsed]:hidden">
						Sandbox
					</span>
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
											</div>
										</AccordionTrigger>
										<AccordionContent className="px-0.5 pt-0.5 pb-1">
											<SidebarMenu className="space-y-0.5">
												{items.map((item) => {
													const isActive = activeComponent === item.id
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
	)
}
