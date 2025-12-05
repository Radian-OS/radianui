import React from "react"
import { List, Plus, Star } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"

export default function Group() {
	return (
		<div className="h-[700px]">
			<SidebarProvider>
				{/* Using absolute positioning to prevent layout shift in the preview — remove when using fullscreen. */}
				<Sidebar variant="inset" collapsible="icon" className="absolute">
					<SidebarHeader className="flex flex-col gap-5">
						<Image src="/favicon-16x16.png" alt="Logo" width={100} height={100} className="h-7 w-fit" />
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>ADMIN</SidebarGroupLabel>
							<SidebarGroupAction onClick={() => toast("SidebarGroup Trigger", {})} className="cursor-pointer" title="Add Project">
								<Plus />
							</SidebarGroupAction>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton isActive tooltip={"Dashboard"}>
											<List />
											Dashboard
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton tooltip={"Projects"}>
											<Star />
											Projects
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarInset>
					<SidebarTrigger className="ml-1.5 mt-1.5" />
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
