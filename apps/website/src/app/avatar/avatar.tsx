"use client"

import React, { createContext, useContext } from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export type AvatarRounded = "circle" | "square"

export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
	size?: number
	rounded?: AvatarRounded
}
export type AvatarImageProps = React.ComponentProps<
	typeof AvatarPrimitive.Image
>
export type AvatarFallbackProps = React.ComponentProps<
	typeof AvatarPrimitive.Fallback
>
export type AvatarIndicatorProps = React.HTMLAttributes<HTMLDivElement>
export type AvatarStatusProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof avatarStatusVariants> & { size?: number }

export type AvatarContextValue = { size: number; rounded: AvatarRounded }

const AvatarContext = createContext<AvatarContextValue | null>(null)

function useAvatarContext() {
	const context = useContext(AvatarContext)
	if (!context)
		throw new Error("Avatar components must be used within an Avatar")
	return context
}

// ─── Size helpers ─────────────────────────────────────────────────────────────

function getFontSize(size: number): number {
	return Math.round(Math.max(size * 0.32))
}

function getSquareRadius(size: number): number {
	return Math.round(size * 0.17)
}

function getStatusGeometry(size: number, rounded: AvatarRounded) {
	const dotSize = Math.round(size * 0.12)
	const borderWidth = Math.max(Math.round(size * 0.05))

	// For circle: dot sits on the edge of the circle at 45°.
	// The centre of the dot lands at radius * (1 - cos45°) from the corner,
	// so we nudge it inward by half the dot + border so it overlaps the edge cleanly.
	// Simplified: offset = size * 0.5 * (1 - 0.707) - (dotSize / 2 + borderWidth)
	// For square: just flush to the corner with a small inset equal to borderWidth.
	const offset =
		rounded === "circle"
			? Math.round(size * 0.5 * (1 - 0.707) - dotSize / 2 - borderWidth)
			: -borderWidth

	return { dotSize, borderWidth, offset }
}

// ─── CVA — colour only ────────────────────────────────────────────────────────

const avatarStatusVariants = cva("absolute z-10 rounded-full box-content", {
	variants: {
		variant: {
			online: "bg-success  border-bg",
			offline: "bg-fg-disabled border-bg",
			busy: "bg-warning   border-bg",
			away: "bg-info      border-bg",
		},
	},
	defaultVariants: { variant: "online" },
})

// ─── Components ───────────────────────────────────────────────────────────────

function Avatar({
	className,
	size = 40,
	rounded = "circle",
	style,
	...props
}: AvatarProps) {
	return (
		<AvatarContext.Provider value={{ size, rounded }}>
			<AvatarPrimitive.Root
				data-slot="avatar"
				className={cn(
					"relative flex shrink-0 items-center justify-center overflow-visible font-semibold",
					className
				)}
				style={{
					width: size,
					height: size,
					borderRadius: rounded === "circle" ? "9999px" : getSquareRadius(size),
					fontSize: getFontSize(size),
					...style,
				}}
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
	size: sizeProp,
	style,
	...props
}: AvatarStatusProps) {
	const { size: contextSize, rounded } = useAvatarContext()
	const size = sizeProp ?? contextSize
	const { dotSize, borderWidth, offset } = getStatusGeometry(size, rounded)

	return (
		<div
			data-slot="avatar-status"
			className={cn(avatarStatusVariants({ variant }), className)}
			style={{
				width: dotSize,
				height: dotSize,
				borderWidth,
				bottom: offset,
				right: offset,
				...style,
			}}
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
}
