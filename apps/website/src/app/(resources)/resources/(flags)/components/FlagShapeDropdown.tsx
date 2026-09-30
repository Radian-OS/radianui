"use client"

import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
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
	const [open, setOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const isRound = value === "round"
	const label = isRound ? "Round" : "Flat"

	const handleValueChange = (nextValue: string) => {
		onValueChange(nextValue as FlagShape)
		setOpen(false)
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen} indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<Button
					ref={triggerRef}
					size="44"
					color="neutral"
					variant="outline"
					className={cn(
						"bg-bg hover:bg-bg active:bg-bg data-[state=open]:bg-bg focus-visible:bg-bg w-[105px] justify-between rounded-r-none border-r-0 text-[14px] shadow-none",
						className
					)}
					aria-label={`Flag style: ${label}`}>
					{label}
					<ChevronDown aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-60"
				onCloseAutoFocus={(event) => event.preventDefault()}
				onPointerDownOutside={(event) => {
					const originalTarget = (event.detail?.originalEvent?.target ??
						event.target) as Node | null
					if (originalTarget && triggerRef.current?.contains(originalTarget)) {
						event.preventDefault()
					}
				}}>
				<DropdownMenuLabel>Flag Style</DropdownMenuLabel>
				<DropdownMenuDivider />
				<DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
					<DropdownMenuRadioItem
						value="round"
						onSelect={() => handleValueChange("round")}>
						<span className="flex-1 text-sm font-medium">Round</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value="flat"
						onSelect={() => handleValueChange("flat")}>
						<span className="flex-1 text-sm font-medium">Flat</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
