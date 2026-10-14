"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"
import {
	PLATFORM_MENU_DATA,
	RESOURCES_MENU_DATA,
	DIRECT_NAV_LINKS,
} from "./types"

const navItemStyles = cn(
	navigationMenuTriggerStyle(),
	"text-fg-secondary h-8.5 rounded-lg bg-transparent p-0 px-3 text-[14px] font-medium transition-colors",
	"inline-flex flex-row items-center justify-center gap-0",
	"hover:bg-fill1-alpha hover:text-fg",
	"focus:bg-fill1-alpha focus:text-fg",
	"data-[state=open]:bg-fill1-alpha data-[state=open]:text-fg"
)

export function Navbar() {
	return (
		<header className="border-border bg-bg/95 sticky top-0 z-50 w-full border-b backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Left: Brand Logo & Navigation Links */}
				<div className="flex items-center gap-7">
					{/* Logo */}
					<Link
						href="#home"
						className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
						aria-label="Attio Home">
						<Image
							src="https://www.google.com/s2/favicons?sz=64&domain=attio.com"
							alt="Attio logo"
							width={22}
							height={22}
							className="size-5.5 rounded-md object-contain"
						/>
						<span className="text-fg text-xl font-bold tracking-tight">
							attio
						</span>
					</Link>

					{/* Navigation Menu */}
					<NavigationMenu viewport={false} className="hidden md:flex">
						<NavigationMenuList className="flex list-none items-center gap-1">
							{/* 1. Platform (With Chevron & Megamenu) */}
							<NavigationMenuItem className="relative">
								<NavigationMenuTrigger className={navItemStyles}>
									Platform
								</NavigationMenuTrigger>
								<NavigationMenuContent
									align="left"
									className="!mt-2 !border-0 !bg-transparent !p-0 !shadow-none">
									<div className="border-border bg-elevation-level1 flex w-[1010px] max-w-[calc(100vw-2rem)] rounded-2xl border p-2 shadow-2xl">
										{/* Main 3 Columns */}
										<div className="grid flex-1 grid-cols-3 gap-x-8 pt-4 pr-4 pb-5 pl-6">
											{PLATFORM_MENU_DATA.sections.map((section) => (
												<div key={section.heading} className="flex flex-col">
													<span className="text-fg-tertiary text-[13px] leading-none font-medium">
														{section.heading}
													</span>
													<div className="mt-4 flex flex-col gap-[18px]">
														{section.items.map((item) => (
															<Link
																key={item.title}
																href={item.href}
																className="group flex flex-col transition-colors">
																<span className="text-fg group-hover:text-primary text-[14px] leading-tight font-medium transition-colors">
																	{item.title}
																</span>
																{item.description && (
																	<span className="text-fg-secondary mt-0.5 text-[13px] leading-normal transition-colors">
																		{item.description}
																	</span>
																)}
															</Link>
														))}
													</div>
												</div>
											))}
										</div>

										{/* Right Sidebar Panel */}
										<div className="bg-fill1 w-[240px] shrink-0 rounded-xl px-5 py-4">
											{/* Attio for */}
											<div className="flex flex-col">
												<span className="text-fg-tertiary text-[13px] leading-none font-medium">
													Attio for
												</span>
												<div className="mt-4 flex flex-col gap-3.5">
													{PLATFORM_MENU_DATA.sidebar.attioFor.map((item) => (
														<Link
															key={item.label}
															href={item.href}
															className="text-fg-secondary hover:text-fg text-[14px] leading-tight font-medium transition-colors">
															{item.label}
														</Link>
													))}
												</div>
											</div>

											{/* Get started */}
											<div className="mt-7 flex flex-col">
												<span className="text-fg-tertiary text-[13px] leading-none font-medium">
													Get started
												</span>
												<div className="mt-4 flex flex-col gap-3.5">
													{PLATFORM_MENU_DATA.sidebar.getStarted.map((item) => (
														<Link
															key={item.label}
															href={item.href}
															className="text-fg-secondary hover:text-fg text-[14px] font-medium transition-colors">
															{item.label}
														</Link>
													))}
												</div>
											</div>
										</div>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							{/* 2. Resources (With Chevron & Menu) */}
							<NavigationMenuItem className="relative">
								<NavigationMenuTrigger className={navItemStyles}>
									Resources
								</NavigationMenuTrigger>
								<NavigationMenuContent
									align="left"
									className="!mt-2 !border-0 !bg-transparent !p-0 !shadow-none">
									<div className="border-border bg-elevation-level1 flex w-[540px] max-w-[calc(100vw-2rem)] rounded-2xl border p-2 shadow-2xl">
										{/* Column 1: Support */}
										<div className="flex flex-1 flex-col pt-4 pr-5 pb-5 pl-6">
											<div className="flex flex-col">
												<span className="text-fg-tertiary text-[13px] leading-none font-medium">
													{RESOURCES_MENU_DATA.support.heading}
												</span>
												<div className="mt-4 flex flex-col gap-[18px]">
													{RESOURCES_MENU_DATA.support.items.map((item) => (
														<Link
															key={item.title}
															href={item.href}
															className="group flex flex-col transition-colors">
															<span className="text-fg group-hover:text-primary text-[14px] leading-tight font-medium transition-colors">
																{item.title}
															</span>
															{item.description && (
																<span className="text-fg-secondary mt-0.5 text-[13px] leading-normal transition-colors">
																	{item.description}
																</span>
															)}
														</Link>
													))}
												</div>
											</div>
										</div>

										{/* Column 2: Partners & Company in Gray Panel */}
										<div className="bg-fill1 w-[240px] shrink-0 rounded-xl px-5 py-4">
											{/* Partners */}
											<div className="flex flex-col">
												<span className="text-fg-tertiary text-[13px] leading-none font-medium">
													Partners
												</span>
												<div className="mt-4 flex flex-col gap-3.5">
													{RESOURCES_MENU_DATA.partners.map((item) => (
														<Link
															key={item.label}
															href={item.href}
															className="text-fg-secondary hover:text-fg text-[14px] leading-tight font-medium transition-colors">
															{item.label}
														</Link>
													))}
												</div>
											</div>

											{/* Company */}
											<div className="mt-7 flex flex-col">
												<span className="text-fg-tertiary text-[13px] leading-none font-medium">
													Company
												</span>
												<div className="mt-4 flex flex-col gap-3.5">
													{RESOURCES_MENU_DATA.company.map((item) => (
														<Link
															key={item.label}
															href={item.href}
															className="text-fg-secondary hover:text-fg text-[14px] leading-tight font-medium transition-colors">
															{item.label}
														</Link>
													))}
												</div>
											</div>
										</div>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							{/* 3, 4, 5: Direct Links Without Chevron (Hover Interaction Only) */}
							{DIRECT_NAV_LINKS.map((link) => (
								<NavigationMenuItem key={link.label}>
									<NavigationMenuLink asChild className={navItemStyles}>
										<Link href={link.href}>{link.label}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						color="neutral"
						size="32"
						className="h-8 px-3.5 text-xs font-medium"
						asChild>
						<Link href="#sign-in">Sign in</Link>
					</Button>
					<Button
						variant="strong"
						color="neutral"
						size="32"
						className="h-8 px-3.5 text-xs font-medium"
						asChild>
						<Link href="#start-for-free">Start for free</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
