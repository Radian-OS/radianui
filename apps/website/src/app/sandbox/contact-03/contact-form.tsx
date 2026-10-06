"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Badge } from "@/styles/default/ui/badge"
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { TextArea } from "@/styles/default/ui/text-area"
import {
	type ContactFormValues,
	contactFormSchema,
	projectTypes,
	timelineOptions,
} from "./types"

export function ContactForm() {
	const [isSubmitted, setIsSubmitted] = useState(false)

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			company: "",
			projectType: "",
			projectBudget: "",
			timeline: "",
			projectDetails: "",
		},
	})

	const onSubmit = (_values: ContactFormValues) => {
		setIsSubmitted(true)
		form.reset()
	}

	return (
		<div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
			<div>
				{/* Top Pill Badge */}
				<div className="mb-4">
					<Badge
						variant="outline"
						color="neutral"
						className="border-border/80 bg-fill1-alpha text-fg-secondary rounded-full px-3 py-1 text-xs">
						Project Inquiry
					</Badge>
				</div>

				{/* Section Heading & Subtitle */}
				<h2 className="heading-2 text-fg">Start A Project</h2>
				<p className="text-fg-secondary mt-2 text-sm leading-relaxed">
					Share the essentials. We will route the note and send a practical next
					step.
				</p>

				{/* Submission Confirmation */}
				{isSubmitted && (
					<div className="border-success-border/30 bg-success-accent/15 text-success mt-6 flex items-center gap-3 rounded-xl border p-4">
						<CheckCircle2 className="size-5 shrink-0" />
						<div className="text-xs font-medium">
							Thank you for sharing your brief! We will get back to you within
							24 hours.
						</div>
					</div>
				)}

				{/* Form Implementation with Zod validation */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-6 space-y-4">
						{/* First Name & Last Name */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-fg text-xs font-medium">
											First Name
										</FormLabel>
										<FormControl>
											<Input
												size="36"
												placeholder="Mira"
												{...field}
												className="bg-elevation-level1/40 border-border/80 text-fg placeholder:text-fg-tertiary"
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
										<FormLabel className="text-fg text-xs font-medium">
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												size="36"
												placeholder="Stone"
												{...field}
												className="bg-elevation-level1/40 border-border/80 text-fg placeholder:text-fg-tertiary"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</div>

						{/* Work Email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-medium">
										Work Email
									</FormLabel>
									<FormControl>
										<Input
											size="36"
											type="email"
											placeholder="mira@northstar.co"
											{...field}
											className="bg-elevation-level1/40 border-border/80 text-fg placeholder:text-fg-tertiary"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						{/* Company & Project Type */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-fg text-xs font-medium">
											Company
										</FormLabel>
										<FormControl>
											<Input
												size="36"
												placeholder="Northstar Labs"
												{...field}
												className="bg-elevation-level1/40 border-border/80 text-fg placeholder:text-fg-tertiary"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="projectType"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-fg text-xs font-medium">
											Project Type
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="bg-elevation-level1/40 border-border/80 text-fg h-9 text-sm">
													<SelectValue placeholder="Choose a surface" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{projectTypes.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</div>

						{/* Project Budget & Timeline */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="projectBudget"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-fg text-xs font-medium">
											Project Budget
										</FormLabel>
										<FormControl>
											<Input
												size="36"
												placeholder="$ 25,000 to 75,000"
												{...field}
												className="bg-elevation-level1/40 border-border/80 text-fg placeholder:text-fg-tertiary"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="timeline"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-fg text-xs font-medium">
											Timeline
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="bg-elevation-level1/40 border-border/80 text-fg h-9 text-sm">
													<SelectValue placeholder="Choose timing" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{timelineOptions.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</div>

						{/* Project Details */}
						<FormField
							control={form.control}
							name="projectDetails"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-medium">
										Project Details
									</FormLabel>
									<FormControl>
										<TextArea
											rows={4}
											placeholder="What are you launching, what is blocked, and what should we review?"
											{...field}
											className="bg-elevation-level1/40 border-border/80 text-fg placeholder:text-fg-tertiary resize-none text-sm"
										/>
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>

						{/* Submit Button with explicit color prop */}
						<div className="pt-2">
							<Button
								type="submit"
								variant="strong"
								color="neutral"
								size="36"
								className="rounded-lg px-5 text-sm font-semibold shadow-sm transition-colors">
								Send Project Brief
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
