"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, AudioLines } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

const NAV_ITEMS = [
	{ label: "Products", href: "#products" },
	{ label: "Integrations", href: "#integrations" },
	{ label: "API", href: "#api" },
	{ label: "Pricing", href: "#pricing", active: true },
]

export function PricingNav() {
	return (
		<header className="border-border/40 bg-bg/80 w-full border-b backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
				{/* Brand Logo */}
				<Link
					href="#"
					className="text-fg flex items-center gap-2.5 transition-opacity hover:opacity-80">
					<span className="bg-fill2 text-fg flex size-8 items-center justify-center rounded-lg">
						<AudioLines className="size-4" />
					</span>
					<span className="text-sm font-bold tracking-widest uppercase">
						Voice Aura
					</span>
				</Link>

				{/* Center Navigation Menu */}
				<div className="hidden md:flex">
					<NavigationMenu>
						<NavigationMenuList className="gap-1">
							{NAV_ITEMS.map((item) => (
								<NavigationMenuItem key={item.label}>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}>
										<Link
											href={item.href}
											className={
												item.active
													? "text-fg font-semibold"
													: "text-fg-secondary"
											}>
											{item.label}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Right CTA Actions */}
				<div className="flex items-center gap-2 sm:gap-3">
					<Button variant="ghost" color="neutral" asChild>
						<Link href="#login" className="flex items-center gap-1.5">
							<span>Log in</span>
							<ArrowRight className="size-3.5" />
						</Link>
					</Button>

					<Button variant="strong" color="neutral" asChild>
						<Link href="#signup" className="flex items-center gap-1.5">
							<span>Sign up</span>
							<ArrowRight className="size-3.5" />
						</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
