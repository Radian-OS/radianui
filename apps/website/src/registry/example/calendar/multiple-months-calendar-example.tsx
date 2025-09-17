import { Calendar } from "@/registry/ui/calendar"

export default function MultipleMonthsCalendarExample() {
	return <Calendar mode="range" numberOfMonths={2} showOutsideDays={false} />
}
