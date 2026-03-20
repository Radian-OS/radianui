"use client"

import { Upload } from "lucide-react"
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

type PersonalInfoFormValues = {
	firstName: string
	lastName: string
	role: string
	department: string
	hearAboutUs: string
}

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			role: "",
			department: "",
			hearAboutUs: "",
		},
	})

	function onSubmit(data: PersonalInfoFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="w-full max-w-[480px]">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Personalize your account</h2>
				<p className="text-fg-secondary text-sm">
					Add your details to personalize your experience.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-5">
				<div className="flex gap-3">
					<div className="bg-primary-accent text-primary flex size-16 items-center justify-center rounded-xl text-xl font-semibold">
						AB
					</div>
					<div className="flex flex-1 flex-col gap-2">
						<p className="text-fg text-sm font-medium">Profile Picture</p>
						<div className="flex gap-3">
							<Button type="button" variant="outline" color="neutral" size="28">
								<Upload className="size-4" />
								Upload Image
							</Button>
							<Button
								type="button"
								variant="outline"
								color="neutral"
								size="28"
								className="opacity-50"
								disabled>
								Remove
							</Button>
						</div>
						<p className="text-fg-tertiary text-xs">
							Preferred size 1:1, up to 5MB
						</p>
					</div>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							<div className="flex gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter first name"
													size="36"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter last name"
													size="36"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div className="flex gap-4">
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>What is your role?</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger size="36">
														<SelectValue placeholder="Select role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="designer">Designer</SelectItem>
													<SelectItem value="developer">Developer</SelectItem>
													<SelectItem value="manager">
														Product Manager
													</SelectItem>
													<SelectItem value="marketer">Marketer</SelectItem>
													<SelectItem value="founder">Founder / CEO</SelectItem>
													<SelectItem value="student">Student</SelectItem>
													<SelectItem value="other">Other</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="department"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Department</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger size="36">
														<SelectValue placeholder="Select department" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="design">Design</SelectItem>
													<SelectItem value="engineering">
														Engineering
													</SelectItem>
													<SelectItem value="marketing">Marketing</SelectItem>
													<SelectItem value="sales">Sales</SelectItem>
													<SelectItem value="hr">Human Resources</SelectItem>
													<SelectItem value="operations">Operations</SelectItem>
													<SelectItem value="finance">Finance</SelectItem>
													<SelectItem value="other">Other</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="hearAboutUs"
								render={({ field }) => (
									<FormItem>
										<FormLabel>How did you hear about us?</FormLabel>
										<Select value={field.value} onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger size="36">
													<SelectValue placeholder="Select an option" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="social-media">
													Social Media
												</SelectItem>
												<SelectItem value="search-engine">
													Search Engine
												</SelectItem>
												<SelectItem value="friend">
													Friend / Colleague
												</SelectItem>
												<SelectItem value="blog">Blog / Article</SelectItem>
												<SelectItem value="event">
													Event / Conference
												</SelectItem>
												<SelectItem value="ad">Advertisement</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
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
