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
		<div>
			<DropdownMenu indicatorPosition="right">
				<DropdownMenuTrigger asChild>
					<Button
						size={compact ? "28" : "40"}
						color="neutral"
						variant={compact ? "soft" : "outline"}
						aria-label={`Logo variant: ${variant}`}>
						<VariantIcon />
						<span className={compact ? "sr-only" : "capitalize"}>
							{variant}
						</span>
						<ChevronDown />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-44">
					<DropdownMenuLabel>Logo variant</DropdownMenuLabel>
					<DropdownMenuDivider />
					<DropdownMenuRadioGroup
						value={variant}
						onValueChange={(value) =>
							onVariantChange(value as BrandLogoVariant)
						}>
						<DropdownMenuRadioItem value="icon">
							<BadgeIcon />
							Icon
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="wordmark">
							<RectangleHorizontal />
							Wordmark
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
