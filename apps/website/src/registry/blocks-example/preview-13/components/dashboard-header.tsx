"use client"

import * as React from "react"

import { IconSlot } from "@/registry/icon/icon-library"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import { IconButton } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/registry/ui/dropdown-menu"
import { Input, InputWrapper } from "@/registry/ui/input"
import { SidebarTrigger } from "@/registry/ui/sidebar"

import { UserAccountMenuContent } from "./dashboard-sidebar"

export function DashboardHeader() {
	return (
		<header className="border-border/60 bg-bg flex h-14 w-full min-w-0 shrink-0 items-center justify-between gap-3 border-b px-4 md:px-6">
			<div className="flex h-8 min-w-0 items-center gap-2">
				<SidebarTrigger
					className="shrink-0 lg:hidden"
					aria-label="Open navigation menu"
				/>
				<Breadcrumb className="flex min-w-0 items-center">
					<BreadcrumbList className="flex items-center gap-1.5 text-sm whitespace-nowrap">
						<BreadcrumbItem className="hidden items-center sm:inline-flex">
							<BreadcrumbLink
								href="#"
								className="text-fg-secondary hover:text-fg transition-colors">
								Dashboard
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-fg-tertiary hidden items-center sm:inline-flex [&>svg]:size-3.5" />
						<BreadcrumbItem className="inline-flex items-center">
							<BreadcrumbPage className="text-fg font-semibold">
								Overview
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
				{/* Search Bar Input using registry InputWrapper & Input */}
				<InputWrapper className="hidden sm:flex sm:w-48 lg:w-60">
					<IconSlot slot="search" className="text-fg-tertiary size-4" />
					<Input type="search" placeholder="Search..." />
				</InputWrapper>

				{/* Header Actions: keep Notifications & Profile on mobile; move Messages to sm+ (also in sidebar menu) */}
				<IconButton
					variant="outline"
					color="neutral"
					aria-label="Notifications">
					<IconSlot slot="bell" />
				</IconButton>

				<IconButton
					variant="outline"
					color="neutral"
					aria-label="Messages"
					className="hidden sm:inline-flex">
					<IconSlot slot="mail" />
				</IconButton>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							aria-label="Account menu"
							className="focus-visible:ring-primary cursor-pointer rounded-md focus-visible:ring-2 focus-visible:outline-none sm:ml-1">
							<Avatar
								size="md"
								rounded="square"
								className="border-border/70 bg-fill2 shrink-0 border">
								<AvatarImage
									src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
									alt="Alex Rivera"
								/>
								<AvatarFallback className="text-xs font-semibold">
									AR
								</AvatarFallback>
							</Avatar>
						</button>
					</DropdownMenuTrigger>
					<UserAccountMenuContent align="end" side="bottom" sideOffset={8} />
				</DropdownMenu>
			</div>
		</header>
	)
}
