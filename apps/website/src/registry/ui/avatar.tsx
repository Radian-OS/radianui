"use client"

import React, { createContext, useContext } from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
	size?: NonNullable<VariantProps<typeof avatarVariants>["size"]>
	rounded?: NonNullable<VariantProps<typeof avatarVariants>["rounded"]>
}
export type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>
export type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback>
export type AvatarIndicatorProps = React.HTMLAttributes<HTMLDivElement>
export type AvatarStatusProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarStatusVariants>

export type AvatarContextValue = {
	size: NonNullable<VariantProps<typeof avatarVariants>["size"]>
}

const AvatarContext = createContext<AvatarContextValue | null>(null)

function useAvatarContext() {
	const context = useContext(AvatarContext)
	if (!context) {
		throw new Error("Avatar components must be used within an Avatar")
	}
	return context
}

const avatarVariants = cva("flex items-center font-semibold justify-center shrink-0 relative", {
	variants: {
		size: {
			"16": "size-4 text-xs",
			"20": "size-5 text-xs",
			"24": "size-6 text-xs",
			"32": "size-8 text-sm",
			"36": "size-9 text-sm",
			"40": "size-10 text-sm",
			"48": "size-12 text-base",
			"64": "size-16 text-xl",
			"80": "size-20 text-2xl",
		},
		rounded: {
			circle: "rounded-full",
			square: "",
		},
	},
	compoundVariants: [
		{ size: "16", rounded: "square", class: "rounded-sm" },
		{ size: "20", rounded: "square", class: "rounded-sm" },
		{ size: "24", rounded: "square", class: "rounded-md" },
		{ size: "32", rounded: "square", class: "rounded-md" },
		{ size: "36", rounded: "square", class: "rounded-lg" },
		{ size: "40", rounded: "square", class: "rounded-lg" },
		{ size: "48", rounded: "square", class: "rounded-[10px]" },
		{ size: "64", rounded: "square", class: "rounded-xl" },
		{ size: "80", rounded: "square", class: "rounded-2xl" },
	],
	defaultVariants: {
		size: "40",
		rounded: "circle",
	},
})

const avatarStatusVariants = cva("absolute z-10 border-bg rounded-full box-content", {
	variants: {
		variant: {
			online: "bg-success",
			offline: "bg-fg-disabled",
			busy: "bg-warning",
			away: "bg-info",
		},
		size: {
			"16": "size-1 border",
			"20": "size-1 border",
			"24": "size-1.5 border-2",
			"32": "size-1.5 border-2",
			"36": "size-1.5 border-2",
			"40": "size-2 border-2",
			"48": "size-3 border-2",
			"64": "size-3 border-2",
			"80": "size-4 border-2",
		},
	},
	defaultVariants: {
		variant: "online",
		size: "40",
	},
})

function Avatar({ className, size = "40", rounded = "circle", ...props }: AvatarProps) {
	return (
		<AvatarContext.Provider value={{ size }}>
			<AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size, rounded }), className)} {...props} />
		</AvatarContext.Provider>
	)
}
Avatar.displayName = "Avatar"

function AvatarImage({ className, ...props }: AvatarImageProps) {
	return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("relative aspect-square size-full rounded-[inherit] object-cover", className)} {...props} />
}
AvatarImage.displayName = "AvatarImage"

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn("bg-primary-focus text-primary-text flex size-full items-center justify-center rounded-[inherit]", className)}
			{...props}
		/>
	)
}
AvatarFallback.displayName = "AvatarFallback"

function AvatarIndicator({ className, ...props }: AvatarIndicatorProps) {
	return <div data-slot="avatar-indicator" className={cn("absolute z-10 box-content flex items-center justify-center", className)} {...props} />
}
AvatarIndicator.displayName = "AvatarIndicator"

function AvatarStatus({ className, variant, size, ...props }: AvatarStatusProps) {
	const { size: contextSize } = useAvatarContext()
	const statusSize = size || contextSize
	return <div data-slot="avatar-status" className={cn(avatarStatusVariants({ variant, size: statusSize }), className)} {...props} />
}
AvatarStatus.displayName = "AvatarStatus"

export { Avatar, AvatarImage, AvatarFallback, AvatarIndicator, AvatarStatus, avatarStatusVariants, avatarVariants }
