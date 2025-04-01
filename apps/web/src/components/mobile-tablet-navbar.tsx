"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sideBarItems } from "@/config/sidebar-config"
import { Button } from "@/registry/ui/button"
import { TabletMobileThemeToggler } from "./theme-toggler"

const MobileTabletNavbar = ({ setIsMobileNavVisible }: { setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const pathname = usePathname()
	return (
		<nav className="bg-bg1 fixed top-0 left-0 z-10 flex h-screen w-full flex-col gap-3 overflow-y-scroll px-4 md:px-5">
			<div className="flex min-h-[5rem] items-center justify-between">
				<Link href="/" style={{ fill: "white", color: "white" }}>
					<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
					<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
				</Link>
				<Button isIcon variant="neutral-soft" onClick={() => setIsMobileNavVisible(false)}>
					<X className="size-5" />
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				<Button>Sign up for early access</Button>
				<TabletMobileThemeToggler />
			</div>

			<ul className="body-sm text-fg2 flex flex-col items-start gap-2 px-3 font-medium">
				<li>
					<Link href="/documentation/components">Components</Link>
				</li>
				<li>
					<Link href="/documentation">Documentation</Link>
				</li>
				<li>
					<Link href="/blog">Blog</Link>
				</li>
				<li>
					<Link href="/roadmap">Roadmap</Link>
				</li>
				<li>
					<Link href="/documentation/figma">Figma</Link>
				</li>
			</ul>

			<Accordion type="single" collapsible>
				{sideBarItems.map((section) => (
					<AccordionItem value={section.title} key={section.title}>
						<section>
							<AccordionTrigger className="py-2 [&[data-state=closed]>h1>svg]:rotate-0 [&[data-state=open]>h1>svg]:rotate-90">
								<h1 className="body-sm flex items-center gap-[0.375rem] px-[6px] font-medium">
									<ChevronRight className="duration-300 ease-in-out" size={12} />
									{section.title}
								</h1>
							</AccordionTrigger>
							<div className="flex flex-col justify-center">
								{section.items.map((item) => (
									<AccordionContent
										key={item.link}
										className={` ${pathname === item.link ? "bg-bg2 rounded-[0.375rem] font-medium" : ""} body-sm w-full py-2 pl-6 text-start transition-all data-[state=closed]:ease-out data-[state=open]:ease-in`}>
										<Link
											className={`${pathname === item.link ? "text-fg1" : ""} text-fg2`}
											href={item.link}
											onClick={() => setIsMobileNavVisible(false)}>
											{item.name}
										</Link>
									</AccordionContent>
								))}
							</div>
						</section>
					</AccordionItem>
				))}
			</Accordion>
		</nav>
	)
}

export default MobileTabletNavbar
