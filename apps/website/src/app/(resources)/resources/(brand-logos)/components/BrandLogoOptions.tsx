"use client"

import { BadgeIcon, ChevronDown, RectangleHorizontal } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import type { BrandLogoVariant } from "./brand-logos-data"

interface BrandLogoOptionsProps {
	variant: BrandLogoVariant
	onVariantChange: (variant: BrandLogoVariant) => void
	compact?: boolean
}

export function BrandLogoOptions({
	variant,
	onVariantChange,
	compact = false,
}: BrandLogoOptionsProps) {
	const VariantIcon = variant === "icon" ? BadgeIcon : RectangleHorizontal

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					size={compact ? "28" : "36"}
					color="neutral"
					variant={compact ? "soft" : "outline"}
					className="shrink-0"
					aria-label={`Logo variant: ${variant}`}>
					<VariantIcon />
					<span className={compact ? "sr-only" : "hidden capitalize sm:inline"}>
						{variant}
					</span>
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60">
				<DropdownMenuLabel>Logo variants</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup
					value={variant}
					onValueChange={(value) => onVariantChange(value as BrandLogoVariant)}>
					<DropdownMenuRadioItem value="icon">
						<BadgeIcon className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">Icon</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="wordmark">
						<RectangleHorizontal className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">Wordmark</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
