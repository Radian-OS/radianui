"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import FlowHeader from "./flow-header"

type PersonalInfoFormValues = {
	fullName: string
	workEmail: string
	company: string
	jobTitle: string
	industry: string
	companySize: string
}

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		defaultValues: {
			fullName: "",
			workEmail: "",
			company: "",
			jobTitle: "",
			industry: "",
			companySize: "",
		},
	})

	function onSubmit(data: PersonalInfoFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="bg-bg relative flex min-h-screen flex-col items-center justify-center p-4">
			<FlowHeader />

			<div className="flex w-full max-w-[400px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Let&apos;s set up your space</h2>
					<p className="text-fg-secondary text-sm">
						Please submit your personal and company details to complete the
						profile.
					</p>
				</div>

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
											<Input
												placeholder="Enter your full name"
												size="36"
												{...field}
											/>
										</FormControl>
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
												size="36"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="company"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company</FormLabel>
											<FormControl>
												<Input placeholder="Radian" size="36" {...field} />
											</FormControl>
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
												<Input
													placeholder="Product Manager"
													size="36"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="industry"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Industry</FormLabel>
											<FormControl>
												<Input
													placeholder="e.g. Marketing"
													size="36"
													{...field}
												/>
											</FormControl>
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
												value={field.value}
												onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger size="36">
														<SelectValue placeholder="Just me" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="1">Just me</SelectItem>
													<SelectItem value="2-10">2-10</SelectItem>
													<SelectItem value="11-50">11-50</SelectItem>
													<SelectItem value="51-200">51-200</SelectItem>
													<SelectItem value="201-500">201-500</SelectItem>
													<SelectItem value="500+">500+</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>
						</div>
						<Button type="submit" color="primary" className="w-full">
							Continue
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
