"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sideBarItems } from "@/config/sidebar-config"

const Sidebar = () => {
	const [accordionValue, setAccordionValue] = React.useState("")
	const pathName = usePathname()
	const activeSection = sideBarItems.find((section) => section.items.some((item) => item.link === pathName))

	React.useEffect(() => {
		setAccordionValue(activeSection ? activeSection.title : sideBarItems[0].title)
	}, [pathName, activeSection])

	return (
		<>
			<div className="hidden w-[17.5rem] lg:block" />
			<div className="no-scrollbar fixed z-30 hidden h-[calc(100vh-4.5rem)] w-[16rem] justify-start overflow-y-scroll border-e px-[10px] pt-[12px] text-sm lg:flex lg:flex-col">
				<Accordion type="single" collapsible value={accordionValue} onValueChange={(value) => setAccordionValue(value)}>
					{sideBarItems.map((section) => (
						<AccordionItem className="mb-0 border-none" value={section.title} key={section.title}>
							<main className="">
								<AccordionTrigger className="py-2 [&[data-state=closed]>h1>svg]:rotate-0 [&[data-state=open]>h1>svg]:rotate-90">
									<h1 className="body-sm flex items-center gap-[0.375rem] px-[6px] font-medium">
										<ChevronRight className="duration-300 ease-in-out" size={12} />
										{section.title}
									</h1>
								</AccordionTrigger>
								<ul className="flex flex-col">
									{section.items.map((item) => (
										<Link className={`${pathName === item.link ? "bg-bg2" : ""} rounded-[0.375rem]`} href={item.link} key={item.link}>
											<li className="body-sm text-fg2">
												<AccordionContent
													className={` ${pathName === item.link ? "text-fg1" : ""} w-full py-2 pl-6 text-start transition-all data-[state=closed]:ease-out data-[state=open]:ease-in`}>
													{item.name}
												</AccordionContent>
											</li>
										</Link>
									))}
								</ul>
							</main>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</>
	)
}

export default Sidebar
