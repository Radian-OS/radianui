import * as React from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { format } from "date-fns"
import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { ScrollArea } from "@/components/scroll-area"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const TimePickerCalendarPreview = () => {
	const todayDate = today(getLocalTimeZone())
	const [date, setDate] = React.useState<CalendarDate>(todayDate)
	const [time, setTime] = React.useState<string | null>(null)

	const timeSlots = [
		{ time: "09:00", available: false },
		{ time: "09:15", available: true },
		{ time: "09:30", available: false },
		{ time: "09:45", available: true },

		{ time: "10:00", available: true },
		{ time: "10:15", available: false },
		{ time: "10:30", available: true },
		{ time: "10:45", available: false },

		{ time: "11:00", available: true },
		{ time: "11:15", available: false },
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

		{ time: "16:00", available: true },
		{ time: "16:15", available: false },
		{ time: "16:30", available: true },
		{ time: "16:45", available: false },

		{ time: "17:00", available: true },
		{ time: "17:15", available: false },
		{ time: "17:30", available: true },
		{ time: "17:45", available: false },
	]

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
			</div>

			<TabsContent value="preview">
				<div className={`flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10`}>
					<div className="overflow-hidden rounded-md border">
						<div className="flex max-sm:flex-col">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(newDate: CalendarDate | undefined) => {
									if (newDate) {
										setDate(newDate)
										setTime(null)
									}
								}}
								className="p-2 sm:pe-5"
							/>
							<div className="relative w-full max-sm:h-48 sm:w-40">
								<div className="absolute inset-0 max-sm:border-t">
									<ScrollArea className="h-full py-3 sm:border-s">
										<div className="space-y-3">
											<div className="flex h-5 shrink-0 items-center px-5">
												<p className="text-sm font-medium">{format(date.toDate(getLocalTimeZone()), "EEEE, d")}</p>
											</div>
											<div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
												{timeSlots.map(({ time: timeSlot, available }) => (
													<Button
														key={timeSlot}
														variant={time === timeSlot ? "strong" : "outline"}
														size="32"
														className="w-full"
														onClick={() => setTime(timeSlot)}
														disabled={!available}>
														{timeSlot}
													</Button>
												))}
											</div>
										</div>
									</ScrollArea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="calendar.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import * as React from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { format } from "date-fns"
import { Button } from "@/registry/ui/button"
import { Calendar } from "@/registry/ui/calendar"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
    return (
        <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className="size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]">
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    )
}

function ScrollBar({ className, orientation = "vertical", ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                "flex touch-none select-none p-px transition-colors",
                orientation === "vertical" && "h-full w-2 border-l border-l-transparent",
                orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent",
                className
            )}
            {...props}>
            <ScrollAreaPrimitive.ScrollAreaThumb data-slot="scroll-area-thumb" className="bg-border hover:bg-border-secondary relative flex-1 rounded-full" />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
}



const TimepickerCalendarExample = ()=> {
    const todayDate = today(getLocalTimeZone())
	const [date, setDate] = React.useState<CalendarDate>(todayDate)
	const [time, setTime] = React.useState<string | null>(null)

	const timeSlots = [
		{ time: "09:00", available: false },
		{ time: "09:15", available: true },
		{ time: "09:30", available: false },
		{ time: "09:45", available: true },

		{ time: "10:00", available: true },
		{ time: "10:15", available: false },
		{ time: "10:30", available: true },
		{ time: "10:45", available: false },

		{ time: "11:00", available: true },
		{ time: "11:15", available: false },
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

		{ time: "16:00", available: true },
		{ time: "16:15", available: false },
		{ time: "16:30", available: true },
		{ time: "16:45", available: false },

		{ time: "17:00", available: true },
		{ time: "17:15", available: false },
		{ time: "17:30", available: true },
		{ time: "17:45", available: false },
	]

    return (
            <div className="overflow-hidden rounded-md border">
				<div className="flex max-sm:flex-col">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(newDate: CalendarDate | undefined) => {
							if (newDate) {
								setDate(newDate)
								setTime(null)
							}
						}}
						className="p-2 sm:pe-5"
					/>
					<div className="relative w-full max-sm:h-48 sm:w-40">
						<div className="absolute inset-0 max-sm:border-t">
							<ScrollArea className="h-full py-3 sm:border-s">
								<div className="space-y-3">
									<div className="flex h-5 shrink-0 items-center px-5">
										<p className="text-sm font-medium">{format(date.toDate(getLocalTimeZone()), "EEEE, d")}</p>
									</div>
									<div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
										{timeSlots.map(({ time: timeSlot, available }) => (
											<Button
												key={timeSlot}
												variant={time === timeSlot ? "strong" : "outline"}
												size="32"
												className="w-full"
												onClick={() => setTime(timeSlot)}
												disabled={!available}>
												{timeSlot}
											</Button>
										))}
									</div>
								</div>
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
    )
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default TimePickerCalendarPreview
