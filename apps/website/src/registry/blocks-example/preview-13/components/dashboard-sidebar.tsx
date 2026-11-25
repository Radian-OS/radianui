"use client"

import * as React from "react"
import {
	Building2,
	CreditCard,
	LogOut,
	Plus,
	Settings,
	User,
	Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import RadianLogo from "@/registry/blocks-example/signup/components/radian-logo"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Card } from "@/registry/ui/card"
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
		id: "debcon",
		name: "Debcon Inc.",
		members: "14 members",
		avatar: "/media/debcon.png",
		fallback: "DC",
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

const ACCOUNT_ITEMS = [
	{ id: "profile", label: "View Profile", icon: User, shortcut: null },
	{ id: "settings", label: "Settings", icon: Settings, shortcut: "⌘+K" },
	{ id: "billing", label: "Billing", icon: CreditCard, shortcut: null },
] as const

const ORG_ITEMS = [
	{ id: "company", label: "Company Profile", icon: Building2 },
	{ id: "team", label: "Team", icon: Users },
] as const

export function DashboardSidebar({
	activeNav,
	onSelectNav,
}: DashboardSidebarProps) {
	const [selectedWorkspace, setSelectedWorkspace] = React.useState("debcon")

	return (
		<Sidebar
			collapsible="none"
			className="bg-fill1 sticky top-0 flex h-screen w-60 shrink-0 flex-col justify-between border-0 p-3 select-none"
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
									<span className="font-heading text-fg truncate text-sm leading-tight font-semibold">
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
						align="center"
						sideOffset={4}
						className="w-[var(--radix-dropdown-menu-trigger-width)]">
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
									<Avatar size="sm" rounded="square">
										<AvatarImage src={workspace.avatar} alt={workspace.name} />
										<AvatarFallback className="text-xs">
											{workspace.fallback}
										</AvatarFallback>
									</Avatar>
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
								<Plus className="size-3" />
							</span>
							Create workspace
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarHeader>

			{/* Sidebar Navigation */}
			<SidebarContent className="[scrollbar-width:none] space-y-4 overflow-y-auto px-0 py-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
				{NAV_GROUPS.map((group) => (
					<SidebarGroup key={group.label} className="p-0">
						<SidebarGroupLabel className="font-heading text-fg-tertiary px-2.5 py-1 text-xs font-semibold">
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
												onClick={() => onSelectNav(item.id)}
												className={cn(
													"h-8.5 px-2.5 text-sm font-medium transition-colors",
													isActive
														? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary [&>svg]:text-primary font-semibold"
														: "text-fg-secondary hover:text-fg"
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
									className="border-border/60 shrink-0 border">
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
									<span className="font-heading text-fg truncate text-sm leading-tight font-semibold">
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
						align="center"
						side="top"
						sideOffset={4}
						className="w-[var(--radix-dropdown-menu-trigger-width)]">
						<div className="flex w-full items-center gap-2.5 p-2">
							<Avatar size="md" rounded="square">
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
							<Badge variant="soft" color="primary" size="sm">
								PRO
							</Badge>
						</div>
						<DropdownMenuDivider />
						<DropdownMenuLabel className="text-xs uppercase">
							Account
						</DropdownMenuLabel>
						{ACCOUNT_ITEMS.map(({ id, label, icon: Icon, shortcut }) => (
							<DropdownMenuItem key={id} className="text-sm">
								<Icon className="size-4" />
								{label}
								{shortcut && (
									<DropdownMenuShortcut>
										<Badge
											size="sm"
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
						{ORG_ITEMS.map(({ id, label, icon: Icon }) => (
							<DropdownMenuItem key={id} className="text-sm">
								<Icon className="size-4" />
								{label}
							</DropdownMenuItem>
						))}
						<DropdownMenuDivider />
						<DropdownMenuItem className="text-sm">
							<LogOut className="size-4" />
							Log out
							<span className="text-fg-tertiary ml-auto text-xs">v2.3.16</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
