"use client"

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/styles/default/ui/sidebar"

export function SidebarFooterUser() {
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu className="p-3 group-data-[state=collapsed]:p-3.5">
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="48">
							<Avatar size="32">
								<AvatarImage src="/media/male-3.jpg" />
								<AvatarFallback>JS</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col truncate">
								<span className="font-medium">Jim Simmons</span>
								<span className="text-fg-secondary text-xs font-normal">
									jim@radianos.com
								</span>
							</div>
							<ChevronsUpDown />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="min-w-68"
						side={isMobile ? "top" : "right"}
						align="end">
						<DropdownMenuLabel className="p-0 font-normal">
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
						</DropdownMenuLabel>
						<DropdownMenuDivider />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Sparkles className="size-4" />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuDivider />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck className="size-4" />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCard className="size-4" />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell className="size-4" />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuDivider />
						<DropdownMenuItem>
							<LogOut className="size-4" />
							Log out
							<DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
