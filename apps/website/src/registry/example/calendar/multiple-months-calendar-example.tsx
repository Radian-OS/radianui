import { Calendar } from "@/registry/ui/calendar"

export default function DoubleCalendar() {
	return <Calendar mode="range" numberOfMonths={2} showOutsideDays={false} />
}
