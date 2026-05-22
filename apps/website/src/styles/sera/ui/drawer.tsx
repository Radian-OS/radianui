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
	"fixed z-50 flex flex-col overflow-hidden bg-bg gap-6",
	{
		variants: {
			variant: {
				float: "outline-border shadow-none outline",
				default: "outline-border outline",
				rounded: "outline-border outline",
			},
			direction: {
				top: "top-0 w-full h-fit left-0 max-h-full",
				bottom: "bottom-0 left-0 w-full h-fit max-h-full",
				right: "top-0 right-0 h-full w-fit max-w-full",
				left: "top-0 left-0 h-full w-fit max-w-full",
			},
			handle: {
				true: "",
				false: "p-6",
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
				className: "pb-8 pl-6 pr-6 pt-6",
			},
			{
				handle: true,
				direction: "bottom",
				className: "pb-6 pl-6 pr-6 pt-8",
			},
			{
				handle: true,
				direction: "left",
				className: "pb-6 pl-6 pr-8 pt-6",
			},
			{
				handle: true,
				direction: "right",
				className: "pb-6 pl-8 pr-6 pt-6",
			},
			// Rounded directional overrides
			{
				variant: "rounded",
				direction: "top",
				className: "",
			},
			{
				variant: "rounded",
				direction: "bottom",
				className: "",
			},
			{
				variant: "rounded",
				direction: "left",
				className: "",
			},
			{
				variant: "rounded",
				direction: "right",
				className: "",
			},
		],
	}
)

const backdropVariants = cva("z-50 fixed", {
	variants: {
		backdrop: {
			overlay: "inset-0 bg-black/50",
			blur: "inset-0 backdrop-blur-sm",
			transparent: "inset-0 backdrop-blur-none",
		},
	},
	defaultVariants: {
		backdrop: "overlay",
	},
})

const handleVariants = cva(
	"absolute! max-h-20! max-w-1.5! z-50! rounded-full! ! bg-border",
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
	return <div className={cn("flex flex-col gap-2", className)}>{children}</div>
}

function DrawerTitle({ children, className }: DrawerTitleProps) {
	return (
		<DrawerPrimitives.Title className={cn("text-xl font-semibold", className)}>
			{children}
		</DrawerPrimitives.Title>
	)
}

function DrawerDescription({ children, className }: DrawerDescriptionProps) {
	return (
		<DrawerPrimitives.Description
			className={cn("text-fg-secondary gap-2 text-sm", className)}>
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
		<div className={cn("flex items-end justify-end gap-3", className)}>
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
