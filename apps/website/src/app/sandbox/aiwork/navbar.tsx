"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight, Menu, X, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { Button } from "@/styles/default/ui/button"

interface NavItem {
	label: string
	href: string
	hasDropdown?: boolean
}

const navItems: NavItem[] = [
	{ label: "Pages", href: "#", hasDropdown: true },
	{ label: "About", href: "#about" },
	{ label: "Blog", href: "#blog" },
	{ label: "Pricing", href: "#pricing" },
]

const pagesDropdownItems = [
	{
		label: "Solutions",
		href: "#solutions",
		description: "Explore tailored AI solutions for engineering & operations.",
	},
	{
		label: "Automation",
		href: "#automation",
		description: "Autonomous workflow execution and intelligent triggers.",
	},
	{
		label: "Integrations",
		href: "#integrations",
		description: "Connect seamlessly with Slack, Jira, GitHub, and more.",
	},
	{
		label: "FAQ",
		href: "#faq",
		description: "Frequently asked questions about AIwork.",
	},
]

export function AiworkNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
			<nav className="border-border/80 bg-background/85 flex items-center justify-between rounded-full border px-5 py-2.5 shadow-sm backdrop-blur-md">
				{/* Brand Logo */}
				<Link
					href="/sandbox/aiwork"
					className="flex items-center gap-2.5 font-bold tracking-tight">
					<div className="bg-primary flex size-8 items-center justify-center rounded-lg shadow-sm">
						<Zap className="size-4 text-white" />
					</div>
					<span className="text-foreground text-base font-bold">AIwork</span>
				</Link>

				{/* Desktop Navigation Menu (Rule: use @/registry/ui/navigation-menu) */}
				<NavigationMenu viewport={false} className="hidden md:flex">
					<NavigationMenuList className="gap-2">
						{navItems.map((item) =>
							item.hasDropdown ? (
								<NavigationMenuItem key={item.label}>
									<NavigationMenuTrigger className="hover:bg-fill1-alpha text-fg-secondary hover:text-foreground bg-transparent text-sm font-medium transition-colors">
										{item.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent
										align="center"
										className="border-border/70 bg-elevation-level1 min-w-64 rounded-xl border p-2 shadow-xl backdrop-blur-md">
										<ul className="flex flex-col gap-1">
											{pagesDropdownItems.map((sub) => (
												<li key={sub.label}>
													<NavigationMenuLink
														asChild
														className="hover:bg-fill1-alpha flex flex-col gap-0.5 rounded-lg p-2.5 text-sm transition-colors">
														<Link href={sub.href}>
															<span className="text-foreground font-semibold">
																{sub.label}
															</span>
															<span className="text-fg-secondary text-xs">
																{sub.description}
															</span>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							) : (
								<NavigationMenuItem key={item.label}>
									<NavigationMenuLink
										asChild
										className={cn(
											navigationMenuTriggerStyle(),
											"hover:bg-fill1-alpha text-fg-secondary hover:text-foreground bg-transparent text-sm font-medium transition-colors"
										)}>
										<Link href={item.href}>{item.label}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							)
						)}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Desktop CTA Action */}
				<div className="hidden items-center gap-3 md:flex">
					<Button
						variant="outline"
						color="neutral"
						size="36"
						className="gap-1.5 rounded-full px-4 text-xs font-semibold">
						<span>Book a demo</span>
						<ChevronRight className="size-3.5" />
					</Button>
				</div>

				{/* Mobile Hamburger Toggle */}
				<div className="flex items-center md:hidden">
					<Button
						variant="ghost"
						color="neutral"
						size="32"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle Navigation">
						{mobileMenuOpen ? (
							<X className="size-5" />
						) : (
							<Menu className="size-5" />
						)}
					</Button>
				</div>
			</nav>

			{/* Mobile Dropdown Panel */}
			{mobileMenuOpen && (
				<div className="border-border bg-background/95 mt-2 flex flex-col gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-lg md:hidden">
					{navItems.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							onClick={() => setMobileMenuOpen(false)}
							className="text-fg-secondary hover:text-foreground py-2 text-sm font-medium hover:underline">
							{item.label}
						</Link>
					))}
					<div className="border-border/60 border-t pt-3">
						<Button
							variant="outline"
							color="neutral"
							size="36"
							className="w-full justify-center rounded-full text-xs font-semibold">
							<span>Book a demo</span>
							<ChevronRight className="size-3.5" />
						</Button>
					</div>
				</div>
			)}
		</header>
	)
}
