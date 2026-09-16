"use client"

import React, { ComponentType } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
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
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "@/registry/ui/sidebar"
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
	icon: React.ComponentType<{ className?: string }> | React.ReactNode
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
				icon: <IconSlot slot="box" />,
				href: "#",
			},
			{
				label: "Inbox",
				icon: <IconSlot slot="inbox" />,
				href: "#",
				isActive: true,
				badge: 4,
			},
			{
				label: "Calendar",
				icon: <IconSlot slot="calendar" />,
				href: "#",
			},
			{
				label: "Analytics",
				icon: <IconSlot slot="file-box" />,
				href: "#",
			},
		],
	},
	{
		title: "Extension",
		items: [
			{
				label: "Subscribers",
				icon: <IconSlot slot="users" />,
				href: "#",
			},
			{
				label: "Reports",
				icon: <IconSlot slot="clipboard-check" />,
				href: "#",
			},
			{
				label: "Integrations",
				icon: <IconSlot slot="box" />,
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
				icon: <IconSlot slot="headset" />,
				href: "#",
			},
			{
				label: "Settings",
				icon: <IconSlot slot="setting" />,
				href: "#",
			},
		],
	},
]

export function AppSidebar() {
	const { setOpen, state, isMobile } = useSidebar()
	const inputRef = React.useRef<HTMLInputElement>(null)
	// For opening dropdown on hover
	const [hoverOpen, setHoverOpen] = React.useState(false)
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
		<Sidebar className="px-0" collapsible="icon" variant="inset">
			<SidebarHeader className="p-0">
				<div className="group/header relative flex items-center gap-2 px-2.5 pt-4 pb-2 group-data-[state=expanded]:pr-3 group-data-[state=expanded]:pl-5">
					<div className="z-0 group-data-[state=collapsed]:px-2 group-data-[state=collapsed]:py-1 group-hover/header:group-data-[state=collapsed]:opacity-0">
						<Logo />
					</div>
					<span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
						Debcon
					</span>
					<SidebarTrigger
						size="32"
						className="z-10 ml-auto group-hover/header:opacity-100! group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:top-4 group-data-[collapsible=icon]:left-4 group-data-[collapsible=icon]:ml-0 group-data-[state=collapsed]:opacity-0"
					/>
				</div>

				<div className="w-full px-3 py-2">
					<InputWrapper
						className="group-data-[state=collapsed]:hidden"
						size="36">
						<IconSlot slot="search" className="text-fg-tertiary" />
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
						<IconSlot slot="search" className="text-fg-tertiary" />
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
													{item.icon &&
														(React.isValidElement(item.icon)
															? item.icon
															: // item.icon may be a component type
																(() => {
																	const C = item.icon as ComponentType<{
																		className?: string
																	}>
																	return <C className="size-5" />
																})())}
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
										<DropdownMenu
											open={openItem === item.label}
											onOpenChange={() => {}}
											modal={false}
											key={item.label}>
											<DropdownMenuTrigger
												className="group/trigger w-full"
												asChild>
												<SidebarMenuButton
													onMouseEnter={() => openMenu(item.label)}
													onMouseLeave={closeMenu}
													onPointerDown={(e) => e.preventDefault()}>
													{item.icon &&
														(React.isValidElement(item.icon)
															? item.icon
															: (() => {
																	const C = item.icon as ComponentType<{
																		className?: string
																	}>
																	return <C />
																})())}
												</SidebarMenuButton>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												onMouseEnter={() => openMenu(item.label)}
												onMouseLeave={closeMenu}
												side="right"
												className="w-60"
												align="center">
												{item.label && (
													<DropdownMenuLabel>{item.label}</DropdownMenuLabel>
												)}

												{item.subitems.map((subitem) => (
													<DropdownMenuItem
														key={subitem.label}
														className="[&_svg]:size-5!"
														asChild>
														<a href={subitem.href}>
															<subitem.icon />
															{subitem.label}
														</a>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									)
								}

								return (
									<SidebarCollapsible key={item.label}>
										<SidebarMenuItem>
											<SidebarCollapsibleTrigger className="w-full" asChild>
												<SidebarMenuButton tooltip={item.label}>
													{item.icon &&
														(React.isValidElement(item.icon)
															? item.icon
															: null)}
													<span>{item.label}</span>
													<IconSlot
														slot="down"
														className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
													/>
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
										<span className="text-[13px] leading-5 font-medium">
											Version 1.2 Update
										</span>
										<span className="text-fg-tertiary flex cursor-pointer items-center truncate text-xs font-normal">
											<span>Learn More</span>
											<IconSlot slot="right" className="size-4" />
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
											<SidebarMenuButton tooltip={item.label}>
												{item.icon &&
													(React.isValidElement(item.icon) ? (
														item.icon
													) : typeof item.icon === "function" ? (
														<item.icon />
													) : null)}
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
