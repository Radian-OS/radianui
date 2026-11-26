"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import RadianLogo from "@/registry/blocks-example/signup/components/radian-logo"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
} from "@/registry/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/registry/ui/card"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from "@/registry/ui/sidebar"

interface DashboardSidebarProps {
	activeNav: string
	onSelectNav: (nav: string) => void
}

interface NavItem {
	id: string
	label: string
	icon: React.ComponentProps<typeof IconSlot>["slot"]
}

interface NavGroup {
	label: string
	items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
	{
		label: "Main Menu",
		items: [
			{ id: "Dashboard", label: "Dashboard", icon: "home" },
			{ id: "Products", label: "Products", icon: "store" },
			{ id: "Transactions", label: "Transactions", icon: "card" },
			{ id: "Reports", label: "Reports & Analytics", icon: "file-text" },
			{ id: "Messages", label: "Messages", icon: "messages-square" },
			{ id: "Team", label: "Team Performance", icon: "badge-check" },
			{ id: "Campaigns", label: "Campaigns", icon: "megaphone" },
		],
	},
	{
		label: "Customers",
		items: [
			{ id: "CustomerList", label: "Customer List", icon: "users" },
			{ id: "Channels", label: "Channels", icon: "tv" },
			{
				id: "OrderManagement",
				label: "Order Management",
				icon: "shopping-bag",
			},
		],
	},
	{
		label: "Management",
		items: [
			{ id: "Roles", label: "Roles & Permissions", icon: "user" },
			{ id: "Billing", label: "Billing & Subscription", icon: "receipt" },
			{ id: "Integrations", label: "Integrations", icon: "blocks" },
		],
	},
	{
		label: "Settings",
		items: [
			{ id: "Support", label: "Customer Support", icon: "headset" },
			{ id: "Help", label: "Help Center", icon: "help-circle" },
			{ id: "Settings", label: "System Settings", icon: "setting" },
		],
	},
]

const WORKSPACES = [
	{
		id: "spark-pixel",
		name: "Spark Pixel Team",
		members: "14 members",
		avatar: null,
		fallback: "SP",
	},
	{
		id: "xavion",
		name: "Xavion Inc.",
		members: "51 members",
		avatar: "/media/xavion.png",
		fallback: "XV",
	},
	{
		id: "qubio",
		name: "Qubio Inc.",
		members: "Just you",
		avatar: "/media/qubio.png",
		fallback: "QB",
	},
] as const

const ACCOUNT_ITEMS: {
	id: string
	label: string
	icon: React.ComponentProps<typeof IconSlot>["slot"]
	shortcut: string | null
}[] = [
	{ id: "profile", label: "View Profile", icon: "user", shortcut: null },
	{ id: "settings", label: "Settings", icon: "setting", shortcut: "⌘+K" },
	{ id: "billing", label: "Billing", icon: "card", shortcut: null },
]

const ORG_ITEMS: {
	id: string
	label: string
	icon: React.ComponentProps<typeof IconSlot>["slot"]
}[] = [
	{ id: "company", label: "Company Profile", icon: "building" },
	{ id: "team", label: "Team", icon: "users" },
]

