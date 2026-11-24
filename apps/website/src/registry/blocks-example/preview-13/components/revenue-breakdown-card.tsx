"use client"

import * as React from "react"

import { IconSlot } from "@/registry/icon/icon-library"
import { Button, IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

import { REVENUE_BARS } from "./data"

export function RevenueBreakdownCard() {
	const [dateRange, setDateRange] = React.useState("Jan 1 - Aug 30")

	return (
		<Card className="bg-fill2 dark:bg-fill1 border-border/70 flex flex-1 flex-col justify-between gap-0 p-0.5 pb-1 shadow-2xs">
			{/* Outer Card Top Header */}
			<div className="flex items-center justify-between px-3 pt-1.5 pb-1.5">
				<div className="font-heading text-fg-secondary flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
					<span>REVENUE BREAKDOWN</span>
					<IconSlot slot="info" className="text-fg-secondary size-4" />
				</div>
				<IconButton
					variant="ghost"
					color="neutral"
					size="xs"
					className="text-fg-secondary hover:text-fg size-7"
					aria-label="More options">
					<IconSlot slot="threeDot" className="text-fg-secondary size-4" />
				</IconButton>
			</div>

			{/* Inner White Box Container */}
			<Card className="bg-elevation-level1 dark:bg-elevation-level2 border-border/60 flex flex-1 flex-col justify-between border p-4 shadow-2xs">
				{/* Subheader: Revenue by Category & Date Dropdown */}
				<div className="my-1 flex items-start justify-between">
					<div>
						<span className="text-fg-tertiary text-sm">
							Revenue by Category
						</span>
						<div className="font-heading text-fg text-xl font-bold tracking-tight">
							$20,320
						</div>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								color="neutral"
								size="xs"
								className="border-border/70 bg-fill2 dark:bg-fill1 text-fg-secondary h-7 gap-1 px-2.5 text-[11px] font-medium shadow-2xs">
								<IconSlot slot="calendar" className="size-3 opacity-70" />
								<span>{dateRange}</span>
								<IconSlot slot="down" className="size-3 opacity-70" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-36">
							{["Jan 1 - Aug 30", "Aug 1 - Dec 31", "Full Year 2025"].map(
								(range) => (
									<DropdownMenuItem
										key={range}
										onClick={() => setDateRange(range)}>
										{range}
									</DropdownMenuItem>
								)
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* AI Insight Pill Banner (greyish in light mode, lighter black in dark mode) */}
				<div className="border-border/60 bg-fill2 dark:bg-fill1 hover:bg-fill3/40 my-3 flex items-center justify-between rounded-md border px-3 py-2 text-xs transition-colors">
					<div className="flex items-center gap-2.5">
						<div className="bg-fill3/60 dark:bg-fill2 flex size-6 shrink-0 items-center justify-center rounded-sm">
							<IconSlot slot="sparkles" className="text-primary size-4" />
						</div>
						<span className="text-fg-secondary text-xs">
							Get AI insight for better analysis
						</span>
					</div>
					<IconSlot slot="plus" className="text-fg-tertiary/70 size-4" />
				</div>

				{/* Chart Area with Horizontal Dashed Gridlines & 13 Stacked Bars */}
				<div className="relative mt-2 flex h-44 w-full flex-col justify-between">
					{/* 8 Horizontal Dashed Grid Lines */}
					<div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="border-border/60 dark:border-border/30 w-full border-b border-dashed"
							/>
						))}
					</div>

					{/* 13 Stacked Bars */}
					<div className="relative z-10 flex h-full items-end justify-between px-2 pt-2">
						{REVENUE_BARS.map((bar) => (
							<div
								key={bar.id}
								className="group relative flex h-full w-1 flex-col items-center justify-end sm:w-1.5">
								{/* Top Grey Segment */}
								<div
									className="bg-fg-tertiary/60 dark:bg-fill4 w-full rounded-t-[1.5px] transition-all group-hover:opacity-90"
									style={{ height: `${bar.grey}%` }}
								/>
								{/* Bottom Orange Segment */}
								<div
									className="bg-primary w-full transition-all group-hover:brightness-105"
									style={{ height: `${bar.orange}%` }}
								/>
							</div>
						))}
					</div>
				</div>

				{/* X-Axis Footer with Dotted Line */}
				<div className="text-fg-tertiary font-body mt-3 flex items-center justify-between text-[10px] select-none">
					<span>1 JAN</span>
					<span className="text-fg-tertiary/40">·</span>
					<div className="border-border/60 dark:border-border/40 mx-2 flex-1 border-b border-dashed" />
					<span className="text-fg-tertiary/40">·</span>
					<span>30 JAN 2025</span>
				</div>
			</Card>
		</Card>
	)
}
