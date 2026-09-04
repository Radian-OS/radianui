"use client"

import { ChevronDown, Circle, RectangleHorizontal } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
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
	const label = value === "round" ? "Round" : "Flat"

	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					size="36"
					color="neutral"
					variant="soft"
					aria-label={`Flag style: ${label}`}>
					{label}
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="w-40">
				<DropdownMenuRadioGroup
					value={value}
					onValueChange={(nextValue) => onValueChange(nextValue as FlagShape)}>
					<DropdownMenuRadioItem value="round" className="h-8">
						<Circle />
						<span>Round</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="flat" className="h-8">
						<RectangleHorizontal />
						<span>Flat</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
