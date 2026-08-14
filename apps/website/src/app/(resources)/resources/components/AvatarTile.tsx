"use client"

import { useState } from "react"
import {
	Download,
	Image as ImageIcon,
	Link,
	MoreHorizontal,
	Star,
} from "lucide-react"
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
import { Button, CompactButton } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import FigmaCustomIcon from "./FigmaCustomIcon"

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 128 128"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<circle cx="64" cy="64" r="64" fill="currentColor" />
		<path
			d="M109.117 114.777L49.1917 38H38V90.0076H47.452V49.9912L101.442 119.539C104.148 118.106 106.716 116.513 109.117 114.777Z"
			fill="white"
		/>
		<rect x="79" y="38" width="9.5" height="52" fill="white" />
	</svg>
)

const Html5Icon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<path
			d="M4.75 3L6.15 18.7L12 20.35L17.85 18.7L19.25 3H4.75ZM15.8 7.3H8.35L8.55 9.5H15.6L15.05 15.6L12 16.45L8.95 15.6L8.75 13.4H10.9L11.02 14.12L12 14.39L12.98 14.12L13.1 12.8H8.85L8.25 6.1H15.9L15.8 7.3Z"
			fill="#E34F26"
		/>
	</svg>
)

const SquareDashedMousePointerIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.75"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}>
		<path d="M5 3a2 2 0 0 0-2 2" />
		<path d="M19 3a2 2 0 0 1 2 2" />
		<path d="M5 21a2 2 0 0 1-2-2" />
		<path d="M9 3h1" />
		<path d="M14 3h1" />
		<path d="M3 9v1" />
		<path d="M21 9v1" />
		<path d="M3 14v1" />
		<path
			d="M12.5 12.5 20 15l-3.5 1.5 2.5 4.5-2 1-2.5-4.5-2.5 2.5v-7.5Z"
			fill="currentColor"
			fillOpacity="0.2"
		/>
	</svg>
)

export interface AvatarTileProps {
	src: string
	index: number
	toneStyle: React.CSSProperties
	tone: string
	copyFormat: string
	isFavorite: boolean
	onToggleFavorite: () => void
}

export const AvatarTile = ({
	src,
	index,
	toneStyle,
	tone,
	copyFormat,
	isFavorite,
	onToggleFavorite,
}: AvatarTileProps) => {
	const isNeutralBackground = tone === "neutral" || tone === "none"
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
		shouldApplyShadow,
	})

	return (
		<li
			className="border-soft bg-bg group relative isolate aspect-square w-full overflow-hidden rounded-xl border"
			style={toneStyle}>
			<Image
				src={src}
				alt={getAvatarAltText(index + 1, tone)}
				fill
				sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
				className="z-10 object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
			/>
			{AVATAR_SHADOW_MAP[index] && (
				<Image
					src={AVATAR_SHADOW_MAP[index]}
					alt=""
					fill
					sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 14vw"
					className="z-5 pointer-events-none object-cover mix-blend-hard-light transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
				/>
			)}
			{shouldApplyShadow && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 mix-blend-color-burn"
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

			<div className="absolute right-2 top-2 z-30">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<CompactButton
							aria-label="Button with Down Arrow"
							size="20"
							variant="ghost"
							color="neutral"
							className="opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
							onClick={(e) => e.stopPropagation()}>
							<MoreHorizontal className="size-4" />
						</CompactButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="start" className="z-100 w-56 p-1.5">
						<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
							Design
						</DropdownMenuLabel>
						<DropdownMenuItem onSelect={handleCopyPng}>
							<ImageIcon className="text-fg-secondary size-4" />
							<span>Copy PNG</span>
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={handleCopyTransparentPng}>
							<SquareDashedMousePointerIcon className="text-fg-secondary size-4" />
							<span>Copy Transparent PNG</span>
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={handleCopyFigmaFrame}>
							<FigmaCustomIcon className="size-4" />
							<span>Figma Frame</span>
						</DropdownMenuItem>

						<DropdownMenuDivider />

						<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
							Development
						</DropdownMenuLabel>
						<DropdownMenuItem onSelect={handleCopyUrlTransparent}>
							<Link className="text-fg-secondary size-4" />
							<span>URL Transparent</span>
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={handleCopyNextImageTag}>
							<NextjsIcon className="text-fg-secondary size-4" />
							<span>Next JS &lt;Image&gt; Tag</span>
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={handleCopyHtmlImgTag}>
							<Html5Icon className="size-4" />
							<span>HTML &lt;IMG&gt; Tag</span>
						</DropdownMenuItem>

						<DropdownMenuDivider />

						<DropdownMenuItem onSelect={() => handleDownload()}>
							<Download className="text-fg-secondary size-4" />
							<span>Download PNG</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={() => {
								// Instantly block pointer events on the grid container to prevent layout-shift click hijacking
								const grid = document.querySelector(
									'[aria-label="Available UI avatar illustrations"]'
								)
								if (grid) {
									grid.classList.add("pointer-events-none")
									setTimeout(() => {
										grid.classList.remove("pointer-events-none")
									}, 300)
								}
								onToggleFavorite()
								toast.success(
									isFavorite ? "Removed from favorites" : "Added to favorites"
								)
							}}>
							<Star
								className={cn(
									"text-fg-secondary size-4",
									isFavorite && "fill-current text-yellow-500"
								)}
							/>
							<span>
								{isFavorite ? "Unfavorite Avatar" : "Favorite Avatar"}
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="absolute inset-x-0 bottom-0 z-30 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
				<Button
					size="28"
					color="neutral"
					variant="outline"
					className="w-full bg-white text-black hover:bg-white"
					onClick={handleCopy}>
					{copied
						? copyFormat === "editable-bg"
							? "Paste in Figma"
							: "Copied"
						: "Copy"}
				</Button>
			</div>
		</li>
	)
}
