import * as React from "react"
import { subDays, subMonths } from "date-fns"
import { Check } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/registry/ui/calendar"

const today = new Date()
const SHORTCUTS = [
	{ value: "today", label: "Today", range: { from: today, to: today } },
	{ value: "last_7_days", label: "Last 7 Days", range: { from: subDays(today, 7), to: today } },
	{ value: "last_30_days", label: "Last 30 Days", range: { from: subDays(today, 30), to: today } },
	{ value: "last_3_months", label: "Last 3 Months", range: { from: subMonths(today, 3), to: today } },
	{ value: "last_6_months", label: "Last 6 Months", range: { from: subMonths(today, 6), to: today } },
	{ value: "last_12_months", label: "Last 12 Months", range: { from: subMonths(today, 12), to: today } },
	{ value: "custom", label: "Custom", range: { from: today, to: today } },
] as const

type ShortcutValue = (typeof SHORTCUTS)[number]["value"]

function QuickSelectionCalendarPreview() {
	const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>()
	const [selectedShortcut, setSelectedShortcut] = React.useState<ShortcutValue | null>("custom")

	const handleSelect = (range: DateRange | undefined, shortcut: ShortcutValue) => {
		setSelectedRange(range)
		setSelectedShortcut(shortcut)
	}

	return (
		<div className="border-border bg-elevation-level1 flex overflow-hidden rounded-xl border">
			<div className="border-border w-50 text-fg flex flex-col border-r px-1.5 py-1">
				<p className="text-fg-tertiary h-8 rounded-sm p-2 text-xs font-medium">SELECT DATE</p>
				{SHORTCUTS.map(({ value, label, range }) => (
					<span
						key={value}
						onClick={() => handleSelect(range, value)}
						className="hover:bg-fill2-alpha group flex cursor-pointer select-none flex-nowrap items-center justify-between gap-2 rounded-sm p-2 text-sm font-normal leading-5">
						{label}
						{selectedShortcut === value ? <Check className="stroke-fg-tertiary" size={16} /> : <span className="size-4" />}
					</span>
				))}
			</div>
			<Calendar className="border-none" mode="range" selected={selectedRange} onSelect={(value) => handleSelect(value, "custom")} />
		</div>
	)
}

export default QuickSelectionCalendarPreview
