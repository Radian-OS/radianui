"use client"

import { useState } from "react"
import { Copy, Download, MoreHorizontal, Star } from "lucide-react"
import Image from "next/image"
import {
	AVATAR_BLEND_OPACITY,
	getAvatarAltText,
	getImageBackgroundTint,
} from "@/constants/avatar-playground-utils"
import { useAvatarTileActions } from "@/hooks/avatar/use-avatar-tile-actions"
import { cn } from "@/lib/utils"
import { Button, CompactButton, IconButton } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

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
	const [open, setOpen] = useState<boolean>(false)
	const isNeutralBackground = tone === "neutral" || tone === "none"
	const imageBackgroundTint = getImageBackgroundTint(tone)
	const shouldApplyShadow =
		!isNeutralBackground && Object.keys(toneStyle).length > 0
	const shadowStyle = imageBackgroundTint
		? { backgroundColor: imageBackgroundTint }
		: toneStyle

	const { copied, handleCopy, handleDownload } = useAvatarTileActions({
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
				className="object-cover"
			/>
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
				className={cn(
					"absolute right-2 top-2 transition-opacity",
					open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				)}>
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild>
						<CompactButton
							aria-label="Button with Down Arrow"
							size="20"
							variant="ghost"
							color="neutral"
							onClick={(e) => e.stopPropagation()}>
							<MoreHorizontal className="size-4" />
						</CompactButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end" className="w-40">
						<DropdownMenuItem onSelect={() => handleCopy()}>
							<Copy />
							Copy
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => handleDownload()}>
							<Download />
							Download
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={onToggleFavorite}>
							<Star className={isFavorite ? "fill-current" : undefined} />
							{isFavorite ? "Unfavourite" : "Favourite"}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
				<div className="hidden sm:block">
					<Button
						size="28"
						color="neutral"
						variant="outline"
						className="bg-white text-black hover:bg-white"
						onClick={handleCopy}>
						{copied
							? copyFormat === "editable-bg"
								? "Paste in Figma"
								: "Copied"
							: "Copy"}
					</Button>
				</div>
				<IconButton
					aria-label="Copy Button"
					size="28"
					color="neutral"
					variant="strong"
					className="block sm:hidden"
					onClick={handleCopy}>
					<Copy />
				</IconButton>
			</div>
		</li>
	)
}
