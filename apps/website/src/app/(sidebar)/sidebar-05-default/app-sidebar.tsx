"use client"

import React from "react"
import {
	Briefcase,
	ClockFading,
	Cog,
	Contact,
	GitBranch,
	Headphones,
	Home,
	Info,
	LucideIcon,
	MessagesSquare,
	Repeat,
	Search,
	SquareCheck,
	Users2,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/ui/hover-card"
import { Input, InputWrapper } from "@/registry/ui/input"
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
	SidebarMenuButtonProps,
	SidebarMenuItem,
	SidebarProps,
	SidebarSeparator,
	useSidebar,
} from "@/registry/ui/sidebar"
import { InfoCard } from "./info-card"
import Logo from "./logo"
import LogoFull from "./logo-full"
import { SidebarFooterUser } from "./sidebar-footer-user"

interface SidebarItem {
	title: string | null
	icon: LucideIcon
	href: string
	isActive?: boolean
}

const data: { title: string | null; items: SidebarItem[] }[] = [
	{
		title: null,
		items: [
			{
				title: "Home",
				icon: Home,
				href: "#",
			},
			{
				title: "Activity",
				icon: ClockFading,
				href: "#",
				isActive: true,
			},
			{
				title: "Messages",
				icon: MessagesSquare,
				href: "#",
			},
			{
				title: "Your tasks",
				icon: SquareCheck,
				href: "#",
			},
		],
	},
	{
		title: "SALES",
		items: [
			{
				title: "Pipeline",
				icon: GitBranch,
				href: "#",
			},
			{
				title: "Follow ups",
				icon: Repeat,
				href: "#",
			},
			{
				title: "Team",
				icon: Users2,
				href: "#",
			},
		],
	},
	{
		title: "ACCOUNTS",
		items: [
			{
				title: "Deals",
				icon: Briefcase,
				href: "#",
			},
			{
				title: "Contacts",
				icon: Contact,
				href: "#",
			},
		],
	},
]

const footerData: SidebarItem[] = [
	{
		title: "Support Center",
		icon: Headphones,
		href: "#",
	},
	{
		title: "Settings",
		icon: Cog,
		href: "#",
	},
]

interface AppSidebarProps {
	menuButtonVariant?: SidebarMenuButtonProps["variant"]
	theme?: SidebarProps["theme"]
}

export function AppSidebar({
	menuButtonVariant = "neutral",
	theme = "white-on-grey",
}: AppSidebarProps) {
	const { isMobile, setOpen } = useSidebar()
	const inputRef = React.useRef<HTMLInputElement>(null)

	return (
		<Sidebar variant="sidebar" theme={theme} collapsible="icon" className="p-0">
			<SidebarHeader className="gap-0 p-0">
				<div className="group-data-[state=collapsed]:px-4.5 p-4">
					<LogoFull className="shrink-0 group-data-[state=collapsed]:hidden" />
					{!isMobile && (
						<Logo className="shrink-0 group-data-[state=expanded]:hidden" />
					)}
				</div>

				<div className="w-full px-3 py-2 group-data-[state=collapsed]:px-3.5">
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
			<SidebarContent className="gap-0">
				{data.map((section) => (
					<React.Fragment key={section.title}>
						<SidebarGroup>
							{section.title && (
								<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
							)}
							<SidebarGroupContent>
								<SidebarMenu>
									{section.items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												tooltip={item.title!}
												variant={menuButtonVariant}
												isActive={item.isActive}>
												{item.icon && <item.icon />}
												<Link href={item.href}>{item.title}</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</React.Fragment>
				))}
			</SidebarContent>
			<SidebarFooter className="gap-0 p-0">
				<div className="p-3.5 group-data-[mobile=true]:hidden group-data-[state=expanded]:hidden">
					<HoverCard>
						<HoverCardTrigger asChild>
							<IconButton size="32" variant="ghost" color="neutral">
								<Info className="text-fg-secondary" />
							</IconButton>
						</HoverCardTrigger>
						<HoverCardContent
							side="right"
							sideOffset={4}
							className="w-auto rounded-lg border-none p-0">
							<InfoCard className="p-0" />
						</HoverCardContent>
					</HoverCard>
				</div>

				<InfoCard className="group-data-[state=collapsed]:hidden" />

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{footerData.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title!}
										variant={menuButtonVariant}>
										{item.icon && <item.icon />}
										<Link href={item.href}>{item.title}</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator />

				<SidebarFooterUser />
			</SidebarFooter>
		</Sidebar>
	)
}
