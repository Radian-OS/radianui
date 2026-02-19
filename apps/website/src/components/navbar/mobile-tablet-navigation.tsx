"use client"

import React, { useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/components/navbar/nav-links"
import { navigationItems } from "@/config/navigation-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { IconButton } from "@/registry/ui/button"
import EarlyAccessButton from "./early-access-button"
import FigmaPreviewButton from "./figma-preview-button"
import { WebsiteLogo } from "./website-logo"

interface MobileNavigationProps {
	isMobileMenuOpen: boolean
	setIsMobileMenuOpen: (open: boolean) => void
}

export function MobileNavigation({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavigationProps) {
	const pathname = usePathname()

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}

		return () => {
			document.body.style.overflow = "unset"
		}
	}, [isMobileMenuOpen])

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1280) {
				setIsMobileMenuOpen(false)
			}
		}

		window.addEventListener("resize", handleResize)
		handleResize()

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [setIsMobileMenuOpen])

	return (
		<nav
			className={`bg-bg z-100 fixed right-0 top-0 flex h-screen w-full transform flex-col overflow-y-auto px-4 transition-transform duration-300 ease-in-out md:px-5 ${
				isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
			}`}>
			{/* Top Bar */}
			<div className="border-alpha -mx-4 flex min-h-16 items-center justify-between border-b px-4 md:-mx-5 md:px-5">
				<WebsiteLogo />

				<div className="flex items-center justify-center gap-2">
					<div className="hidden items-center justify-center gap-2 sm:flex">
						<FigmaPreviewButton />
						<EarlyAccessButton />
					</div>
					<IconButton aria-label="Close mobile navigation" color="primary" variant="soft" onClick={() => setIsMobileMenuOpen(false)}>
						<X className="size-5" />
					</IconButton>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-3 pb-4 pt-6 sm:hidden">
				<EarlyAccessButton size={"44"} className="w-full" />
				<FigmaPreviewButton size={"44"} className="w-full" />
			</div>

			<div className="text-fg">
				<ul className="text-fg1 text-fgfont-medium flex flex-col items-start">
					{navLinks.map((item) => (
						<li key={item.name} className="flex w-full items-center">
							<Link
								onClick={() => setIsMobileMenuOpen(false)}
								className={`${pathname === item.link ? "text-fg0" : ""} text-fg1 w-full py-3 leading-6`}
								href={item.link}
								target={item.isExternal ? "_blank" : "_self"}>
								{item.name}
							</Link>
						</li>
					))}
				</ul>

				<Accordion type="single" size="sm" variant="open" collapsible>
					{navigationItems
						.filter((item) => item.title !== "Blocks")
						.map((section) => (
							<AccordionItem className="border-none" value={section.title} key={section.title}>
								<section>
									<AccordionTrigger className="py-3 text-base">{section.title}</AccordionTrigger>
									<AccordionContent>
										<div className="flex flex-col items-start">
											{section.items.map((item) => (
												<Link
													onClick={() => setIsMobileMenuOpen(false)}
													key={item.url}
													className={`${pathname === item.url ? "text-fg0" : ""} text-fgflex text-fgfont-normal w-full items-center py-3`}
													href={item.url}>
													{item.title}
												</Link>
											))}
										</div>
									</AccordionContent>
								</section>
							</AccordionItem>
						))}
				</Accordion>
			</div>
		</nav>
	)
}
