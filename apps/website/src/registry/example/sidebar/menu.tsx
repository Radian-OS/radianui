"use client"

import React from "react"
import { ChevronRight, FolderClosed, List, Settings, SquareArrowOutUpRight, Star } from "lucide-react"
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
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"

export default function Menu() {
	const [loading, setLoading] = React.useState(true)

	// Fake loading for 2 seconds
	React.useEffect(() => {
		const t = setTimeout(() => setLoading(false), 2000)
		return () => clearTimeout(t)
	}, [])

	return (
		<div className="h-[700px]">
			<SidebarProvider>
				<Sidebar variant="sidebar" collapsible="icon" className="[&>[data-slot=sidebar-inner]]:bg-fill2-alpha absolute">
					<SidebarHeader className="flex flex-col gap-5">
						<Image src="/favicon-16x16.png" alt="Logo" width={100} height={100} className="h-7 w-fit" />
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>ADMIN</SidebarGroupLabel>

							<SidebarGroupContent>
								<SidebarMenu>
									{loading && (
										<>
											<SidebarMenuItem>
												<SidebarMenuSkeleton />
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuSkeleton />
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuSkeleton />
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuSkeleton />
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuSkeleton />
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuSkeleton />
											</SidebarMenuItem>
										</>
									)}

									{!loading && (
										<>
											{/* MAIN MENU ITEM WITH ACTION + BADGE */}
											<SidebarMenuItem>
												<SidebarMenuButton tooltip="Dashboard" isActive>
													<List />
													<span>Dashboard</span>
												</SidebarMenuButton>
												<SidebarMenuBadge variant="strong">5</SidebarMenuBadge>
											</SidebarMenuItem>

											{/* REGULAR ITEM */}
											<SidebarMenuItem>
												<SidebarMenuButton tooltip="Projects">
													<Star />
													<span>Projects</span>
												</SidebarMenuButton>
											</SidebarMenuItem>

											{/* COLLAPSIBLE SUB MENU */}
											<Collapsible defaultOpen asChild className="group/collapsible">
												<SidebarMenuItem>
													<CollapsibleTrigger asChild>
														<SidebarMenuButton tooltip="Folders">
															<FolderClosed />
															Folders
															<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
														</SidebarMenuButton>
													</CollapsibleTrigger>

													<CollapsibleContent>
														<SidebarMenuSub>
															<SidebarMenuSubItem>
																<SidebarMenuSubButton>Personal</SidebarMenuSubButton>
															</SidebarMenuSubItem>

															<SidebarMenuSubItem>
																<SidebarMenuSubButton>Work</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														</SidebarMenuSub>
													</CollapsibleContent>
												</SidebarMenuItem>
											</Collapsible>

											{/* SETTINGS WITH ACTION */}
											<SidebarMenuItem>
												<SidebarMenuButton tooltip={"Setting"}>
													<Settings />
													<span>Settings</span>
												</SidebarMenuButton>
												<SidebarMenuAction asChild>
													<Link href="#sidebar-menu">
														<SquareArrowOutUpRight />
													</Link>
												</SidebarMenuAction>
											</SidebarMenuItem>
										</>
									)}
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
