"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/styles/default/ui/alert"
import { Button } from "@/styles/default/ui/button"
import { Calendar } from "@/styles/default/ui/calendar"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"

export default function DatePickerForm() {
	const today = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
	const [date, setDate] = useState<Date | undefined>()
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const FormSchema = z.object({
		deliveryDate: z
			.date()
			.optional()
			.refine((d) => d !== undefined, {
				message: "Please select a delivery date.",
			}),
	})

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const formattedDate = format(data.deliveryDate!, "PPP")

		toast.custom(
			(t) => (
				<Alert
					variant="strong"
					color="success"
					onClose={() => toast.dismiss(t)}>
					<AlertIcon>
						<CheckCircle />
					</AlertIcon>
					<AlertTitle>
						Your delivery is scheduled for {formattedDate}
					</AlertTitle>
				</Alert>
			),
			{
				duration: 5000,
			}
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-[320px] flex-col gap-4">
				<FormField
					control={form.control}
					name="deliveryDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Delivery Date</FormLabel>
							<div className="flex flex-col gap-2">
								<FormControl>
									<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
										<PopoverTrigger asChild>
											<Button
												id="date"
												type="button"
												variant="outline"
												color="neutral"
												className="text-fg hover:bg-elevation-level1 w-full justify-start gap-2">
												{date ? (
													format(date, "PPP")
												) : (
													<span className="text-fg-tertiary text-sm font-normal">
														{today}
													</span>
												)}
												<CalendarIcon className="text-fg-tertiary ml-auto size-4" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												className="border-0"
												selected={date}
												onSelect={(value) => {
													setDate(value)
													field.onChange(value)
													setIsPopoverOpen(false)
												}}
												autoFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormDescription className="text-fg-secondary">
									This helps us plan and ensure timely delivery.
								</FormDescription>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" size={"32"}>
					Submit
				</Button>
			</form>
		</Form>
	)
}
