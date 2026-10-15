"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { cn } from "@/lib/utils"
import type { NavItem } from "./types"

const NAV_ITEMS: NavItem[] = [
	{ value: "integration", label: "Integration", href: "#integration" },
	{ value: "features", label: "Features", href: "#features" },
	{ value: "support", label: "Support", href: "#support" },
	{ value: "docs", label: "Docs", href: "#docs" },
]

export function Navbar() {
	const [activeTab, setActiveTab] = useState("features")
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="bg-bg w-full">
			<nav className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
				<div className="border-border flex items-center justify-between border-x px-4 py-4 lg:px-10">
					{/* Left Group: Brand Logo & Navigation Menu */}
					<div className="flex items-center gap-6 lg:gap-8">
						{/* Brand Logo */}
						<Link
							href="#hero"
							className="flex w-fit shrink-0 items-center gap-2">
							<Image
								src="/logo.svg"
								alt="Radian"
								width={32}
								height={32}
								className="size-8 shrink-0"
							/>
							<h1 className="heading-6">Radian</h1>
						</Link>

						{/* Desktop Navigation Menu (Rule 1: use @/registry/ui/navigation-menu) */}
						<NavigationMenu viewport={false} className="hidden lg:flex">
							<NavigationMenuList className="gap-1">
								{NAV_ITEMS.map((item) => (
									<NavigationMenuItem key={item.value}>
										<NavigationMenuLink
											asChild
											active={item.value === activeTab}
											className={cn(
												navigationMenuTriggerStyle(),
												"text-fg-secondary hover:text-fg hover:bg-fill2 bg-transparent text-sm font-medium transition-colors",
												item.value === activeTab && "bg-fill2 text-fg"
											)}>
											<Link
												href={item.href || "#"}
												onClick={() => setActiveTab(item.value)}>
												{item.label}
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Right Action Buttons */}
					<div className="hidden items-center gap-2.5 lg:flex">
						<Button
							variant="outline"
							color="neutral"
							size="md"
							asChild
							className="rounded-full px-4 text-xs font-medium">
							<Link href="#get-started">Get Started</Link>
						</Button>

						<Button
							variant="strong"
							color="neutral"
							size="md"
							asChild
							className="gap-1.5 rounded-full px-4 text-xs font-medium">
							<Link href="#book-demo">
								<span>Book a Demo</span>
								<ChevronRight className="size-3.5" />
							</Link>
						</Button>
					</div>

					{/* Mobile Menu Toggle Button */}
					<div className="flex lg:hidden">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="md"
							className="rounded-full p-2"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle Navigation Menu">
							{mobileMenuOpen ? (
								<X className="size-4" />
							) : (
								<Menu className="size-4" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Dropdown Menu */}
				{mobileMenuOpen && (
					<div className="border-border bg-bg flex flex-col gap-4 border-x border-b px-6 py-4 lg:hidden">
						<div className="flex flex-col gap-2">
							{NAV_ITEMS.map((item) => (
								<Link
									key={item.value}
									href={item.href || "#"}
									onClick={() => {
										setActiveTab(item.value)
										setMobileMenuOpen(false)
									}}
									className={cn(
										"rounded-lg px-3 py-2 text-sm font-medium transition-colors",
										activeTab === item.value
											? "bg-fill2 text-fg"
											: "text-fg-secondary hover:text-fg"
									)}>
									{item.label}
								</Link>
							))}
						</div>

						<div className="border-border flex flex-col gap-2 border-t pt-2">
							<Button
								variant="outline"
								color="neutral"
								size="md"
								asChild
								className="w-full rounded-full text-xs font-medium">
								<Link href="#get-started">Get Started</Link>
							</Button>
							<Button
								variant="strong"
								color="neutral"
								size="md"
								asChild
								className="w-full justify-center gap-1.5 rounded-full text-xs font-medium">
								<Link href="#book-demo">
									<span>Book a Demo</span>
									<ChevronRight className="size-3.5" />
								</Link>
							</Button>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}
