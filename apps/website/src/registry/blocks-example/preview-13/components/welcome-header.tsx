"use client"

import * as React from "react"

import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

export function WelcomeHeader() {
	const [timeframe, setTimeframe] = React.useState("Daily")

	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 className="font-heading text-fg text-[20px] font-semibold tracking-tight">
					Welcome back, Ari
				</h1>
			</div>

			<div className="flex flex-wrap items-center gap-2">
				{/* Timeframe Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							color="neutral"
							size="sm"
							className="border-border/70 text-fg-secondary h-8 gap-1 text-xs font-medium shadow-2xs">
							<span>{timeframe}</span>
							<IconSlot slot="down" className="size-3.5 opacity-60" />
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

				{/* Date Picker Button */}
				<Button
					variant="outline"
					color="neutral"
					size="sm"
					className="border-border/70 text-fg-secondary h-8 gap-1.5 text-xs font-medium shadow-2xs">
					<IconSlot slot="calendar" className="size-4 opacity-60" />
					<span>6 Nov 2025</span>
				</Button>

				{/* Primary Export CSV Button */}
				<Button
					variant="strong"
					color="primary"
					size="sm"
					className="h-8 gap-1.5 px-3 text-xs font-semibold shadow-xs">
					<IconSlot slot="file-text" className="size-4" />
					<span>Export CSV</span>
				</Button>
			</div>
		</div>
	)
}
