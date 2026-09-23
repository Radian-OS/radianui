"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/styles/default/ui/avatar"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { NAV_ITEMS, SOCIAL_LINKS } from "./types"

export function WilliamsNavbar() {
	return (
		<header className="sticky top-4 z-50 flex w-full justify-center px-4">
			<div className="flex w-full max-w-4xl items-center justify-between rounded-2xl border border-white/10 bg-neutral-900/90 px-4 py-2.5 shadow-2xl backdrop-blur-md">
				{/* Left: Avatar Thumbnail */}
				<Link
					href="/sandbox/williams-samuel"
					aria-label="Williams Samuel Home"
					className="flex items-center gap-2">
					<Avatar size="32" rounded="circle" className="border border-white/20">
						<AvatarImage src="/sandbox/placeholder.svg" alt="Williams Samuel" />
						<AvatarFallback className="text-xs font-bold text-white">
							WS
						</AvatarFallback>
					</Avatar>
				</Link>

				{/* Center: Navigation Menu */}
				<NavigationMenu>
					<NavigationMenuList className="gap-1 sm:gap-2">
						{NAV_ITEMS.map((item) => (
							<NavigationMenuItem key={item.label}>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}>
									<Link
										href={item.href}
										className="text-xs font-medium text-neutral-300 transition-colors hover:text-white sm:text-sm">
										{item.label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right: Social Icon Links */}
				<div className="flex items-center gap-3">
					{SOCIAL_LINKS.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.name}
							className="group flex size-8 items-center justify-center rounded-lg border border-white/10 bg-neutral-800/80 transition-colors hover:border-white/20 hover:bg-neutral-700">
							<Image
								src={`https://www.google.com/s2/favicons?sz=32&domain=${social.domain}`}
								alt={`${social.name} logo`}
								width={16}
								height={16}
								className="size-4 object-contain opacity-75 transition-opacity group-hover:opacity-100"
								unoptimized
							/>
						</a>
					))}
				</div>
			</div>
		</header>
	)
}
