"use client"

import React, { useState } from "react"
import { Menu, Star, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

interface NavLinkItem {
	label: string
	href: string
}

const navLinks: NavLinkItem[] = [
	{ label: "Products", href: "#products" },
	{ label: "Features", href: "#features" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Blogs", href: "#blogs" },
]

export function OmrixNavbar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Brand Logo */}
				<Link
					href="/sandbox/omrix"
					className="flex items-center gap-2.5 font-bold tracking-tight hover:underline">
					<div className="bg-neutral shadow-xs flex size-8 items-center justify-center rounded-lg">
						<Star className="fill-neutral-fg text-neutral-fg size-4" />
					</div>
					<span className="text-foreground text-lg font-bold tracking-tight">
						OMRIX
					</span>
				</Link>

				{/* Desktop Navigation Links */}
				<nav className="hidden items-center gap-8 md:flex">
					{navLinks.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="text-fg-secondary hover:text-foreground text-sm font-medium transition-colors hover:underline">
							{item.label}
						</Link>
					))}
				</nav>

				{/* Desktop Action */}
				<div className="hidden items-center gap-3 md:flex">
					<Button
						variant="strong"
						color="neutral"
						size="36"
						className="shadow-xs rounded-xl px-5 text-xs font-semibold transition-all hover:scale-105 active:scale-95">
						<span>Book a Demo</span>
					</Button>
				</div>

				{/* Mobile Hamburger Toggle */}
				<div className="flex items-center md:hidden">
					<Button
						variant="ghost"
						color="neutral"
						size="32"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle navigation menu">
						{isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
					</Button>
				</div>
			</div>

			{/* Mobile Dropdown Panel */}
			{isOpen && (
				<div className="border-border bg-background/95 border-b px-4 pb-6 pt-2 shadow-xl backdrop-blur-lg md:hidden">
					<nav className="flex flex-col gap-3">
						{navLinks.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className="text-fg-secondary hover:text-foreground py-2 text-sm font-medium hover:underline">
								{item.label}
							</Link>
						))}
						<div className="border-border/60 mt-2 border-t pt-4">
							<Button
								variant="strong"
								color="neutral"
								size="36"
								className="w-full justify-center rounded-xl text-xs font-semibold">
								<span>Book a Demo</span>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
