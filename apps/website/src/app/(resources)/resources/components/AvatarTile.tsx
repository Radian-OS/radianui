"use client"

import { useState } from "react"
import { Copy, Download, MoreHorizontal, Star } from "lucide-react"
import Image from "next/image"
import {
	AVATAR_BLEND_OPACITY,
	getImageBackgroundTint,
} from "@/constants/avatar-playground-utils"
import { useAvatarTileActions } from "@/hooks/avatar/use-avatar-tile-actions"
import { cn } from "@/lib/utils"
import { Button, CompactButton, IconButton } from "@/registry/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

export interface AvatarTileProps {
	src: string
	index: number
	toneStyle: React.CSSProperties
	tone: string
	copyFormat: string
}

export const AvatarTile = ({
	src,
	index,
	toneStyle,
	tone,
	copyFormat,
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
		<div
			className="border-soft bg-bg group relative isolate aspect-square w-full overflow-hidden rounded-xl border"
			style={toneStyle}>
			<Image
				src={src}
				alt={`Generated avatar ${index + 1}`}
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
				<Dropdown open={open} onOpenChange={setOpen}>
					<DropdownTrigger asChild>
						<CompactButton
							aria-label="Button with Down Arrow"
							size="20"
							variant="ghost"
							color="neutral"
							onClick={(e) => e.stopPropagation()}>
							<MoreHorizontal className="size-4" />
						</CompactButton>
					</DropdownTrigger>

					<DropdownContent align="end" className="w-40">
						<DropdownItem onClick={handleCopy}>
							<Copy />
							Copy
						</DropdownItem>
						<DropdownItem onClick={handleDownload}>
							<Download />
							Download
						</DropdownItem>
						<DropdownItem>
							<Star />
							Favourite
						</DropdownItem>
					</DropdownContent>
				</Dropdown>
			</div>

			<div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
				<div className="hidden sm:block">
					<Button
						size="28"
						color="neutral"
						variant="strong"
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
		</div>
	)
}
