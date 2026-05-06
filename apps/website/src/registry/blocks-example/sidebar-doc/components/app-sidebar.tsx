"use client"

import React, { ComponentType } from "react"
import {
	Box,
	Calendar,
	ChevronDown,
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
import { Badge } from "@/styles/default/ui/badge"
import { IconButton } from "@/styles/default/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/styles/default/ui/hover-card"
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
	SidebarTrigger,
	useSidebar,
} from "@/styles/default/ui/sidebar"
import { InfoCard } from "./info-card"
import {
	AcmeLogo,
	CircleLogo,
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
	const { setOpen, state, isMobile } = useSidebar()
	const inputRef = React.useRef<HTMLInputElement>(null)
	// For opening dropdown on hover
	const [openItem, setOpenItem] = React.useState<string | null>(null)
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
	const [hoverOpen, setHoverOpen] = React.useState(false)

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
				<div className="group/header relative flex items-center gap-2 px-2.5 pb-2 pt-4 group-data-[state=expanded]:pl-5 group-data-[state=expanded]:pr-3">
					<div className="z-0 group-data-[state=collapsed]:px-2 group-data-[state=collapsed]:py-1 group-hover/header:group-data-[state=collapsed]:opacity-0">
						<Logo />
					</div>
					<span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
						Debcon
					</span>
					<SidebarTrigger
						size="32"
						className="group-hover/header:opacity-100! z-10 ml-auto group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:left-4 group-data-[collapsible=icon]:top-4 group-data-[collapsible=icon]:ml-0 group-data-[state=collapsed]:opacity-0"
					/>
				</div>

				<div className="w-full px-3 py-2">
					<InputWrapper
						className="group-data-[state=collapsed]:hidden"
						size="36">
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
						size="36"
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
													<DropdownItem
														key={subitem.label}
														className="[&_svg]:size-5!"
														asChild>
														<a href={subitem.href}>
															<subitem.icon />
															{subitem.label}
														</a>
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

				<div className="mt-auto p-2 px-3 pb-1.5 group-data-[state=collapsed]:px-3.5">
					<HoverCard
						open={state === "expanded" ? false : hoverOpen}
						onOpenChange={setHoverOpen}>
						<HoverCardTrigger asChild>
							<SidebarMenuButton
								className="bg-elevation-level2! h-auto border px-2.5 py-1.5 group-data-[state=expanded]:cursor-default"
								asChild>
								<div>
									<CircleLogo />
									<div className="flex flex-col">
										<span className="text-[13px] font-medium leading-5">
											Version 1.2 Update
										</span>
										<span className="text-fg-tertiary flex cursor-pointer items-center truncate text-xs font-normal">
											<span>Learn More</span>
											<ChevronRight className="size-4" />
										</span>
									</div>
								</div>
							</SidebarMenuButton>
						</HoverCardTrigger>
						<HoverCardContent
							side="right"
							align="end"
							sideOffset={4}
							className="w-60 rounded-xl p-2">
							<InfoCard />
						</HoverCardContent>
					</HoverCard>
				</div>

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
											<SidebarMenuButton tooltip={item.label} asChild>
												<a href={item.href}>
													{item.icon && <item.icon />}
													<span>{item.label}</span>
												</a>
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
