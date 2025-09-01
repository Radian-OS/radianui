import { useEffect, useRef, useState } from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { Check, EyeIcon, Settings, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownSub, DropdownSubContent, DropdownSubTrigger, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export type DatePickerModes = "single" | "multiple" | "range"
export const DATE_RANGE_SHORTCUT_VALUES = ["today", "last_7_days", "last_30_days", "last_3_months", "last_6_months", "last_12_months", "custom"] as const
export type DateRangeShortcutValues = (typeof DATE_RANGE_SHORTCUT_VALUES)[number]

export type CalendarRange = { from: CalendarDate; to?: CalendarDate }

type DateRangeShortcutItemProps = {
	selectedValue: string | null
	onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
	value: string
	label: string
	disabled?: boolean
}

function DateRangeShortcutItem({ selectedValue, onClick, label, value, disabled = false }: DateRangeShortcutItemProps) {
	return (
		<span
			className={`${
				disabled ? "cursor-not-allowed" : "hover:bg-fill2-alpha cursor-pointer"
			} group flex flex-nowrap items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm font-normal leading-5`}
			data-value={value}
			onClick={disabled ? undefined : onClick}>
			{label}
			{selectedValue === value ? !disabled ? <Check className="stroke-fg-secondary" size={16} /> : <span className="size-4" /> : <span className="size-4" />}
		</span>
	)
}

export type DateRangeShortcutProps = {
	onSelect: (range: CalendarRange) => void
	selectedValue?: string | null
	disabled?: boolean
	className?: string
}

export function DateRangeShortcut({ selectedValue, onSelect, disabled = false, className = "" }: DateRangeShortcutProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [internalSelectedValue, setInternalSelectedValue] = useState<string | null>(selectedValue || null)

	const currentSelectedValue = selectedValue !== undefined ? selectedValue : internalSelectedValue

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				handleShortcutSelect("custom")
			}
		}
		if (!disabled) {
			document.addEventListener("mousedown", handleClickOutside)
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [disabled])

	function handleShortcutSelect(shortcut: DateRangeShortcutValues) {
		if (disabled) return

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
		<div
			ref={containerRef}
			className={`border-border w-50 flex flex-col border-r px-1.5 py-1 ${disabled ? "bg-fill1 text-fg-disabled cursor-not-allowed" : "text-fg"} ${className}`}>
			<p className="text-fg-tertiary h-8 rounded-sm px-2 py-2.5 text-xs font-medium">SELECT DATE</p>
			{DATE_RANGE_SHORTCUT_VALUES.map((value) => (
				<DateRangeShortcutItem
					disabled={disabled}
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
	const [quickSelection, setquickSelection] = useState<boolean>(false)
	const [selectedRange, setSelectedRange] = useState<CalendarRange | undefined>()
	const [selectedShortcut, setSelectedShortcut] = useState<string | null>("last_7_days")

	const handleShortcutSelect = (range: CalendarRange) => {
		setSelectedRange(range)
	}

	const handleCalendarSelect = (selected: CalendarRange | undefined) => {
		setSelectedRange(selected)
		// When user manually selects on calendar, set to "custom"
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
				<Dropdown>
					<DropdownTrigger asChild>
						<IconButton variant="outline" color="neutral" size="36">
							<Settings />
						</IconButton>
					</DropdownTrigger>
					<DropdownContent>
						<DropdownSub>
							<DropdownSubTrigger>Quick Selection</DropdownSubTrigger>
							<DropdownSubContent>
								<DropdownRadioGroup value={String(quickSelection)} onValueChange={(value) => setquickSelection(value === "true")}>
									<DropdownRadioItem value="true" onSelect={(e) => e.preventDefault()}>
										True
									</DropdownRadioItem>
									<DropdownRadioItem value="false" onSelect={(e) => e.preventDefault()}>
										False
									</DropdownRadioItem>
								</DropdownRadioGroup>
							</DropdownSubContent>
						</DropdownSub>
					</DropdownContent>
				</Dropdown>
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					<div className="border-border bg-elevation-level1 flex overflow-hidden rounded-xl border">
						<DateRangeShortcut selectedValue={selectedShortcut} onSelect={handleShortcutSelect} />
						<Calendar className="border-none" mode="range" selected={selectedRange} onSelect={handleCalendarSelect} showOutsideDays />
					</div>{" "}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`<Calendar
    quickSelection={${quickSelection}}
/>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default QuickSelectionCalendarPreview
