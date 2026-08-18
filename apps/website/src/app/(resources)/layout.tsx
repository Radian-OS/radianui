"use client"

import React, { ReactNode, Suspense, useEffect, useState } from "react"
import { GetProductUpdatesDialogController } from "@/components/get-product-updates-dialog-controller"
import { NavigationBar } from "@/components/navbar/navigation-bar"
import { cn } from "@/lib/utils"

interface Props {
	children: ReactNode
}

function ResourcesHeader() {
	const [isHideForCategory, setIsHideForCategory] = useState(false)

	useEffect(() => {
		const handleCategorySticky = (e: Event) => {
			const customEvent = e as CustomEvent<{ isSticky: boolean }>
			setIsHideForCategory(customEvent.detail.isSticky)
		}
		window.addEventListener("avatar-filter-sticky", handleCategorySticky)
		return () => {
			window.removeEventListener("avatar-filter-sticky", handleCategorySticky)
		}
	}, [])

	return (
		<div
			className={cn(
				"sticky top-0 z-50 transition-all duration-300 ease-out",
				isHideForCategory && "pointer-events-none -translate-y-full opacity-0"
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
