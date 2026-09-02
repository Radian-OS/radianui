"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { cn } from "@/lib/utils"

export function ResourcesHeader() {
	const pathname = usePathname()
	const [isHideForCategory, setIsHideForCategory] = useState(false)
	const hasStickyResourceFilter =
		pathname === "/resources/avatar" || pathname === "/resources/flags"

	useEffect(() => {
		const handleCategorySticky = (event: Event) => {
			const customEvent = event as CustomEvent<{ isSticky: boolean }>
			setIsHideForCategory(customEvent.detail.isSticky)
		}

		window.addEventListener("resource-filter-sticky", handleCategorySticky)
		return () => {
			window.removeEventListener("resource-filter-sticky", handleCategorySticky)
		}
	}, [])

	useEffect(() => {
		if (!hasStickyResourceFilter) setIsHideForCategory(false)
	}, [hasStickyResourceFilter])

	return (
		<div
			className={cn(
				"sticky top-0 z-50 transition-all duration-300 ease-out",
				hasStickyResourceFilter &&
					isHideForCategory &&
					"pointer-events-none -translate-y-full opacity-0"
			)}>
			<NavigationBar sticky={false} />
		</div>
	)
}
