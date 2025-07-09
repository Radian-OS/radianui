"use client"

import React, { useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/components/navbar/nav-links"
import { DesktopThemeToggler, TabletMobileThemeToggler } from "@/components/theme-toggler"
import { navigationItems } from "@/config/navigation-config"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Button } from "@/registry/ui/button"

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
			className={`bg-bg-base z-100 fixed right-0 top-0 flex min-h-screen w-full transform flex-col overflow-y-scroll transition-transform duration-300 ease-in-out md:px-5 ${
				isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
			}`}>
			<div className="border-border-alpha flex min-h-16 items-center justify-between border-b px-5">
				<Link href="/" style={{ fill: "white", color: "white" }}>
					<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
					<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
				</Link>

				<div className="flex items-center justify-center gap-2">
					<div className="hidden items-center justify-center gap-2 sm:flex">
						<DesktopThemeToggler />
						<Button>Get Started</Button>
					</div>
					<Button isIcon color="primary" variant="soft" onClick={() => setIsMobileMenuOpen(false)}>
						<X className="size-5" />
					</Button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-2 px-5 pb-4 pt-6 sm:hidden">
				<Button className="w-full">Get Started</Button>
				<TabletMobileThemeToggler />
			</div>

			<div className="text-text px-5">
				<ul className="text-fg1 flex flex-col items-start text-base font-medium">
					{navLinks.map((item) => (
						<li key={item.name} onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center">
							<Link className={`${pathname === item.link ? "text-fg0" : ""} text-fg1 w-full py-3 leading-6`} href={item.link}>
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
