"use client"

import React from "react"
import { Folder } from "lucide-react"
import { cn } from "@/lib/utils"
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
} from "@/styles/default/ui/sidebar"
import { type PreviewKey, sandboxComponents } from "./types"

interface PlaygroundSidebarProps {
	activeComponent: PreviewKey
	onSelectComponent: (component: PreviewKey, defaultFile: string) => void
}

export function PlaygroundSidebar({
	activeComponent,
	onSelectComponent,
}: PlaygroundSidebarProps) {
	return (
		<Sidebar theme="gray" collapsible="icon">
			{/* Sidebar Header */}
			<SidebarHeader className="border-border bg-fill2 flex flex-col gap-1 border-b p-4 group-data-[state=collapsed]:items-center group-data-[state=collapsed]:p-4">
				<div className="flex items-center gap-2">
					<div className="bg-primary text-primary-fg shadow-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black shadow-md">
						R
					</div>
					<span className="group-data-[state=collapsed]:hidden">Sandbox</span>
				</div>
			</SidebarHeader>

			{/* Sidebar Navigation */}
			<SidebarContent className="flex-1 space-y-6 overflow-y-auto p-4 group-data-[state=collapsed]:mt-4 group-data-[state=collapsed]:space-y-4 group-data-[state=collapsed]:p-0">
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="text-fg-tertiary flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider group-data-[state=collapsed]:hidden">
						<span>Components</span>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="space-y-1">
							{sandboxComponents.map((item) => {
								const isActive = activeComponent === item.id
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											isActive={isActive}
											variant={isActive ? "strong" : "neutral"}
											tooltip={item.path}
											onClick={() =>
												onSelectComponent(item.id, item.defaultFile)
											}
											className={cn(
												"group flex w-full items-center justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
												!isActive &&
													"hover:bg-fill3 text-fg-secondary hover:text-fg",
												"group-data-[state=collapsed]:p-2!"
											)}>
											<Folder className="text-primary size-4 shrink-0" />
											<span className="flex-1 truncate group-data-[state=collapsed]:hidden">
												{item.label}
											</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
