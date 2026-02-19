"use client"

import { ArrowRight, Briefcase, ClockFading, Cog, Contact, GitBranch, Headphones, Home, LucideIcon, MessagesSquare, Repeat, Search, SquareCheck, Users2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Progress } from "@/registry/ui/progress"
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
} from "@/registry/ui/sidebar"
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

export function AppSidebar({ menuButtonVariant = "neutral", theme = "neutral-white" }: AppSidebarProps) {
	return (
		<Sidebar variant="inset" theme={theme} collapsible="icon" className="p-0">
			<SidebarHeader className="gap-0 p-0">
				<div className="p-4 group-data-[state=collapsed]:pl-6">
					<LogoFull className="shrink-0 group-data-[state='collapsed']:hidden" />
					<Logo className="shrink-0 group-data-[state='expanded']:hidden" />
				</div>

				<div className="w-full px-3 py-2 group-data-[state='collapsed']:hidden">
					<InputWrapper className="w-full">
						<Search className="text-fg-tertiary size-5" />
						<Input type="search" placeholder="Search" />
						<Badge size="20" color="neutral" variant="outline">
							⌘ /
						</Badge>
					</InputWrapper>
				</div>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{data.map((section) => (
					<SidebarGroup key={section.title}>
						{section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
						<SidebarGroupContent>
							<SidebarMenu className="group-data-[state=collapsed]:items-center group-data-[state=collapsed]:pl-1">
								{section.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton tooltip={item.title!} variant={menuButtonVariant} isActive={item.isActive}>
											{item.icon && <item.icon />}
											<Link href={item.href}>{item.title}</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter className="gap-0 p-0">
				<div className="px-3 py-1 group-data-[state='collapsed']:hidden">
					<div className="bg-fill1 border-soft flex flex-col gap-1.5 rounded-lg border p-1 pb-2">
						<div className="bg-bg rounded-md p-2">
							<span className="text-xs font-normal">Complete your tutorial to unlock additional 100 credits</span>

							<Progress value={60} />

							<span className="text-fg-secondary text-xs font-normal">50% Complete</span>
						</div>

						<Link href="#" className="flex items-center gap-2 px-2 text-sm">
							<span className="text-primary-text flex-1 font-medium">Get Started</span>
							<ArrowRight className="text-fg-secondary size-4" />
						</Link>
					</div>
				</div>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="group-data-[state=collapsed]:items-center group-data-[state=collapsed]:pl-1">
							{footerData.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton tooltip={item.title!} variant={menuButtonVariant}>
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
