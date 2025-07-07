import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TabletMobileThemeToggler } from "@/components/theme-toggler"
import { navigationItems } from "@/config/navigation-config"
import { Button } from "@/registry/ui/button"

export default function MobileTabletNavbar({ setIsMobileNavVisible }: { setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
	const pathname = usePathname()
	return (
		<nav className="bg-bg-base fixed left-0 top-0 z-10 flex h-screen w-full flex-col gap-3 overflow-y-scroll px-4 md:px-5">
			<div className="flex min-h-20 items-center justify-between">
				<Link href="/" style={{ fill: "white", color: "white" }}>
					<Image src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
					<Image src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
				</Link>
				<Button isIcon color="neutral" variant="soft" onClick={() => setIsMobileNavVisible(false)}>
					<X className="size-5" />
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				<Button>Sign up for early access</Button>
				<TabletMobileThemeToggler />
			</div>

			<ul className="text-text-secondary flex flex-col items-start gap-2 px-3 text-sm font-medium">
				<li>
					<Link href="/docs/components/accordion">Components</Link>
				</li>
				<li>
					<Link href="/docs/getting-started/introduction">Documentation</Link>
				</li>
				<li>
					<Link href="/blog">Blog</Link>
				</li>
				<li>
					<Link href="/block">Blocks</Link>
				</li>
				<li>
					<Link href="/docs/getting-started/figma">Figma</Link>
				</li>
			</ul>

			<Accordion type="single" collapsible>
				{navigationItems.map((section) => (
					<AccordionItem value={section.title} key={section.title}>
						<section>
							<AccordionTrigger className="py-2 [&[data-state=closed]>h1>svg]:rotate-0 [&[data-state=open]>h1>svg]:rotate-90">
								<h3 className="flex items-center gap-1.5 px-1.5 text-sm font-medium">
									<ChevronRight className="duration-300 ease-in-out" size={12} />
									{section.title}
								</h3>
							</AccordionTrigger>
							<div className="flex flex-col justify-center">
								{section.items.map((item) => (
									<AccordionContent
										key={item.url}
										className={` ${pathname === item.url ? "bg-bg-level0 rounded-[0.375rem] font-medium" : ""} w-full py-2 pl-6 text-start text-sm transition-all data-[state=closed]:ease-out data-[state=open]:ease-in`}>
										<Link className={`${pathname === item.url ? "text-text" : ""} text-text-secondary`} href={item.url} onClick={() => setIsMobileNavVisible(false)}>
											{item.title}
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
