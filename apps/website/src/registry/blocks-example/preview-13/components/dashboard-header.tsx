"use client"

import * as React from "react"

import { IconSlot } from "@/registry/icon/icon-library"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import { IconButton } from "@/registry/ui/button"
import { Input, InputWrapper } from "@/registry/ui/input"

export function DashboardHeader() {
	return (
		<header className="border-border/60 bg-bg flex h-14 shrink-0 items-center justify-between border-b px-5 md:px-7">
			<div className="flex h-8 items-center gap-2">
				<Breadcrumb className="flex items-center">
					<BreadcrumbList className="flex items-center gap-1.5 text-xs">
						<BreadcrumbItem className="inline-flex items-center">
							<BreadcrumbLink
								href="#"
								className="text-fg-secondary hover:text-fg transition-colors">
								Dashboard
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-fg-tertiary inline-flex items-center [&>svg]:size-3.5" />
						<BreadcrumbItem className="inline-flex items-center">
							<BreadcrumbPage className="font-heading text-primary font-semibold">
								Overview
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="flex items-center gap-2.5">
				{/* Search Bar Input using registry InputWrapper & Input */}
				<InputWrapper
					size="sm"
					className="border-border/70 bg-elevation-level1 hidden h-8 w-60 sm:flex">
					<IconSlot slot="search" className="size-4 shrink-0 opacity-60" />
					<Input placeholder="Search..." className="min-w-0 flex-1 text-xs" />
					<Badge
						variant="soft"
						color="neutral"
						size="sm"
						className="border-border/60 text-fg-secondary h-5 shrink-0 px-1.5 py-0 font-mono text-[10px] leading-none select-none">
						⌘K
					</Badge>
				</InputWrapper>

				{/* Header Actions */}
				<IconButton
					variant="outline"
					color="neutral"
					size="sm"
					className="border-border/70 text-fg-secondary h-8 w-8 shadow-2xs"
					aria-label="Notifications">
					<IconSlot slot="bell" className="size-4" />
				</IconButton>

				<IconButton
					variant="outline"
					color="neutral"
					size="sm"
					className="border-border/70 text-fg-secondary h-8 w-8 shadow-2xs"
					aria-label="Messages">
					<IconSlot slot="mail" className="size-4" />
				</IconButton>

				<Avatar
					size="sm"
					rounded="circle"
					className="border-border/70 ml-1 size-8 shrink-0 border">
					<AvatarImage
						src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/2.png"
						alt="Ari"
					/>
					<AvatarFallback className="text-xs font-semibold">AR</AvatarFallback>
				</Avatar>
			</div>
		</header>
	)
}
