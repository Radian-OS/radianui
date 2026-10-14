"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
	ChartColumn,
	Workflow,
	Plug,
	ShieldCheck,
	Users,
	FileText,
	ArrowRight,
	ChevronDown,
	Menu,
	X,
} from "lucide-react"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { Button } from "@/registry/ui/button"
import { Badge } from "@/registry/ui/badge"
import { Card, CardTitle, CardDescription } from "@/registry/ui/card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import {
	PLATFORM_SECTION,
	BY_TEAM_SECTION,
	CALLOUT_CARD_DATA,
	DIRECT_NAV_LINKS,
	type MegaMenuItem,
} from "./types"

const navItemStyles = cn(
	navigationMenuTriggerStyle(),
	"text-fg-secondary h-9 cursor-pointer rounded-md bg-transparent p-0 px-3 text-sm font-medium transition-colors",
	"inline-flex flex-row items-center justify-center gap-1",
	"hover:bg-fill1-alpha hover:text-fg",
	"focus:bg-fill1-alpha focus:text-fg"
)

function getMenuIcon(icon: MegaMenuItem["icon"]) {
	switch (icon) {
		case "analytics":
			return <ChartColumn className="size-4" />
		case "automation":
			return <Workflow className="size-4" />
		case "integrations":
			return <Plug className="size-4" />
		case "security":
			return <ShieldCheck className="size-4" />
		case "marketing":
			return <Users className="size-4" />
		case "product":
			return <FileText className="size-4" />
	}
}

