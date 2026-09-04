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

interface FlagTileMenuProps {
	onCopyPng: () => void
	onCopySvg: () => void
	onCopyUrl: () => void
	onCopyNextImage: () => void
	onCopyHtmlImage: () => void
}

export function FlagTileMenu({
	onCopyPng,
	onCopySvg,
	onCopyUrl,
	onCopyNextImage,
	onCopyHtmlImage,
}: FlagTileMenuProps) {
	return (
		<div className="absolute top-2 right-2 z-30 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<CompactButton
						aria-label="Open flag copy options"
						size="24"
						variant="ghost"
						color="neutral">
						<MoreHorizontal className="size-4" />
					</CompactButton>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="center" className="z-100 w-56 p-1.5">
					<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
						Design
					</DropdownMenuLabel>
					<DropdownMenuItem className="h-8" onSelect={onCopyPng}>
						<ImageIcon className="text-fg-secondary size-4" />
						<span>Copy as PNG</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="h-8" onSelect={onCopySvg}>
						<SquareDashedMousePointer className="text-fg-secondary size-4" />
						<span>Copy as SVG</span>
					</DropdownMenuItem>

					<DropdownMenuDivider />

					<DropdownMenuLabel className="text-fg-tertiary px-2 py-1 text-xs font-medium">
						Development
					</DropdownMenuLabel>
					<DropdownMenuItem className="h-8" onSelect={onCopyUrl}>
						<Link2 className="text-fg-secondary size-4" />
						<span>URL</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="h-8" onSelect={onCopyNextImage}>
						<NextjsIcon className="text-fg size-4" />
						<span>Next JS &lt;Image&gt;</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="h-8" onSelect={onCopyHtmlImage}>
						<CodeXml className="text-fg-secondary size-4" />
						<span>HTML &lt;IMG&gt;</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
