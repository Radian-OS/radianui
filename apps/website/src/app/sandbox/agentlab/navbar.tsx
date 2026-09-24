"use client"

import React, { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
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

interface NavLinkItem {
	label: string
	href: string
	hasDropdown?: boolean
}

const navLinks: NavLinkItem[] = [
	{ label: "Product", href: "#product" },
	{ label: "Case Study", href: "#case-study" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Company", href: "#company", hasDropdown: true },
]

const companyLinks = [
	{
		label: "About Us",
		href: "#about",
		description: "Learn more about our mission and the team behind AgentLab.",
	},
	{
		label: "Security & Compliance",
		href: "#security",
		description: "SOC 2, GDPR, HIPAA enterprise-grade security standards.",
	},
	{
		label: "Industries",
		href: "#industry",
		description: "Explore AI agent solutions customized for your sector.",
	},
	{
		label: "Contact Sales",
		href: "#contact",
		description: "Speak with our enterprise AI solutions team.",
	},
]

export function AgentlabNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="border-border/60 bg-bg/95 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/sandbox/agentlab"
					className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
					<div className="relative flex size-6 items-center justify-center">
						<Image
							src="https://framerusercontent.com/images/qHjpjWRtd4BPA2HhIAgyBH8pjA.svg"
							alt="AgentLab Logo"
							width={24}
							height={24}
							className="size-6 object-contain"
							priority
						/>
					</div>
					<span className="text-fg font-heading text-xl font-bold tracking-tight">
						AgentLab
					</span>
				</Link>

				{/* Desktop Navigation Menu (Rule: use @/registry/ui/navigation-menu) */}
				<NavigationMenu viewport={false} className="hidden md:flex">
					<NavigationMenuList className="gap-1">
						{navLinks.map((item) =>
							item.hasDropdown ? (
								<NavigationMenuItem key={item.label}>
									<NavigationMenuTrigger className="hover:bg-fill1-alpha text-fg-secondary hover:text-fg bg-transparent text-sm font-medium transition-colors">
										{item.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent
										align="center"
										className="border-border/70 bg-elevation-level1 min-w-64 rounded-xl border p-2 shadow-xl backdrop-blur-md">
										<ul className="flex flex-col gap-1">
											{companyLinks.map((sub) => (
												<li key={sub.label}>
													<NavigationMenuLink
														asChild
														className="hover:bg-fill1-alpha flex flex-col gap-0.5 rounded-lg p-2.5 text-sm transition-colors">
														<Link href={sub.href}>
															<span className="text-fg font-semibold">
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
											"hover:bg-fill1-alpha text-fg-secondary hover:text-fg bg-transparent text-sm font-medium transition-colors"
										)}>
										<Link href={item.href}>{item.label}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							)
						)}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right CTA */}
				<div className="hidden items-center gap-3 sm:flex">
					<Button
						variant="strong"
						color="neutral"
						size="36"
						className="rounded-md px-4 text-xs font-bold tracking-wider uppercase transition-transform active:scale-95">
						<span>GET STARTED</span>
					</Button>
				</div>

				{/* Mobile Hamburger */}
				<button
					type="button"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					className="text-fg-secondary hover:text-fg border-border flex size-9 items-center justify-center rounded-md border sm:hidden">
					{mobileMenuOpen ? (
						<X className="size-5" />
					) : (
						<Menu className="size-5" />
					)}
				</button>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="border-border/60 bg-bg border-b px-4 pt-3 pb-6 sm:hidden">
					<nav className="flex flex-col space-y-3">
						{navLinks.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								onClick={() => setMobileMenuOpen(false)}
								className="text-fg-secondary hover:text-fg flex items-center justify-between py-1.5 text-sm font-medium">
								<span>{item.label}</span>
								{item.hasDropdown && (
									<ChevronDown className="text-fg-tertiary size-4" />
								)}
							</Link>
						))}
						<div className="pt-2">
							<Button
								variant="strong"
								color="neutral"
								size="36"
								className="w-full rounded-md text-xs font-bold tracking-wider uppercase">
								<span>GET STARTED</span>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
