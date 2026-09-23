"use client"

import React from "react"
import Link from "next/link"
import { Globe } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

const NAV_ITEMS = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
	{ label: "Blog", href: "#blog" },
	{ label: "Photos", href: "#photos" },
]

export function VictorNavbar() {
	return (
		<header className="flex w-full items-center justify-between py-6">
			{/* Brand Logo Badge */}
			<Link
				href="/sandbox/victor-eke"
				aria-label="Victor Eke Home"
				className="border-border bg-elevation-level1 hover:border-alpha flex size-10 items-center justify-center rounded-lg border shadow-md transition">
				<span className="text-fg font-serif text-lg font-bold tracking-wide italic">
					eke
				</span>
			</Link>

			{/* Center Navigation Links using Canonical NavigationMenu */}
			<NavigationMenu>
				<NavigationMenuList className="gap-1 sm:gap-2">
					{NAV_ITEMS.map((item) => (
						<NavigationMenuItem key={item.label}>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}>
								<Link
									href={item.href}
									className="text-fg-secondary hover:text-fg text-sm font-medium transition-colors">
									{item.label}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>

			{/* Right Theme/Globe Action Button */}
			<div className="flex items-center">
				<Button
					color="neutral"
					variant="ghost"
					size="32"
					className="border-success-border bg-fill1-alpha text-success hover:border-success-border hover:bg-fill2 hover:text-success-hover size-9 rounded-full border p-0"
					aria-label="Toggle network status">
					<Globe className="size-4" />
				</Button>
			</div>
		</header>
	)
}
