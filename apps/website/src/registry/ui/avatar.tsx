"use client"

import React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type AvatarRadius = NonNullable<VariantProps<typeof avatarRadiusVariants>["radius"]>

type AvatarSize = NonNullable<VariantProps<typeof avatarRadiusVariants>["size"]>

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
	src?: string
	name?: string
	className?: string
	size?: AvatarSize
	radius?: AvatarRadius
	status?: "online" | "offline"
}

type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactElement<typeof Avatar> | React.ReactElement<typeof Avatar>[]
	size?: NonNullable<VariantProps<typeof avatarGroupVariants>["size"]>
	maxItems?: number
	className?: string
}

const AvatarFallbackIcon = ({ className, radius }: { className: string; radius: AvatarRadius }) => {
	const clipPathId = `avatar-clip-${radius}`

	const borderRadiusFirstRect = radius === "circle" ? 20 : 8

	return (
		<svg width="100" height="100" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<defs>
				<clipPath id={clipPathId}>
					<rect width="36" height="36" rx={borderRadiusFirstRect} ry={borderRadiusFirstRect} fill="white" />
				</clipPath>
			</defs>
			<g clipPath="url(#clip0_5846_11264)">
				<path d="M5.3999 36C5.3999 29.0536 10.7999 23.4 17.9999 23.4C25.1999 23.4 30.5999 29.0536 30.5999 36" className="fill-elevation-level1" />
				<path
					d="M18.0081 19.8C21.9759 19.8 25.1998 16.5761 25.1998 12.6083C25.1998 8.64044 21.9759 5.40002 18.0081 5.40002C14.0402 5.40002 10.7998 8.6239 10.7998 12.5918C10.7998 16.5596 14.0237 19.7835 17.9915 19.7835C18.0081 19.8"
					className="fill-elevation-level1"
				/>
			</g>
		</svg>
	)
}

// Used to render the dot circle indicator(online/offline)
const DotCircleIcon = ({ className }: { className?: string }) => {
	return <div className={className}></div>
}

const avatarRadiusVariants = cva("flex items-center justify-center shrink-0 font-semibold text-elevation-level2", {
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
		radius: {
			circle: "rounded-full",
			square: "",
		},
	},
	compoundVariants: [
		{ size: "16", radius: "square", class: "rounded-sm" },
		{ size: "20", radius: "square", class: "rounded-sm" },
		{ size: "24", radius: "square", class: "rounded-md" },
		{ size: "32", radius: "square", class: "rounded-md" },
		{ size: "36", radius: "square", class: "rounded-lg" },
		{ size: "40", radius: "square", class: "rounded-lg" },
		{ size: "48", radius: "square", class: "rounded-[10px]" },
		{ size: "64", radius: "square", class: "rounded-xl" },
		{ size: "80", radius: "square", class: "rounded-2xl" },
	],
	defaultVariants: {
		size: "40",
		radius: "circle",
	},
})

const indicatorVariants = cva("absolute z-10 border-bg rounded-full box-content bottom-0 right-0", {
	variants: {
		size: {
			"16": "size-1 border",
			"20": "size-1 border",
			"24": "size-1.5 border 2",
			"32": "size-1.5 border-2",
			"36": "size-1.5 border-2",
			"40": "size-2 border-2",
			"48": "size-3 border-2",
			"64": "size-3 border-2",
			"80": "size-4 border-2",
		},
	},
})

const avatarGroupVariants = cva("flex items-center", {
	variants: {
		size: {
			"16": "-space-x-2",
			"20": "-space-x-2",
			"24": "-space-x-2.5",
			"32": "-space-x-2.5",
		},
	},
	defaultVariants: {
		size: "20",
	},
})

// Renders the initials of the name based on the size of the avatar
function getInitials(name: string, size: AvatarProps["size"]) {
	if (!name) return ""
	if (name.startsWith("+")) return name

	const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase())

	return size && parseInt(size) < 32 ? initials[0] : initials.slice(0, 2).join("")
}

function Avatar({ src, name, className, size = "36", radius = "circle", status, ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root data-slot="avatar" className={cn(avatarRadiusVariants({ size, radius }), className, "bg-fill4 relative")} {...props}>
			<AvatarPrimitive.Image className="aspect-square size-full rounded-[inherit] object-cover" src={src} alt={name} />
			<AvatarPrimitive.Fallback
				className={cn(
					"flex size-full items-center justify-center rounded-[inherit]",
					name ? "bg-primary-focus text-primary-text truncate overflow-ellipsis px-1" : "text-elevation-level2 overflow-hidden bg-[inherit]"
				)}>
				{name ? getInitials(name, size) : <AvatarFallbackIcon radius={radius} className={"size-full text-base"} />}
			</AvatarPrimitive.Fallback>

			{/*Render dot circle indicator based on status */}
			{status !== undefined && (
				<>
					{(() => {
						switch (status) {
							case "online":
								return <DotCircleIcon className={cn(indicatorVariants({ size }), "bg-success")} />
							case "offline":
								return <DotCircleIcon className={cn(indicatorVariants({ size }), "bg-fg-disabled")} />
							default:
								return null
						}
					})()}
				</>
			)}
		</AvatarPrimitive.Root>
	)
}

Avatar.displayName = "Avatar"

function AvatarGroup({ children, size = "20", maxItems = 4, className, ...props }: AvatarGroupProps) {
	const avatarChildren = React.Children.toArray(children)

	// Calculate how many avatars to show and if we need a count
	const visibleAvatars = avatarChildren.slice(0, maxItems)
	const remainingCount = Math.max(0, avatarChildren.length - maxItems)
	const visibleCount = remainingCount > 99 ? "+99" : `+${remainingCount}`

	return (
		<div data-slot="avatar-group" className={cn(avatarGroupVariants({ size }), className)} {...props}>
			{visibleAvatars.map((child, index) => (
				<div key={index}>
					{React.cloneElement(child as React.ReactElement<AvatarProps>, {
						size,
						className: cn("border-2 border-bg box-content", (child as React.ReactElement<AvatarProps>).props.className),
					})}
				</div>
			))}

			{/* Show remaining count if any */}
			{remainingCount > 0 && <Avatar name={visibleCount} size={size} className={"border-bg bg-primary-focus text-primary-text box-content border-2 font-semibold"} />}
		</div>
	)
}

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup }
