"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

export function PricingNav() {
	return (
		<header className="border-border/40 bg-bg w-full border-b">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
				{/* Brand Logo & Left Navigation */}
				<div className="flex items-center gap-8">
					<Link
						href="#"
						className="text-fg flex items-center gap-2.5 transition-opacity hover:opacity-85">
						<span className="bg-black-inverse text-white-inverse flex size-8 items-center justify-center rounded-lg">
							<span className="grid grid-cols-2 gap-0.5">
								<span className="size-1.5 rounded-full bg-white" />
								<span className="size-1.5 rounded-full bg-white" />
								<span className="size-1.5 rounded-full bg-white" />
								<span className="size-1.5 rounded-full bg-white/60" />
							</span>
						</span>
						<span className="text-fg text-base font-bold tracking-tight">
							Untitled UI
						</span>
					</Link>

					{/* Navigation Links using Canonical NavigationMenu */}
					<div className="hidden md:flex">
						<NavigationMenu>
							<NavigationMenuList className="gap-1">
								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}>
										<Link href="#home" className="text-fg-secondary">
											Home
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-fg-secondary">
										Products
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="flex w-64 flex-col gap-2 p-4">
											<p className="text-fg text-sm font-semibold">
												Platform Overview
											</p>
											<p className="text-fg-secondary text-xs">
												Powerful tools built for modern software teams.
											</p>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-fg-secondary">
										Resources
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="flex w-64 flex-col gap-2 p-4">
											<p className="text-fg text-sm font-semibold">
												Documentation & Guides
											</p>
											<p className="text-fg-secondary text-xs">
												Learn how to get the most out of Untitled UI.
											</p>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}>
										<Link href="#pricing" className="text-fg font-semibold">
											Pricing
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				{/* Right Actions */}
				<div className="flex items-center gap-3">
					<Button variant="ghost" color="neutral" asChild>
						<Link href="#login">Log in</Link>
					</Button>
					<Button
						variant="strong"
						color="success"
						className="bg-[#9bf00b] font-semibold text-black hover:bg-[#8ee000]"
						asChild>
						<Link href="#get-started">Get started</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
