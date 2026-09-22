"use client"

import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { Button } from "@/styles/default/ui/button"

interface NavItem {
	label: string
	href: string
}

const navItems: NavItem[] = [
	{ label: "Features", href: "#features" },
	{ label: "Product", href: "#product" },
	{ label: "Customers", href: "#customers" },
	{ label: "Resources", href: "#resources" },
	{ label: "Pricing", href: "#pricing" },
]

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<header className="border-border/60 bg-bg/90 sticky top-0 z-50 w-full border-b backdrop-blur-md">
			<div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Brand Logo */}
				<Link
					href="/sandbox/zentra"
					className="flex items-center gap-2.5 font-bold tracking-tight transition-opacity hover:opacity-90">
					<div className="bg-primary/10 flex size-9 items-center justify-center overflow-hidden rounded-lg">
						<Image
							src="/sandbox/placeholder.svg"
							alt="Zentra"
							width={32}
							height={32}
							className="size-7 object-contain"
						/>
					</div>
					<span className="text-fg text-xl font-bold tracking-tight">
						Zentra
					</span>
				</Link>

				{/* Desktop Navigation Menu (Registry NavigationMenu rule) */}
				<NavigationMenu viewport={false} className="hidden md:flex">
					<NavigationMenuList className="gap-1">
						{navItems.map((item) => (
							<NavigationMenuItem key={item.label}>
								<NavigationMenuLink
									asChild
									className={cn(
										navigationMenuTriggerStyle(),
										"text-fg-secondary hover:text-fg hover:bg-fill1-alpha bg-transparent text-sm font-medium transition-colors"
									)}>
									<Link href={item.href}>{item.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right CTA Buttons (Rule: explicit color prop) */}
				<div className="hidden items-center gap-3 md:flex">
					<Button variant="ghost" color="neutral" asChild>
						<Link href="#login">Login</Link>
					</Button>
					<Button variant="strong" color="primary" asChild>
						<Link href="#get-started">Get Started</Link>
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<div className="flex md:hidden">
					<Button
						variant="ghost"
						color="neutral"
						size="36"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label={mobileOpen ? "Close menu" : "Open menu"}>
						{mobileOpen ? (
							<X className="size-5" />
						) : (
							<Menu className="size-5" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Dropdown */}
			{mobileOpen && (
				<div className="border-border/60 bg-bg border-b px-4 pt-2 pb-6 md:hidden">
					<nav className="flex flex-col gap-2">
						{navItems.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className="text-fg-secondary hover:text-fg hover:bg-fill1-alpha rounded-md px-3 py-2 text-sm font-medium transition-colors">
								{item.label}
							</Link>
						))}
						<div className="mt-4 flex flex-col gap-2 border-t pt-4">
							<Button
								variant="outline"
								color="neutral"
								asChild
								className="w-full justify-center">
								<Link href="#login">Login</Link>
							</Button>
							<Button
								variant="strong"
								color="primary"
								asChild
								className="w-full justify-center">
								<Link href="#get-started">Get Started</Link>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
