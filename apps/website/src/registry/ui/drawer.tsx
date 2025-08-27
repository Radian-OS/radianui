"use client"

import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Drawer as DrawerPrimitives } from "vaul"
import { cn } from "@/lib/utils"

type BackdropType = "overlay" | "blur" | null
type DrawerType = "float" | "default" | "rounded"
type DirectionType = "top" | "bottom" | "right" | "left"

export type DrawerContextType = {
	backdrop: BackdropType
	type: DrawerType
	handle: boolean
	direction: DirectionType
}

type DrawerWrapperProps = VariantProps<typeof drawerVariants> &
	React.ComponentProps<typeof DrawerPrimitives.Root> & {
		backdrop?: BackdropType
		type?: DrawerType
		handle?: boolean
		className?: string
	}

type DrawerHeaderProps = {
	children: React.ReactNode
	className?: string
}

type DrawerTitleProps = {
	children: React.ReactNode
	className?: string
}

type DrawerDescriptionProps = {
	children: React.ReactNode
	className?: string
}

type DrawerFooterProps = {
	children: React.ReactNode
	className?: string
}

type DrawerCloseProps = {
	children: React.ReactNode
}

const drawerVariants = cva("fixed bg-transparent z-[51] bg-bg", {
	variants: {
		type: {
			float: "",
			default: "outline outline-border",
			rounded: "rounded-xl", // No outline for rounded type to avoid the border issue
		},
		direction: {
			top: "top-0 w-full h-fit left-0 max-h-full",
			bottom: "bottom-0 left-0 w-full h-fit max-h-full",
			right: "top-0 right-0 h-full w-fit max-w-full",
			left: "top-0 left-0 h-full w-fit max-w-full",
		},
	},
	defaultVariants: {
		direction: "right",
		type: "default",
	},

	compoundVariants: [
		{
			type: "float", // to show gap on all sides
			direction: "top",
			className: "top-2 left-2 w-[calc(100%-1rem)]",
		},
		{
			type: "float",
			direction: "bottom",
			className: "bottom-2 left-2 w-[calc(100%-1rem)]",
		},
		{
			type: "float",
			direction: "left",
			className: "top-2 left-2 h-[calc(100%-1rem)]",
		},
		{
			type: "float",
			direction: "right",
			className: "top-2 right-2 h-[calc(100%-1rem)]",
		},
	],
})

const backdropVariants = cva("z-50 fixed", {
	variants: {
		backdrop: {
			overlay: "inset-0 bg-black/50",
			blur: "backdrop-blur-sm inset-0",
		},
	},
	defaultVariants: {
		backdrop: "overlay",
	},
})

const handleVariants = cva("absolute! max-h-20! max-w-1.5! z-50! bg-border! rounded-full!", {
	variants: {
		direction: {
			left: "right-3! top-1/2! -translate-y-1/2! h-full! w-1.5!",
			right: "left-3! top-1/2! -translate-y-1/2! h-full! w-1.5!",
			top: "bottom-3! left-1/2! -translate-x-1/2! h-1.5! w-full! max-w-20!",
			bottom: "top-3! left-1/2! -translate-x-1/2! h-1.5! w-full! max-w-20!",
		},
	},
	defaultVariants: {
		direction: "right",
	},
})

function getContentClass(type: DrawerType, direction: DirectionType) {
	const baseClasses = "bg-bg flex flex-col gap-5 overflow-hidden"

	// Handle float type
	if (type === "float") {
		return cn(baseClasses, "rounded-xl shadow-lg outline outline-border")
	}

	// Handle rounded type
	if (type === "rounded") {
		switch (direction) {
			case "top":
				return cn(baseClasses, "outline outline-border rounded-b-xl")
			case "bottom":
				return cn(baseClasses, "outline outline-border rounded-t-xl")
			case "left":
				return cn(baseClasses, "outline outline-border rounded-r-xl")
			case "right":
				return cn(baseClasses, "outline outline-border rounded-l-xl")
			default:
				return baseClasses
		}
	}

	// Default type
	return baseClasses
}

function getPaddingClass(handle: boolean, direction: DirectionType) {
	if (handle) {
		switch (direction) {
			case "top":
				return "pb-7.5 pt-5 pl-5 pr-5"
			case "bottom":
				return "pt-7.5 pb-5 pl-5 pr-5"
			case "left":
				return "pr-7.5 pt-5 pl-5 pb-5"
			case "right":
				return "pl-7.5 pt-5 pb-5 pr-5"
		}
	}
	return "p-5"
}

const DrawerContext = React.createContext<DrawerContextType | null>(null)

function useDrawer() {
	const context = React.use(DrawerContext)
	if (!context) {
		throw new Error("useDrawer must be used within DrawerContext")
	}
	return context
}

function Drawer({ direction = "right", type = "default", children, backdrop = "overlay", handle = false, ...props }: DrawerWrapperProps) {
	const ctxValues = React.useMemo(() => ({ direction, type, backdrop, handle }), [direction, type, backdrop, handle])

	return (
		<DrawerContext value={ctxValues}>
			<DrawerPrimitives.Root direction={direction} {...props}>
				{children}
			</DrawerPrimitives.Root>
		</DrawerContext>
	)
}

function DrawerTrigger({ asChild, children, ...props }: React.ComponentPropsWithRef<typeof DrawerPrimitives.Trigger>) {
	return (
		<DrawerPrimitives.Trigger asChild {...props}>
			{asChild ? children : <span>{children}</span>}
		</DrawerPrimitives.Trigger>
	)
}

function DrawerContent({ children, className, ...props }: React.ComponentPropsWithRef<typeof DrawerPrimitives.Content>) {
	const { backdrop, direction, handle, type } = useDrawer()

	return (
		<DrawerPrimitives.Portal>
			<DrawerPrimitives.Overlay className={cn(backdropVariants({ backdrop }))} />
			<DrawerPrimitives.Content className={cn(drawerVariants({ direction, type }), getPaddingClass(handle, direction), getContentClass(type, direction), className)} {...props}>
				{handle && <DrawerPrimitives.Handle className={cn(handleVariants({ direction }))} />}
				{children}
			</DrawerPrimitives.Content>
		</DrawerPrimitives.Portal>
	)
}

function DrawerHeader({ children, className }: DrawerHeaderProps) {
	return <div className={cn("flex flex-col gap-1", className)}>{children}</div>
}

function DrawerTitle({ children, className }: DrawerTitleProps) {
	return <DrawerPrimitives.Title className={cn("text-lg font-semibold", className)}>{children}</DrawerPrimitives.Title>
}

function DrawerDescription({ children, className }: DrawerDescriptionProps) {
	return <DrawerPrimitives.Description className={cn("text-fg-secondary gap-1 text-sm", className)}>{children}</DrawerPrimitives.Description>
}

function DrawerBody({ children, className }: DrawerDescriptionProps) {
	return <div className={cn("no-scrollbar flex-grow overflow-auto", className)}>{children}</div>
}

function DrawerFooter({ children, className }: DrawerFooterProps) {
	return <div className={cn("flex items-end justify-end gap-2", className)}>{children}</div>
}

function DrawerClose({ children }: DrawerCloseProps) {
	return <DrawerPrimitives.Close asChild>{children}</DrawerPrimitives.Close>
}

export { Drawer, DrawerTrigger, DrawerContent, DrawerBody, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle }
