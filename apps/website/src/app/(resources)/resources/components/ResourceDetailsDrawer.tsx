"use client"

import { type ReactNode, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"
import { Drawer, DrawerContent } from "@/registry/ui/drawer"
import { ScrollArea } from "@/registry/ui/scroll-area"

const mobileQuery = "(width < 640px)"

function subscribeToMobileLayout(onChange: () => void) {
	const media = window.matchMedia(mobileQuery)
	media.addEventListener("change", onChange)
	return () => media.removeEventListener("change", onChange)
}

export function useMobileResourceLayout() {
	return useSyncExternalStore(
		subscribeToMobileLayout,
		() => window.matchMedia(mobileQuery).matches,
		() => false
	)
}

export function ResourceDetailsDrawer({
	open,
	onOpenChange,
	header,
	children,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	header?: ReactNode
	children: ReactNode
}) {
	return (
		<Drawer
			open={open}
			onOpenChange={onOpenChange}
			direction="bottom"
			variant="float"
			handle
			scrollLockTimeout={0}>
			{/* The extra pixel keeps Vaul's drag check inside the drawer when the underlying page is scrolled. */}
			<DrawerContent
				className={cn(
					"h-auto max-h-[90dvh] max-w-full gap-0 overflow-hidden p-0 pt-7 before:pointer-events-none before:absolute before:top-full before:h-px before:w-px before:content-[''] after:hidden!",
					header && "[--resource-drawer-header-height:2.25rem]"
				)}>
				{header && (
					<div className="flex h-[var(--resource-drawer-header-height)] shrink-0 touch-none items-center px-4">
						{header}
					</div>
				)}
				<ScrollArea
					className="min-h-0 [&_[data-slot=scroll-area-viewport]]:max-h-[calc(90dvh-1.75rem-var(--resource-drawer-header-height,0px))] [&_[data-slot=scroll-area-viewport]]:overscroll-y-none [&:not(:has([data-slot=scroll-area-scrollbar]))_[data-slot=scroll-area-viewport]]:touch-none [&:not(:has([data-slot=scroll-area-scrollbar]))_[data-slot=scroll-area-viewport]]:overflow-y-hidden!"
					type="auto">
					{children}
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}
