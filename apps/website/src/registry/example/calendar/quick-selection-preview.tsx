import { useEffect, useRef, useState } from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { Check, EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Calendar } from "@/registry/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const DATE_RANGE_SHORTCUT_VALUES = ["today", "last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_12_months", "custom"] as const
type DateRangeShortcutValues = (typeof DATE_RANGE_SHORTCUT_VALUES)[number]

type CalendarRange = { from: CalendarDate; to?: CalendarDate }

type DateRangeShortcutItemProps = {
	selectedValue: string | null
	onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
	value: string
	label: string
}

function DateRangeShortcutItem({ selectedValue, onClick, label, value }: DateRangeShortcutItemProps) {
	return (
		<span
			className="hover:bg-fill2-alpha group flex cursor-pointer flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm font-normal leading-5"
			data-value={value}
			onClick={onClick}>
			{label}
			{selectedValue === value ? <Check className="stroke-fg-secondary" size={16} /> : <span className="size-4" />}
		</span>
	)
}

type DateRangeShortcutProps = {
	onSelect: (range: CalendarRange) => void
	selectedValue?: string | null
}

function DateRangeShortcut({ selectedValue, onSelect }: DateRangeShortcutProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [internalSelectedValue, setInternalSelectedValue] = useState<string | null>(selectedValue || null)

	const currentSelectedValue = selectedValue !== undefined ? selectedValue : internalSelectedValue

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				handleShortcutSelect("custom")
			}
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	function handleShortcutSelect(shortcut: DateRangeShortcutValues) {
		const todayDate = today(getLocalTimeZone())
		const rangeMap: Record<DateRangeShortcutValues, { from: CalendarDate; to: CalendarDate }> = {
			today: { from: todayDate, to: today(getLocalTimeZone()) },
			last_7_days: { from: todayDate.subtract({ weeks: 1 }), to: todayDate },
			last_30_days: { from: todayDate.subtract({ months: 1 }), to: todayDate },
			last_3_months: { from: todayDate.subtract({ months: 3 }), to: todayDate },
			last_6_months: { from: todayDate.subtract({ months: 6 }), to: todayDate },
			last_12_months: {
				from: todayDate.subtract({ months: 12 }),
				to: todayDate,
			},
			custom: { from: todayDate, to: todayDate },
		}

		setInternalSelectedValue(shortcut)

		if (shortcut !== "custom") {
			const range = rangeMap[shortcut]
			onSelect(range)
		}
	}

	return (
		<div ref={containerRef} className="border-border w-50 text-fg flex flex-col border-r px-1.5 py-1">
			<p className="text-fg-tertiary h-8 rounded-sm px-2 py-2.5 text-xs font-medium">SELECT DATE</p>
			{DATE_RANGE_SHORTCUT_VALUES.map((value) => (
				<DateRangeShortcutItem
					key={value}
					label={value.charAt(0).toUpperCase() + value.split("_").join(" ").slice(1)}
					value={value}
					onClick={() => handleShortcutSelect(value)}
					selectedValue={currentSelectedValue}
				/>
			))}
		</div>
	)
}

const QuickSelectionCalendarPreview = () => {
	const [selectedRange, setSelectedRange] = useState<CalendarRange | undefined>()
	const [selectedShortcut, setSelectedShortcut] = useState<string | null>("last_7_days")

	const handleShortcutSelect = (range: CalendarRange) => {
		setSelectedRange(range)
	}

	const handleCalendarSelect = (selected: CalendarRange | undefined) => {
		setSelectedRange(selected)
		setSelectedShortcut("custom")
	}

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					<div className="border-border bg-elevation-level1 flex overflow-hidden rounded-xl border">
						<DateRangeShortcut selectedValue={selectedShortcut} onSelect={handleShortcutSelect} />
						<Calendar className="border-none" mode="range" selected={selectedRange} onSelect={handleCalendarSelect} showOutsideDays />
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`const DATE_RANGE_SHORTCUT_VALUES = ["today", "last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_12_months", "custom"] as const
type DateRangeShortcutValues = (typeof DATE_RANGE_SHORTCUT_VALUES)[number]

type CalendarRange = { from: CalendarDate; to?: CalendarDate }

type DateRangeShortcutItemProps = {
	selectedValue: string | null
	onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
	value: string
	label: string
}

function DateRangeShortcutItem({ selectedValue, onClick, label, value }: DateRangeShortcutItemProps) {
	return (
		<span
			className="hover:bg-fill2-alpha group flex cursor-pointer flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm font-normal leading-5"
			data-value={value}
			onClick={onClick}>
			{label}
			{selectedValue === value ? <Check className="stroke-fg-secondary" size={16} /> : <span className="size-4" />}
		</span>
	)
}

type DateRangeShortcutProps = {
	onSelect: (range: CalendarRange) => void
	selectedValue?: string | null
}

function DateRangeShortcut({ selectedValue, onSelect }: DateRangeShortcutProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [internalSelectedValue, setInternalSelectedValue] = useState<string | null>(selectedValue || null)

	const currentSelectedValue = selectedValue !== undefined ? selectedValue : internalSelectedValue

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				handleShortcutSelect("custom")
			}
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	function handleShortcutSelect(shortcut: DateRangeShortcutValues) {
		const todayDate = today(getLocalTimeZone())
		const rangeMap: Record<DateRangeShortcutValues, { from: CalendarDate; to: CalendarDate }> = {
			today: { from: todayDate, to: today(getLocalTimeZone()) },
			last_7_days: { from: todayDate.subtract({ weeks: 1 }), to: todayDate },
			last_30_days: { from: todayDate.subtract({ months: 1 }), to: todayDate },
			last_3_months: { from: todayDate.subtract({ months: 3 }), to: todayDate },
			last_6_months: { from: todayDate.subtract({ months: 6 }), to: todayDate },
			last_12_months: {
				from: todayDate.subtract({ months: 12 }),
				to: todayDate,
			},
			custom: { from: todayDate, to: todayDate },
		}

		setInternalSelectedValue(shortcut)

		if (shortcut !== "custom") {
			const range = rangeMap[shortcut]
			onSelect(range)
		}
	}

	return (
		<div ref={containerRef} className="border-border w-50 text-fg flex flex-col border-r px-1.5 py-1">
			<p className="text-fg-tertiary h-8 rounded-sm px-2 py-2.5 text-xs font-medium">SELECT DATE</p>
			{DATE_RANGE_SHORTCUT_VALUES.map((value) => (
				<DateRangeShortcutItem
					key={value}
					label={value.charAt(0).toUpperCase() + value.split("_").join(" ").slice(1)}
					value={value}
					onClick={() => handleShortcutSelect(value)}
					selectedValue={currentSelectedValue}
				/>
			))}
		</div>
	)
}
const QuickSelectionExample = ()=> {
	const [selectedRange, setSelectedRange] = useState<CalendarRange | undefined>()
	const [selectedShortcut, setSelectedShortcut] = useState<string | null>("last_7_days")

	const handleShortcutSelect = (range: CalendarRange) => {
		setSelectedRange(range)
	}

	const handleCalendarSelect = (selected: CalendarRange | undefined) => {
		setSelectedRange(selected)
		setSelectedShortcut("custom")
	}


	return (
			<div className="border-border bg-elevation-level1 flex overflow-hidden rounded-xl border">
				<DateRangeShortcut selectedValue={selectedShortcut} onSelect={handleShortcutSelect} />
				<Calendar className="border-none" mode="range" selected={selectedRange} onSelect={handleCalendarSelect} showOutsideDays />
			</div>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default QuickSelectionCalendarPreview
