import {
	ArrowUpRight,
	ChartBarBig,
	CircleHelp,
	CreditCard,
	Database,
	FileText,
	Folders,
	LayoutDashboard,
	LogIn,
	MessagesSquare,
	Plug,
	Search,
	Settings,
	Tag,
	TrendingUpDown,
	Users2,
	WorkflowIcon,
} from "lucide-react"
import { IconButton } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
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
} from "@/registry/ui/sidebar"
import Logo from "./logo"

interface SidebarItem {
	label: string
	icon: React.ElementType
	url: string
	isActive?: boolean
}

interface SidebarSection {
	title: string | null
	items: SidebarItem[]
}

const data: SidebarSection[] = [
	{
		title: null,
		items: [
			{
				label: "Overview",
				icon: LayoutDashboard,
				url: "#",
			},
			{
				label: "Workflows",
				icon: WorkflowIcon,
				url: "#",
			},
			{
				label: "Projects",
				icon: Folders,
				url: "#",
			},
			{
				label: "Messages",
				icon: MessagesSquare,
				url: "#",
				isActive: true,
			},
		],
	},
	{
		title: "DATA",
		items: [
			{
				label: "Records",
				icon: Database,
				url: "#",
			},
			{
				label: "Labels",
				icon: Tag,
				url: "#",
			},
			{
				label: "Users",
				icon: Users2,
				url: "#",
			},
		],
	},
	{
		title: "INSIGHTS",
		items: [
			{
				label: "Dashboard",
				icon: ChartBarBig,
				url: "#",
			},
			{
				label: "Reports",
				icon: FileText,
				url: "#",
			},
			{
				label: "Trends",
				icon: TrendingUpDown,
				url: "#",
			},
		],
	},
	{
		title: "TOOLS",
		items: [
			{
				label: "Billing Details",
				icon: CreditCard,
				url: "#",
			},
			{
				label: "Settings",
				icon: Settings,
				url: "#",
			},
			{
				label: "Integrations",
				icon: Plug,
				url: "#",
			},
		],
	},
]

const footerData: SidebarSection[] = [
	{
		title: null,
		items: [
			{
				label: "Support",
				icon: CircleHelp,
				url: "#",
			},
			{
				label: "Logout",
				icon: LogIn,
				url: "#",
			},
		],
	},
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader className="flex-row">
				<div className="flex items-center gap-2 px-1.5 py-1">
					<Logo />
					<h5 className="text-[18px] font-semibold">Nomi</h5>
				</div>
				<IconButton className="ml-auto" size="32" variant="ghost" color="neutral">
					<Search className="size-5" />
				</IconButton>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{data.map((section) => (
					<SidebarGroup className="px-2 py-1.5" key={section.title}>
						{section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
						<SidebarGroupContent>
							<SidebarMenu>
								{section.items.map((item) => (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton variant="neutral" color="primary" isActive={item.isActive}>
											<item.icon /> {item.label}
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter className="gap-0 p-0">
				<Card className="border-none p-3 shadow-none">
					<CardContent className="bg-fill1 flex flex-col gap-2 px-3 py-2 font-medium">
						<div className="flex items-center justify-between gap-1.5">
							<p className="text-[13px]">Plan Usage</p>
							<ArrowUpRight className="text-fg-secondary size-4" />
						</div>
						<div className="flex w-full items-center justify-between gap-2 text-xs">
							<p>Calls</p>
							<span className="flex items-center gap-2">
								<span className="text-fg-secondary font-normal">200 of 40k</span>
								<Progress className="w-8" value={10} />
							</span>
						</div>
						<div className="flex w-full items-center justify-between gap-2 text-xs">
							<p>Recordings</p>
							<span className="flex items-center gap-2">
								<span className="text-fg-secondary font-normal">12 of 240</span>
								<Progress className="w-8" value={25} />
							</span>
						</div>
						<div className="flex w-full items-center justify-between gap-2 text-xs">
							<p>Storage</p>
							<span className="flex items-center gap-2">
								<span className="text-fg-secondary font-normal">0.864 of 12 GB</span>
								<Progress className="w-8" value={15} />
							</span>
						</div>
					</CardContent>
				</Card>
				{footerData.map((section) => (
					<SidebarGroup key={section.title}>
						{section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
						<SidebarGroupContent>
							<SidebarMenu>
								{section.items.map((item) => (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton variant="soft" isActive={item.isActive}>
											<item.icon /> {item.label}
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarFooter>
		</Sidebar>
	)
}
