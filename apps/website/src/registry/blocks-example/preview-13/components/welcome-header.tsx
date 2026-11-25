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
				<h1 className="heading-6 text-fg">Welcome back, Ari</h1>
			</div>

			<div className="flex flex-wrap items-center gap-2">
				{/* Timeframe Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" color="neutral">
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
				/>

				{/* Primary Export CSV Button */}
				<Button color="primary">
					<IconSlot slot="file-text" />
					<span>Export CSV</span>
				</Button>
			</div>
		</div>
	)
}
