"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigationItems } from "@/config/navigation-config"

export default function Sidebar() {
	const [accordionValue, setAccordionValue] = React.useState("")
	const pathName = usePathname()
	const activeSection = navigationItems.find((section) => section.items.some((item) => item.url === pathName))
	React.useEffect(() => {
		setAccordionValue(activeSection ? activeSection.title : navigationItems[0].title)
	}, [pathName, activeSection])

	return (
		<>
			{/* <aside className="w-65 hidden lg:block" /> */}
			<aside className="no-scrollbar top-15.5 w-65 sticky z-30 hidden h-[calc(100vh-3.875rem)] justify-start overflow-y-auto border-e px-2.5 pt-2.5 text-sm lg:flex lg:flex-col">
				<Accordion type="single" collapsible value={accordionValue} onValueChange={(value) => setAccordionValue(value)}>
					{navigationItems.map((section) => (
						<AccordionItem className="mb-0 border-none" value={section.title} key={section.title}>
							<main className="">
								<AccordionTrigger className="py-2 [&[data-state=closed]>h3>svg]:rotate-0 [&[data-state=open]>h3>svg]:rotate-90">
									<h3 className="flex items-center gap-1.5 px-1.5 text-sm font-medium">
										<ChevronRight className="duration-300 ease-in-out" size={12} />
										{section.title}
									</h3>
								</AccordionTrigger>
								<ul className="flex flex-col">
									{section.items.map((item) => (
										<Link className={`${pathName === item.url ? "bg-fill-level3" : ""} rounded-md`} href={item.url} key={item.title}>
											<li className="text-text-secondary text-sm">
												<AccordionContent
													className={` ${pathName === item.url ? "text-text" : ""} w-full py-2 pl-6 text-start transition-all data-[state=closed]:ease-in data-[state=open]:ease-out`}>
													{item.title}
												</AccordionContent>
											</li>
										</Link>
									))}
								</ul>
							</main>
						</AccordionItem>
					))}
				</Accordion>
			</aside>
		</>
	)
}
