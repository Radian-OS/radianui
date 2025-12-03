import React from "react"
import { HomeIcon } from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
} from "@/registry/ui/sidebar"

export default function SidebarPreview() {
	return (
		<SidebarProvider>
			<Sidebar side="left" variant="floating" collapsible="icon">
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Application</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<HomeIcon />
									Home
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
		</SidebarProvider>
	)
}
