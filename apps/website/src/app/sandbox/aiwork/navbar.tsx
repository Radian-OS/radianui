"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight, Menu, X, Zap } from "lucide-react"
import Link from "next/link"
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

export function AiworkNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
			<nav className="border-border/80 bg-background/85 flex items-center justify-between rounded-full border px-5 py-2.5 shadow-sm backdrop-blur-md">
				{/* Brand Logo */}
				<Link
					href="/sandbox/aiwork"
					className="flex items-center gap-2.5 font-bold tracking-tight hover:underline">
					<div className="bg-primary flex size-8 items-center justify-center rounded-lg shadow-sm">
						<Zap className="size-4 text-white" />
					</div>
					<span className="text-foreground text-base font-bold">AIwork</span>
				</Link>

				{/* Desktop Nav Links */}
				<div className="hidden items-center gap-7 md:flex">
					{navItems.map((item) => (
						<div key={item.label} className="group relative flex items-center">
							<Link
								href={item.href}
								className="text-fg-secondary hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors hover:underline">
								<span>{item.label}</span>
								{item.hasDropdown && (
									<ChevronDown className="size-3.5 opacity-70 transition-transform group-hover:rotate-180" />
								)}
							</Link>
						</div>
					))}
				</div>

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