export function DashboardSidebar({
	activeNav,
	onSelectNav,
}: DashboardSidebarProps) {
	const [selectedWorkspace, setSelectedWorkspace] =
		React.useState("spark-pixel")
	const { isMobile, setOpen, setOpenMobile } = useSidebar()

	return (
		<Sidebar
			collapsible="offcanvas"
			className="bg-fill1 border-0 p-3 select-none"
			style={
				{
					"--color-sidebar": "var(--color-fill1)",
				} as React.CSSProperties
			}>
			{/* Top Brand Header Card */}
			<SidebarHeader className="p-0">
				<DropdownMenu indicatorPosition="right">
					<DropdownMenuTrigger asChild>
						<Card className="border-border/70 bg-elevation-level1 flex cursor-pointer flex-row items-center justify-between gap-0 p-2.5 shadow-2xs">
							<div className="flex min-w-0 items-center gap-2.5">
								<div className="flex size-8 shrink-0 items-center justify-center">
									<RadianLogo width={30} height={30} />
								</div>
								<div className="flex flex-col truncate text-left">
									<span className="text-fg-tertiary text-xs leading-tight font-medium">
										Agency
									</span>
									<span className="text-fg truncate text-sm leading-tight font-semibold">
										Spark Pixel Team
									</span>
								</div>
							</div>
							<span
								className="text-fg-secondary flex size-6 shrink-0 items-center justify-center rounded-sm"
								aria-hidden="true">
								<IconSlot slot="chevrons-up-down" className="size-3.5" />
							</span>
						</Card>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						sideOffset={4}
						className="w-60 sm:w-68">
						<DropdownMenuLabel className="text-xs uppercase">
							Switch Workspace
						</DropdownMenuLabel>
						<DropdownMenuRadioGroup
							value={selectedWorkspace}
							onValueChange={setSelectedWorkspace}>
							{WORKSPACES.map((workspace) => (
								<DropdownMenuRadioItem
									key={workspace.id}
									value={workspace.id}
									className="data-[state=checked]:bg-fill1-alpha py-2">
									{workspace.avatar ? (
										<Avatar size="sm" rounded="square" className="bg-fill2">
											<AvatarImage
												src={workspace.avatar}
												alt={workspace.name}
											/>
											<AvatarFallback className="text-xs">
												{workspace.fallback}
											</AvatarFallback>
										</Avatar>
									) : (
										<div className="flex size-8 shrink-0 items-center justify-center [&>svg]:size-8!">
											<RadianLogo width={32} height={32} />
										</div>
									)}
									<div className="flex flex-1 flex-col gap-0.5">
										<span className="text-sm font-medium">
											{workspace.name}
										</span>
										<span className="text-fg-secondary text-xs">
											{workspace.members}
										</span>
									</div>
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
						<DropdownMenuDivider />
						<DropdownMenuItem className="text-sm">
							<span className="border-border flex size-4 items-center justify-center rounded-sm border">
								<IconSlot slot="plus" className="size-3" />
							</span>
							Create workspace
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Mobile search moved out of cramped top header into sidebar menu */}
				<InputWrapper className="mt-2.5 w-full sm:hidden">
					<IconSlot slot="search" className="text-fg-tertiary size-4" />
					<Input type="search" placeholder="Search..." />
				</InputWrapper>
			</SidebarHeader>

			{/* Sidebar Navigation */}
			<SidebarContent className="[scrollbar-width:none] space-y-3 overflow-y-auto px-0 py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
				{NAV_GROUPS.map((group, idx) => (
					<React.Fragment key={group.label}>
						{idx > 0 && <SidebarSeparator className="mx-0" />}
						<SidebarGroup className="p-0">
							<SidebarGroupLabel className="text-fg-tertiary px-0 py-1 text-xs font-semibold">
								{group.label}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="gap-0.5">
									{group.items.map((item) => {
										const isActive = activeNav === item.id

										return (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton
													size="sm"
													isActive={isActive}
													onClick={() => {
														onSelectNav(item.id)
														if (isMobile) setOpenMobile(false)
														else if (window.innerWidth < 1024) setOpen(false)
													}}
													className={cn(
														"h-8.5 px-2.5 text-sm font-medium transition-colors",
														isActive ? "font-semibold" : "text-fg-secondary"
													)}>
													<IconSlot slot={item.icon} className="size-4" />
													<span>{item.label}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										)
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</React.Fragment>
				))}
			</SidebarContent>

			{/* Sidebar Footer User Profile */}
			<SidebarFooter className="p-0 pt-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Card className="border-border/70 bg-elevation-level1 flex cursor-pointer flex-row items-center justify-between gap-0 p-2.5 shadow-2xs">
							<div className="flex min-w-0 items-center gap-2.5">
								<Avatar
									size="sm"
									rounded="square"
									className="border-border/60 bg-fill2 shrink-0 border">
									<AvatarImage
										src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
										alt="Ari"
									/>
									<AvatarFallback className="text-xs font-semibold">
										AR
									</AvatarFallback>
									<AvatarIndicator className="bg-success ring-bg -right-0.5 -bottom-0.5 size-2 rounded-full ring-2" />
								</Avatar>
								<div className="flex flex-col truncate text-left">
									<span className="text-fg truncate text-sm leading-tight font-semibold">
										Ari
									</span>
									<span className="text-fg-secondary truncate text-xs leading-tight">
										Pro Plan
									</span>
								</div>
							</div>
							<span
								className="text-fg-secondary flex size-6 shrink-0 items-center justify-center rounded-sm"
								aria-hidden="true">
								<IconSlot slot="down" className="size-3.5" />
							</span>
						</Card>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align={isMobile ? "center" : "end"}
						side={isMobile ? "top" : "right"}
						sideOffset={8}
						className="w-60 sm:w-68">
						<div className="flex w-full items-center gap-2.5 p-2">
							<Avatar size="md" rounded="square" className="bg-fill2">
								<AvatarImage
									src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
									alt="Ari"
								/>
								<AvatarFallback className="text-xs">AR</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col">
								<span className="text-sm font-medium">Ari</span>
								<span className="text-fg-tertiary text-xs font-normal">
									ari@radian.com
								</span>
							</div>
							<Badge color="primary">PRO</Badge>
						</div>
						<DropdownMenuDivider />
						<DropdownMenuLabel className="text-xs uppercase">
							Account
						</DropdownMenuLabel>
						{ACCOUNT_ITEMS.map(({ id, label, icon, shortcut }) => (
							<DropdownMenuItem key={id} className="text-sm">
								<IconSlot slot={icon} className="size-4" />
								{label}
								{shortcut && (
									<DropdownMenuShortcut>
										<Badge
											variant="outline"
											color="neutral"
											className="text-xs">
											{shortcut}
										</Badge>
									</DropdownMenuShortcut>
								)}
							</DropdownMenuItem>
						))}
						<DropdownMenuDivider />
						<DropdownMenuLabel className="text-xs uppercase">
							Account
						</DropdownMenuLabel>
						{ORG_ITEMS.map(({ id, label, icon }) => (
							<DropdownMenuItem key={id} className="text-sm">
								<IconSlot slot={icon} className="size-4" />
								{label}
							</DropdownMenuItem>
						))}
						<DropdownMenuDivider />
						<DropdownMenuItem className="text-sm">
							<IconSlot slot="logout" className="size-4" />
							Log out
							<span className="text-fg-tertiary ml-auto text-xs">v2.3.16</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
