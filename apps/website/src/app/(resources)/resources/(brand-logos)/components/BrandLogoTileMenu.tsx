"use client"

import {
	CodeXml,
	Image as ImageIcon,
	Link2,
	MoreHorizontal,
	SquareDashedMousePointer,
} from "lucide-react"
import { CompactButton } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { NextjsIcon } from "../../(avatar)/components/AvatarTileMenu"

interface BrandLogoTileMenuProps {
	onCopyPng: () => void
	onCopySvg: () => void
	onCopyUrl: () => void
	onCopyNextImage: () => void
	onCopyHtmlImage: () => void
}

export function BrandLogoTileMenu({
	onCopyPng,
	onCopySvg,
	onCopyUrl,
	onCopyNextImage,
	onCopyHtmlImage,
}: BrandLogoTileMenuProps) {
	return (
		<div className="absolute top-2 right-2 z-30 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<CompactButton
						aria-label="Open brand logo copy options"
						size="24"
						variant="soft"
						color="neutral">
						<MoreHorizontal />
					</CompactButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center" className="z-100 w-56 p-1.5">
					<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
						Design
					</DropdownMenuLabel>
					<DropdownMenuItem className="h-8" onSelect={onCopyPng}>
						<ImageIcon />
						<span>Copy as PNG</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="h-8" onSelect={onCopySvg}>
						<SquareDashedMousePointer />
						<span>Copy as SVG</span>
					</DropdownMenuItem>

					<DropdownMenuDivider />

					<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
						Development
					</DropdownMenuLabel>
					<DropdownMenuItem className="h-8" onSelect={onCopyUrl}>
						<Link2 />
						<span>CDN URL</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="h-8" onSelect={onCopyNextImage}>
						<NextjsIcon />
						<span>Next JS &lt;Image&gt;</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="h-8" onSelect={onCopyHtmlImage}>
						<CodeXml />
						<span>HTML &lt;img&gt;</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
