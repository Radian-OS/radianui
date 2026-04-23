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
	"flex items-center justify-center shrink-0 relative cn-avatar",
	{
		variants: {
			size: {
				"16": "cn-avatar-size-16",
				"20": "cn-avatar-size-20",
				"24": "cn-avatar-size-24",
				"32": "cn-avatar-size-32",
				"36": "cn-avatar-size-36",
				"40": "cn-avatar-size-40",
				"48": "cn-avatar-size-48",
				"64": "cn-avatar-size-64",
				"80": "cn-avatar-size-80",
			},
			rounded: {
				circle: "cn-avatar-rounded-circle",
				square: "",
			},
		},
		compoundVariants: [
			{ size: "16", rounded: "square", class: "cn-avatar-square-16" },
			{ size: "20", rounded: "square", class: "cn-avatar-square-20" },
			{ size: "24", rounded: "square", class: "cn-avatar-square-24" },
			{ size: "32", rounded: "square", class: "cn-avatar-square-32" },
			{ size: "36", rounded: "square", class: "cn-avatar-square-36" },
			{ size: "40", rounded: "square", class: "cn-avatar-square-40" },
			{ size: "48", rounded: "square", class: "cn-avatar-square-48" },
			{ size: "64", rounded: "square", class: "cn-avatar-square-64" },
			{ size: "80", rounded: "square", class: "cn-avatar-square-80" },
		],
		defaultVariants: {
			size: "40",
			rounded: "circle",
		},
	}
)

const avatarStatusVariants = cva(
	"absolute z-10 rounded-full box-content cn-avatar-status",
	{
		variants: {
			variant: {
				online: "cn-avatar-status-online",
				offline: "cn-avatar-status-offline",
				busy: "cn-avatar-status-busy",
				away: "cn-avatar-status-away",
			},
			size: {
				"16": "cn-avatar-status-size-16",
				"20": "cn-avatar-status-size-20",
				"24": "cn-avatar-status-size-24",
				"32": "cn-avatar-status-size-32",
				"36": "cn-avatar-status-size-36",
				"40": "cn-avatar-status-size-40",
				"48": "cn-avatar-status-size-48",
				"64": "cn-avatar-status-size-64",
				"80": "cn-avatar-status-size-80",
			},
		},
		defaultVariants: {
			variant: "online",
			size: "40",
		},
	}
)

function Avatar({
	className,
	size = "40",
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
