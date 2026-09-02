"use client"

import { useRef, useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import {
	AVATAR_BLEND_OPACITY,
	getAvatarAltText,
	getImageBackgroundTint,
} from "@/constants/avatar-playground-utils"
import { AVATAR_SHADOW_MAP } from "@/constants/avatar-shadow-map"
import { useAvatarTileActions } from "@/hooks/avatar/use-avatar-tile-actions"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CompactButton } from "@/styles/default/ui/button"
import { AvatarTileMenu } from "./AvatarTileMenu"

export interface AvatarTileProps {
	src: string
	index: number
	toneStyle: React.CSSProperties
	tone: string
	copyFormat: string
	showShadow: boolean
	isFavorite: boolean
	onToggleFavorite: () => void
}

export const AvatarTile = ({
	src,
	index,
	toneStyle,
	tone,
	copyFormat,
	showShadow,
	isFavorite,
	onToggleFavorite,
}: AvatarTileProps) => {
	const isNoneBackground = tone === "none"
	const isNeutralBackground = tone === "neutral" || isNoneBackground
	const imageBackgroundTint = getImageBackgroundTint(tone)
	const shouldApplyShadow =
		!isNeutralBackground && Object.keys(toneStyle).length > 0
	const shadowStyle = imageBackgroundTint
		? { backgroundColor: imageBackgroundTint }
		: toneStyle

	const {
		copied,
		handleCopy,
		handleCopyPng,
		handleCopyTransparentPng,
		handleCopyFigmaFrame,
		handleCopyUrlTransparent,
		handleCopyNextImageTag,
		handleCopyHtmlImgTag,
		handleDownload,
	} = useAvatarTileActions({
		src,
		index,
		tone,
		copyFormat,
		showShadow,
		shouldApplyShadow,
	})

	const timerRef = useRef<NodeJS.Timeout | null>(null)
	const isLongPressRef = useRef(false)
	const [drawerOpen, setDrawerOpen] = useState(false)

	const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
		if (e.type === "mousedown" && (e as React.MouseEvent).button !== 0) return

		isLongPressRef.current = false
		timerRef.current = setTimeout(() => {
			isLongPressRef.current = true
			setDrawerOpen(true)
			if (
				typeof window !== "undefined" &&
				window.navigator &&
				window.navigator.vibrate
			) {
				window.navigator.vibrate(50)
			}
		}, 500)
	}

	const handlePointerUp = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}

	const handleTileClick = () => {
		if (
			!isLongPressRef.current &&
			typeof window !== "undefined" &&
			window.innerWidth < 1024
		) {
			handleCopy()
		}
	}

	return (
		<li
			className="border-soft bg-bg group relative isolate aspect-square w-full overflow-hidden rounded-xl border select-none"
			style={{
				...toneStyle,
				WebkitTouchCallout: "none",
			}}
			onTouchStart={handlePointerDown}
			onTouchEnd={handlePointerUp}
			onTouchMove={handlePointerUp}
			onMouseDown={handlePointerDown}
			onMouseUp={handlePointerUp}
			onMouseLeave={handlePointerUp}
			onClick={handleTileClick}
			onContextMenu={(e) => {
				// Prevent default context menu on mobile to allow long press custom drawer
				if (typeof window !== "undefined" && window.innerWidth < 1024) {
					e.preventDefault()
				}
			}}>
			{isNoneBackground && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-repeat dark:hidden"
					style={{
						backgroundImage: "url(/media/transparent-bg-light.png)",
						backgroundSize: "200px 200px",
					}}
				/>
			)}
			{isNoneBackground && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 hidden bg-repeat dark:block"
					style={{
						backgroundImage: "url(/media/transparent-bg-dark.png)",
						backgroundSize: "200px 200px",
					}}
				/>
			)}
			<Image
				src={src}
				alt={getAvatarAltText(index + 1, tone)}
				fill
				sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
				className="z-10 origin-bottom translate-y-[3%] scale-[1.03] object-cover object-bottom transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.08]"
			/>
			{showShadow && AVATAR_SHADOW_MAP[index] && (
				<Image
					src={AVATAR_SHADOW_MAP[index]}
					alt=""
					fill
					sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
					className="pointer-events-none z-5 origin-bottom translate-y-[3%] scale-[1.03] object-cover object-bottom mix-blend-hard-light transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.08]"
				/>
			)}
			{shouldApplyShadow && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-15 mix-blend-color-burn"
					style={{
						...shadowStyle,
						opacity: AVATAR_BLEND_OPACITY,
					}}
				/>
			)}
			{isNeutralBackground && (
				<div
					aria-hidden="true"
					className="dark:bg-bg/10 pointer-events-none absolute inset-0 hidden dark:block"
				/>
			)}

			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[80px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				style={{
					background:
						"linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%)",
				}}
			/>

			<AvatarTileMenu
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
				isFavorite={isFavorite}
				onToggleFavorite={() => {
					toast.success(
						isFavorite ? "Removed from favorites" : "Added to favorites"
					)
					onToggleFavorite()
				}}
				handleCopyPng={handleCopyPng}
				handleCopyTransparentPng={handleCopyTransparentPng}
				handleCopyFigmaFrame={handleCopyFigmaFrame}
				handleCopyUrlTransparent={handleCopyUrlTransparent}
				handleCopyNextImageTag={handleCopyNextImageTag}
				handleCopyHtmlImgTag={handleCopyHtmlImgTag}
				handleDownload={handleDownload}
			/>

			<CompactButton
				aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
				size="24"
				variant="ghost"
				color="neutral"
				className={cn(
					"absolute top-2 left-2 z-50 cursor-pointer transition-opacity hover:bg-black/10",
					isFavorite
						? "flex opacity-100"
						: "hidden opacity-0 group-hover:opacity-100 lg:flex"
				)}
				onClick={(e) => {
					e.stopPropagation()
					toast.success(
						isFavorite ? "Removed from favorites" : "Added to favorites"
					)
					onToggleFavorite()
				}}>
				<Star
					className={cn(
						isFavorite
							? "fill-primary-border stroke-transparent"
							: "fill-fg-tertiary stroke-transparent"
					)}
				/>
			</CompactButton>

			<div className="absolute inset-x-0 bottom-0 z-30 hidden p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
				<Button
					size="28"
					color="neutral"
					variant="outline"
					className="w-full border-none bg-white text-black hover:[background:linear-gradient(rgba(0,0,0,0.10),rgba(0,0,0,0.10)),_#fff]"
					onClick={(e) => {
						e.stopPropagation()
						handleCopy()
					}}>
					{copied ? "Copied" : "Copy"}
				</Button>
			</div>
		</li>
	)
}
