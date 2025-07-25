import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigationItems } from "@/config/navigation-config"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"

export default function Sidebar() {
	const pathName = usePathname()
	return (
		<aside className="no-scrollbar w-65 sticky top-[4.3rem] z-30 hidden h-[calc(100vh-4.3rem)] flex-col justify-start gap-3 overflow-y-auto py-10 text-sm lg:flex">
			<ScrollArea className="h-full w-full">
				{navigationItems.map((section) => (
					<div className="flex flex-col gap-2 text-sm font-medium" key={section.title}>
						<span className="py-1.5">{section.title}</span>
						<ul className="relative flex flex-col gap-1">
							{/* Vertical line */}
							<div className="bg-soft absolute bottom-0 left-0 top-0 w-px" />
							{section.items.map((item) => (
								<li key={item.title} className="relative">
									<Link
										className={cn(
											"text-text-secondary hover:text-text focus-visible:inset-ring-border group relative block py-1.5 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
											pathName === item.url ? "text-text font-medium" : ""
										)}
										href={item.url}>
										{/* Active indicator */}
										{pathName === item.url && <div className="bg-primary absolute bottom-0 left-0 top-0 w-px" />}

										{/* Hover indicator */}
										{pathName !== item.url && <div className="bg-border-alpha absolute bottom-0 left-0 top-0 w-px opacity-0 transition-opacity group-hover:opacity-100" />}
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</ScrollArea>
		</aside>
	)
}
