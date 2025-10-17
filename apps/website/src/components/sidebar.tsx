"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigationItems } from "@/config/navigation-config"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { ScrollArea } from "@/registry/ui/scroll-area"

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
		<div className="no-scrollbar w-65 not-lg:hidden sticky top-[4.3rem] z-30 h-[calc(100vh-4.3rem)] overflow-y-auto py-10 pe-2.5 text-sm">
			<ScrollArea className="flex h-full w-full pe-4">
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
												<div className="flex items-center justify-between">
													<span>{item.title}</span>
													{item.isComingSoon && (
														<Badge size="20" variant="soft" color="warning">
															Coming Soon
														</Badge>
													)}
													{item.isUpdated && (
														<Badge size="20" variant="soft" color="info">
															Updated
														</Badge>
													)}
													{item.isNew && (
														<Badge size="20" variant="soft" color="success">
															New
														</Badge>
													)}
												</div>
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}
