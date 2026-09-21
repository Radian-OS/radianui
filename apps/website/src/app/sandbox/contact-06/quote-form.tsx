"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import { TextArea } from "@/styles/default/ui/text-area"
import { FileDropzone } from "./file-dropzone"
import {
	type QuoteFormValues,
	budgetOptions,
	quoteFormSchema,
	serviceOptions,
} from "./types"

export function QuoteForm() {
	const [isSubmitted, setIsSubmitted] = useState(false)

	const form = useForm<QuoteFormValues>({
		resolver: zodResolver(quoteFormSchema),
		defaultValues: {
			service: "Web Design",
			budget: "$1K - $5K",
			fullName: "",
			email: "",
			projectDetails: "",
			attachmentName: "",
		},
	})

	const onSubmit = (_values: QuoteFormValues) => {
		setIsSubmitted(true)
		form.reset()
	}

	return (
		<div className="rounded-2xl border border-zinc-800/80 bg-[#0a0d14] p-6 text-white shadow-2xl sm:rounded-3xl sm:p-10 lg:p-12">
			{/* Form Header */}
			<div>
				<h2 className="heading-2 text-white">Get Your Quote</h2>
				<p className="mt-2 text-xs text-zinc-400 sm:text-sm">
					Fill out the form below to get started on your estimate.
				</p>
			</div>

			{/* Success Alert */}
			{isSubmitted && (
				<div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400">
					<CheckCircle2 className="size-5 shrink-0" />
					<div className="text-xs font-medium">
						Thank you! Your quote request has been submitted. We will review
						your requirements and respond within 24 hours.
					</div>
				</div>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
					{/* 1. Service Required */}
					<FormField
						control={form.control}
						name="service"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel className="text-xs font-medium text-zinc-300">
									Service Required
								</FormLabel>
								<FormControl>
									<div className="flex flex-wrap items-center gap-2">
										{serviceOptions.map((s) => {
											const isSelected = field.value === s
											return (
												<Button
													key={s}
													type="button"
													variant={isSelected ? "strong" : "outline"}
													color="neutral"
													size="32"
													onClick={() => field.onChange(s)}
													className={`rounded-lg px-4 text-xs font-medium transition-all ${
														isSelected
															? "bg-white text-zinc-950 hover:bg-zinc-200"
															: "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:text-white"
													}`}>
													{s}
												</Button>
											)
										})}
									</div>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					{/* 2. Estimated Budget */}
					<FormField
						control={form.control}
						name="budget"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel className="text-xs font-medium text-zinc-300">
									Estimated Budget
								</FormLabel>
								<FormControl>
									<div className="flex flex-wrap items-center gap-2">
										{budgetOptions.map((b) => {
											const isSelected = field.value === b
											return (
												<Button
													key={b}
													type="button"
													variant={isSelected ? "strong" : "outline"}
													color="neutral"
													size="32"
													onClick={() => field.onChange(b)}
													className={`rounded-lg px-4 text-xs font-medium transition-all ${
														isSelected
															? "bg-white text-zinc-950 hover:bg-zinc-200"
															: "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:text-white"
													}`}>
													{b}
												</Button>
											)
										})}
									</div>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					{/* 3. Full Name & Email Address */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-medium text-zinc-300">
										Full Name
									</FormLabel>
									<FormControl>
										<Input
											size="36"
											placeholder="John Doe"
											{...field}
											className="border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:border-zinc-600 focus-visible:ring-zinc-600"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs font-medium text-zinc-300">
										Email Address
									</FormLabel>
									<FormControl>
										<Input
											size="36"
											type="email"
											placeholder="example@company.com"
											{...field}
											className="border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:border-zinc-600 focus-visible:ring-zinc-600"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					{/* 4. Project Details */}
					<FormField
						control={form.control}
						name="projectDetails"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-medium text-zinc-300">
									Project Details
								</FormLabel>
								<FormControl>
									<TextArea
										rows={4}
										placeholder="Tell us a bit more about your goals and requirements..."
										{...field}
										className="resize-none border-zinc-800 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-500 focus-visible:border-zinc-600 focus-visible:ring-zinc-600"
									/>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					{/* 5. Attach a file (Optional) */}
					<FormField
						control={form.control}
						name="attachmentName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-medium text-zinc-300">
									Attach a file (Optional)
								</FormLabel>
								<FormControl>
									<FileDropzone
										value={field.value}
										onChange={(val) => field.onChange(val || "")}
									/>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					{/* 6. Submit Button */}
					<div className="pt-2">
						<Button
							type="submit"
							variant="strong"
							color="neutral"
							size="44"
							className="w-full rounded-xl bg-zinc-200 font-semibold text-zinc-950 shadow-md transition-colors hover:bg-white">
							Request Quote
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
