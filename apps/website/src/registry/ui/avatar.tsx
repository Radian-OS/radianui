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
	"cn-avatar relative flex shrink-0 items-center justify-center",
	{
		variants: {
			size: {
				"3xs": "cn-avatar-size-3xs",
				"2xs": "cn-avatar-size-2xs",
				xs: "cn-avatar-size-xs",
				sm: "cn-avatar-size-sm",
				md: "cn-avatar-size-md",
				lg: "cn-avatar-size-lg",
				xl: "cn-avatar-size-xl",
				"2xl": "cn-avatar-size-2xl",
				"3xl": "cn-avatar-size-3xl",
			},
			rounded: {
				circle: "cn-avatar-rounded-circle",
				square: "",
			},
		},
		compoundVariants: [
			{ size: "3xs", rounded: "square", className: "cn-avatar-square-3xs" },
			{ size: "2xs", rounded: "square", className: "cn-avatar-square-2xs" },
			{ size: "xs", rounded: "square", className: "cn-avatar-square-xs" },
			{ size: "sm", rounded: "square", className: "cn-avatar-square-sm" },
			{ size: "md", rounded: "square", className: "cn-avatar-square-md" },
			{ size: "lg", rounded: "square", className: "cn-avatar-square-lg" },
			{ size: "xl", rounded: "square", className: "cn-avatar-square-xl" },
			{ size: "2xl", rounded: "square", className: "cn-avatar-square-2xl" },
			{ size: "3xl", rounded: "square", className: "cn-avatar-square-3xl" },
		],
		defaultVariants: {
			size: "lg",
			rounded: "circle",
		},
	}
)

const avatarStatusVariants = cva(
	"cn-avatar-status absolute z-10 box-content rounded-full",
	{
		variants: {
			variant: {
				online: "cn-avatar-status-online",
				offline: "cn-avatar-status-offline",
				busy: "cn-avatar-status-busy",
				away: "cn-avatar-status-away",
			},
			size: {
				"3xs": "cn-avatar-status-size-3xs",
				"2xs": "cn-avatar-status-size-2xs",
				xs: "cn-avatar-status-size-xs",
				sm: "cn-avatar-status-size-sm",
				md: "cn-avatar-status-size-md",
				lg: "cn-avatar-status-size-lg",
				xl: "cn-avatar-status-size-xl",
				"2xl": "cn-avatar-status-size-2xl",
				"3xl": "cn-avatar-status-size-3xl",
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
				"cn-avatar-image relative aspect-square size-full object-cover",
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
				"cn-avatar-fallback flex size-full items-center justify-center",
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
