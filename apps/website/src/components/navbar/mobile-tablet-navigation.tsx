"use client"

import React, { useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/components/navbar/nav-links"
import { DesktopThemeToggler, TabletMobileThemeToggler } from "@/components/theme-toggler"
import { navigationItems } from "@/config/navigation-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Button } from "@/registry/ui/button"
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
			if (window.innerWidth >= 1024) {
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
			className={`bg-bg-base z-100 fixed right-0 top-0 flex h-screen w-full transform flex-col overflow-y-auto px-4 transition-transform duration-300 ease-in-out md:px-5 ${
				isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
			}`}>
			<div className="border-border-alpha flex min-h-16 items-center justify-between border-b">
				<WebsiteLogo />

				<div className="flex items-center justify-center gap-2">
					<div className="hidden items-center justify-center gap-2 sm:flex">
						<DesktopThemeToggler />
						<FigmaPreviewButton />
						<Button>Get Started</Button>
					</div>
					<Button isIcon color="primary" variant="soft" onClick={() => setIsMobileMenuOpen(false)}>
						<X className="size-5" />
					</Button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-2 pb-4 pt-6 sm:hidden">
				<Button className="w-full">Get Started</Button>
				<FigmaPreviewButton className="w-full" />
				<TabletMobileThemeToggler />
			</div>

			<div className="text-text">
				<ul className="text-fg1 flex flex-col items-start text-base font-medium">
					{navLinks.map((item) => (
						<li key={item.name} className="flex w-full items-center">
							<Link onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === item.link ? "text-fg0" : ""} text-fg1 w-full py-3 leading-6`} href={item.link}>
								{item.name}
							</Link>
						</li>
					))}
				</ul>

				<Accordion size="sm" variant="open" collapsible>
					{navigationItems.map((section) => (
						<AccordionItem className="border-none" value={section.title} key={section.title}>
							<section>
								<AccordionTrigger className="py-3 text-base">{section.title}</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col items-start">
										{section.items.map((item) => (
											<Link
												onClick={() => setIsMobileMenuOpen(false)}
												key={item.url}
												className={`${pathname === item.url ? "text-fg0" : ""} text-text flex w-full items-center py-3 text-base font-normal`}
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
