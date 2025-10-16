import * as React from "react"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { ScrollArea } from "@/registry/ui/scroll-area"

function TimePickerCalendarPreview() {
	const today = new Date()
	const [date, setDate] = React.useState<Date>(today)
	const [time, setTime] = React.useState<string | null>(null)

	const timeSlots = [
		{ time: "09:00", available: false },
		{ time: "09:15", available: true },
		{ time: "09:30", available: true },
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

	return (
		<div className="bg-elevation-level1 flex overflow-hidden rounded-xl border">
			<Calendar
				mode="single"
				selected={date}
				onSelect={(newDate) => {
					if (newDate) {
						setDate(newDate)
						setTime(null)
					}
				}}
				className="rounded-none border-0 border-r"
			/>
			<div className="sm:w-30 relative w-full max-sm:h-48">
				<div className="absolute inset-0 px-1.5 py-1">
					<ScrollArea className="h-full">
						<div className="space-y-0.5">
							<p className="text-fg-tertiary p-2 text-xs font-medium">SELECT TIME</p>
							<div className="grid gap-1.5 max-sm:grid-cols-2">
								{timeSlots.map(({ time: timeSlot, available }) => (
									<Button
										key={timeSlot}
										variant="ghost"
										color="neutral"
										size="32"
										className={cn("text-fg hover:bg-fill2-alpha w-full justify-start px-2 py-1.5", { "bg-fill3-alpha hover:bg-fill3-alpha": time === timeSlot })}
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
	)
}

export default TimePickerCalendarPreview
