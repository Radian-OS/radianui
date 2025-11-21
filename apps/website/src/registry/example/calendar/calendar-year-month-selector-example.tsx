"use client"

import * as React from "react"
import { DropdownNavProps, DropdownProps } from "react-day-picker"
import { Calendar } from "@/registry/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

export default function CalendarWithYearMonthSelectorExample() {
	const [date, setDate] = React.useState<Date | undefined>(new Date())

	const handleCalendarChange = (value: string | number, onChange: React.ChangeEventHandler<HTMLSelectElement>) => {
		onChange({
			target: { value: String(value) },
		} as unknown as React.ChangeEvent<HTMLSelectElement>)
	}

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			captionLayout="dropdown"
			classNames={{
				month_caption: "mx-0",
			}}
			hideNavigation
			components={{
				DropdownNav: (props: DropdownNavProps) => {
					return <div className="flex w-full items-center gap-2 p-1 pb-0">{props.children}</div>
				},
				Dropdown: (props: DropdownProps) => {
					return (
						<Select
							value={String(props.value)}
							onValueChange={(value) => {
								if (props.onChange) {
									handleCalendarChange(value, props.onChange)
								}
							}}>
							<SelectTrigger className="h-8 w-fit font-medium first:grow">
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="max-h-100">
								{props.options?.map((option) => (
									<SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)
				},
			}}
		/>
	)
}
