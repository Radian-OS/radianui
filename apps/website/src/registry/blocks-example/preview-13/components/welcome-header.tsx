"use client"

import * as React from "react"

import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

import { DateRangePopover } from "./date-range-popover"

export function WelcomeHeader() {
	const [timeframe, setTimeframe] = React.useState("Daily")

	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 className="heading-5 text-fg">Welcome back, Alex Rivera</h1>
			</div>

			<div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
				{/* Timeframe Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							color="neutral"
							className="w-full justify-between sm:w-auto">
							<span>{timeframe}</span>
							<IconSlot slot="down" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-32">
						{["Daily", "Weekly", "Monthly", "Yearly"].map((t) => (
							<DropdownMenuItem key={t} onClick={() => setTimeframe(t)}>
								{t}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Date Picker Popover */}
				<DateRangePopover
					initialText="6 Nov 2025"
					initialRange={{
						from: new Date(2025, 10, 6),
						to: new Date(2025, 10, 6),
					}}
					align="end"
					className="w-full justify-center sm:w-auto"
				/>

				{/* Primary Export CSV Button */}
				<Button color="primary" className="col-span-2 w-full sm:w-auto">
					<IconSlot slot="file-text" />
					<span>Export CSV</span>
				</Button>
			</div>
		</div>
	)
}
