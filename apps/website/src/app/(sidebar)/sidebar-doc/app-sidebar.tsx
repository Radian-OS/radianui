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
	Info,
	Search,
	Settings,
	TvMinimal,
	Users2,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/ui/hover-card"
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
	useSidebar,
} from "@/registry/ui/sidebar"
import AcmeLogo from "./acme-logo"
import { InfoCard } from "./info-card"
import Logo from "./logo"
import MageLogo from "./mage-logo"
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
				icon: MageLogo,
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
	const { setOpen, state, isMobile } = useSidebar()
	const inputRef = React.useRef<HTMLInputElement>(null)
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
		<Sidebar collapsible="icon">
			<SidebarHeader className="p-0">
				<div className="flex items-center gap-2 px-2.5 py-2 pt-4">
					<Logo />
					<span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
						Debcon
					</span>
				</div>

				<div className="w-full px-3 py-2 group-data-[state=collapsed]:px-2">
					<InputWrapper
						className="group-data-[state=collapsed]:hidden"
						size="32">
						<Search className="text-fg-tertiary" />
						<Input ref={inputRef} type="search" placeholder="Search" />
						<Badge size="20" color="neutral" variant="outline">
							⌘ /
						</Badge>
					</InputWrapper>

					<IconButton
						onClick={() => {
							setOpen(true)
							setTimeout(() => {
								inputRef.current?.focus()
							}, 200)
						}}
						size="32"
						variant="outline"
						color="neutral"
						className="group-data-[mobile=true]:hidden group-data-[state=expanded]:hidden">
						<Search className="text-fg-tertiary" />
					</IconButton>
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

								if (state === "collapsed" && !isMobile) {
									return (
										<Dropdown
											open={openItem === item.label}
											onOpenChange={() => {}}
											modal={false}
											key={item.label}>
											<DropdownTrigger className="group/trigger w-full" asChild>
												<SidebarMenuButton
													onMouseEnter={() => openMenu(item.label)}
													onMouseLeave={closeMenu}
													onPointerDown={(e) => e.preventDefault()}>
													{item.icon && <item.icon />}
												</SidebarMenuButton>
											</DropdownTrigger>
											<DropdownContent
												onMouseEnter={() => openMenu(item.label)}
												onMouseLeave={closeMenu}
												side="right"
												className="w-60"
												align="center">
												{item.label && (
													<DropdownLabel>{item.label}</DropdownLabel>
												)}

												{item.subitems.map((subitem) => (
													<DropdownItem key={subitem.label}>
														<a href={subitem.href}>{subitem.label}</a>
													</DropdownItem>
												))}
											</DropdownContent>
										</Dropdown>
									)
								}

								return (
									<SidebarCollapsible key={item.label}>
										<SidebarMenuItem>
											<SidebarCollapsibleTrigger className="w-full" asChild>
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
				<div className="p-2 group-data-[mobile=true]:hidden group-data-[state=expanded]:hidden">
					<HoverCard>
						<HoverCardTrigger asChild>
							<IconButton size="32" variant="ghost" color="neutral">
								<Info className="text-fg-secondary" />
							</IconButton>
						</HoverCardTrigger>
						<HoverCardContent
							side="right"
							sideOffset={4}
							className="w-60 rounded-lg border-none p-0">
							<InfoCard className="p-0" />
						</HoverCardContent>
					</HoverCard>
				</div>

				<InfoCard className="group-data-[state=collapsed]:hidden" />

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
