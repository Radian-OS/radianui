"use client"

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownGroup,
	DropdownItem,
	DropdownLabel,
	DropdownShortcut,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/registry/ui/sidebar"

export function SidebarFooterUser() {
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu>
			<SidebarMenuItem className="group-data-[state=collapsed]:pl-6.5 p-2 group-data-[state=collapsed]:p-3.5">
				<Dropdown>
					<DropdownTrigger asChild>
						<SidebarMenuButton size="52">
							<Avatar size="32">
								<AvatarImage src="/media/male-3.jpg" />
								<AvatarFallback>JS</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col">
								<span className="font-medium">Jim Simmons</span>
								<span className="text-fg-secondary text-xs font-normal">
									simmons@radianos.com
								</span>
							</div>
							<ChevronsUpDown />
						</SidebarMenuButton>
					</DropdownTrigger>

					<DropdownContent
						className="min-w-68"
						side={isMobile ? "top" : "right"}
						align="end">
						<DropdownLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src="/media/male-3.jpg" alt="Jim Simmons" />
									<AvatarFallback className="rounded-lg">JS</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="text-fg truncate font-semibold">
										Jim Simmons
									</span>
									<span className="text-fg-secondary truncate text-xs">
										simmons@radianos.com
									</span>
								</div>
							</div>
						</DropdownLabel>
						<DropdownDivider />
						<DropdownGroup>
							<DropdownItem>
								<Sparkles className="size-4" />
								Upgrade to Pro
							</DropdownItem>
						</DropdownGroup>
						<DropdownDivider />
						<DropdownGroup>
							<DropdownItem>
								<BadgeCheck className="size-4" />
								Account
							</DropdownItem>
							<DropdownItem>
								<CreditCard className="size-4" />
								Billing
							</DropdownItem>
							<DropdownItem>
								<Bell className="size-4" />
								Notifications
							</DropdownItem>
						</DropdownGroup>
						<DropdownDivider />
						<DropdownItem>
							<LogOut className="size-4" />
							Log out
							<DropdownShortcut>⌘L</DropdownShortcut>
						</DropdownItem>
					</DropdownContent>
				</Dropdown>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
