"use client"

import React, { ReactNode, Suspense, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { GetProductUpdatesDialogController } from "@/components/get-product-updates-dialog-controller"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { cn } from "@/lib/utils"

interface Props {
	children: ReactNode
}

function ResourcesHeader() {
	const pathname = usePathname()
	const [isHideForCategory, setIsHideForCategory] = useState(false)
	const hasStickyResourceFilter =
		pathname === "/resources/avatar" || pathname === "/resources/flags"

	useEffect(() => {
		const handleCategorySticky = (e: Event) => {
			const customEvent = e as CustomEvent<{ isSticky: boolean }>
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

export default function LandingLayout({ children }: Props) {
	return (
		<main className="overflow-x-clip">
			<Suspense fallback={null}>
				<GetProductUpdatesDialogController />
			</Suspense>
			<ResourcesHeader />
			{children}
		</main>
	)
}
