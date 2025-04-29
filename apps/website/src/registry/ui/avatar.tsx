"use client"

import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { CirclePlus } from "lucide-react"
import { cn } from "@/lib/utils"

type AvatarVariant = NonNullable<VariantProps<typeof avatarVariants>["variant"]>

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>

type AvatarProps = {
	src?: string
	name?: string
	className?: string
	size?: AvatarSize
	variant?: AvatarVariant
	status?: "online" | "offline" | "verified" | "plus"
}

type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactElement<typeof Avatar> | React.ReactElement<typeof Avatar>[]
	size?: NonNullable<VariantProps<typeof avatarGroupVariants>["size"]>
	max?: number
	className?: string
}

type ImageStatus = "loading" | "loaded" | "error"

const AvatarFallbackIcon = ({ className, variant }: { className: string; variant: AvatarVariant }) => {
	const clipPathId = `avatar-clip-${variant}`

	const borderRadiusFirstRect = variant === "circle" ? 20 : 8
	const borderRadiusSecondRect = variant === "circle" ? 20 : 0

	return (
		<svg width="100" height="100" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<defs>
				<clipPath id={clipPathId}>
					<rect width="36" height="36" rx={borderRadiusFirstRect} ry={borderRadiusFirstRect} fill="white" />
				</clipPath>
			</defs>
			<g clipPath="url(#clip0_5846_11264)">
				<path d="M5.3999 36C5.3999 29.0536 10.7999 23.4 17.9999 23.4C25.1999 23.4 30.5999 29.0536 30.5999 36" className="fill-bg-base" />
				<path
					d="M18.0081 19.8C21.9759 19.8 25.1998 16.5761 25.1998 12.6083C25.1998 8.64044 21.9759 5.40002 18.0081 5.40002C14.0402 5.40002 10.7998 8.6239 10.7998 12.5918C10.7998 16.5596 14.0237 19.7835 17.9915 19.7835C18.0081 19.8"
					className="fill-bg-base"
				/>
				<rect
					x="1"
					y="1"
					width="34"
					height="34"
					rx={borderRadiusSecondRect}
					ry={borderRadiusSecondRect}
					className="stroke-text-disabled"
					strokeWidth={2}
				/>
			</g>
		</svg>
	)
}

