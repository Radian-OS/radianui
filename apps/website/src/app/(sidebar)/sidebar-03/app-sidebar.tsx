"use client"

import React from "react"
import {
	ChevronDown,
	ChevronRight,
	Ellipsis,
	FolderClosed,
	Search,
	SquarePen,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { CompactButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	Sidebar,
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarSeparator,
} from "@/registry/ui/sidebar"
import { AiTools } from "./ai-tools"
import Logo from "./logo"
import { SidebarFooterUser } from "./sidebar-footer-user"

const data = [
	{
		title: "Projects",
		items: [
			{
				title: "Design Resources",
				icon: FolderClosed,
				items: [
					{
						title: "Figma",
						href: "#",
					},
					{
						title: "Framer",
						href: "#",
					},
					{
						title: "Webflow",
						href: "#",
					},
				],
			},
			{
				title: "Tech Stuff",
				icon: FolderClosed,
				items: [
					{
						title: "LG 27 Monitor",
						href: "#",
					},
					{
						title: "Keychron K2",
						href: "#",
					},
					{
						title: "Sony WH-1000XM5",
						href: "#",
					},
				],
			},
			{
				title: "Design Feedback",
				icon: FolderClosed,
				items: [{ title: "Designer Reviews", href: "#" }],
			},
		],
	},
]

const chatData = [
	{
		title: "Previous Chats",
		items: [
			{
				title: "Introduction: User Experience",
				href: "#",
			},
			{
				title: "Design thinking Fundamentals",
				href: "#",
			},
			{
				title: "Collaboration Tools",
				href: "#",
			},
			{
				title: "Using Templates to Save Time",
				href: "#",
			},
			{
				title: "Sharing Content with Users",
				href: "#",
			},
			{
				title: "Tools and Resources",
				href: "#",
			},
		],
	},
]

export function AppSidebar() {
	const [openItem, setOpenItem] = React.useState<string | null>(null)
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

	const openMenu = (title: string) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setOpenItem(title)
	}

	const closeMenu = () => {
		timeoutRef.current = setTimeout(() => {
			setOpenItem(null)
		}, 150)
	}

	return (
		<Sidebar theme="white-on-grey" variant="floating" collapsible="icon">
			<SidebarHeader className="gap-0 p-0">
				<div className="flex justify-between gap-1 p-4 group-data-[state=collapsed]:px-3">
					<div className="flex items-center gap-2">
						<Logo />
						<span className="text-lg font-semibold group-data-[state=collapsed]:hidden">
							Solara
						</span>
					</div>
					<div className="text-fg-secondary flex gap-0.5 group-data-[state=collapsed]:hidden">
						<CompactButton variant="ghost" color="neutral" size="24">
							<SquarePen className="size-4" />
						</CompactButton>
					</div>
				</div>

				<div className="w-full px-3 py-2 group-data-[state=collapsed]:hidden">
					<InputWrapper className="w-full">
						<Search className="text-fg-tertiary size-5" />
						<Input type="search" placeholder="Search" />
						<Badge size="20" color="neutral" variant="outline">
							⌘ /
						</Badge>
					</InputWrapper>
				</div>
			</SidebarHeader>
			<SidebarContent className="px-2">
				<SidebarGroup className="p-0">
					<SidebarMenu>
						<SidebarCollapsible defaultOpen>
							<SidebarGroupLabel asChild>
								<SidebarCollapsibleTrigger>
									<ChevronDown />
									<span>AI Tools</span>
								</SidebarCollapsibleTrigger>
							</SidebarGroupLabel>
							<SidebarCollapsibleContent>
								<SidebarMenuSub>
									<AiTools />
								</SidebarMenuSub>
							</SidebarCollapsibleContent>
						</SidebarCollapsible>
					</SidebarMenu>

					<SidebarMenu className="group-data-[mobile=true]:hidden group-data-[state=expanded]:hidden">
						<AiTools />
					</SidebarMenu>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup className="p-0">
					{data.map((section) => (
						<SidebarCollapsible key={section.title} defaultOpen>
							<SidebarGroupLabel asChild>
								<SidebarCollapsibleTrigger className="group/trigger flex w-full items-center justify-between">
									{section.title}
									<ChevronRight className="size-4 transition-transform group-data-[state=open]/trigger:rotate-90" />
								</SidebarCollapsibleTrigger>
							</SidebarGroupLabel>
							<SidebarCollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{section.items.map((subsection) => (
											<SidebarCollapsible
												key={subsection.title}
												defaultOpen
												className="group-data-[state=collapsed]:hidden">
												<SidebarCollapsibleTrigger
													asChild
													className="group/trigger w-full">
													<SidebarMenuButton>
														{subsection.icon && (
															<subsection.icon className="size-5" />
														)}
														{subsection.title}

														<ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/trigger:rotate-90" />
													</SidebarMenuButton>
												</SidebarCollapsibleTrigger>
												<SidebarCollapsibleContent className="pl-4">
													<SidebarMenuSub className="">
														{subsection.items.map((item) => (
															<SidebarMenuItem key={item.title}>
																<SidebarMenuButton
																	className="font-normal"
																	asChild>
																	<Link href={item.href}>{item.title}</Link>
																</SidebarMenuButton>
															</SidebarMenuItem>
														))}
													</SidebarMenuSub>
												</SidebarCollapsibleContent>
											</SidebarCollapsible>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarCollapsibleContent>
						</SidebarCollapsible>
					))}

					<SidebarMenu className="group-data-[mobile=true]:hidden group-data-[state=expanded]:hidden">
						{data.map((section) =>
							section.items.map((subsection) => (
								<Dropdown
									open={openItem === subsection.title}
									key={subsection.title}>
									<DropdownTrigger asChild>
										<SidebarMenuButton
											onMouseEnter={() => openMenu(subsection.title)}
											onMouseLeave={closeMenu}
											onPointerDown={(e) => e.preventDefault()}>
											{subsection.icon && (
												<subsection.icon className="size-5" />
											)}
										</SidebarMenuButton>
									</DropdownTrigger>
									<DropdownContent
										onMouseEnter={() => openMenu(subsection.title)}
										onMouseLeave={closeMenu}
										className="w-60"
										side="right"
										align="center">
										<DropdownLabel>{subsection.title}</DropdownLabel>
										{subsection.items.map((item) => (
											<DropdownItem key={item.title} asChild>
												<Link href={item.href}>{item.title}</Link>
											</DropdownItem>
										))}
									</DropdownContent>
								</Dropdown>
							))
						)}
					</SidebarMenu>
				</SidebarGroup>
				{chatData.map((section) => (
					<SidebarGroup className="p-0" key={section.title}>
						<SidebarGroupLabel className="items-center justify-between">
							{section.title}
							<CompactButton size="20" variant="ghost" color="neutral">
								<Ellipsis />
							</CompactButton>
						</SidebarGroupLabel>
						<SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
							<SidebarMenu>
								{section.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton className="font-normal">
											<Link href={item.href}>{item.title}</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter>
				<SidebarFooterUser />
			</SidebarFooter>
		</Sidebar>
	)
}
