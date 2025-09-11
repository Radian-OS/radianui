"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal } from "lucide-react"
import { DropdownNavProps, DropdownProps } from "react-day-picker"
import CodeSnippet from "@/components/code-snippet"
import { Calendar } from "@/registry/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select2"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export default function CalendarWithYearMonthSelectorExample() {
	const [date, setDate] = useState<Date | undefined>(new Date())

	const handleCalendarChange = (value: string | number, onChange: React.ChangeEventHandler<HTMLSelectElement>) => {
		onChange({
			target: { value: String(value) },
		} as unknown as React.ChangeEvent<HTMLSelectElement>)
	}

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
				<TabsList variant="outline-ghost" size="md">
					<TabsTrigger value="preview">
						<EyeIcon />
						Preview
					</TabsTrigger>
					<TabsTrigger value="code">
						<SquareTerminal />
						Code
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					<Calendar
						mode={"single"}
						selected={date}
						onSelect={setDate}
						captionLayout="dropdown"
						classNames={{
							month_caption: "mx-0",
						}}
						hideNavigation
						components={{
							DropdownNav: (props: DropdownNavProps) => {
								return <div className="flex w-full items-center gap-2">{props.children}</div>
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
										<SelectContent className="">
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
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
'use client'

import { useState } from "react"
import { DropdownNavProps, DropdownProps } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalendarWithYearMonthSelector() {
	const [date, setDate] = useState<Date | undefined>(new Date())

	const handleCalendarChange = (value: string | number, onChange: React.ChangeEventHandler<HTMLSelectElement>) => {
		onChange({
			target: { value: String(value) },
		} as unknown as React.ChangeEvent<HTMLSelectElement>)
	}

	return (
		<Calendar
			mode={"single"}
			selected={date}
			onSelect={setDate}
			captionLayout="dropdown"
			classNames={{
				month_caption: "mx-0",
			}}
			hideNavigation
			components={{
				DropdownNav: (props: DropdownNavProps) => {
					return <div className="flex w-full items-center gap-2">{props.children}</div>
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
							<SelectContent className="">
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
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
