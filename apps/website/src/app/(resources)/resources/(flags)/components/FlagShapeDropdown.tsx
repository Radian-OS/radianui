"use client"

import { ChevronDown, Circle, RectangleHorizontal } from "lucide-react"
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
import type { FlagShape } from "./flags-data"

interface FlagShapeDropdownProps {
	value: FlagShape
	onValueChange: (value: FlagShape) => void
	className?: string
}

export function FlagShapeDropdown({
	value,
	onValueChange,
	className,
}: FlagShapeDropdownProps) {
	const isRound = value === "round"
	const label = isRound ? "Round" : "Flat"

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					size="44"
					color="neutral"
					variant="outline"
					className={cn(
						"bg-bg hover:bg-bg active:bg-bg data-[state=open]:bg-bg focus-visible:bg-bg w-[105px] justify-between rounded-r-none border-r-0 shadow-none",
						className
					)}
					aria-label={`Flag style: ${label}`}>
					{label}
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-60">
				<DropdownMenuLabel>Flag Style</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup
					value={value}
					onValueChange={(nextValue) => onValueChange(nextValue as FlagShape)}>
					<DropdownMenuRadioItem value="round">
						<Circle className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">Round</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="flat">
						<RectangleHorizontal className="text-fg-secondary size-4" />
						<span className="flex-1 text-sm font-medium">Flat</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