const VerifiedIcon = ({ className }: { className?: string }) => {
	return (
		<svg width={120} height={120} overflow={"visible"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<path
				d="M22.0198 11.1635C21.8867 10.8973 21.6912 10.6674 21.4498 10.4935L20.1198 9.49346C20.0506 9.44576 20.0009 9.37477 19.9797 9.29346C19.9499 9.21281 19.9499 9.12412 19.9797 9.04346L20.5298 7.41346C20.6181 7.12194 20.6385 6.81411 20.5897 6.51346C20.5436 6.20727 20.4196 5.91806 20.2297 5.67346C20.0468 5.42886 19.8064 5.2331 19.5298 5.10346C19.2652 4.97641 18.9729 4.91794 18.6798 4.93346H17.1798C17.0911 4.93238 17.0051 4.90256 16.9348 4.84846C16.8645 4.79437 16.8136 4.71893 16.7898 4.63346L16.3597 3.13346C16.2768 2.82915 16.1186 2.55059 15.8998 2.32346C15.6815 2.10166 15.4143 1.93388 15.1198 1.83346C14.8219 1.74208 14.507 1.72154 14.1998 1.77346C13.8952 1.83295 13.61 1.96694 13.3698 2.16346L12.2297 3.06346C12.1666 3.12041 12.0848 3.1524 11.9998 3.15346C11.923 3.16079 11.8459 3.14327 11.7798 3.10346L10.6498 2.20346C10.4178 2.01389 10.1432 1.88348 9.84973 1.82346C9.56057 1.75345 9.25888 1.75345 8.96972 1.82346C8.67975 1.90401 8.41273 2.05127 8.18982 2.25346C7.96174 2.47441 7.78727 2.74465 7.67981 3.04346L7.24975 4.55346C7.22792 4.64248 7.17463 4.72062 7.09973 4.77346C7.02067 4.82763 6.92525 4.8524 6.82983 4.84346H5.40979C5.103 4.83144 4.79778 4.89316 4.51977 5.02346C4.23769 5.14869 3.99306 5.34512 3.80981 5.59346C3.62574 5.8377 3.50237 6.12218 3.44983 6.42346C3.39898 6.71736 3.41949 7.01918 3.50976 7.30346L3.99975 8.99346C4.02451 9.07496 4.02451 9.16197 3.99975 9.24346C3.97448 9.3228 3.92563 9.39255 3.85974 9.44346L2.52978 10.4435C2.28763 10.6235 2.08939 10.8559 1.94983 11.1235C1.81845 11.3893 1.75 11.6819 1.75 11.9785C1.75 12.275 1.81845 12.5676 1.94983 12.8335C2.08939 13.101 2.28763 13.3335 2.52978 13.5135L3.85974 14.5135C3.92563 14.5644 3.97448 14.6341 3.99975 14.7135C4.02451 14.795 4.02451 14.882 3.99975 14.9635L3.44983 16.5935C3.35667 16.8873 3.33264 17.1988 3.37976 17.5035C3.43039 17.8023 3.55404 18.0839 3.73974 18.3235C3.92304 18.5742 4.16754 18.7739 4.44983 18.9035C4.71469 19.0297 5.00676 19.0881 5.2998 19.0735H6.78979C6.87998 19.0696 6.96861 19.0979 7.03979 19.1535C7.11167 19.2029 7.16181 19.2781 7.17981 19.3635L7.60974 20.8735C7.69861 21.1723 7.85622 21.4463 8.06982 21.6735C8.39594 22.0131 8.83707 22.2188 9.30688 22.2502C9.77669 22.2817 10.2413 22.1366 10.6097 21.8435L11.7598 20.9335C11.8291 20.8775 11.9156 20.8469 12.0048 20.8469C12.0939 20.8469 12.1804 20.8775 12.2498 20.9335L13.3798 21.8335C13.6199 22.0361 13.9099 22.1708 14.2197 22.2235C14.3329 22.2331 14.4467 22.2331 14.5598 22.2235C14.7567 22.2245 14.9525 22.1941 15.1398 22.1335C15.4366 22.0401 15.7056 21.8742 15.9221 21.6507C16.1387 21.4272 16.2959 21.1531 16.3798 20.8535L16.8198 19.3335C16.8378 19.2481 16.8878 19.1729 16.9597 19.1235C17.0371 19.0649 17.133 19.0365 17.2297 19.0435H18.6598C18.9656 19.0556 19.2701 18.9975 19.5498 18.8735C19.8256 18.7419 20.0658 18.5461 20.2503 18.3025C20.4347 18.0589 20.5579 17.7746 20.6097 17.4735C20.6615 17.1657 20.6376 16.8499 20.5398 16.5535L19.9998 14.9335C19.9699 14.8528 19.9699 14.7641 19.9998 14.6835C20.0209 14.6022 20.0706 14.5312 20.1398 14.4835L21.4697 13.4835C21.7115 13.3058 21.9071 13.0726 22.0398 12.8035C22.1795 12.5384 22.2516 12.243 22.2498 11.9435C22.2309 11.6698 22.1524 11.4036 22.0198 11.1635ZM16.5798 10.4035L12.1598 14.8235C11.9887 14.991 11.7889 15.1265 11.5698 15.2235C11.3477 15.3149 11.1099 15.3624 10.8698 15.3635C10.6251 15.3648 10.383 15.3137 10.1598 15.2135C9.93561 15.1205 9.7318 14.9846 9.55981 14.8135L7.37976 12.6235C7.21593 12.4321 7.13029 12.1861 7.14001 11.9344C7.14973 11.6827 7.25415 11.444 7.43225 11.2659C7.61034 11.0878 7.84903 10.9835 8.1007 10.9737C8.35238 10.964 8.59849 11.0496 8.78979 11.2135L10.8698 13.2935L15.1698 8.98345C15.3572 8.7972 15.6106 8.69266 15.8748 8.69266C16.1389 8.69266 16.3925 8.7972 16.5798 8.98345C16.6798 9.07699 16.7594 9.19005 16.8138 9.31562C16.8683 9.44119 16.8964 9.5766 16.8964 9.71346C16.8964 9.85033 16.8683 9.98574 16.8138 10.1113C16.7594 10.2369 16.6798 10.3499 16.5798 10.4435V10.4035Z"
				strokeWidth={10}
			/>
			<path
				d="M22.0198 11.1635C21.8867 10.8973 21.6912 10.6674 21.4498 10.4935L20.1198 9.49346C20.0506 9.44576 20.0009 9.37477 19.9797 9.29346C19.9499 9.21281 19.9499 9.12412 19.9797 9.04346L20.5298 7.41346C20.6181 7.12194 20.6385 6.81411 20.5897 6.51346C20.5436 6.20727 20.4196 5.91806 20.2297 5.67346C20.0468 5.42886 19.8064 5.2331 19.5298 5.10346C19.2652 4.97641 18.9729 4.91794 18.6798 4.93346H17.1798C17.0911 4.93238 17.0051 4.90256 16.9348 4.84846C16.8645 4.79437 16.8136 4.71893 16.7898 4.63346L16.3597 3.13346C16.2768 2.82915 16.1186 2.55059 15.8998 2.32346C15.6815 2.10166 15.4143 1.93388 15.1198 1.83346C14.8219 1.74208 14.507 1.72154 14.1998 1.77346C13.8952 1.83295 13.61 1.96694 13.3698 2.16346L12.2297 3.06346C12.1666 3.12041 12.0848 3.1524 11.9998 3.15346C11.923 3.16079 11.8459 3.14327 11.7798 3.10346L10.6498 2.20346C10.4178 2.01389 10.1432 1.88348 9.84973 1.82346C9.56057 1.75345 9.25888 1.75345 8.96972 1.82346C8.67975 1.90401 8.41273 2.05127 8.18982 2.25346C7.96174 2.47441 7.78727 2.74465 7.67981 3.04346L7.24975 4.55346C7.22792 4.64248 7.17463 4.72062 7.09973 4.77346C7.02067 4.82763 6.92525 4.8524 6.82983 4.84346H5.40979C5.103 4.83144 4.79778 4.89316 4.51977 5.02346C4.23769 5.14869 3.99306 5.34512 3.80981 5.59346C3.62574 5.8377 3.50237 6.12218 3.44983 6.42346C3.39898 6.71736 3.41949 7.01918 3.50976 7.30346L3.99975 8.99346C4.02451 9.07496 4.02451 9.16197 3.99975 9.24346C3.97448 9.3228 3.92563 9.39255 3.85974 9.44346L2.52978 10.4435C2.28763 10.6235 2.08939 10.8559 1.94983 11.1235C1.81845 11.3893 1.75 11.6819 1.75 11.9785C1.75 12.275 1.81845 12.5676 1.94983 12.8335C2.08939 13.101 2.28763 13.3335 2.52978 13.5135L3.85974 14.5135C3.92563 14.5644 3.97448 14.6341 3.99975 14.7135C4.02451 14.795 4.02451 14.882 3.99975 14.9635L3.44983 16.5935C3.35667 16.8873 3.33264 17.1988 3.37976 17.5035C3.43039 17.8023 3.55404 18.0839 3.73974 18.3235C3.92304 18.5742 4.16754 18.7739 4.44983 18.9035C4.71469 19.0297 5.00676 19.0881 5.2998 19.0735H6.78979C6.87998 19.0696 6.96861 19.0979 7.03979 19.1535C7.11167 19.2029 7.16181 19.2781 7.17981 19.3635L7.60974 20.8735C7.69861 21.1723 7.85622 21.4463 8.06982 21.6735C8.39594 22.0131 8.83707 22.2188 9.30688 22.2502C9.77669 22.2817 10.2413 22.1366 10.6097 21.8435L11.7598 20.9335C11.8291 20.8775 11.9156 20.8469 12.0048 20.8469C12.0939 20.8469 12.1804 20.8775 12.2498 20.9335L13.3798 21.8335C13.6199 22.0361 13.9099 22.1708 14.2197 22.2235C14.3329 22.2331 14.4467 22.2331 14.5598 22.2235C14.7567 22.2245 14.9525 22.1941 15.1398 22.1335C15.4366 22.0401 15.7056 21.8742 15.9221 21.6507C16.1387 21.4272 16.2959 21.1531 16.3798 20.8535L16.8198 19.3335C16.8378 19.2481 16.8878 19.1729 16.9597 19.1235C17.0371 19.0649 17.133 19.0365 17.2297 19.0435H18.6598C18.9656 19.0556 19.2701 18.9975 19.5498 18.8735C19.8256 18.7419 20.0658 18.5461 20.2503 18.3025C20.4347 18.0589 20.5579 17.7746 20.6097 17.4735C20.6615 17.1657 20.6376 16.8499 20.5398 16.5535L19.9998 14.9335C19.9699 14.8528 19.9699 14.7641 19.9998 14.6835C20.0209 14.6022 20.0706 14.5312 20.1398 14.4835L21.4697 13.4835C21.7115 13.3058 21.9071 13.0726 22.0398 12.8035C22.1795 12.5384 22.2516 12.243 22.2498 11.9435C22.2309 11.6698 22.1524 11.4036 22.0198 11.1635ZM16.5798 10.4035L12.1598 14.8235C11.9887 14.991 11.7889 15.1265 11.5698 15.2235C11.3477 15.3149 11.1099 15.3624 10.8698 15.3635C10.6251 15.3648 10.383 15.3137 10.1598 15.2135C9.93561 15.1205 9.7318 14.9846 9.55981 14.8135L7.37976 12.6235C7.21593 12.4321 7.13029 12.1861 7.14001 11.9344C7.14973 11.6827 7.25415 11.444 7.43225 11.2659C7.61034 11.0878 7.84903 10.9835 8.1007 10.9737C8.35238 10.964 8.59849 11.0496 8.78979 11.2135L10.8698 13.2935L15.1698 8.98345C15.3572 8.7972 15.6106 8.69266 15.8748 8.69266C16.1389 8.69266 16.3925 8.7972 16.5798 8.98345C16.6798 9.07699 16.7594 9.19005 16.8138 9.31562C16.8683 9.44119 16.8964 9.5766 16.8964 9.71346C16.8964 9.85033 16.8683 9.98574 16.8138 10.1113C16.7594 10.2369 16.6798 10.3499 16.5798 10.4435V10.4035Z"
				className="fill-info"
			/>
		</svg>
	)
}

const OnlineIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={120} height={120} overflow={"visible"} viewBox="0 0 20 20" fill="none" className={className}>
			<path d="M4 10a6 6 0 1 1 12 0 6 6 0 0 1 -12 0Z" stroke="white" strokeWidth={12} className="stroke-bg-base" />
			<path d="M4 10a6 6 0 1 1 12 0 6 6 0 0 1 -12 0Z" className="fill-success" />
		</svg>
	)
}
const OfflineIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={120} height={120} overflow={"visible"} viewBox="0 0 20 20" fill="none" className={className}>
			<path d="M4 10a6 6 0 1 1 12 0 6 6 0 0 1 -12 0Z" stroke="white" strokeWidth={12} className="stroke-bg-base" />
			<path d="M4 10a6 6 0 1 1 12 0 6 6 0 0 1 -12 0Z" className="fill-text-disabled" />
		</svg>
	)
}

