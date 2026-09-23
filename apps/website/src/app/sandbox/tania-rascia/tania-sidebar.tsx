"use client"

import React from "react"
import Link from "next/link"
import {
	Code,
	FileText,
	HardDrive,
	Mail,
	Moon,
	Rss,
	Search,
	Sun,
	Twitter,
	User,
} from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"

export function TaniaSidebar() {
	return (
		<Sidebar className="border-border/70 bg-card border-r">
			{/* Top Brand & Bio */}
			<SidebarHeader className="flex flex-col gap-4 p-5 pb-2">
				<div className="flex items-center justify-between">
					<Link
						href="#"
						className="text-fg flex items-center gap-2 text-sm font-bold tracking-tight transition-opacity hover:opacity-80">
						<HardDrive className="text-fg size-4" />
						<span>tania.dev</span>
					</Link>
					<div className="flex items-center gap-2">
						<span className="bg-primary size-2 rounded-full" />
						<Sun className="text-fg-secondary hover:text-fg size-3.5 cursor-pointer" />
					</div>
				</div>

				<p className="text-fg-secondary text-xs leading-relaxed">
					I&apos;m <span className="text-fg font-semibold">Tania</span>,
					software engineer and open-source creator. This is my digital garden.
					🌱
				</p>
			</SidebarHeader>

			{/* Nav Menu */}
			<SidebarContent className="px-3 py-2">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild size="32" isActive>
									<Link href="#blog">
										<FileText className="size-4" />
										<span>Blog</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="32">
									<Link href="#shelves">
										<Search className="size-4" />
										<span>Shelves</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="32">
									<Link href="#projects">
										<Code className="size-4" />
										<span>Projects</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild size="32">
									<Link href="#about">
										<User className="size-4" />
										<span>About me</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Sidebar Footer: Socials & Sub-links */}
			<SidebarFooter className="border-border/60 flex flex-col gap-3.5 border-t p-5">
				<div className="text-fg-secondary flex items-center gap-3">
					<Link
						href="mailto:tania@example.com"
						aria-label="Email"
						className="hover:text-fg transition-colors">
						<Mail className="size-3.5" />
					</Link>
					<Link
						href="#"
						aria-label="Twitter"
						className="hover:text-fg transition-colors">
						<Twitter className="size-3.5" />
					</Link>
					<Link
						href="#"
						aria-label="RSS Feed"
						className="hover:text-fg transition-colors">
						<Rss className="size-3.5" />
					</Link>
					<Moon className="hover:text-fg size-3.5 cursor-pointer transition-colors" />
				</div>

				<div className="text-fg-secondary flex items-center gap-2 text-[11px]">
					<Link href="#" className="hover:text-fg transition-colors">
						Resume
					</Link>
					<span>•</span>
					<Link href="#" className="hover:text-fg transition-colors">
						Topics
					</Link>
					<span>•</span>
					<Link href="#" className="hover:text-fg transition-colors">
						Source
					</Link>
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}
