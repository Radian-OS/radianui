"use client"

import React, { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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

export function AgentlabNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="border-border/60 bg-bg/95 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/sandbox/agentlab"
					className="flex items-center gap-2.5 transition-opacity hover:underline hover:opacity-90">
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

				{/* Desktop Nav Links */}
				<nav className="hidden items-center gap-8 md:flex">
					{navLinks.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium transition-colors hover:underline">
							<span>{item.label}</span>
							{item.hasDropdown && (
								<ChevronDown className="text-fg-tertiary size-3.5" />
							)}
						</Link>
					))}
				</nav>

				{/* Right CTA */}
				<div className="hidden items-center gap-3 sm:flex">
					<Button
						variant="strong"
						color="neutral"
						size="36"
						className="rounded-md px-4 text-xs font-bold uppercase tracking-wider transition-transform active:scale-95">
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
				<div className="border-border/60 bg-bg border-b px-4 pb-6 pt-3 sm:hidden">
					<nav className="flex flex-col space-y-3">
						{navLinks.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								onClick={() => setMobileMenuOpen(false)}
								className="text-fg-secondary hover:text-fg flex items-center justify-between py-1.5 text-sm font-medium hover:underline">
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
								className="w-full rounded-md text-xs font-bold uppercase tracking-wider">
								<span>GET STARTED</span>
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