const avatarVariants = cva("flex items-center justify-center shrink-0 font-semibold text-fg2", {
	variants: {
		size: {
			"16": "size-4 text-xs",
			"20": "size-5 text-xs",
			"24": "size-6 text-xs",
			"32": "size-8 text-sm",
			"36": "size-9 text-sm",
			"40": "size-10 text-sm",
			"48": "size-12 text-base",
			"64": "size-16 text-base",
			"80": "size-20 text-lg",
		},
		variant: {
			circle: "rounded-full",
			square: "rounded-md ",
		},
	},
	defaultVariants: {
		size: "40",
		variant: "circle",
	},
})

const indicatorVariants = cva("absolute z-10box-content bottom-0 right-0", {
	variants: {
		size: {
			"16": "size-1.5",
			"20": "size-1.5",
			"24": "size-2",
			"32": "size-2.5",
			"36": "size-2.5",
			"40": "size-3",
			"48": "size-3",
			"64": "size-4",
			"80": "size-5",
		},
	},
})

const avatarGroupVariants = cva("flex items-center", {
	variants: {
		size: {
			"16": "-space-x-2",
			"20": "-space-x-2",
			"24": "-space-x-2.5",
		},
	},
	defaultVariants: {
		size: "20",
	},
})

function getInitials(name: string, size: AvatarProps["size"]) {
	if (!name) return ""
	if (name.startsWith("+")) return name

	const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase())

	return size && parseInt(size) < 32 ? initials[0] : initials.slice(0, 2).join("")
}

