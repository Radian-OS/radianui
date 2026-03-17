import {
	Box,
	ChartCandlestick,
	ChartSpline,
	ClipboardList,
	Cog,
	CreditCard,
	Headphones,
	LayoutTemplate,
	MessagesSquare,
	Monitor,
	Search,
	UserCog,
	Users2,
	Zap,
} from "lucide-react"
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
	SidebarMenuItem,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import Logo from "./logo"

const data = [
	{
		title: "MENU",
		items: [
			{
				title: "Dashboard",
				icon: LayoutTemplate,
				href: "#",
			},
			{
				title: "Products",
				icon: Box,
				href: "#",
			},
			{
				title: "Customers",
				icon: Users2,
				href: "#",
			},
			{
				title: "Analytics",
				icon: ChartCandlestick,
				href: "#",
			},
			{
				title: "Messages",
				icon: MessagesSquare,
				href: "#",
			},
			{
				title: "Performance",
				icon: ChartSpline,
				href: "#",
			},
			{
				title: "Transactions",
				icon: CreditCard,
				href: "#",
			},
			{
				title: "Access Control",
				icon: UserCog,
				href: "#",
			},
			{
				title: "Orders",
				icon: ClipboardList,
				href: "#",
			},
			{
				title: "Channels",
				icon: Monitor,
				href: "#",
			},
			{
				title: "Integrations",
				icon: Zap,
				href: "#",
			},
		],
	},
]

const footerData = [
	{
		title: "Help Center",
		icon: Headphones,
		href: "#",
	},
	{
		title: "Feedback",
		icon: MessagesSquare,
		href: "#",
	},
	{
		title: "Settings",
		icon: Cog,
		href: "#",
	},
]

export function AppSidebar() {
	return (
		<Sidebar variant="inset" className="p-0">
			<SidebarHeader className="gap-0 p-0">
				<div className="flex items-center justify-between p-3">
					<div className="flex items-center gap-2 px-1.5 py-1">
						<Logo />
						<h5 className="text-[18px] font-semibold">Radian</h5>
					</div>
					<SidebarTrigger />
				</div>

				<div className="w-full px-3 py-2">
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
				{data.map((section) => (
					<SidebarGroup key={section.title}>
						<SidebarGroupLabel>{section.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{section.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton>
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
			<SidebarFooter>
				<div className="bg-bg border-soft flex flex-col gap-1.5 rounded-lg border p-3 pt-2">
					<div className="flex items-center justify-between gap-2 font-medium">
						<span className="text-[13px]">Free Trial</span>
						<span className="text-fg-secondary text-sm">1w left</span>
					</div>
					<Progress value={80} />
				</div>
				<SidebarMenu>
					{footerData.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton>
								{item.icon && <item.icon />}
								<Link href={item.href}>{item.title}</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
