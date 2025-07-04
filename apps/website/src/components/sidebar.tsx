import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigationItems } from "@/config/navigation-config"
import { cn } from "@/lib/utils"

export default function Sidebar() {
	const pathName = usePathname()

	return (
		<aside className="no-scrollbar top-15.5 w-65 sticky z-30 hidden h-[calc(100vh-3.875rem)] flex-col justify-start gap-3 overflow-y-auto py-10 text-sm lg:flex">
			{navigationItems.map((section) => (
				<div className="flex flex-col gap-2 text-sm font-medium" key={section.title}>
					<span className="py-1.5">{section.title}</span>
					<ul className="border-soft flex flex-col gap-0.5 border-s">
						{section.items.map((item) => (
							<Link
								className={cn("text-text-secondary hover:text-text hover:border-border-alpha border-s-2 border-transparent px-2.5 py-1.5", {
									"border-primary text-text": pathName === item.url,
								})}
								href={item.url}
								key={item.title}>
								<span className="sr-only">{item.title}</span>
								<li>{item.title}</li>
							</Link>
						))}
					</ul>
				</div>
			))}
		</aside>
	)
}