function Avatar({ src, name, className, size = "36", variant = "circle", status }: AvatarProps) {
	const [imageStatus, setImageStatus] = React.useState<ImageStatus>("loading")

	React.useEffect(() => {
		if (!src) {
			setImageStatus("error")
			return
		}

		const img = new Image()
		img.src = src
		img.onload = () => setImageStatus("loaded")
		img.onerror = () => setImageStatus("error")

		return () => {
			img.onload = null
			img.onerror = null
		}
	}, [src])

	return (
		<div data-slot="avatar" className={cn(avatarVariants({ size, variant }), className, "bg-text-disabled relative")}>
			{src && imageStatus === "loaded" ? (
				<img src={src} alt={name} className="size-full rounded-[inherit] object-cover" />
			) : (
				<span
					className={cn(
						"flex size-full items-center justify-center rounded-[inherit]",
						name ? "bg-primary truncate overflow-ellipsis px-1 text-white" : "text-text-level2 overflow-hidden bg-[inherit]"
					)}>
					{name ? getInitials(name, size) : <AvatarFallbackIcon variant={variant} className={"text-bg-base size-full"} />}
				</span>
			)}

			{/*Render indicator based on status */}
			{status !== undefined && (
				<>
					{status === "verified" && <VerifiedIcon className={cn(indicatorVariants({ size }), "stroke-bg-base fill-info")} />}
					{status === "online" && <OnlineIcon className={cn(indicatorVariants({ size }), "stroke-bg-base fill-success")} />}
					{status === "offline" && <OfflineIcon className={cn(indicatorVariants({ size }), "stroke-bg-base fill-text-disabled")} />}
					{status === "plus" && <CirclePlus className={cn(indicatorVariants({ size }), "fill-primary stroke-bg-base stroke-3 rounded-full")} />}
				</>
			)}
		</div>
	)
}

Avatar.displayName = "Avatar"

function AvatarGroup({ children, size = "20", max = 4, className, ...props }: AvatarGroupProps) {
	const avatarChildren = React.Children.toArray(children)

	// Calculate how many avatars to show and if we need a count
	const visibleAvatars = avatarChildren.slice(0, max)
	const remainingCount = Math.max(0, avatarChildren.length - max)
	const visibleCount = remainingCount > 99 ? "+99" : `+${remainingCount}`

	return (
		<div data-slot="avatar-group" className={cn(avatarGroupVariants({ size }), className)} {...props}>
			{visibleAvatars.map((child, index) => (
				<div key={index}>
					{React.cloneElement(child as React.ReactElement<AvatarProps>, {
						size,
						className: cn("border-2 border-bg-base box-content", (child as React.ReactElement<AvatarProps>).props.className),
					})}
				</div>
			))}

			{/* Show remaining count if any */}
			{remainingCount > 0 && (
				<Avatar name={visibleCount} size={size} className={"border-bg-base bg-primary box-content border-2 font-normal text-white"} />
			)}
		</div>
	)
}

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup }
