"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"
import { DialogTitle } from "@/registry/ui/dialog"
import { Divider } from "@/registry/ui/divider"
import { Drawer, DrawerContent } from "@/registry/ui/drawer"
import { Input } from "@/registry/ui/input"
import { Skeleton } from "@/registry/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const SIDEBAR_WIDTH_DEFAULT = "16.25rem"
const SIDEBAR_WIDTH_MIN = "12rem"
const SIDEBAR_WIDTH_MAX = "28rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3.75rem"

export type SidebarContextProps = {
	state: "expanded" | "collapsed"
	open: boolean
	setOpen: (open: boolean) => void
	openMobile: boolean
	setOpenMobile: (open: boolean) => void
	isMobile: boolean
	toggleSidebar: () => void
	/** Current pixel width of the sidebar (desktop only). */
	sidebarWidth: string
	setSidebarWidth: (width: string) => void
	/** True while the user is actively dragging the resize handle. */
	isResizing: boolean
	setIsResizing: (resizing: boolean) => void
}

export type SidebarProviderProps = React.ComponentProps<"div"> & {
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
	shortcut?: string
	/** Override the initial width (e.g. read from a server cookie). */
	defaultWidth?: string
}

export type SidebarProps = React.ComponentProps<"div"> & {
	theme?: "gray" | "default" | "gray-body" | "inverse"
	side?: "left" | "right"
	variant?: "sidebar" | "floating" | "inset"
	collapsible?: "offcanvas" | "icon" | "none"
	/**
	 * When true a drag handle is rendered on the inner edge of the sidebar
	 * so users can resize it. Has no effect on mobile (drawer is used instead).
	 */
	resizable?: boolean
	minWidth?: number
	maxWidth?: number
}

export type SidebarResizeHandleProps = React.ComponentProps<"div"> & {
	side?: "left" | "right"
	minWidth?: number
	maxWidth?: number
}

export type SidebarTriggerProps = Omit<
	React.ComponentProps<typeof IconButton>,
	"children"
> & {
	children?: React.ReactNode
}
export type SidebarRailProps = React.ComponentProps<"button">
export type SidebarInsetProps = React.ComponentProps<"main">
export type SidebarInputProps = React.ComponentProps<typeof Input>
export type SidebarHeaderProps = React.ComponentProps<"div">
export type SidebarFooterProps = React.ComponentProps<"div">
export type SidebarSeparatorProps = React.ComponentProps<typeof Divider>
export type SidebarContentProps = React.ComponentProps<"div">
export type SidebarGroupProps = React.ComponentProps<"div">
export type SidebarGroupLabelProps = React.ComponentProps<"div"> & {
	asChild?: boolean
}
export type SidebarGroupActionProps = React.ComponentProps<"button"> & {
	asChild?: boolean
}
export type SidebarGroupContentProps = React.ComponentProps<"div">
export type SidebarMenuProps = React.ComponentProps<"ul">
export type SidebarMenuItemProps = React.ComponentProps<"li">
export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
	asChild?: boolean
	isActive?: boolean
	tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>
export type SidebarMenuActionProps = React.ComponentProps<"button"> & {
	asChild?: boolean
	showOnHover?: boolean
}
export type SidebarMenuBadgeProps = React.ComponentProps<typeof Badge>
export type SidebarMenuSkeletonProps = React.ComponentProps<"div"> & {
	showIcon?: boolean
}
export type SidebarMenuSubProps = React.ComponentProps<"ul">
export type SidebarMenuSubItemProps = React.ComponentProps<"li">
export type SidebarMenuSubButtonProps = React.ComponentProps<"a"> & {
	asChild?: boolean
	size?: "28" | "32"
	isActive?: boolean
}

