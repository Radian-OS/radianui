import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const DateInputPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label>Date Input</Label>
				<Input
					type="date"
					className="w-full dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 dark:[&::-webkit-calendar-picker-indicator]:invert"
				/>
			</div>
		</div>
	)
}

export default DateInputPreview
