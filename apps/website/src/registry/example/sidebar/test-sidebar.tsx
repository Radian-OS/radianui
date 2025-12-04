import React from "react"
import { BarChart3, ChevronRight, Ellipsis, FolderClosed, List, Settings, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
} from "@/registry/ui/sidebar"

export default function SidebarPreview() {
	return (
		<div className="h-[700px]">
			<SidebarProvider>
				{/* Using absolute positioning to prevent layout shift in the preview — remove when using fullscreen. */}
				<Sidebar side="left" variant="floating" collapsible="offcanvas" className="[&>[data-slot=sidebar-inner]]:bg-fill2-alpha absolute">
					<SidebarHeader className="flex flex-col gap-5">
						<Image src="/radian.svg" alt="Logo" width={100} height={100} className="h-7 w-fit" />
						<div className="shadow-xs flex items-center gap-3 rounded-lg border py-2 pe-4 ps-2.5">
							<Avatar className="flex-shrink-0">
								<AvatarImage src="/media/male-4.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col">
								<span className="text-sm font-semibold">Walter Morales</span>
								<span className="text-fg-tertiary text-xs">Free Plan</span>
							</div>
							<Ellipsis className="text-fg-tertiary size-5 shrink-0" />
						</div>
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
					<SidebarFooter>
						<Card className="gap-2 py-4 shadow-none">
							<CardHeader className="px-4">
								<CardTitle className="text-sm">Subscribe to our newsletter</CardTitle>
								<CardDescription>Opt-in to receive updates and news about the sidebar.</CardDescription>
							</CardHeader>
							<CardContent className="px-4">
								<form>
									<div className="grid gap-2.5">
										<SidebarInput type="email" placeholder="Email" />
										<Button size="32" className="w-full">
											Subscribe
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>
				test
			</SidebarProvider>
		</div>
	)
}
