"use client"

import React, { useEffect, useRef } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ScrollArea } from "@/components/scroll-area"
import { navigationItems } from "@/config/navigation-config"
import { cn } from "@/lib/utils"

export default function Sidebar() {
	const pathName = usePathname()
	const activeItemRef = useRef<HTMLLIElement>(null)

	// Auto-scroll to active item when pathname changes
	useEffect(() => {
		if (activeItemRef.current) {
			activeItemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest",
			})
		}
	}, [pathName])

	return (
		<aside className="no-scrollbar w-65 not-lg:hidden sticky top-[4.3rem] z-30 h-[calc(100vh-4.3rem)] overflow-y-auto py-10 text-sm">
			<ScrollArea className="flex h-full w-full">
				<div className="flex flex-col gap-3">
					{navigationItems.map((section) => (
						<div className="flex flex-col gap-2 text-sm font-medium" key={section.title}>
							<span className="py-1.5">{section.title}</span>
							<ul className="relative flex flex-col gap-1">
								{/* Vertical line */}
								<div className="bg-soft absolute bottom-0 left-0 top-0 w-px" />
								{section.items.map((item) => {
									const isActive = pathName === item.url
									return (
										<li key={item.title} className="relative" ref={isActive ? activeItemRef : null}>
											<Link
												className={cn(
													"text-fg-secondary hover:text-fg focus-visible:inset-ring-border group relative block py-1.5 pl-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
													isActive ? "text-fg font-medium" : ""
												)}
												href={item.url}>
												{/* Active indicator */}
												{isActive && <div className="bg-primary absolute bottom-0 left-0 top-0 w-px" />}

												{/* Hover indicator */}
												{!isActive && <div className="bg-alpha absolute bottom-0 left-0 top-0 w-px opacity-0 transition-opacity group-hover:opacity-100" />}
												{item.title}
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					))}
				</div>
			</ScrollArea>
		</aside>
	)
}
