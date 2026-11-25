"use client"

import * as React from "react"

import { IconSlot } from "@/registry/icon/icon-library"
import { IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"

import { REVENUE_BARS } from "./data"
import { DateRangePopover } from "./date-range-popover"

export function RevenueBreakdownCard() {
	return (
		<Card className="bg-fill1 border-border/70 flex flex-1 flex-col justify-between gap-0 p-0.5 pb-1 shadow-2xs">
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
			<Card className="bg-elevation-level1 border-border/60 flex flex-1 flex-col justify-between border p-4 shadow-2xs">
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

					<DateRangePopover
						initialText="Jan 1 - Aug 30"
						initialRange={{
							from: new Date(2025, 0, 1),
							to: new Date(2025, 7, 30),
						}}
						size="xs"
						className="border-border/70 bg-elevation-level1 text-fg-secondary hover:bg-fill1 h-7 gap-1.5 px-2.5 text-xs font-medium shadow-2xs"
						align="end"
					/>
				</div>

				{/* Chart Area with Horizontal Dashed Gridlines & 13 Stacked Bars */}
				<div className="relative my-4 flex min-h-[220px] w-full flex-1 flex-col justify-between">
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
									className="bg-fg-tertiary/60 w-full rounded-t-[1.5px] transition-all group-hover:opacity-90"
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
				<div className="text-fg-tertiary font-body mt-2 flex items-center justify-between text-[14px] leading-none select-none">
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