export const sidebarMenuButtonVariants = cva(
	// Structural-only base classes
	"peer/menu-button cursor-pointer flex w-full items-center gap-2 overflow-hidden p-2 text-left truncate text-sm outline-hidden transition-[width,height,padding] disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>span:last-child]:min-w-0 [&>a:last-child]:truncate [&>a:last-child]:min-w-0 [&>svg]:size-5 [&>svg]:shrink-0 cn-sidebar-menu-button",
	{
		variants: {
			variant: {
				strong: "cn-sidebar-menu-button-variant-strong",
				soft: "cn-sidebar-menu-button-variant-soft",
				neutral: "cn-sidebar-menu-button-variant-neutral",
			},
			size: {
				"28": "h-7 text-xs cn-sidebar-menu-button-size-28",
				"32": "h-8 text-sm group-data-[state=collapsed]:p-1.5! cn-sidebar-menu-button-size-32",
				"36": "h-9 text-sm [&>svg]:size-6 group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:p-1.5! cn-sidebar-menu-button-size-36",
				"48": "h-12 text-sm group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>svg]:size-6! cn-sidebar-menu-button-size-48",
				"52": "h-13 text-sm group-data-[collapsible=icon]:p-1.5! cn-sidebar-menu-button-size-52",
				"56": "h-14 p-4 text-sm [&>svg]:size-6! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:p-4! group-data-[collapsible=icon]:h-14! cn-sidebar-menu-button-size-56",
			},
		},
		defaultVariants: {
			variant: "neutral",
			size: "32",
		},
	}
)

