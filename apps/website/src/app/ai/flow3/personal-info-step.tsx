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
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import { Radian } from "../icon/radian"

const countries = [
	{ value: "us", label: "United States" },
	{ value: "gb", label: "United Kingdom" },
	{ value: "ca", label: "Canada" },
	{ value: "au", label: "Australia" },
	{ value: "de", label: "Germany" },
	{ value: "fr", label: "France" },
	{ value: "jp", label: "Japan" },
	{ value: "in", label: "India" },
	{ value: "br", label: "Brazil" },
	{ value: "np", label: "Nepal" },
]

const personalInfoSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	workEmail: z
		.string()
		.min(1, "Work email is required")
		.email("Please enter a valid email address"),
	companyName: z.string().min(1, "Company name is required"),
	jobTitle: z.string().min(1, "Job title is required"),
	websiteUrl: z.string().optional(),
	country: z.string().min(1, "Please select a country"),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			fullName: "",
			workEmail: "",
			companyName: "",
			jobTitle: "",
			websiteUrl: "",
			country: "",
		},
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />

				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Create your profile</h1>
					<p className="text-fg-secondary text-sm">
						Tell us a bit about yourself and your company.
					</p>
				</div>
			</div>

			{/* Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						{/* Full Name */}
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Work Email */}
						<FormField
							control={form.control}
							name="workEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Work email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="designer@mage.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Company Name + Job Title */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name</FormLabel>
										<FormControl>
											<Input placeholder="Mage" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="jobTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Job Title</FormLabel>
										<FormControl>
											<Input placeholder="Product Designer" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Website URL + Country */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="websiteUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website URL</FormLabel>
										<FormControl>
											<InputGroup>
												<InputAddon>https://</InputAddon>
												<Input placeholder="mageicon.com" {...field} />
											</InputGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="United States" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{countries.map((country) => (
													<SelectItem key={country.value} value={country.value}>
														{country.label}
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
