"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
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
const SIDEBAR_WIDTH_COOKIE_NAME = "sidebar_width"
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
	size?: "sm" | "md"
	isActive?: boolean
}

export const sidebarMenuButtonVariants = cva(
	"peer/menu-button hover:bg-sidebar-accent hover:text-sidebar-accent-fg font-medium cursor-pointer flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left truncate text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>span:last-child]:min-w-0 [&>a:last-child]:truncate [&>a:last-child]:min-w-0 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-fg-secondary",
	{
		variants: {
			variant: {
				strong:
					"text-fg focus-visible:ring-primary-focus focus-visible:outline-none data-[active=true]:bg-primary! data-[active=true]:text-white  data-[active=true]:[&>svg]:stroke-white",
				soft: "text-fg focus-visible:ring-primary-focus focus-visible:outline-none data-[active=true]:bg-primary-accent! data-[active=true]:text-fg [&>svg]:text-fg-secondary data-[active=true]:[&>svg]:stroke-fg",
				neutral:
					"text-fg rounded-md data-[active=true]:bg-fill1-alpha! [&>svg]:text-fg-secondary",
			},
			size: {
				"28": "h-7 text-xs",
				"32": "h-8 text-sm group-data-[state=collapsed]:p-1.5!",
				"48": "h-12 text-sm group-data-[collapsible=icon]:p-0!",
				"52": "h-13 text-sm group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "neutral",
			size: "32",
		},
	}
)

function useIsMobile(mobileBreakpoint = 768) {
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

/**
 * Provides drag-to-resize logic for the sidebar.
 *
 * Returns a ref to attach to the resize handle element plus the isDragging state.
 * Width updates are written both to the context and to a cookie for persistence.
 *
 * @param side          Which side the sidebar is on ("left" | "right").
 * @param minWidth      Minimum allowed width in px.
 * @param maxWidth      Maximum allowed width in px.
 * @param onWidthChange Callback fired whenever the width changes (use to update CSS var).
 */
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
			// Read the live width from the sidebar container so we start from truth.
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

	// Sidebar width state — desktop only, persisted in a cookie
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
		document.cookie = `${SIDEBAR_WIDTH_COOKIE_NAME}=${width}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
	}, [])

	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
	}, [isMobile, setOpen, setOpenMobile])

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
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
						"group/sidebar-wrapper bg-bg has-data-[theme=default]:bg-bg has-data-[theme=gray]:has-data-[variant=inset]:bg-fill1 has-data-[theme=inverse]:has-data-[variant=inset]:bg-black flex min-h-svh w-full",
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

/**
 * Drag handle rendered on the inner edge of the sidebar.
 * Drop this inside `<Sidebar resizable>` — it self-wires via context.
 *
 * Accepts explicit `minWidth` / `maxWidth` overrides; otherwise uses the
 * values passed to `<Sidebar>`.
 */
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

	// Keep context in sync so Sidebar can suppress its transition while dragging
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
				// Position on the correct edge
				"absolute inset-y-0 z-20 w-1.5 cursor-col-resize",
				side === "left" ? "-right-0.5" : "-left-0.5",
				// Visual indicator line
				"after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:rounded-full",
				"after:bg-transparent after:transition-colors after:duration-150",
				"hover:after:bg-sidebar-border",
				// Active / dragging state
				isDragging && "after:bg-sidebar-ring",
				// Hide when sidebar is icon-collapsed (no room to drag)
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
				className={cn(
					"bg-sidebar text-sidebar-fg w-(--sidebar-width) sticky top-0 flex h-svh flex-col",
					className
				)}
				{...props}>
				{children}
			</div>
		)
	}

	// Mobile: use Drawer — resize handle is intentionally omitted here
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
						"bg-sidebar text-sidebar-fg w-(--sidebar-width) group p-0",
						theme === "inverse" && "dark"
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
				"text-sidebar-fg group peer hidden md:block",
				theme === "inverse" && "dark"
			)}
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-theme={theme}
			data-side={side}
			data-slot="sidebar">
			<div
				data-slot="sidebar-gap"
				className={cn(
					"w-(--sidebar-width) relative bg-transparent",
					!isResizing && "transition-[width] duration-200 ease-linear",
					"group-data-[collapsible=offcanvas]:w-0",
					"group-data-[side=right]:rotate-180",
					variant === "floating" || variant === "inset"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
				)}
			/>

			<div
				data-slot="sidebar-container"
				className={cn(
					"w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh md:flex",
					!isResizing &&
						"transition-[left,right,width] duration-200 ease-linear",
					side === "left"
						? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
						: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
					variant === "floating" || variant === "inset"
						? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
					"group-data-[theme=gray-body]:group-data-[variant=floating]:bg-fill1",
					className
				)}
				{...props}>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className={cn(
						"bg-sidebar group-data-[variant=floating]:border-sidebar-border relative flex h-full w-full flex-col",
						"group-data-[variant=floating]:rounded-lg group-data-[variant=inset]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
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
	return (
		<IconButton
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			aria-label="Sidebar Button"
			variant="ghost"
			color="neutral"
			size="32"
			className={className}
			onClick={(event) => {
				onClick?.(event)
				toggleSidebar()
			}}
			{...props}>
			{children || (
				<>
					<PanelLeftIcon />
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
				"hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
				"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
				"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
				"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
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
				"bg-bg relative flex w-full flex-1 flex-col",
				"peer-data-[theme=neutral-white]:border-sidebar-border peer-data-[theme=gray-body]:bg-fill1 peer-data-[theme=default]:peer-data-[variant=inset]:border md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
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
			className={cn("w-full shadow-none", className)}
			{...props}
		/>
	)
}

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-2 p-2 px-3", className)}
			{...props}
		/>
	)
}

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	)
}

function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
	return (
		<Divider
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("bg-soft-alpha w-auto", className)}
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
				"group-data-[collapsible=icon]:no-scrollbar flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:overflow-x-hidden",
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
				"relative flex w-full min-w-0 flex-col px-3 py-1.5 group-data-[state=collapsed]:px-3.5",
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
				"text-fg-secondary ring-sidebar-ring outline-hidden flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
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
				"text-fg ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-fg outline-hidden absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"after:absolute after:-inset-2 md:after:hidden",
				"group-data-[collapsible=icon]:hidden",
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
			className={cn("w-full text-sm", className)}
			{...props}
		/>
	)
}

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-0.5", className)}
			{...props}
		/>
	)
}

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
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
				"text-sidebar-fg ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-fg peer-hover/menu-button:text-sidebar-accent-fg outline-hidden absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
				"after:absolute after:-inset-2 md:after:hidden",
				"peer-data-[size=28]/menu-button:top-1",
				"peer-data-[size=32]/menu-button:top-1.5",
				"peer-data-[size=48]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
				showOnHover &&
					"peer-data-[active=true]/menu-button:text-sidebar-accent-fg group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
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
				"pointer-events-none absolute right-2 select-none rounded-md tabular-nums",
				"text-fg-secondary border px-1.5 py-0.5",
				"peer-data-[size=28]/menu-button:top-1",
				"peer-data-[size=32]/menu-button:top-1.5",
				"peer-data-[size=48]/menu-button:top-2.5",
				"group-data-[collapsible=icon]:hidden",
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
			className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
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
				"ml-5.5 flex min-w-0 translate-x-px flex-col gap-0.5 p-1 group-data-[collapsible=icon]:hidden",
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
			className={cn("group/menu-sub-item relative", className)}
			{...props}
		/>
	)
}

function SidebarMenuSubButton({
	asChild = false,
	size = "md",
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
				"text-sidebar-fg ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-fg data-active:bg-sidebar-accent data-active:text-sidebar-accent-fg [&>svg]:text-sidebar-accent-fg outline-hidden flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>a:last-child]:min-w-0 [&>a:last-child]:truncate [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
				size === "sm" && "text-xs",
				size === "md" && "text-sm",
				"group-data-[collapsible=icon]:hidden",
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
