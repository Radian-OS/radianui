"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const companySizes = [
	{ value: "just-me", label: "Just me" },
	{ value: "2-10", label: "2-10" },
	{ value: "11-50", label: "11-50" },
	{ value: "51-200", label: "51-200" },
	{ value: "201-500", label: "201-500" },
	{ value: "501+", label: "501+" },
]

const personalInfoSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	workEmail: z
		.string()
		.min(1, "Work email is required")
		.email("Please enter a valid email"),
	company: z.string().min(1, "Company is required"),
	jobTitle: z.string().min(1, "Job title is required"),
	industry: z.string().min(1, "Industry is required"),
	companySize: z.string().min(1, "Company size is required"),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			fullName: "",
			workEmail: "",
			company: "",
			jobTitle: "",
			industry: "",
			companySize: "",
		},
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-5">Let&apos;s set up your space</h1>
				<p className="text-fg-secondary text-sm">
					Please submit your personal and company details to complete the
					profile.
				</p>
			</div>

			{/* Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your full name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="workEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Work Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="designer@radianos.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex gap-4">
							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Company</FormLabel>
										<FormControl>
											<Input placeholder="Radian" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="jobTitle"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Job Title</FormLabel>
										<FormControl>
											<Input placeholder="Product Manager" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex gap-4">
							<FormField
								control={form.control}
								name="industry"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Industry</FormLabel>
										<FormControl>
											<Input placeholder="e.g. Marketing" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="companySize"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel>Company Size</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Just me" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{companySizes.map((size) => (
													<SelectItem key={size.value} value={size.value}>
														{size.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button
						type="submit"
						variant="strong"
						color="primary"
						size="36"
						className="w-full">
						Continue
					</Button>
				</form>
			</Form>
		</div>
	)
}
