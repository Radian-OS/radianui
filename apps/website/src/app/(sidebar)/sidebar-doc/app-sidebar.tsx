"use client"

import React, { ComponentType } from "react"
import {
	Box,
	Calendar,
	ChevronRight,
	ClipboardList,
	FileChartColumn,
	Headset,
	Inbox,
	Search,
	Settings,
	TvMinimal,
	Users2,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
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
	SidebarMenuSubItem,
	SidebarRail,
	SidebarSeparator,
} from "@/registry/ui/sidebar"
import AcmeLogo from "./acme-logo"
import Logo from "./logo"
import RadianCoreLogo from "./radian-core-logo"
import { SidebarFooterUser } from "./sidebar-footer-user"

interface SubItem {
	label: string
	href: string
}

interface NavItem {
	label: string
	icon: ComponentType<{ className?: string }>
	href?: string
	subitems?: SubItem[]
	isActive?: boolean
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
						label: "Slack",
						href: "#",
					},
					{
						label: "Google Drive",
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
				icon: Box,
				label: "Mage Icons",
			},
			{
				icon: AcmeLogo,
				label: "Acme Inc",
			},
			{
				icon: RadianCoreLogo,
				label: "Radian Core",
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
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="flex items-center gap-2 px-1.5 py-1">
					<Logo />
					<span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
						Debcon
					</span>
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
												isActive={item.isActive}
												variant="soft"
												tooltip={item.label}>
												{item.icon && <item.icon />}
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								}

								return (
									<SidebarCollapsible key={item.label}>
										<SidebarMenuItem>
											<SidebarCollapsibleTrigger className="w-full">
												<SidebarMenuButton tooltip={item.label}>
													{item.icon && <item.icon />}
													<span>{item.label}</span>
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</SidebarMenuButton>
											</SidebarCollapsibleTrigger>
											<SidebarCollapsibleContent>
												<SidebarMenuSub>
													{item.subitems.map((subitem) => (
														<SidebarMenuSubItem key={subitem.label}>
															<SidebarMenuButton asChild>
																<Link href={subitem.href}>{subitem.label}</Link>
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
			</SidebarContent>

			<SidebarFooter className="gap-0 p-0">
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

				<SidebarSeparator />

				<SidebarFooterUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
