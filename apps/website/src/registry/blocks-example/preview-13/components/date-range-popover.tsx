"use client"

import * as React from "react"
import { format, subDays, subMonths } from "date-fns"
import type { DateRange } from "react-day-picker"

import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const today = new Date()

const SHORTCUTS = [
	{ value: "today", label: "Today", range: { from: today, to: today } },
	{
		value: "last_7_days",
		label: "Last 7 Days",
		range: { from: subDays(today, 7), to: today },
	},
	{
		value: "last_30_days",
		label: "Last 30 Days",
		range: { from: subDays(today, 30), to: today },
	},
	{
		value: "last_3_months",
		label: "Last 3 Months",
		range: { from: subMonths(today, 3), to: today },
	},
	{
		value: "last_6_months",
		label: "Last 6 Months",
		range: { from: subMonths(today, 6), to: today },
	},
	{
		value: "last_12_months",
		label: "Last 12 Months",
		range: { from: subMonths(today, 12), to: today },
	},
	{ value: "custom", label: "Custom", range: { from: today, to: today } },
] as const

type ShortcutValue = (typeof SHORTCUTS)[number]["value"]

interface DateRangePopoverProps {
	initialText?: string
	initialRange?: DateRange
	size?: "xs" | "sm"
	className?: string
	align?: "start" | "center" | "end"
}

export function DateRangePopover({
	initialText,
	initialRange,
	size,
	className,
	align = "end",
}: DateRangePopoverProps) {
	const [open, setOpen] = React.useState(false)
	const [selectedRange, setSelectedRange] = React.useState<
		DateRange | undefined
	>(initialRange)
	const [selectedShortcut, setSelectedShortcut] =
		React.useState<ShortcutValue | null>("custom")
	const [displayText, setDisplayText] = React.useState(initialText ?? "")

	const handleSelect = (
		range: DateRange | undefined,
		shortcut: ShortcutValue
	) => {
		setSelectedRange(range)
		setSelectedShortcut(shortcut)

		if (shortcut !== "custom") {
			const found = SHORTCUTS.find((s) => s.value === shortcut)
			if (found && found.value !== "today") {
				setDisplayText(found.label)
			} else if (range?.from) {
				setDisplayText(format(range.from, "d MMM yyyy"))
			}
			setOpen(false)
			return
		}

		if (range?.from) {
			if (range.to && range.from.getTime() !== range.to.getTime()) {
				setDisplayText(
					`${format(range.from, "MMM d")} - ${format(range.to, "MMM d, yyyy")}`
				)
			} else {
				setDisplayText(format(range.from, "d MMM yyyy"))
			}
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size={size}
					className={className}>
					<IconSlot slot="calendar" />
					<span>{displayText}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="border-border w-auto overflow-hidden rounded-xl p-0 shadow-lg"
				align={align}>
				<div className="flex flex-col-reverse sm:flex-row">
					<div className="border-border text-fg flex w-full flex-col border-t px-1 py-2 sm:w-48 sm:border-t-0 sm:border-r">
						<p className="text-fg-tertiary h-8 rounded-sm p-2 text-xs font-medium">
							SELECT DATE
						</p>
						{SHORTCUTS.map(({ value, label, range }) => (
							<span
								key={value}
								onClick={() => handleSelect(range, value)}
								className="hover:bg-fill1 text-fg-secondary hover:text-fg group flex cursor-pointer flex-nowrap items-center justify-between gap-2 rounded-sm p-2 text-sm leading-5 font-normal select-none">
								{label}
								{selectedShortcut === value ? (
									<IconSlot slot="check" className="text-primary size-4" />
								) : (
									<span className="size-4" />
								)}
							</span>
						))}
					</div>
					<Calendar
						className="border-none p-3"
						mode="range"
						selected={selectedRange}
						onSelect={(value) => handleSelect(value, "custom")}
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
