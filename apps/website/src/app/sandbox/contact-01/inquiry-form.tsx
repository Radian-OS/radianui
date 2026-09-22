"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { TextArea } from "@/styles/default/ui/text-area"
import {
	type InquiryFormValues,
	inquiryFormSchema,
	serviceOptions,
} from "./types"

export function InquiryForm() {
	const [isSubmitted, setIsSubmitted] = useState(false)

	const form = useForm<InquiryFormValues>({
		resolver: zodResolver(inquiryFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			service: "",
			message: "",
			termsAccepted: false,
		},
	})

	const onSubmit = (_values: InquiryFormValues) => {
		setIsSubmitted(true)
		form.reset()
	}

	return (
		<Card className="gap-0 overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0b0e14] p-0 text-white shadow-2xl sm:rounded-3xl">
			<CardContent className="p-6 sm:p-10 lg:p-12">
				{/* Title with typography utility */}
				<h2 className="heading-2 text-white">Start the project</h2>

				{/* Success Alert */}
				{isSubmitted && (
					<div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400">
						<CheckCircle2 className="size-5 shrink-0" />
						<div className="text-xs font-medium">
							Thank you! Your project inquiry has been received. We will get
							back to you shortly.
						</div>
					</div>
				)}

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-8 space-y-4">
						{/* First name & Last name */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												size="36"
												placeholder="First name"
												{...field}
												className="h-11 rounded-lg border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:border-zinc-700"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												size="36"
												placeholder="Last name"
												{...field}
												className="h-11 rounded-lg border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:border-zinc-700"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</div>

						{/* Email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											size="36"
											type="email"
											placeholder="youremail@website.com"
											{...field}
											className="h-11 rounded-lg border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:border-zinc-700"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						{/* Service Selection */}
						<FormField
							control={form.control}
							name="service"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="h-11 rounded-lg border-zinc-800 bg-zinc-900/60 text-sm text-white focus-visible:border-zinc-700 data-placeholder:text-zinc-500">
												<SelectValue placeholder="Choose a service" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="border-zinc-800 bg-zinc-900 text-white">
											{serviceOptions.map((opt) => (
												<SelectItem key={opt} value={opt}>
													{opt}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						{/* Project Details Message */}
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<TextArea
											rows={4}
											placeholder="Let us know about your project"
											{...field}
											className="resize-none rounded-lg border-zinc-800 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-500 focus-visible:border-zinc-700"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						{/* Terms and Conditions Checkbox */}
						<FormField
							control={form.control}
							name="termsAccepted"
							render={({ field }) => (
								<FormItem className="flex items-start gap-3 space-y-0 pt-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											size="sm"
											className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5 border-zinc-700"
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel className="cursor-pointer text-xs font-normal text-zinc-400">
											I have read and acknowledge the Terms and Conditions
										</FormLabel>
										<FormMessage className="text-xs" />
									</div>
								</FormItem>
							)}
						/>

						{/* Submit Button (Rule: explicit color prop) */}
						<div className="pt-4">
							<Button
								type="submit"
								variant="strong"
								color="primary"
								size="44"
								className="w-full rounded-xl text-sm font-semibold shadow-md transition-colors">
								Submit Inquiry
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