export function useIsMobile(mobileBreakpoint = 768) {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`)
		const onChange = () => {
			setIsMobile(window.innerWidth < mobileBreakpoint)
		}
		mql.addEventListener("change", onChange)
		setIsMobile(window.innerWidth < mobileBreakpoint)
		return () => mql.removeEventListener("change", onChange)
	}, [mobileBreakpoint])

	return !!isMobile
}

function useSidebarResize({
	side = "left",
	minWidth,
	maxWidth,
	onWidthChange,
}: {
	side?: "left" | "right"
	minWidth: number
	maxWidth: number
	onWidthChange: (widthPx: number) => void
}) {
	const [isDragging, setIsDragging] = React.useState(false)
	const handleRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const handle = handleRef.current
		if (!handle) return

		let startX = 0
		let startWidth = 0

		const onMouseMove = (e: MouseEvent) => {
			const delta = side === "left" ? e.clientX - startX : startX - e.clientX
			const next = Math.min(maxWidth, Math.max(minWidth, startWidth + delta))
			onWidthChange(next)
		}

		const onMouseUp = () => {
			setIsDragging(false)
			document.body.style.cursor = ""
			document.body.style.userSelect = ""
			window.removeEventListener("mousemove", onMouseMove)
			window.removeEventListener("mouseup", onMouseUp)
		}

		const onMouseDown = (e: MouseEvent) => {
			e.preventDefault()
			startX = e.clientX
			const sidebar = handle.closest<HTMLElement>(
				'[data-slot="sidebar-container"]'
			)
			startWidth = sidebar
				? sidebar.offsetWidth
				: parseFloat(SIDEBAR_WIDTH_DEFAULT) * 16
			setIsDragging(true)
			document.body.style.cursor = "col-resize"
			document.body.style.userSelect = "none"
			window.addEventListener("mousemove", onMouseMove)
			window.addEventListener("mouseup", onMouseUp)
		}

		const onTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0]
			const delta =
				side === "left" ? touch.clientX - startX : startX - touch.clientX
			const next = Math.min(maxWidth, Math.max(minWidth, startWidth + delta))
			onWidthChange(next)
		}

		const onTouchEnd = () => {
			setIsDragging(false)
			window.removeEventListener("touchmove", onTouchMove)
			window.removeEventListener("touchend", onTouchEnd)
		}

		const onTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0]
			startX = touch.clientX
			const sidebar = handle.closest<HTMLElement>(
				'[data-slot="sidebar-container"]'
			)
			startWidth = sidebar
				? sidebar.offsetWidth
				: parseFloat(SIDEBAR_WIDTH_DEFAULT) * 16
			setIsDragging(true)
			window.addEventListener("touchmove", onTouchMove, { passive: true })
			window.addEventListener("touchend", onTouchEnd)
		}

		handle.addEventListener("mousedown", onMouseDown)
		handle.addEventListener("touchstart", onTouchStart, { passive: true })

		return () => {
			handle.removeEventListener("mousedown", onMouseDown)
			handle.removeEventListener("touchstart", onTouchStart)
			window.removeEventListener("mousemove", onMouseMove)
			window.removeEventListener("mouseup", onMouseUp)
			window.removeEventListener("touchmove", onTouchMove)
			window.removeEventListener("touchend", onTouchEnd)
		}
	}, [side, minWidth, maxWidth, onWidthChange])

	return { handleRef, isDragging }
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
	const context = React.useContext(SidebarContext)
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.")
	}
	return context
}

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	shortcut = "b",
	defaultWidth = SIDEBAR_WIDTH_DEFAULT,
	className,
	style,
	children,
	...props
}: SidebarProviderProps) {
	const isMobile = useIsMobile()
	const [openMobile, setOpenMobile] = React.useState(false)
	const [_open, _setOpen] = React.useState(defaultOpen)
	const open = openProp ?? _open

	const [sidebarWidth, _setSidebarWidth] = React.useState(defaultWidth)
	const [isResizing, setIsResizing] = React.useState(false)

	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value
			if (setOpenProp) {
				setOpenProp(openState)
			} else {
				_setOpen(openState)
			}
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
		},
		[setOpenProp, open]
	)

	const setSidebarWidth = React.useCallback((width: string) => {
		_setSidebarWidth(width)
	}, [])

	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
	}, [isMobile, setOpen, setOpenMobile])

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const tag = (event.target as HTMLElement)?.tagName
			if (
				tag === "INPUT" ||
				tag === "TEXTAREA" ||
				(event.target as HTMLElement)?.isContentEditable
			)
				return
			if (event.key === shortcut && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				toggleSidebar()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [toggleSidebar, shortcut])

	const state = open ? "expanded" : "collapsed"

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
			sidebarWidth,
			setSidebarWidth,
			isResizing,
			setIsResizing,
		}),
		[
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
			sidebarWidth,
			setSidebarWidth,
			isResizing,
			setIsResizing,
		]
	)

	return (
		<SidebarContext.Provider value={contextValue}>
			<Tooltip delayDuration={0}>
				<div
					data-slot="sidebar-wrapper"
					style={
						{
							"--sidebar-width": sidebarWidth,
							"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
							...style,
						} as React.CSSProperties
					}
					className={cn(
						// Structural
						"group/sidebar-wrapper flex min-h-svh w-full",
						// Style hook
						"cn-sidebar-wrapper",
						className
					)}
					{...props}>
					{children}
				</div>
			</Tooltip>
		</SidebarContext.Provider>
	)
}

const sidebarThemeVars: Record<
	NonNullable<SidebarProps["theme"]>,
	React.CSSProperties
> = {
	default: { "--color-sidebar": "var(--color-bg)" } as React.CSSProperties,
	gray: {
		"--color-sidebar": "var(--color-fill1)",
		"--color-sidebar-accent": "var(--color-fill2)",
	} as React.CSSProperties,
	"gray-body": { "--color-sidebar": "var(--color-bg)" } as React.CSSProperties,
	inverse: { "--color-sidebar": "var(--color-black)" } as React.CSSProperties,
}

function SidebarResizeHandle({
	className,
	side = "left",
	minWidth = parseFloat(SIDEBAR_WIDTH_MIN) * 16,
	maxWidth = parseFloat(SIDEBAR_WIDTH_MAX) * 16,
	...props
}: SidebarResizeHandleProps) {
	const { setSidebarWidth, setIsResizing } = useSidebar()

	const handleWidthChange = React.useCallback(
		(widthPx: number) => {
			setSidebarWidth(`${widthPx}px`)
		},
		[setSidebarWidth]
	)

	const { handleRef, isDragging } = useSidebarResize({
		side,
		minWidth,
		maxWidth,
		onWidthChange: handleWidthChange,
	})

	React.useEffect(() => {
		setIsResizing(isDragging)
	}, [isDragging, setIsResizing])

	return (
		<div
			ref={handleRef}
			data-slot="sidebar-resize-handle"
			data-sidebar="resize-handle"
			data-dragging={isDragging || undefined}
			aria-hidden="true"
			className={cn(
				// Structural
				"absolute inset-y-0 z-20 w-1.5 cursor-col-resize",
				side === "left" ? "-right-0.5" : "-left-0.5",
				"after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:rounded-full",
				"after:transition-colors after:duration-150",
				// Style hooks
				"cn-sidebar-resize-handle",
				isDragging && "cn-sidebar-resize-handle-dragging",
				// Hide when icon-collapsed
				"group-data-[collapsible=icon]:hidden",
				className
			)}
			{...props}
		/>
	)
}

function Sidebar({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	theme = "default",
	resizable = false,
	minWidth = parseFloat(SIDEBAR_WIDTH_MIN) * 16,
	maxWidth = parseFloat(SIDEBAR_WIDTH_MAX) * 16,
	className,
	children,
	...props
}: SidebarProps) {
	const { isMobile, state, openMobile, setOpenMobile, isResizing } =
		useSidebar()

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				data-theme={theme}
				style={sidebarThemeVars[theme]}
				className={cn(
					// Structural
					"w-(--sidebar-width) sticky top-0 flex h-svh flex-col",
					// Style hook
					"cn-sidebar bg-sidebar text-sidebar-fg",
					theme === "inverse" && "dark",
					className
				)}
				{...props}>
				{children}
			</div>
		)
	}

	if (isMobile) {
		return (
			<Drawer
				open={openMobile}
				onOpenChange={setOpenMobile}
				direction={side}
				handle={false}>
				<DrawerContent
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					className={cn(
						// Structural
						"w-(--sidebar-width) group p-0",
						// Style hook
						"cn-sidebar bg-sidebar text-sidebar-fg",
						theme === "inverse" && "dark",
						className
					)}
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
							...sidebarThemeVars[theme],
						} as React.CSSProperties
					}>
					<DialogTitle className="hidden" />
					<div className="flex h-full w-full flex-col">{children}</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<div
			style={sidebarThemeVars[theme]}
			className={cn(
				// Structural
				"text-sidebar-fg group peer hidden md:block",
				// Style hook
				"cn-sidebar",
				theme === "inverse" && "dark"
			)}
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-theme={theme}
			data-side={side}
			data-slot="sidebar">
			{/* Gap element — keeps layout space while sidebar is fixed-positioned */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					// Structural
					"w-(--sidebar-width) relative bg-transparent",
					!isResizing && "transition-[width] duration-200 ease-linear",
					"group-data-[collapsible=offcanvas]:w-0",
					"group-data-[side=right]:rotate-180",
					variant === "floating"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(6))+2px)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
				)}
			/>

			{/* Fixed container */}
			<div
				data-slot="sidebar-container"
				className={cn(
					// Structural
					"w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh md:flex",
					!isResizing &&
						"transition-[left,right,width] duration-200 ease-linear",
					side === "left"
						? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
						: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
					variant === "inset"
						? "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
						: variant === "floating"
							? "p-3 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(6))+2px)]"
							: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
					// Style hooks for variant-specific decoration
					"cn-sidebar-container",
					variant === "sidebar" && "cn-sidebar-container-variant-sidebar",
					variant === "floating" && "cn-sidebar-container-variant-floating",
					variant === "inset" && "cn-sidebar-container-variant-inset",
					"group-data-[theme=gray-body]:group-data-[variant=floating]:bg-fill1",
					className
				)}
				{...props}>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className={cn(
						// Structural
						"bg-sidebar relative flex h-full w-full flex-col",
						// Style hooks
						"cn-sidebar-inner",
						variant === "floating" && "cn-sidebar-inner-variant-floating",
						variant === "inset" && "cn-sidebar-inner-variant-inset"
					)}>
					{children}

					{resizable && (
						<SidebarResizeHandle
							side={side}
							minWidth={minWidth}
							maxWidth={maxWidth}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

function SidebarTrigger({
	className,
	onClick,
	children,
	...props
}: SidebarTriggerProps) {
	const { toggleSidebar } = useSidebar()
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		toggleSidebar()
	}
	return (
		<IconButton
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			aria-label="Sidebar Button"
			variant="ghost"
			color="neutral"
			size="32"
			className={className}
			onClick={handleClick}
			{...props}>
			{children ? (
				children
			) : (
				<>
					<IconSlot slot="left-panel" />
					<span className="sr-only">Toggle Sidebar</span>
				</>
			)}
		</IconButton>
	)
}

function SidebarRail({ className, ...props }: SidebarRailProps) {
	const { toggleSidebar } = useSidebar()
	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar"
			className={cn(
				// Structural
				"absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
				"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
				"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				// Style hook
				"cn-sidebar-rail",
				className
			)}
			{...props}
		/>
	)
}

function SidebarInset({ className, ...props }: SidebarInsetProps) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				// Structural
				"bg-bg relative flex w-full flex-1 flex-col",
				"md:peer-data-[variant=inset]:not-peer-data-[collapsible=icon]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl",
				// Style hook
				"cn-sidebar-inset",
				className
			)}
			{...props}
		/>
	)
}

function SidebarInput({ className, ...props }: SidebarInputProps) {
	return (
		<Input
			data-slot="sidebar-input"
			size={"32"}
			data-sidebar="input"
			className={cn(
				// Structural
				"w-full",
				// Style hook
				"cn-sidebar-input",
				className
			)}
			{...props}
		/>
	)
}

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn(
				// Structural
				"flex flex-col gap-2 px-3.5 py-3",
				// Style hook
				"cn-sidebar-header",
				className
			)}
			{...props}
		/>
	)
}

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn(
				// Structural
				"flex flex-col gap-2 p-2",
				// Style hook
				"cn-sidebar-footer",
				className
			)}
			{...props}
		/>
	)
}

function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
	return (
		<Divider
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn(
				// Structural
				"w-auto",
				// Style hook
				"cn-sidebar-separator",
				className
			)}
			{...props}
		/>
	)
}

function SidebarContent({ className, ...props }: SidebarContentProps) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				// Structural
				"group-data-[collapsible=icon]:no-scrollbar flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:overflow-x-hidden",
				// Style hook
				"cn-sidebar-content",
				className
			)}
			{...props}
		/>
	)
}

function SidebarGroup({ className, ...props }: SidebarGroupProps) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn(
				// Structural
				"relative flex w-full min-w-0 flex-col px-3 py-1.5 group-data-[state=collapsed]:px-3.5",
				// Style hook
				"cn-sidebar-group",
				className
			)}
			{...props}
		/>
	)
}

function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: SidebarGroupLabelProps) {
	const Comp = asChild ? Slot : "div"
	return (
		<Comp
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			className={cn(
				// Structural
				"ring-sidebar-ring outline-hidden flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
				// Style hook
				"cn-sidebar-group-label",
				className
			)}
			{...props}
		/>
	)
}

function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: SidebarGroupActionProps) {
	const Comp = asChild ? Slot : "button"
	return (
		<Comp
			data-slot="sidebar-group-action"
			data-sidebar="group-action"
			className={cn(
				// Structural
				"ring-sidebar-ring outline-hidden absolute right-2 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"after:absolute after:-inset-2 md:after:hidden",
				"group-data-[collapsible=icon]:hidden",
				// Style hook
				"cn-sidebar-group-action",
				className
			)}
			{...props}
		/>
	)
}

function SidebarGroupContent({
	className,
	...props
}: SidebarGroupContentProps) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn(
				// Structural
				"w-full text-sm",
				// Style hook
				"cn-sidebar-group-content",
				className
			)}
			{...props}
		/>
	)
}

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn(
				// Structural
				"flex w-full min-w-0 flex-col gap-0.5",
				// Style hook
				"cn-sidebar-menu",
				className
			)}
			{...props}
		/>
	)
}

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn(
				// Structural
				"group/menu-item relative",
				// Style hook
				"cn-sidebar-menu-item",
				className
			)}
			{...props}
		/>
	)
}

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = "neutral",
	size = "32",
	tooltip,
	className,
	...props
}: SidebarMenuButtonProps) {
	const Comp = asChild ? Slot : "button"
	const { isMobile, state } = useSidebar()

	const button = (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	)

	if (!tooltip) return button

	if (typeof tooltip === "string") {
		tooltip = { children: tooltip }
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	)
}

function SidebarMenuAction({
	className,
	asChild = false,
	showOnHover = false,
	...props
}: SidebarMenuActionProps) {
	const Comp = asChild ? Slot : "button"
	return (
		<Comp
			data-slot="sidebar-menu-action"
			data-sidebar="menu-action"
			className={cn(
				// Structural
				"ring-sidebar-ring outline-hidden absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"after:absolute after:-inset-2 md:after:hidden",
				"peer-data-[size=28]/menu-button:top-1",
				"peer-data-[size=32]/menu-button:top-1.5",
				"peer-data-[size=48]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				showOnHover &&
					"group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
				// Style hook
				"cn-sidebar-menu-action",
				showOnHover && "cn-sidebar-menu-action-show-on-hover",
				className
			)}
			{...props}
		/>
	)
}

function SidebarMenuBadge({ className, ...props }: SidebarMenuBadgeProps) {
	return (
		<Badge
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				// Structural
				"pointer-events-none absolute right-2 select-none rounded-md tabular-nums",
				"peer-data-[size=28]/menu-button:top-1",
				"peer-data-[size=32]/menu-button:top-1.5",
				"peer-data-[size=48]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				// Style hook
				"cn-sidebar-menu-badge",
				className
			)}
			color="neutral"
			size="20"
			{...props}
		/>
	)
}

function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: SidebarMenuSkeletonProps) {
	const width = React.useMemo(
		() => `${Math.floor(Math.random() * 40) + 50}%`,
		[]
	)
	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn(
				// Structural
				"flex h-8 items-center gap-2 rounded-md px-2",
				// Style hook
				"cn-sidebar-menu-skeleton",
				className
			)}
			{...props}>
			{showIcon && (
				<Skeleton
					className="size-4 rounded-md"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="max-w-(--skeleton-width) h-4 flex-1"
				data-sidebar="menu-skeleton-text"
				style={{ "--skeleton-width": width } as React.CSSProperties}
			/>
		</div>
	)
}

function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn(
				// Structural
				"ml-5.5 flex min-w-0 translate-x-px flex-col gap-0.5 p-1 group-data-[collapsible=icon]:hidden",
				// Style hook
				"cn-sidebar-menu-sub",
				className
			)}
			{...props}
		/>
	)
}

function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={cn(
				// Structural
				"group/menu-sub-item relative",
				// Style hook
				"cn-sidebar-menu-sub-item",
				className
			)}
			{...props}
		/>
	)
}

function SidebarMenuSubButton({
	asChild = false,
	size = "32",
	isActive = false,
	className,
	...props
}: SidebarMenuSubButtonProps) {
	const Comp = asChild ? Slot : "a"
	return (
		<Comp
			data-slot="sidebar-menu-sub-button"
			data-sidebar="menu-sub-button"
			data-size={size}
			data-active={isActive}
			className={cn(
				// Structural
				"ring-sidebar-ring outline-hidden flex min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>a:last-child]:min-w-0 [&>a:last-child]:truncate [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
				size === "28" && "h-7 text-xs",
				size === "32" && "h-8 text-sm",
				"group-data-[collapsible=icon]:hidden",
				// Style hook
				"cn-sidebar-menu-sub-button",
				className
			)}
			{...props}
		/>
	)
}

function SidebarCollapsible({
	className,
	...props
}: React.ComponentProps<typeof Collapsible>) {
	return (
		<Collapsible
			data-slot="sidebar-collapsible"
			data-sidebar="collapsible"
			className={cn("group/collapsible", className)}
			{...props}
		/>
	)
}

function SidebarCollapsibleTrigger({
	...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
	return (
		<CollapsibleTrigger
			data-slot="sidebar-collapsible-trigger"
			data-sidebar="collapsible-trigger"
			{...props}
		/>
	)
}

function SidebarCollapsibleContent({
	className,
	...props
}: React.ComponentProps<typeof CollapsibleContent>) {
	return (
		<CollapsibleContent
			data-slot="sidebar-collapsible-content"
			data-sidebar="collapsible-content"
			className={cn("group", className)}
			{...props}
		/>
	)
}

export {
	Sidebar,
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarResizeHandle,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
	useSidebarResize,
}
