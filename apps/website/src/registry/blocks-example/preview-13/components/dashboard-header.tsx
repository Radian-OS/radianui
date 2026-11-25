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
import { Input, InputWrapper } from "@/registry/ui/input"

export function DashboardHeader() {
	return (
		<header className="border-border/60 bg-bg flex h-14 shrink-0 items-center justify-between border-b px-5 md:px-7">
			<div className="flex h-8 items-center gap-2">
				<Breadcrumb className="flex items-center">
					<BreadcrumbList className="flex items-center gap-1.5 text-sm">
						<BreadcrumbItem className="inline-flex items-center">
							<BreadcrumbLink
								href="#"
								className="text-fg-secondary hover:text-fg transition-colors">
								Dashboard
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-fg-tertiary inline-flex items-center [&>svg]:size-3.5" />
						<BreadcrumbItem className="inline-flex items-center">
							<BreadcrumbPage className="text-primary font-semibold">
								Overview
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="flex items-center gap-2.5">
				{/* Search Bar Input using registry InputWrapper & Input */}
				<InputWrapper className="hidden w-60 sm:flex">
					<IconSlot slot="search" className="text-fg-tertiary size-4" />
					<Input type="search" placeholder="Search..." />
				</InputWrapper>

				{/* Header Actions */}
				<IconButton
					variant="outline"
					color="neutral"
					aria-label="Notifications">
					<IconSlot slot="bell" />
				</IconButton>

				<IconButton variant="outline" color="neutral" aria-label="Messages">
					<IconSlot slot="mail" />
				</IconButton>

				<Avatar
					size="sm"
					rounded="square"
					className="border-border/70 bg-fill2 ml-1 shrink-0 border">
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
