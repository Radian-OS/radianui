"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

function NavigationMenu({
	className,
	children,
	viewport = true,
	viewportClassName,
	viewportPortal = false,
	viewportPortalCentered = false,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean
	viewportClassName?: string
	viewportPortal?: boolean
	viewportPortalCentered?: boolean
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			data-viewport={viewport}
			className={cn(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className
			)}
			{...props}>
			{children}
			{viewport && (
				<NavigationMenuViewport
					className={viewportClassName}
					portal={viewportPortal}
					portalCentered={viewportPortalCentered}
				/>
			)}
		</NavigationMenuPrimitive.Root>
	)
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-1",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	)
}

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md bg-bg px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-fill1-alpha hover:text-fg focus:bg-fill1-alpha focus:text-fg focus-visible:ring-[3px] focus-visible:ring-fill4/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-fill1 data-[state=open]:text-fg data-[state=open]:hover:bg-fill1-alpha data-[state=open]:focus:bg-fill1-alpha"
)

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "group", className)}
			{...props}>
			{children}{" "}
			<ChevronDownIcon
				className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	)
}

const navigationMenuContentAlign = cva(
	"left-0 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out top-0 w-full p-2 pr-2.5 md:absolute md:w-auto group-data-[viewport=false]/navigation-menu:absolute group-data-[viewport=false]/navigation-menu:w-auto group-data-[viewport=false]/navigation-menu:bg-elevation-level1 group-data-[viewport=false]/navigation-menu:text-fg group-data-[viewport=false]/navigation-menu:z-50 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-visible group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200",
	{
		variants: {
			align: {
				left: "group-data-[viewport=false]/navigation-menu:left-0",
				center:
					"group-data-[viewport=false]/navigation-menu:left-1/2 group-data-[viewport=false]/navigation-menu:-translate-x-1/2",
				right:
					"group-data-[viewport=false]/navigation-menu:right-0 group-data-[viewport=false]/navigation-menu:left-auto",
			},
		},
		defaultVariants: {
			align: "center",
		},
	}
)

function NavigationMenuContent({
	className,
	align,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content> &
	VariantProps<typeof navigationMenuContentAlign>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(navigationMenuContentAlign({ align }), className)}
			{...props}
		/>
	)
}

function NavigationMenuViewportPortal({
	children,
	centered = false,
}: {
	children: React.ReactNode
	centered?: boolean
}) {
	const markerRef = React.useRef<HTMLSpanElement>(null)
	const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
		null
	)
	const [position, setPosition] = React.useState<{
		left: number
		top: number
		width: number
	} | null>(null)

	React.useLayoutEffect(() => {
		const anchor = markerRef.current?.closest<HTMLElement>(
			'[data-slot="navigation-menu"]'
		)

		if (!anchor) return

		setPortalTarget(document.body)

		const updatePosition = () => {
			const rect = anchor.getBoundingClientRect()
			const width = Math.min(rect.width, window.innerWidth - 32)
			setPosition({
				left: centered ? (window.innerWidth - width) / 2 : rect.left,
				top: rect.bottom,
				width,
			})
		}

		updatePosition()

		const resizeObserver = new ResizeObserver(updatePosition)
		resizeObserver.observe(anchor)
		window.addEventListener("resize", updatePosition)
		window.addEventListener("scroll", updatePosition, true)

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener("resize", updatePosition)
			window.removeEventListener("scroll", updatePosition, true)
		}
	}, [centered])

	return (
		<>
			<span ref={markerRef} className="hidden" aria-hidden="true" />
			{portalTarget
				? createPortal(
						<div
							data-slot="navigation-menu-viewport-positioner"
							className="fixed isolate z-60 flex justify-center"
							style={
								position
									? {
											left: position.left,
											top: position.top,
											width: position.width,
										}
									: { visibility: "hidden" }
							}>
							{children}
						</div>,
						portalTarget
					)
				: null}
		</>
	)
}

function NavigationMenuViewport({
	className,
	portal = false,
	portalCentered = false,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport> & {
	portal?: boolean
	portalCentered?: boolean
}) {
	const viewport = (
		<NavigationMenuPrimitive.Viewport
			data-slot="navigation-menu-viewport"
			className={cn(
				"origin-top-center border-border bg-elevation-level1 text-fg data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
				className
			)}
			{...props}
		/>
	)

	if (portal) {
		return (
			<NavigationMenuViewportPortal centered={portalCentered}>
				{viewport}
			</NavigationMenuViewportPortal>
		)
	}

	return (
		<div
			data-slot="navigation-menu-viewport-positioner"
			className="absolute top-full left-0 isolate z-50 flex w-full justify-center">
			{viewport}
		</div>
	)
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"hover:bg-fill1-alpha hover:text-fg focus:bg-fill1-alpha focus:text-fg focus-visible:ring-fill4/50 data-[active=true]:bg-fill1 data-[active=true]:text-fg data-[active=true]:hover:bg-fill1-alpha data-[active=true]:focus:bg-fill1-alpha [&_svg:not([class*='text-'])]:text-fg-secondary flex cursor-pointer flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				"data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
				className
			)}
			{...props}>
			<div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	)
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
}
