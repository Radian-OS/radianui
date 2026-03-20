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

type PersonalInfoFormValues = {
	firstName: string
	lastName: string
	company: string
	companySize: string
	role: string
	hearAboutUs: string
}

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			company: "",
			companySize: "",
			role: "",
			hearAboutUs: "",
		},
	})

	function onSubmit(data: PersonalInfoFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="border-soft bg-bg w-full max-w-[480px] rounded-2xl border px-6 py-8">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="heading-5">Personal Information</h2>
				<p className="text-fg-secondary text-sm">
					A few details about you and your company.
				</p>
			</div>

			<div className="mt-8">
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
													type="text"
													placeholder="John"
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
													type="text"
													placeholder="Doe"
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
									name="company"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Company</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="Acme Inc."
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
										<FormItem className="flex-1">
											<FormLabel>Company Size</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger size="36">
														<SelectValue placeholder="Select size" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="1-10">1-10</SelectItem>
													<SelectItem value="11-50">11-50</SelectItem>
													<SelectItem value="51-200">51-200</SelectItem>
													<SelectItem value="201-500">201-500</SelectItem>
													<SelectItem value="501-1000">501-1000</SelectItem>
													<SelectItem value="1001-5000">1001-5000</SelectItem>
													<SelectItem value="5001+">5001+</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>What&apos;s your role?</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger size="36">
													<SelectValue placeholder="Select your role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="founder">Founder / CEO</SelectItem>
												<SelectItem value="engineering">Engineering</SelectItem>
												<SelectItem value="design">Design</SelectItem>
												<SelectItem value="product">Product</SelectItem>
												<SelectItem value="marketing">Marketing</SelectItem>
												<SelectItem value="sales">Sales</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="hearAboutUs"
								render={({ field }) => (
									<FormItem>
										<FormLabel>How did you hear about us?</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger size="36">
													<SelectValue placeholder="Select an option" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="google">Google Search</SelectItem>
												<SelectItem value="social">Social Media</SelectItem>
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
