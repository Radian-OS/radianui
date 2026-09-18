"use client"

import { ChevronDown, Circle, RectangleHorizontal } from "lucide-react"
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
}

export function FlagShapeDropdown({
	value,
	onValueChange,
}: FlagShapeDropdownProps) {
	const isRound = value === "round"
	const label = isRound ? "Round" : "Flat"
	const ActiveIcon = isRound ? Circle : RectangleHorizontal

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					color="neutral"
					variant="outline"
					aria-label={`Flag style: ${label}`}>
					<ActiveIcon className="text-fg-secondary" />
					{label}
					<ChevronDown className="text-fg-secondary" aria-hidden="true" />
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
