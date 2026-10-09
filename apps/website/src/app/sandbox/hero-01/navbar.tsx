"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from "@/registry/ui/navigation-menu"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Button, IconButton } from "@/styles/default/ui/button"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { DEFAULT_NAV_ITEMS } from "./data"
import type { NavItem } from "./types"

function BrandLogo() {
	return (
		<Link href="#hero" className="flex w-fit shrink-0 items-center gap-2">
			<Image
				src="/logo.svg"
				alt="Radian"
				width={32}
				height={32}
				className="size-8 shrink-0"
			/>
			<h1 className="heading-6">Radian</h1>
		</Link>
	)
}

interface NavbarProps {
	items?: NavItem[]
	ctaHref?: string
}

export function Navbar({
	items = DEFAULT_NAV_ITEMS,
	ctaHref = "#get-started",
}: NavbarProps) {
	const [activeTab, setActiveTab] = useState("Home")

	return (
		<header className="fixed top-0 z-50 w-full">
			<div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-8 lg:px-16">
				<nav className="border-soft flex items-center justify-between gap-4 rounded-2xl border px-4 py-2 backdrop-blur-md">
					{/* Brand Logo */}
					<BrandLogo />

					{/* Navigation using canonical Radian UI NavigationMenu with smooth active indicator */}
					<div className="hidden items-center lg:flex">
						<NavigationMenu viewport={false}>
							<NavigationMenuList className="gap-1">
								{items.map((item) => {
									const isActive = activeTab === item.name
									return (
										<NavigationMenuItem key={item.name}>
											<NavigationMenuLink
												asChild
												active={isActive}
												className={cn(
													"relative cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors select-none",
													isActive
														? "text-fg"
														: "text-fg-secondary hover:bg-fill3"
												)}>
												<Link
													href={item.href}
													onClick={(e) => {
														setActiveTab(item.name)
														if (
															item.href.startsWith("#") &&
															item.href.length > 1
														) {
															const el = document.querySelector(item.href)
															if (el) {
																e.preventDefault()
																el.scrollIntoView({ behavior: "smooth" })
															}
														}
													}}>
													{isActive && (
														<motion.span
															layoutId="navbar-active-indicator"
															className="bg-fill3 absolute inset-0 rounded-lg"
															transition={{
																type: "spring",
																stiffness: 380,
																damping: 30,
															}}
														/>
													)}
													<span className="relative z-10">{item.name}</span>
												</Link>
											</NavigationMenuLink>
										</NavigationMenuItem>
									)
								})}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* CTA Button and Mobile Menu Toggle */}
					<div className="flex shrink-0 items-center gap-2">
						<Button asChild>
							<Link href={ctaHref}>Get started</Link>
						</Button>

						{/* Mobile Menu Dropdown */}
						<div className="lg:hidden">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<IconButton
										variant="outline"
										color="neutral"
										aria-label="Toggle navigation menu">
										<Menu className="size-4" />
									</IconButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-48"
									sideOffset={12}>
									{items.map((item) => {
										const isActive = activeTab === item.name
										return (
											<DropdownMenuItem key={item.name} asChild>
												<Link
													href={item.href}
													onClick={(e) => {
														setActiveTab(item.name)
														if (
															item.href.startsWith("#") &&
															item.href.length > 1
														) {
															const el = document.querySelector(item.href)
															if (el) {
																e.preventDefault()
																el.scrollIntoView({ behavior: "smooth" })
															}
														}
													}}
													className={cn(
														"cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors",
														isActive ? "bg-fg/5 text-fg" : "text-fg-secondary"
													)}>
													{item.name}
												</Link>
											</DropdownMenuItem>
										)
									})}
									<div className="border-t pt-2">
										<Button asChild className="w-full">
											<Link href={ctaHref}>Get started</Link>
										</Button>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</nav>
			</div>
		</header>
	)
}
