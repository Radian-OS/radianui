"use client"
import { type VariantProps, cva } from "class-variance-authority"
import { Drawer as DrawerPrimitives } from "vaul"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type DrawerWrapperProps = VariantProps<typeof drawerVariants> & {
	direction?: "top" | "bottom" | "left" | "right"
	children?: React.ReactNode
	trigger?: React.ReactNode
	backdrop?: "overlay" | "blur" | null
	closable?: boolean
	type?: "float" | "default" | "rounded"
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

const drawerVariants = cva("fixed bg-transparent z-50", {
	variants: {
		type: {
			float: "",
			default: "",
			rounded: "",
		},
		direction: {
			top: "top-0 w-full max-h-100 h-full left-0", // 100 = 400px
			bottom: "bottom-0 left-0 w-full max-h-100 h-full",
			right: "top-0 right-0 h-full max-w-112.5 w-full", // 112.5 = 450px
			left: "top-0 left-0 h-full max-w-112.5 w-full",
		},
	},
	defaultVariants: {
		direction: "right",
		type: "default",
	},
	compoundVariants: [
		{
			type: "float",
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
		{ type: "default", direction: "top", className: "bg-bg-base" },
		{ type: "default", direction: "bottom", className: "bg-bg-base" },
		{ type: "default", direction: "left", className: "bg-bg-base" },
		{ type: "default", direction: "right", className: "bg-bg-base" },
		{ type: "rounded", direction: "top", className: "bg-bg-base rounded-b-xl" },
		{ type: "rounded", direction: "bottom", className: "bg-bg-base rounded-t-xl" },
		{ type: "rounded", direction: "left", className: "bg-bg-base rounded-r-xl" },
		{ type: "rounded", direction: "right", className: "bg-bg-base rounded-l-xl" },
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

function Drawer({
	direction = "right",
	type = "default",
	children,
	backdrop = "overlay",
	trigger,
	className,
	handle = false,
	...props
}: DrawerWrapperProps) {
	function getRoundedClass() {
		if (type === "float") return "rounded-xl"
		if (type === "rounded") {
			switch (direction) {
				case "top":
					return "rounded-b-xl border-t-transparent"
				case "bottom":
					return "rounded-t-xl border-b-transparent"
				case "left":
					return "rounded-r-xl border-l-transparent"
				case "right":
					return "rounded-l-xl border-r-transparent"
				default:
					return ""
			}
		}
	}

	function getDefaultClass() {
		if (type !== "default") return ""
		switch (direction) {
			case "top":
				return "border-t-transparent"
			case "bottom":
				return "border-b-transparent"
			case "left":
				return "border-l-transparent"
			case "right":
				return "border-r-transparent"
			default:
				return ""
		}
	}

	function getPaddingClass() {
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

	return (
		<DrawerPrimitives.Root direction={direction} {...props}>
			<DrawerPrimitives.Trigger asChild>{trigger || <Button>Open Drawer</Button>}</DrawerPrimitives.Trigger>
			<DrawerPrimitives.Portal>
				<DrawerPrimitives.Overlay className={cn(backdropVariants({ backdrop }))} />
				<DrawerPrimitives.Content className={cn(drawerVariants({ direction, type }))}>
					{handle && <DrawerPrimitives.Handle className={cn(handleVariants({ direction }))} />}
					<div
						className={cn(
							"bg-bg-base relative flex h-full w-full flex-col border drop-shadow-2xl",
							getRoundedClass(),
							getDefaultClass(),
							getPaddingClass(),
							className
						)}>
						{/* Structure changed to separate fixed and scrollable parts */}
						{children}
					</div>
				</DrawerPrimitives.Content>
			</DrawerPrimitives.Portal>
		</DrawerPrimitives.Root>
	)
}

function DrawerHeader({ children, className }: DrawerHeaderProps) {
	return <div className={cn("flex flex-col mb-5", className)}>{children}</div>
}

function DrawerTitle({ children, className }: DrawerTitleProps) {
	return <DrawerPrimitives.Title className={cn("text-lg font-semibold", className)}>{children}</DrawerPrimitives.Title>
}

function DrawerDescription({ children, className }: DrawerDescriptionProps) {
	return <DrawerPrimitives.Description className={cn("text-sm text-text-secondary gap-1", className)}>{children}</DrawerPrimitives.Description>
}

function DrawerBody({ children, className }: DrawerDescriptionProps) {
	return <div className={cn("flex-grow overflow-auto no-scrollbar", className)}>{children}</div>
}

function DrawerFooter({ children, className }: DrawerFooterProps) {
	return <div className={cn("mt-5 flex items-end justify-end gap-2", className)}>{children}</div>
}

function DrawerClose({ children }: DrawerCloseProps) {
	return <DrawerPrimitives.Close asChild>{children}</DrawerPrimitives.Close>
}

export { Drawer, DrawerBody, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle }