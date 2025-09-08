"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, EyeIcon, SquareTerminal } from "lucide-react"
import { DateRange } from "react-day-picker"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function DatePickerPresetsExample() {
	const today = new Date()
	const defaultDate: DateRange = {
		from: today,
		to: addDays(today, 5),
	}

	const [date, setDate] = useState<DateRange | undefined>(defaultDate)

	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const handleApply = () => {
		if (date) {
			setDate(date)
		}
		setIsPopoverOpen(false)
	}

	const handleReset = () => {
		setDate(defaultDate)
		setIsPopoverOpen(false)
	}

	const handleSelect = (selected: DateRange | undefined) => {
		setDate({
			from: selected?.from || undefined,
			to: selected?.to || undefined,
		})
	}

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<TabsList>
				<TabsTrigger value="preview" icon={<EyeIcon />}>
					Preview
				</TabsTrigger>
				<TabsTrigger value="code" icon={<SquareTerminal />}>
					Code
				</TabsTrigger>
			</TabsList>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
						<PopoverTrigger asChild>
							<Button type="button" variant="outline" className="text-fg w-[250px] justify-start gap-2" color="neutral">
								<CalendarIcon className="text-fg-tertiary size-4" />
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
										</>
									) : (
										format(date.from, "LLL dd, y")
									)
								) : (
									<span className="text-fg-tertiary">Pick a date range</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar autoFocus className="border-0" mode="range" defaultMonth={date?.from} showOutsideDays={false} selected={date} onSelect={handleSelect} numberOfMonths={2} />
							<div className="border-border flex items-center justify-end gap-1.5 border-t p-3">
								<Button color="neutral" variant="outline" onClick={handleReset}>
									Reset
								</Button>
								<Button onClick={handleApply}>Apply</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="date-picker.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function DatePickerRange() {
	const today = new Date()
	const defaultDate: DateRange = {
		from: today,
		to: addDays(today, 5),
	}

	const [date, setDate] = useState<DateRange | undefined>(defaultDate)

	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const handleApply = () => {
		if (date) {
			setDate(date)
		}
		setIsPopoverOpen(false)
	}

	const handleReset = () => {
		setDate(defaultDate)
		setIsPopoverOpen(false)
	}

	const handleSelect = (selected: DateRange | undefined) => {
		setDate({
			from: selected?.from || undefined,
			to: selected?.to || undefined,
		})
	}

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger asChild>
				<Button type="button" variant="outline" className="text-fg w-[250px] justify-start gap-2" color="neutral">
					<CalendarIcon className="text-fg-tertiary size-4" />
					{date?.from ? (
						date.to ? (
							<>
								{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
							</>
						) : (
							format(date.from, "LLL dd, y")
						)
					) : (
						<span className="text-fg-tertiary">Pick a date range</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar autoFocus className="border-0" mode="range" defaultMonth={date?.from} showOutsideDays={false} selected={date} onSelect={handleSelect} numberOfMonths={2} />
				<div className="border-border flex items-center justify-end gap-1.5 border-t p-3">
					<Button color="neutral" variant="outline" onClick={handleReset}>
						Reset
					</Button>
					<Button onClick={handleApply}>Apply</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
