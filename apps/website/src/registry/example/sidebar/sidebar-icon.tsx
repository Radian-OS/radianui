import React from "react"
import { BarChart3, ChevronRight, FolderClosed, List, Settings, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import {
	Sidebar,
	SidebarContent,
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
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"

export default function SidebarIcon() {
	return (
		<div className="h-[700px]">
			<SidebarProvider>
				{/* Using absolute positioning to prevent layout shift in the preview — remove when using fullscreen. */}
				<Sidebar variant="sidebar" collapsible="icon" className="[&>[data-slot=sidebar-inner]]:bg-fill2-alpha absolute">
					<SidebarHeader className="flex flex-col gap-5">
						<Image src="/favicon-16x16.png" alt="Logo" width={100} height={100} className="h-7 w-fit" />
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>ADMIN</SidebarGroupLabel>
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
									<Collapsible asChild className="group/collapsible">
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton tooltip={"Documentation"}>
													<FolderClosed />
													<span>Documentation</span>
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton asChild>
															<Link href="#">
																<span>Introduction</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton asChild>
															<Link href="#">
																<span>Get Started</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton asChild>
															<Link href="#">
																<span>Tutorials</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton asChild>
															<Link href="#">
																<span>Changelog</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
									<SidebarMenuItem>
										<SidebarMenuButton tooltip={"Analytics"}>
											<BarChart3 />
											Analytics
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton tooltip={"Settings"}>
											<Settings />
											Settings
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarTrigger className="ml-1.5 mt-1.5" />
			</SidebarProvider>
		</div>
	)
}
