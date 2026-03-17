"use client"

import { Bell, CreditCard, LogOut, Settings2, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import {
	Dropdown,
	DropdownContent,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownTrigger,
} from "@/registry/ui/dropdown"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/registry/ui/sidebar-old"

export function SidebarFooterUser() {
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Dropdown>
					<DropdownTrigger asChild>
						<SidebarMenuButton size="48">
							<Avatar size="36" rounded="square">
								<AvatarImage src="/media/male-5.jpg" />
								<AvatarFallback className="text-info-text bg-info-focus">
									JD
								</AvatarFallback>
							</Avatar>

							<span className="flex-1 text-sm font-medium group-data-[collapsible=icon]:hidden">
								John Doe
							</span>

							<Settings2 />
						</SidebarMenuButton>
					</DropdownTrigger>

					<DropdownContent
						side={isMobile ? "top" : "right"}
						align="end"
						className="min-w-68">
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
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
