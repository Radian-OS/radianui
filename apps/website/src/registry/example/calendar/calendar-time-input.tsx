import React from "react"
import { format, setHours, setMinutes, setSeconds } from "date-fns"
import { ClockIcon } from "lucide-react"
import { Calendar } from "@/registry/ui/calendar"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function CalendarTimeInput() {
	const today = new Date()
	const id = React.useId()

	const [date, setDate] = React.useState<Date | undefined>(today)
	const [time, setTime] = React.useState<Date | undefined>(today)

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const [h, m, s] = e.target.value.split(":").map(Number)
		let updated = setHours(time!, h)
		updated = setMinutes(updated, m)
		updated = setSeconds(updated, s || 0)
		setTime(updated)
	}

	return (
		<div className="border-border overflow-clip rounded-xl border">
			<Calendar mode="single" className="rounded-none border-0 p-3" selected={date} onSelect={setDate} />
			<div className="border-t p-3">
				<div className="flex w-full items-center justify-between gap-3">
					<Label htmlFor={id} className="text-sm font-normal">
						Enter time
					</Label>
					<div className="relative w-40">
						<Input
							id={id}
							type="time"
							step="1"
							value={format(time!, "HH:mm:ss")}
							onChange={handleTimeChange}
							className="text-fg-secondary peer appearance-none ps-9 font-medium [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
						/>
						<div className="text-fg-secondary pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
							<ClockIcon size={16} aria-hidden="true" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
