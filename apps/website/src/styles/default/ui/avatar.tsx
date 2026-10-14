"use client"

import React, { createContext, useContext } from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
	size?: NonNullable<VariantProps<typeof avatarVariants>["size"]>
	rounded?: NonNullable<VariantProps<typeof avatarVariants>["rounded"]>
}
export type AvatarImageProps = React.ComponentProps<
	typeof AvatarPrimitive.Image
>
export type AvatarFallbackProps = React.ComponentProps<
	typeof AvatarPrimitive.Fallback
>
export type AvatarIndicatorProps = React.HTMLAttributes<HTMLDivElement>
export type AvatarStatusProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof avatarStatusVariants>

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

const avatarVariants = cva(
	"relative flex shrink-0 items-center justify-center font-semibold",
	{
		variants: {
			size: {
				"3xs": "size-4 text-xs",
				"2xs": "size-5 text-xs",
				xs: "size-6 text-xs",
				sm: "size-8 text-sm",
				md: "size-9 text-sm",
				lg: "size-10 text-sm",
				xl: "size-12 text-base",
				"2xl": "size-16 text-xl",
				"3xl": "size-20 text-2xl",
			},
			rounded: {
				circle: "rounded-full",
				square: "",
			},
		},
		compoundVariants: [
			{ size: "3xs", rounded: "square", className: "rounded-md" },
			{ size: "2xs", rounded: "square", className: "rounded-md" },
			{ size: "xs", rounded: "square", className: "rounded-lg" },
			{ size: "sm", rounded: "square", className: "rounded-lg" },
			{ size: "md", rounded: "square", className: "rounded-lg" },
			{ size: "lg", rounded: "square", className: "rounded-lg" },
			{ size: "xl", rounded: "square", className: "rounded-lg" },
			{ size: "2xl", rounded: "square", className: "rounded-xl" },
			{ size: "3xl", rounded: "square", className: "rounded-2xl" },
		],
		defaultVariants: {
			size: "lg",
			rounded: "circle",
		},
	}
)

const avatarStatusVariants = cva(
	"border-bg absolute z-10 box-content rounded-full",
	{
		variants: {
			variant: {
				online: "bg-success",
				offline: "bg-fg-disabled",
				busy: "bg-warning",
				away: "bg-info",
			},
			size: {
				"3xs": "size-1 border",
				"2xs": "size-1 border",
				xs: "size-1.5 border-2",
				sm: "size-1.5 border-2",
				md: "size-1.5 border-2",
				lg: "size-2 border-2",
				xl: "size-3 border-2",
				"2xl": "size-3 border-2",
				"3xl": "size-4 border-2",
			},
		},
		defaultVariants: {
			variant: "online",
			size: "lg",
		},
	}
)

function Avatar({
	className,
	size = "lg",
	rounded = "circle",
	...props
}: AvatarProps) {
	return (
		<AvatarContext.Provider value={{ size }}>
			<AvatarPrimitive.Root
				data-slot="avatar"
				className={cn(avatarVariants({ size, rounded }), className)}
				{...props}
			/>
		</AvatarContext.Provider>
	)
}
Avatar.displayName = "Avatar"

function AvatarImage({ className, ...props }: AvatarImageProps) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"relative aspect-square size-full rounded-[inherit] object-cover",
				className
			)}
			{...props}
		/>
	)
}
AvatarImage.displayName = "AvatarImage"

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-primary-focus text-primary-text flex size-full items-center justify-center rounded-[inherit]",
				className
			)}
			{...props}
		/>
	)
}
AvatarFallback.displayName = "AvatarFallback"

function AvatarIndicator({ className, ...props }: AvatarIndicatorProps) {
	return (
		<div
			data-slot="avatar-indicator"
			className={cn(
				"absolute z-10 box-content flex items-center justify-center",
				className
			)}
			{...props}
		/>
	)
}
AvatarIndicator.displayName = "AvatarIndicator"

function AvatarStatus({
	className,
	variant,
	size,
	...props
}: AvatarStatusProps) {
	const { size: contextSize } = useAvatarContext()
	const statusSize = size || contextSize
	return (
		<div
			data-slot="avatar-status"
			className={cn(
				avatarStatusVariants({ variant, size: statusSize }),
				className
			)}
			{...props}
		/>
	)
}
AvatarStatus.displayName = "AvatarStatus"

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarIndicator,
	AvatarStatus,
	avatarStatusVariants,
	avatarVariants,
}
