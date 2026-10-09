"use client"

import { useRef, useState } from "react"
import {
	BadgeIcon,
	ChevronDown,
	Palette,
	RectangleHorizontal,
	SunMoon,
} from "lucide-react"
import { cn } from "@/lib/utils"
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
import type { BrandLogoColorway, BrandLogoVariant } from "./brand-logos-data"

interface BrandLogoOptionsProps {
	variant: BrandLogoVariant
	onVariantChange: (variant: BrandLogoVariant) => void
	colorway?: BrandLogoColorway
	onColorwayChange?: (colorway: BrandLogoColorway) => void
	compact?: boolean
	className?: string
}

export function BrandLogoOptions({
	variant,
	onVariantChange,
	colorway,
	onColorwayChange,
	compact = false,
	className,
}: BrandLogoOptionsProps) {
	const [open, setOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const VariantIcon = variant === "icon" ? BadgeIcon : RectangleHorizontal

	const labelParts: string[] = [variant]
	if (colorway) labelParts.push(colorway)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen} indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					ref={triggerRef}
					size={compact ? "28" : "44"}
					color="neutral"
					variant={compact ? "soft" : "outline"}
					className={cn(
						"shrink-0",
						!compact &&
							"bg-bg hover:bg-bg active:bg-bg data-[state=open]:bg-bg focus-visible:bg-bg text-[14px] shadow-none",
						className
					)}
					aria-label={`Logo options: ${labelParts.join(", ")}`}>
					<VariantIcon />
					<span className={compact ? "sr-only" : "hidden capitalize sm:inline"}>
						{labelParts.join(" · ")}
					</span>
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-64"
				onCloseAutoFocus={(event) => event.preventDefault()}
				onPointerDownOutside={(event) => {
					const originalTarget = (event.detail?.originalEvent?.target ??
						event.target) as Node | null
					if (originalTarget && triggerRef.current?.contains(originalTarget)) {
						event.preventDefault()
					}
				}}>
				<DropdownMenuLabel>Logo variant</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup
					value={variant}
					onValueChange={(value) => {
						onVariantChange(value as BrandLogoVariant)
						if (!colorway) setOpen(false)
					}}>
					<DropdownMenuRadioItem value="icon">
						<BadgeIcon className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">Icon (24×24)</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="wordmark">
						<RectangleHorizontal className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">
							Wordmark (180×48)
						</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				{colorway && onColorwayChange && (
					<>
						<DropdownMenuDivider />
						<DropdownMenuLabel>Colorway</DropdownMenuLabel>
						<DropdownMenuDivider />
						<DropdownMenuRadioGroup
							value={colorway}
							onValueChange={(value) => {
								onColorwayChange(value as BrandLogoColorway)
								setOpen(false)
							}}>
							<DropdownMenuRadioItem value="colored">
								<Palette className="text-fg-secondary size-4" />
								<span className="flex-1 text-sm font-medium">Colored</span>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="neutral">
								<SunMoon className="text-fg-secondary size-4" />
								<span className="flex-1 text-sm font-medium">Neutral</span>
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
