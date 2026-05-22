"use client"

import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Drawer as DrawerPrimitives } from "vaul"
import { cn } from "@/lib/utils"

export type DrawerContextType = {
	backdrop: VariantProps<typeof backdropVariants>["backdrop"]
	variant: VariantProps<typeof drawerVariants>["variant"]
	handle: boolean
	direction: VariantProps<typeof drawerVariants>["direction"]
}

export type DrawerWrapperProps = VariantProps<typeof drawerVariants> &
	React.ComponentProps<typeof DrawerPrimitives.Root> & {
		backdrop?: VariantProps<typeof backdropVariants>["backdrop"]
		variant?: VariantProps<typeof drawerVariants>["variant"]
		handle?: boolean
		className?: string
	}

export type DrawerHeaderProps = {
	children: React.ReactNode
	className?: string
}

export type DrawerTitleProps = {
	children: React.ReactNode
	className?: string
}

export type DrawerDescriptionProps = {
	children: React.ReactNode
	className?: string
}

export type DrawerFooterProps = {
	children: React.ReactNode
	className?: string
}

export type DrawerCloseProps = {
	children: React.ReactNode
}

const drawerVariants = cva(
	"fixed z-50 flex flex-col overflow-hidden r-drawer cn-drawer",
	{
		variants: {
			variant: {
				float: "r-drawer-variant-float cn-drawer-variant-float",
				default: "r-drawer-variant-default cn-drawer-variant-default",
				rounded: "r-drawer-variant-rounded cn-drawer-variant-rounded",
			},
			direction: {
				top: "top-0 w-full h-fit left-0 max-h-full",
				bottom: "bottom-0 left-0 w-full h-fit max-h-full",
				right: "top-0 right-0 h-full w-fit max-w-full",
				left: "top-0 left-0 h-full w-fit max-w-full",
			},
			handle: {
				true: "",
				false: "r-drawer-padding cn-drawer-padding",
			},
		},
		defaultVariants: {
			direction: "right",
			variant: "default",
			handle: false,
		},
		compoundVariants: [
			// Float position overrides
			{
				variant: "float",
				direction: "top",
				className: "top-2 left-2 w-[calc(100%-1rem)]",
			},
			{
				variant: "float",
				direction: "bottom",
				className: "bottom-2 left-2 w-[calc(100%-1rem)]",
			},
			{
				variant: "float",
				direction: "left",
				className: "top-2 left-2 h-[calc(100%-1rem)]",
			},
			{
				variant: "float",
				direction: "right",
				className: "top-2 right-2 h-[calc(100%-1rem)]",
			},
			// Handle padding variants
			{
				handle: true,
				direction: "top",
				className: "r-drawer-handle-padding-top cn-drawer-handle-padding-top",
			},
			{
				handle: true,
				direction: "bottom",
				className:
					"r-drawer-handle-padding-bottom cn-drawer-handle-padding-bottom",
			},
			{
				handle: true,
				direction: "left",
				className: "r-drawer-handle-padding-left cn-drawer-handle-padding-left",
			},
			{
				handle: true,
				direction: "right",
				className:
					"r-drawer-handle-padding-right cn-drawer-handle-padding-right",
			},
			// Rounded directional overrides
			{
				variant: "rounded",
				direction: "top",
				className: "r-drawer-rounded-top cn-drawer-rounded-top",
			},
			{
				variant: "rounded",
				direction: "bottom",
				className: "r-drawer-rounded-bottom cn-drawer-rounded-bottom",
			},
			{
				variant: "rounded",
				direction: "left",
				className: "r-drawer-rounded-left cn-drawer-rounded-left",
			},
			{
				variant: "rounded",
				direction: "right",
				className: "r-drawer-rounded-right cn-drawer-rounded-right",
			},
		],
	}
)

const backdropVariants = cva("z-50 fixed", {
	variants: {
		backdrop: {
			overlay: "inset-0 r-drawer-backdrop-overlay cn-drawer-backdrop-overlay",
			blur: "inset-0 r-drawer-backdrop-blur cn-drawer-backdrop-blur",
			transparent:
				"inset-0 r-drawer-backdrop-transparent cn-drawer-backdrop-transparent",
		},
	},
	defaultVariants: {
		backdrop: "overlay",
	},
})

const handleVariants = cva(
	"absolute! max-h-20! max-w-1.5! z-50! rounded-full! r-drawer-handle cn-drawer-handle!",
	{
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
	}
)

const DrawerContext = React.createContext<DrawerContextType | null>(null)

function useDrawer() {
	const context = React.use(DrawerContext)
	if (!context) {
		throw new Error("useDrawer must be used within DrawerContext")
	}
	return context
}

function Drawer({
	direction = "right",
	variant = "default",
	children,
	backdrop = "overlay",
	handle = false,
	...props
}: DrawerWrapperProps) {
	const ctxValues = React.useMemo(
		() => ({ direction, variant, backdrop, handle }),
		[direction, variant, backdrop, handle]
	)

	return (
		<DrawerContext value={ctxValues}>
			<DrawerPrimitives.Root direction={direction} {...props}>
				{children}
			</DrawerPrimitives.Root>
		</DrawerContext>
	)
}

function DrawerTrigger({
	asChild,
	children,
	...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitives.Trigger>) {
	return (
		<DrawerPrimitives.Trigger asChild {...props}>
			{asChild ? children : <span>{children}</span>}
		</DrawerPrimitives.Trigger>
	)
}

function DrawerContent({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitives.Content>) {
	const { backdrop, direction, handle, variant } = useDrawer()

	return (
		<DrawerPrimitives.Portal>
			<DrawerPrimitives.Overlay
				className={cn(backdropVariants({ backdrop }))}
			/>
			<DrawerPrimitives.Content
				className={cn(
					drawerVariants({ direction, variant, handle }),
					className
				)}
				{...props}>
				{handle && (
					<DrawerPrimitives.Handle
						className={cn(handleVariants({ direction }))}
					/>
				)}
				{children}
			</DrawerPrimitives.Content>
		</DrawerPrimitives.Portal>
	)
}

function DrawerHeader({ children, className }: DrawerHeaderProps) {
	return (
		<div
			className={cn(
				"r-drawer-header cn-drawer-header flex flex-col",
				className
			)}>
			{children}
		</div>
	)
}

function DrawerTitle({ children, className }: DrawerTitleProps) {
	return (
		<DrawerPrimitives.Title
			className={cn("r-drawer-title cn-drawer-title", className)}>
			{children}
		</DrawerPrimitives.Title>
	)
}

function DrawerDescription({ children, className }: DrawerDescriptionProps) {
	return (
		<DrawerPrimitives.Description
			className={cn("r-drawer-description cn-drawer-description", className)}>
			{children}
		</DrawerPrimitives.Description>
	)
}

function DrawerBody({ children, className }: DrawerDescriptionProps) {
	return (
		<div className={cn("no-scrollbar flex-grow overflow-auto", className)}>
			{children}
		</div>
	)
}

function DrawerFooter({ children, className }: DrawerFooterProps) {
	return (
		<div
			className={cn(
				"r-drawer-footer cn-drawer-footer flex items-end justify-end",
				className
			)}>
			{children}
		</div>
	)
}

function DrawerClose({ children }: DrawerCloseProps) {
	return <DrawerPrimitives.Close asChild>{children}</DrawerPrimitives.Close>
}

export {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerBody,
	DrawerClose,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
}
