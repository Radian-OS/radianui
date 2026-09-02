"use client"

import React, { ComponentType } from "react"
import {
	Box,
	Calendar,
	ChevronDown,
	ClipboardList,
	FileChartColumn,
	Headset,
	Inbox,
	Search,
	Settings,
	TvMinimal,
	Users2,
} from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Input, InputWrapper } from "@/styles/default/ui/input"
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
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarSeparator,
} from "@/styles/default/ui/sidebar"
import { InfoCardExpanded } from "./info-card-expanded"
import {
	AcmeLogo,
	DiscordLogo,
	DriveLogo,
	Logo,
	MageLogo,
	NotionLogo,
	RadianCoreLogo,
} from "./logos"
import { SidebarFooterUser } from "./sidebar-footer-user"

interface SubItem {
	label: string
	href: string
	icon: ComponentType<{ className?: string }>
}

interface NavItem {
	label: string
	icon: ComponentType<{ className?: string }>
	href?: string
	subitems?: SubItem[]
	isActive?: boolean
	badge?: React.ReactNode
}

interface NavGroup {
	title: string | null
	items: NavItem[]
}

const mainData: NavGroup[] = [
	{
		title: null,
		items: [
			{
				label: "Home",
				icon: TvMinimal,
				href: "#",
			},
			{
				label: "Inbox",
				icon: Inbox,
				href: "#",
				isActive: true,
				badge: 4,
			},
			{
				label: "Calendar",
				icon: Calendar,
				href: "#",
			},
			{
				label: "Analytics",
				icon: FileChartColumn,
				href: "#",
			},
		],
	},
	{
		title: "Extension",
		items: [
			{
				label: "Subscribers",
				icon: Users2,
				href: "#",
			},
			{
				label: "Reports",
				icon: ClipboardList,
				href: "#",
			},
			{
				label: "Integrations",
				icon: Box,
				subitems: [
					{
						label: "Notion",
						icon: NotionLogo,
						href: "#",
					},
					{
						label: "Google Drive",
						icon: DriveLogo,
						href: "#",
					},
					{
						label: "Discord",
						icon: DiscordLogo,
						href: "#",
					},
				],
			},
		],
	},
	{
		title: "Projects",
		items: [
			{
				icon: MageLogo,
				label: "Mage Icons",
				href: "#",
			},
			{
				icon: AcmeLogo,
				label: "Acme Inc",
				href: "#",
			},
			{
				icon: RadianCoreLogo,
				label: "Radian Core",
				href: "#",
			},
		],
	},
]

const footerData: NavGroup[] = [
	{
		title: null,
		items: [
			{
				label: "Help Center",
				icon: Headset,
				href: "#",
			},
			{
				label: "Settings",
				icon: Settings,
				href: "#",
			},
		],
	},
]

export function AppSidebar() {
	return (
		<Sidebar
			variant="sidebar"
			collapsible="offcanvas"
			resizable
			minWidth={250}
			maxWidth={500}>
			<SidebarHeader className="p-0">
				<div className="group/header relative flex items-center gap-2 px-2.5 pt-4 pb-2 pl-5">
					<div>
						<Logo />
					</div>
					<span className="truncate font-semibold">Debcon</span>
				</div>

				<div className="w-full px-3 py-2">
					<InputWrapper size="36">
						<Search className="text-fg-tertiary" />
						<Input type="search" placeholder="Search" />
						<Badge size="20" color="neutral" variant="outline">
							⌘ /
						</Badge>
					</InputWrapper>
				</div>
			</SidebarHeader>
			<SidebarContent>
				{mainData.map((section, idx) => (
					<SidebarGroup key={idx}>
						{section.title && (
							<SidebarGroupLabel className="uppercase">
								{section.title}
							</SidebarGroupLabel>
						)}
						<SidebarMenu>
							{section.items.map((item) => {
								if (!item.subitems) {
									return (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton
												size="32"
												isActive={item.isActive}
												tooltip={item.label}
												asChild>
												<a href={item.href}>
													{item.icon && <item.icon className="size-5" />}
													<span>{item.label}</span>
													{item.badge && (
														<SidebarMenuBadge
															variant="outline"
															color="neutral"
															className="bg-bg!">
															{item.badge}
														</SidebarMenuBadge>
													)}
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								}

								return (
									<SidebarCollapsible key={item.label}>
										<SidebarMenuItem>
											<SidebarCollapsibleTrigger className="w-full" asChild>
												<SidebarMenuButton tooltip={item.label}>
													{item.icon && <item.icon />}
													<span>{item.label}</span>
													<ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
												</SidebarMenuButton>
											</SidebarCollapsibleTrigger>
											<SidebarCollapsibleContent>
												<SidebarMenuSub>
													{item.subitems.map((subitem) => (
														<SidebarMenuSubItem key={subitem.label}>
															<SidebarMenuButton asChild>
																<a href={subitem.href}>
																	<subitem.icon />
																	{subitem.label}
																</a>
															</SidebarMenuButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</SidebarCollapsibleContent>
										</SidebarMenuItem>
									</SidebarCollapsible>
								)
							})}
						</SidebarMenu>
					</SidebarGroup>
				))}

				<InfoCardExpanded />

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{footerData.map((section, idx) => (
								<React.Fragment key={idx}>
									{section.title && (
										<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
									)}

									{section.items.map((item) => (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton tooltip={item.label}>
												{item.icon && <item.icon />}
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</React.Fragment>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="gap-0 p-0">
				<SidebarSeparator className="w-full" />

				<SidebarFooterUser />
			</SidebarFooter>
		</Sidebar>
	)
}
