"use client"

import React from "react"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { ScrollArea } from "@/registry/ui/scroll-area"

const timeSlots = [
	{ time: "09:00", available: true },
	{ time: "09:15", available: true },
	{ time: "09:30", available: false },
	{ time: "09:45", available: true },

	{ time: "10:00", available: true },
	{ time: "10:15", available: true },
	{ time: "10:30", available: true },
	{ time: "10:45", available: true },

	{ time: "11:00", available: true },
	{ time: "11:15", available: true },
	{ time: "11:30", available: true },
	{ time: "11:45", available: false },

	{ time: "12:00", available: false },
	{ time: "12:15", available: true },
	{ time: "12:30", available: true },
	{ time: "12:45", available: false },

	{ time: "13:00", available: true },
	{ time: "13:15", available: false },
	{ time: "13:30", available: true },
	{ time: "13:45", available: false },

	{ time: "14:00", available: true },
	{ time: "14:15", available: false },
	{ time: "14:30", available: false },
	{ time: "14:45", available: true },

	{ time: "15:00", available: false },
	{ time: "15:15", available: true },
	{ time: "15:30", available: true },
	{ time: "15:45", available: false },

	{ time: "16:00", available: false },
	{ time: "16:15", available: false },
	{ time: "16:30", available: true },
	{ time: "16:45", available: true },
]

export default function CalendarScrollableTime() {
	const today = new Date()
	const [date, setDate] = React.useState<Date>(today)
	const [time, setTime] = React.useState<string | null>(null)

	return (
		<div className="border-border w-fit overflow-clip rounded-xl border">
			<div className="flex flex-col sm:flex-row">
				<Calendar
					className="rounded-none border-0 border-b sm:border-b-0 sm:border-r"
					mode="single"
					selected={date}
					onSelect={(newDate) => {
						if (newDate) {
							setDate(newDate)
						}
					}}
				/>
				<div className="relative h-48 sm:h-auto sm:w-40">
					<div className="absolute inset-0 px-3 py-1">
						<ScrollArea className="h-full">
							<div className="space-y-0.5">
								<p className="text-fg p-2 text-sm font-medium">
									{format(date, "MMM d, E")}
								</p>
								<div className="grid gap-1.5 max-sm:grid-cols-2">
									{timeSlots.map(({ time: timeSlot, available }) => (
										<Button
											key={timeSlot}
											variant="outline"
											color="neutral"
											size="32"
											className={cn(
												"text-fg-secondary hover:bg-fill2-alpha w-full justify-center px-2 py-1.5 text-sm font-medium",
												{
													"border-primary bg-primary-accent text-primary-text border":
														time === timeSlot,
													"bg-fill1-alpha text-fg-disabled border-none":
														!available,
												}
											)}
											onClick={() => setTime(timeSlot)}
											disabled={!available}>
											{format(parse(timeSlot, "HH:mm", new Date()), "h:mm a")}
										</Button>
									))}
								</div>
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>
			<div className="border-border flex justify-end gap-2 border-t p-3">
				<Button variant="outline" color="neutral">
					Cancel
				</Button>
				<Button>Apply</Button>
			</div>
		</div>
	)
}
