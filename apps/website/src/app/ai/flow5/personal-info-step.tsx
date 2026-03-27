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

const personalInfoSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	company: z.string().min(1, "Company name is required"),
	companySize: z.string().min(1, "Please select company size"),
	role: z.string().min(1, "Please select your role"),
	hearAbout: z.string().min(1, "Please select an option"),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

const companySizes = [
	{ value: "1-10", label: "1-10" },
	{ value: "11-50", label: "11-50" },
	{ value: "51-200", label: "51-200" },
	{ value: "201-500", label: "201-500" },
	{ value: "501-1000", label: "501-1000" },
	{ value: "1001+", label: "1001+" },
]

const roles = [
	{ value: "designer", label: "Designer" },
	{ value: "developer", label: "Developer" },
	{ value: "product-manager", label: "Product Manager" },
	{ value: "marketing", label: "Marketing" },
	{ value: "sales", label: "Sales" },
	{ value: "founder", label: "Founder / CEO" },
	{ value: "other", label: "Other" },
]

const hearAboutOptions = [
	{ value: "google", label: "Google Search" },
	{ value: "social-media", label: "Social Media" },
	{ value: "friend", label: "Friend or Colleague" },
	{ value: "blog", label: "Blog or Article" },
	{ value: "youtube", label: "YouTube" },
	{ value: "podcast", label: "Podcast" },
	{ value: "other", label: "Other" },
]

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			company: "",
			companySize: "",
			role: "",
			hearAbout: "",
		},
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="border-soft bg-bg w-full max-w-[480px] rounded-2xl border px-6 py-8">
			<div className="flex flex-col gap-8">
				{/* Header */}
				<div className="flex flex-col gap-2 text-center">
					<h1 className="heading-5">Personal Information</h1>
					<p className="text-fg-secondary text-sm">
						A few details about you and your company.
					</p>
				</div>

				{/* Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							{/* First Name / Last Name */}
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Company / Company Size */}
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="company"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="companySize"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company Size</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select..." />
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

							{/* Role */}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>What&apos;s your role?</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select..." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{roles.map((role) => (
													<SelectItem key={role.value} value={role.value}>
														{role.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* How did you hear about us */}
							<FormField
								control={form.control}
								name="hearAbout"
								render={({ field }) => (
									<FormItem>
										<FormLabel>How did you hear about us?</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select..." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{hearAboutOptions.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
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
		</div>
	)
}
