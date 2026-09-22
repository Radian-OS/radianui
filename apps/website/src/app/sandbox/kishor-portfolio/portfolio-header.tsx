"use client"

import React from "react"
import Link from "next/link"
import { Moon } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/registry/ui/navigation-menu"

export function PortfolioHeader() {
	return (
		<header className="flex w-full items-center justify-between py-4">
			{/* Canonical Navigation Menu */}
			<NavigationMenu>
				<NavigationMenuList className="flex items-center gap-4 sm:gap-6">
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link
								href="#home"
								className="text-foreground hover:text-fg-secondary text-xs font-medium transition-colors sm:text-sm">
								Home
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link
								href="#projects"
								className="text-fg-secondary hover:text-foreground text-xs font-medium transition-colors sm:text-sm">
								Projects
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Right actions: Theme toggle + Book a Call */}
			<div className="flex items-center gap-2.5">
				<IconButton
					type="button"
					variant="ghost"
					color="neutral"
					size="32"
					aria-label="Toggle theme"
					className="text-fg-secondary hover:text-foreground">
					<Moon className="size-4" />
				</IconButton>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="32"
					className="rounded-full px-3.5 text-xs font-medium shadow-xs">
					Book a Call
				</Button>
			</div>
		</header>
	)
}
