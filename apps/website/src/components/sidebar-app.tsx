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

	const filteredNavigationItems = navigationItems.filter((section) => {
		return section.title !== "Blocks"
	})

	return (
		<div className="border-soft no-scrollbar w-65 not-lg:hidden sticky top-[4.3rem] z-30 h-[calc(100vh-4.3rem)] overflow-y-auto border-l border-r-0 text-sm">
			<ScrollArea className="flex h-full w-full">
				<div className="flex flex-col">
					{filteredNavigationItems.map((section) => (
						<div
							className="border-soft flex flex-col gap-2 border-b p-3 text-sm font-medium last:border-b-0"
							key={section.title}>
							<span className="px-2 py-1.5">{section.title}</span>
							<ul className="relative flex flex-col gap-1">
								{section.items.map((item) => {
									const isActive = pathName === item.url
									const Icon = item.icon
									const content = (
										<div className="flex w-full min-w-0 items-center justify-between gap-2">
											<div className="flex min-w-0 items-center gap-2">
												{Icon && (
													<Icon
														size={20}
														aria-hidden="true"
														className="text-fg-secondary shrink-0"
													/>
												)}
												<span className="truncate">{item.title}</span>
											</div>
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
									)

									return (
										<li
											key={item.title}
											className="relative"
											ref={isActive ? activeItemRef : null}>
											{isActive && (
												<div className="bg-primary absolute -left-3 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-r-full" />
											)}
											{item.disabled ? (
												<div
													className={cn(
														"text-fg-tertiary relative flex min-h-8 cursor-not-allowed items-center gap-2 rounded-lg p-2 text-sm leading-4"
													)}>
													{content}
												</div>
											) : (
												<Link
													className={cn(
														"text-fg-secondary hover:bg-fill1-alpha hover:text-fg focus-visible:inset-ring-border group relative flex min-h-8 items-center gap-2 rounded-lg p-2 text-sm leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
														isActive && "bg-fill1-alpha text-fg font-medium"
													)}
													href={item.url}>
													{content}
												</Link>
											)}
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
