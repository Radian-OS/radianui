"use client"

import React, { useState } from "react"
import { Menu, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

interface NavItem {
	label: string
	href: string
}

const navItems: NavItem[] = [
	{ label: "Product", href: "#product" },
	{ label: "Use Cases", href: "#use-cases" },
	{ label: "Examples", href: "#examples" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Contact Us", href: "#contact" },
]

export function VerseoNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				{/* Verseo Brand Logo */}
				<Link
					href="/sandbox/verseo"
					className="text-foreground flex items-center gap-2 text-base font-black uppercase tracking-wider transition-opacity hover:opacity-90">
					<div className="bg-foreground text-background flex size-7 items-center justify-center rounded-lg">
						<Sparkles className="fill-background text-background size-4" />
					</div>
					<span>VERSEO</span>
				</Link>

				{/* Desktop Navigation Links (Rule 11: hover:underline, Rule 18: map) */}
				<nav className="hidden items-center gap-7 md:flex">
					{navItems.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="text-fg-secondary hover:text-foreground text-sm font-medium transition-colors hover:underline">
							{item.label}
						</Link>
					))}
				</nav>

				{/* Right CTA Button (Rule 15: explicit color prop) */}
				<div className="hidden items-center gap-3 md:flex">
					<Button
						variant="strong"
						color="primary"
						size="36"
						className="rounded-lg px-4 text-xs font-bold tracking-tight shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]">
						<span>Get Template Free</span>
					</Button>
				</div>

				{/* Mobile Menu Toggle (Rule 15: explicit color prop) */}
				<div className="flex items-center md:hidden">
					<Button
						variant="ghost"
						color="neutral"
						size="36"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle Navigation Menu">
						{mobileMenuOpen ? (
							<X className="size-5" />
						) : (
							<Menu className="size-5" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			{mobileMenuOpen && (
				<div className="border-border/60 bg-background/95 border-b px-4 pb-6 pt-2 backdrop-blur-xl md:hidden">
					<nav className="flex flex-col space-y-3">
						{navItems.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								onClick={() => setMobileMenuOpen(false)}
								className="text-fg-secondary hover:text-foreground text-sm font-medium transition-colors hover:underline">
								{item.label}
							</Link>
						))}
						<div className="pt-3">
							<Button
								variant="strong"
								color="primary"
								size="36"
								className="w-full justify-center rounded-lg text-xs font-bold">
								<span>Get Template Free</span>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
