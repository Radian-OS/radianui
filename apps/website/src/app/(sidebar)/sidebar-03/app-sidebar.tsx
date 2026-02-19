import { Bell, Bot, ChevronDown, ChevronRight, CreditCard, Ellipsis, FolderClosed, ImageUp, LogOut, Search, Settings2, SquarePen, User, WandSparkles } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { CompactButton } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownDivider, DropdownItem, DropdownLabel, DropdownTrigger } from "@/registry/ui/dropdown"
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
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarSeparator,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import Logo from "./logo"

const data = [
	{
		title: "Projects",
		items: [
			{
				title: "Design Resources",
				icon: FolderClosed,
				items: [
					{
						title: "Figma",
						href: "#",
					},
					{
						title: "Framer",
						href: "#",
					},
					{
						title: "Webflow",
						href: "#",
					},
				],
			},
			{
				title: "Tech Stuff",
				icon: FolderClosed,
				items: [
					{
						title: "LG 27 Monitor",
						href: "#",
					},
					{
						title: "Keychron K2",
						href: "#",
					},
					{
						title: "Sony WH-1000XM5",
						href: "#",
					},
				],
			},
			{
				title: "Design Feedback",
				icon: FolderClosed,
				items: [{ title: "Designer Reviews", href: "#" }],
			},
		],
	},
]

const chatData = [
	{
		title: "Previous Chats",
		items: [
			{
				title: "Introduction: User Experience",
				href: "#",
			},
			{
				title: "Design thinking Fundamentals",
				href: "#",
			},
			{
				title: "Collaboration Tools",
				href: "#",
			},
			{
				title: "Using Templates to Save Time",
				href: "#",
			},
			{
				title: "Sharing Content with Users",
				href: "#",
			},
			{
				title: "Tools and Resources",
				href: "#",
			},
		],
	},
]

export function AppSidebar() {
	return (
		<Sidebar variant="floating" collapsible="icon" className="bg-fill1">
			<SidebarHeader className="gap-0 p-0">
				<div className="flex justify-between gap-1 p-4">
					<div className="flex items-center gap-2">
						<Logo />
						<span className="text-lg font-semibold">Solara</span>
					</div>
					<div className="text-fg-secondary flex gap-0.5">
						<SidebarTrigger size="24" />
						<CompactButton variant="ghost" color="neutral" size="24">
							<SquarePen className="size-4" />
						</CompactButton>
					</div>
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
			<SidebarContent className="px-2">
				<SidebarGroup className="p-0">
					<SidebarCollapsible defaultOpen>
						<SidebarGroupLabel asChild>
							<SidebarCollapsibleTrigger asChild>
								<SidebarMenuButton variant="soft">
									<ChevronDown />
									<span>AI Tools</span>
								</SidebarMenuButton>
							</SidebarCollapsibleTrigger>
						</SidebarGroupLabel>
						<SidebarCollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<div className="flex items-center gap-2">
												<ImageUp className="stroke-warning !size-5" />
												<a href="#">
													<span>Image Enhance</span>
												</a>
											</div>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>

									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<div className="flex items-center gap-2">
												<WandSparkles className="stroke-warning !size-5" />
												<a href="#">
													<span>Image Gen</span>
												</a>
											</div>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>

									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<div className="flex items-center gap-2 py-2">
												<Bot className="stroke-warning !size-5" />
												<a href="#">
													<span>Chat Bots</span>
												</a>
											</div>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarCollapsibleContent>
					</SidebarCollapsible>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup className="p-0">
					{data.map((section) => (
						<SidebarCollapsible key={section.title} defaultOpen>
							<SidebarGroupLabel asChild>
								<SidebarCollapsibleTrigger className="group/trigger flex w-full items-center justify-between">
									{section.title}
									<ChevronRight className="size-4 transition-transform group-data-[state=open]/trigger:rotate-90" />
								</SidebarCollapsibleTrigger>
							</SidebarGroupLabel>
							<SidebarCollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{section.items.map((subsection) => (
											<SidebarCollapsible key={subsection.title} defaultOpen>
												<SidebarCollapsibleTrigger className="group/trigger flex w-full items-center justify-between">
													<div className="flex items-center gap-2">
														{subsection.icon && <subsection.icon className="size-5" />}
														{subsection.title}
													</div>

													<ChevronRight className="size-4 transition-transform group-data-[state=open]/trigger:rotate-90" />
												</SidebarCollapsibleTrigger>
												<SidebarCollapsibleContent>
													<SidebarMenuSub className="pl-0">
														{subsection.items.map((item) => (
															<SidebarMenuItem key={item.title}>
																<SidebarMenuButton className="font-normal">
																	<Link href={item.href}>{item.title}</Link>
																</SidebarMenuButton>
															</SidebarMenuItem>
														))}
													</SidebarMenuSub>
												</SidebarCollapsibleContent>
											</SidebarCollapsible>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarCollapsibleContent>
						</SidebarCollapsible>
					))}
				</SidebarGroup>
				{chatData.map((section) => (
					<SidebarGroup className="p-0" key={section.title}>
						<SidebarGroupLabel className="items-center justify-between">
							{section.title}
							<CompactButton size="20" variant="ghost" color="neutral">
								<Ellipsis />
							</CompactButton>
						</SidebarGroupLabel>
						<SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
							<SidebarMenu>
								{section.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton className="font-normal">
											<Link href={item.href}>{item.title}</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter className="px-4 py-3">
				<div className="flex items-center gap-2">
					<Avatar size="24" rounded="square">
						<AvatarImage src="/media/male-5.jpg" />
						<AvatarFallback className="text-info-text bg-info-focus">JD</AvatarFallback>
					</Avatar>
					<span className="flex-1 text-sm font-medium group-data-[collapsible=icon]:hidden">John Doe</span>
					<Dropdown>
						<DropdownTrigger asChild>
							<CompactButton size="24" variant="ghost" color="neutral" className="group-data-[collapsible=icon]:hidden">
								<Settings2 />
							</CompactButton>
						</DropdownTrigger>
						<DropdownContent side="right" align="end" className="min-w-56">
							<DropdownLabel>My Account</DropdownLabel>
							<DropdownDivider />
							<DropdownItem>
								<User />
								<span>Profile</span>
							</DropdownItem>
							<DropdownItem>
								<CreditCard />
								<span>Billing</span>
							</DropdownItem>
							<DropdownItem>
								<Bell />
								<span>Notifications</span>
							</DropdownItem>
							<DropdownItem>
								<Settings2 />
								<span>Settings</span>
							</DropdownItem>
							<DropdownDivider />
							<DropdownItem>
								<LogOut />
								<span>Log out</span>
							</DropdownItem>
						</DropdownContent>
					</Dropdown>
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}
