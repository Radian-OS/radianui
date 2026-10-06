"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/styles/default/ui/tabs"
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
					{/* Left Group: Brand Logo & Navigation Tabs */}
					<div className="flex items-center gap-6 lg:gap-8">
						{/* Brand Logo */}
						<Link href="#" className="flex items-center gap-2.5">
							<div className="bg-fg text-bg flex size-8 items-center justify-center rounded-full text-sm font-bold shadow-xs">
								S
							</div>
							<span className="text-fg text-base font-bold tracking-tight">
								shadcnspace.
							</span>
						</Link>

						{/* Navigation using canonical Tabs component */}
						<div className="hidden lg:flex">
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="w-auto">
								<TabsList
									variant="ghost"
									className="bg-fill2 gap-0 rounded-full p-0.5 data-[orientation=horizontal]:h-auto"
									style={{ borderRadius: "9999px" }}>
									{NAV_ITEMS.map((item) => (
										<TabsTrigger
											key={item.value}
											value={item.value}
											className="text-fg-secondary hover:text-fg data-[state=active]:bg-card data-[state=active]:text-fg rounded-full! px-4 py-1.5 text-sm font-medium transition-all data-[orientation=horizontal]:h-auto data-[state=active]:rounded-full! data-[state=active]:shadow-xs"
											style={{ borderRadius: "9999px" }}>
											{item.label}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						</div>
					</div>

					{/* Right Action Buttons */}
					<div className="hidden items-center gap-2.5 lg:flex">
						<Button
							variant="outline"
							color="neutral"
							size="36"
							asChild
							className="rounded-full px-4 text-xs font-medium">
							<Link href="#get-started">Get Started</Link>
						</Button>

						<Button
							variant="strong"
							color="neutral"
							size="36"
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
							size="36"
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
									onClick={() => setMobileMenuOpen(false)}
									className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
										activeTab === item.value
											? "bg-fill2 text-fg"
											: "text-fg-secondary hover:text-fg"
									}`}>
									{item.label}
								</Link>
							))}
						</div>

						<div className="border-border flex flex-col gap-2 border-t pt-2">
							<Button
								variant="outline"
								color="neutral"
								size="36"
								asChild
								className="w-full rounded-full text-xs font-medium">
								<Link href="#get-started">Get Started</Link>
							</Button>
							<Button
								variant="strong"
								color="neutral"
								size="36"
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
