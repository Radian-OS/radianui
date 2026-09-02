"use client"

import React, { useState } from "react"
import { ChevronRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

interface NavLink {
	label: string
	href: string
}

const navLinks: NavLink[] = [
	{ label: "Services", href: "#services" },
	{ label: "Work", href: "#work" },
	{ label: "Pricing", href: "#pricing" },
]

export function HeroNavbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<header className="bg-background/80 sticky top-0 z-30 w-full backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-8 lg:px-16">
				<nav className="bg-fill2/80 shadow-xs flex w-full items-center justify-between rounded-full p-1.5 pl-3 pr-2 backdrop-blur-md md:w-auto md:gap-6">
					{/* Brand Logo */}
					<Link
						href="#"
						className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 hover:underline">
						<div className="bg-foreground text-background flex size-7 items-center justify-center rounded-full">
							<Image
								src="https://images.shadcnspace.com/favicon.ico"
								alt="Logo"
								width={18}
								height={18}
								className="size-4.5 rounded-full invert dark:invert-0"
							/>
						</div>
						<span className="text-foreground text-sm font-bold tracking-tight">
							shadcnspace<span className="text-primary">.</span>
						</span>
					</Link>

					{/* Desktop Navigation Links */}
					<div className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="text-fg-secondary hover:text-foreground rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:underline">
								{link.label}
							</Link>
						))}
					</div>

					{/* Desktop CTA Button */}
					<div className="hidden md:block">
						<Button
							variant="strong"
							color="neutral"
							size="36"
							className="group rounded-full px-5 text-sm font-semibold"
							asChild>
							<Link
								href="#"
								className="flex items-center gap-1 hover:underline">
								<span>Get Started</span>
								<ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
							</Link>
						</Button>
					</div>

					{/* Mobile Menu Trigger Button */}
					<div className="flex md:hidden">
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							className="rounded-full"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle Navigation Menu">
							{isMobileMenuOpen ? (
								<X className="size-4" />
							) : (
								<Menu className="size-4" />
							)}
						</Button>
					</div>
				</nav>
			</div>

			{/* Mobile Dropdown Menu */}
			{isMobileMenuOpen && (
				<div className="border-border bg-background border-b px-6 py-4 shadow-lg md:hidden">
					<div className="flex flex-col gap-3">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className="text-fg-secondary hover:text-foreground text-sm font-medium hover:underline">
								{link.label}
							</Link>
						))}
						<div className="pt-2">
							<Button
								variant="strong"
								color="neutral"
								size="36"
								className="w-full justify-center rounded-full"
								asChild>
								<Link
									href="#"
									className="flex items-center gap-1 hover:underline">
									<span>Get Started</span>
									<ChevronRight className="size-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
