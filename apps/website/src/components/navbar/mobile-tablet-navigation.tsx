"use client"

import React, { useEffect } from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/components/navbar/nav-links"
import { navigationItems } from "@/config/navigation-config"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/registry/ui/accordion"
import { IconButton } from "@/registry/ui/button"
import { additionalLinks, designTools } from "./desktop-navigation"
import EarlyAccessButton from "./early-access-button"
import FigmaPreviewButton from "./figma-preview-button"
import { WebsiteLogo } from "./website-logo"

interface MobileNavigationProps {
	isMobileMenuOpen: boolean
	setIsMobileMenuOpen: (open: boolean) => void
}

function MobileAccordionTrigger({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<AccordionPrimitive.Header asChild>
			<div className="flex">
				<AccordionPrimitive.Trigger
					type="button"
					className={`text-fg outline-hidden flex flex-1 cursor-pointer items-center justify-between py-3 text-left font-medium transition-all data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&[data-state=open]>.AccordionChevron]:rotate-180 ${className ?? ""}`.trim()}>
					<span className="flex-1 text-left">{children}</span>
					<ChevronDown className="AccordionChevron text-fg-tertiary size-5 shrink-0 transition-transform duration-200" />
				</AccordionPrimitive.Trigger>
			</div>
		</AccordionPrimitive.Header>
	)
}

export function MobileNavigation({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: MobileNavigationProps) {
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
					<IconButton
						aria-label="Close mobile navigation"
						color="primary"
						variant="soft"
						onClick={() => setIsMobileMenuOpen(false)}>
						<X className="size-5" />
					</IconButton>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-3 pb-4 pt-6 sm:hidden">
				<EarlyAccessButton size={"44"} className="w-full" />
				<FigmaPreviewButton size={"44"} className="w-full" />
			</div>

			<div className="text-fg">
				<ul className="text-fg1 text-fg flex flex-col items-start font-medium">
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

				<Accordion type="single" variant="open" collapsible>
					{navigationItems
						.filter((item) => item.title !== "Blocks")
						.map((section) => (
							<AccordionItem
								className="border-none"
								value={section.title}
								key={section.title}>
								<section>
									<MobileAccordionTrigger className="text-base">
										{section.title}
									</MobileAccordionTrigger>
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
					<AccordionItem className="border-none" value="Resources">
						<section>
							<MobileAccordionTrigger className="text-base">
								Resources
							</MobileAccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col items-start">
									<div className="text-fg-tertiary w-full py-2 text-xs font-medium uppercase">
										Design Tools
									</div>
									{designTools.map((tool) => (
										<Link
											onClick={() => setIsMobileMenuOpen(false)}
											key={tool.title}
											className="text-fg flex w-full items-center py-3 font-normal"
											href={tool.href}>
											{tool.title}
										</Link>
									))}
									<div className="text-fg-tertiary mt-2 w-full py-2 text-xs font-medium uppercase">
										Additional Links
									</div>
									{additionalLinks.map((link) => (
										<Link
											onClick={() => setIsMobileMenuOpen(false)}
											key={link.title}
											className="text-fg flex w-full items-center py-3 font-normal"
											href={link.href}>
											{link.title}
										</Link>
									))}
								</div>
							</AccordionContent>
						</section>
					</AccordionItem>
				</Accordion>
			</div>
		</nav>
	)
}