export function Navbar() {
	const [isProductOpen, setIsProductOpen] = useState(true)
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<header className="border-border bg-bg/95 sticky top-0 z-50 w-full border-b backdrop-blur-md">
			{/* Top Navbar Row */}
			<div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 md:px-6 2xl:max-w-[1400px]">
				{/* Left: Brand Logo */}
				<Link
					href="#home"
					className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-85"
					aria-label="Acme Home">
					<span className="bg-fg text-bg flex size-7 items-center justify-center rounded-md text-sm font-bold">
						A
					</span>
					<span className="text-fg text-base font-semibold tracking-tight">
						Acme
					</span>
				</Link>

				{/* Center: Navigation Menu */}
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList className="flex list-none items-center gap-1">
						{/* Product Item (Toggle Mega Menu) */}
						<NavigationMenuItem>
							<button
								type="button"
								onClick={() => setIsProductOpen(!isProductOpen)}
								aria-expanded={isProductOpen}
								className={cn(
									navItemStyles,
									isProductOpen && "bg-fill1-alpha text-fg"
								)}>
								<span>Product</span>
								<ChevronDown
									className={cn(
										"size-3.5 transition-transform duration-200",
										isProductOpen && "rotate-180"
									)}
									aria-hidden="true"
								/>
							</button>
						</NavigationMenuItem>

						{/* Direct Links Without Chevron */}
						{DIRECT_NAV_LINKS.map((link) => (
							<NavigationMenuItem key={link.label}>
								<NavigationMenuLink asChild className={navItemStyles}>
									<Link href={link.href}>{link.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right: Actions */}
				<div className="hidden shrink-0 items-center gap-2 lg:flex">
					<Button
						variant="ghost"
						color="neutral"
						size="sm"
						className="h-8 px-2.5 text-sm font-medium"
						asChild>
						<Link href="#sign-in">Sign in</Link>
					</Button>
					<Button
						variant="strong"
						color="neutral"
						size="sm"
						className="h-8 rounded-md px-2.5 text-sm font-medium"
						asChild>
						<Link href="#get-started">Get started</Link>
					</Button>
				</div>

				{/* Mobile Menu Trigger */}
				<div className="flex lg:hidden">
					<Button
						variant="ghost"
						color="neutral"
						size="sm"
						className="size-9 p-0"
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

			{/* Desktop Mega Menu Dropdown Section */}
			<AnimatePresence>
				{isProductOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.18, ease: "easeInOut" }}
						className="border-border bg-bg/95 hidden overflow-hidden border-t backdrop-blur-md lg:block">
						<div className="mx-auto grid grid-cols-[1fr_1fr_300px] gap-10 px-4 py-8 md:px-6 2xl:max-w-[1400px]">
							{/* Column 1: Platform */}
							<div>
								<p className="text-fg-tertiary text-xs font-medium tracking-wider uppercase">
									{PLATFORM_SECTION.heading}
								</p>
								<ul className="mt-4 space-y-1">
									{PLATFORM_SECTION.items.map((item) => (
										<li key={item.title}>
											<Link
												href={item.href}
												className="hover:bg-fill1-alpha group flex items-start gap-3 rounded-lg p-2 transition-colors">
												<span className="bg-fill1 text-fg group-hover:bg-card flex size-9 shrink-0 items-center justify-center rounded-md transition-colors group-hover:shadow-xs">
													{getMenuIcon(item.icon)}
												</span>
												<span className="flex flex-col">
													<span className="text-fg group-hover:text-primary block text-sm font-medium transition-colors">
														{item.title}
													</span>
													<span className="text-fg-secondary mt-0.5 block text-xs">
														{item.description}
													</span>
												</span>
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Column 2: By team */}
							<div>
								<p className="text-fg-tertiary text-xs font-medium tracking-wider uppercase">
									{BY_TEAM_SECTION.heading}
								</p>
								<ul className="mt-4 space-y-1">
									{BY_TEAM_SECTION.items.map((item) => (
										<li key={item.title}>
											<Link
												href={item.href}
												className="hover:bg-fill1-alpha group flex items-start gap-3 rounded-lg p-2 transition-colors">
												<span className="bg-fill1 text-fg group-hover:bg-card flex size-9 shrink-0 items-center justify-center rounded-md transition-colors group-hover:shadow-xs">
													{getMenuIcon(item.icon)}
												</span>
												<span className="flex flex-col">
													<span className="text-fg group-hover:text-primary block text-sm font-medium transition-colors">
														{item.title}
													</span>
													<span className="text-fg-secondary mt-0.5 block text-xs">
														{item.description}
													</span>
												</span>
											</Link>
										</li>
									))}
								</ul>
								<Button
									variant="link"
									color="neutral"
									asChild
									className="text-fg hover:text-primary group mt-4 inline-flex items-center gap-1.5 rounded-lg p-2 text-sm font-medium">
									<Link href="#use-cases">
										<span>Browse all use cases</span>
										<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
									</Link>
								</Button>
							</div>

							{/* Column 3: Callout Card (Rule: use Card & Badge) */}
							<Card className="border-border bg-fill1 gap-0 rounded-lg border p-5 shadow-none">
								<Badge
									variant="soft"
									color="neutral"
									size="sm"
									className="rounded-full px-2 py-0.5 text-xs font-medium">
									{CALLOUT_CARD_DATA.badge}
								</Badge>
								<CardTitle className="text-fg mt-3 text-sm font-semibold">
									{CALLOUT_CARD_DATA.title}
								</CardTitle>
								<CardDescription className="text-fg-secondary mt-1.5 text-sm leading-relaxed">
									{CALLOUT_CARD_DATA.description}
								</CardDescription>
								<Button
									variant="link"
									color="neutral"
									asChild
									className="text-fg hover:text-primary group mt-4 inline-flex items-center gap-1.5 p-0 text-sm font-medium">
									<Link href={CALLOUT_CARD_DATA.ctaHref}>
										<span>{CALLOUT_CARD_DATA.ctaText}</span>
										<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
									</Link>
								</Button>
							</Card>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Mobile Dropdown Panel */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="border-border bg-bg overflow-hidden border-t px-4 py-6 shadow-lg lg:hidden">
						<div className="flex flex-col gap-6">
							{/* Platform items */}
							<div>
								<p className="text-fg-tertiary text-xs font-semibold tracking-wider uppercase">
									{PLATFORM_SECTION.heading}
								</p>
								<div className="mt-3 flex flex-col gap-1">
									{PLATFORM_SECTION.items.map((item) => (
										<Link
											key={item.title}
											href={item.href}
											onClick={() => setMobileOpen(false)}
											className="hover:bg-fill1-alpha flex items-center gap-3 rounded-lg p-2 transition-colors">
											<span className="bg-fill1 text-fg flex size-8 shrink-0 items-center justify-center rounded-md">
												{getMenuIcon(item.icon)}
											</span>
											<div>
												<span className="text-fg block text-sm font-medium">
													{item.title}
												</span>
												<span className="text-fg-secondary block text-xs">
													{item.description}
												</span>
											</div>
										</Link>
									))}
								</div>
							</div>

							{/* By Team */}
							<div>
								<p className="text-fg-tertiary text-xs font-semibold tracking-wider uppercase">
									{BY_TEAM_SECTION.heading}
								</p>
								<div className="mt-3 flex flex-col gap-1">
									{BY_TEAM_SECTION.items.map((item) => (
										<Link
											key={item.title}
											href={item.href}
											onClick={() => setMobileOpen(false)}
											className="hover:bg-fill1-alpha flex items-center gap-3 rounded-lg p-2 transition-colors">
											<span className="bg-fill1 text-fg flex size-8 shrink-0 items-center justify-center rounded-md">
												{getMenuIcon(item.icon)}
											</span>
											<div>
												<span className="text-fg block text-sm font-medium">
													{item.title}
												</span>
												<span className="text-fg-secondary block text-xs">
													{item.description}
												</span>
											</div>
										</Link>
									))}
								</div>
							</div>

							{/* Direct Links */}
							<div className="border-border flex flex-col gap-1 border-t pt-4">
								{DIRECT_NAV_LINKS.map((link) => (
									<Link
										key={link.label}
										href={link.href}
										onClick={() => setMobileOpen(false)}
										className="text-fg-secondary hover:text-fg hover:bg-fill1-alpha rounded-md px-2 py-2 text-sm font-medium transition-colors">
										{link.label}
									</Link>
								))}
							</div>

							{/* Callout Card on Mobile */}
							<Card className="border-border bg-fill1 rounded-lg border p-4 shadow-none">
								<Badge
									variant="soft"
									color="neutral"
									size="sm"
									className="rounded-full px-2 py-0.5 text-xs font-medium">
									{CALLOUT_CARD_DATA.badge}
								</Badge>
								<CardTitle className="text-fg mt-2 text-sm font-semibold">
									{CALLOUT_CARD_DATA.title}
								</CardTitle>
								<CardDescription className="text-fg-secondary mt-1 text-xs leading-relaxed">
									{CALLOUT_CARD_DATA.description}
								</CardDescription>
							</Card>

							{/* Mobile CTA Buttons */}
							<div className="flex flex-col gap-2 pt-2">
								<Button
									variant="outline"
									color="neutral"
									size="md"
									className="w-full text-sm font-medium"
									asChild>
									<Link href="#sign-in" onClick={() => setMobileOpen(false)}>
										Sign in
									</Link>
								</Button>
								<Button
									variant="strong"
									color="neutral"
									size="md"
									className="w-full text-sm font-medium"
									asChild>
									<Link
										href="#get-started"
										onClick={() => setMobileOpen(false)}>
										Get started
									</Link>
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}
