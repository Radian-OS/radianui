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
	referralSource: string
}

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			company: "",
			companySize: "",
			role: "",
			referralSource: "",
		},
	})

	function onSubmit(data: PersonalInfoFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Tell us about you and your company</h2>
				<p className="text-fg-secondary text-sm">
					Just a few details to finish setting up your account.
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="First name" size="36" {...field} />
										</FormControl>
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
											<Input placeholder="Last name" size="36" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company</FormLabel>
										<FormControl>
											<Input placeholder="Company name" size="36" {...field} />
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
												<SelectItem value="1000+">1000+</SelectItem>
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
											<SelectItem value="designer">Designer</SelectItem>
											<SelectItem value="developer">Developer</SelectItem>
											<SelectItem value="product-manager">
												Product Manager
											</SelectItem>
											<SelectItem value="founder">Founder / CEO</SelectItem>
											<SelectItem value="marketing">Marketing</SelectItem>
											<SelectItem value="student">Student</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="referralSource"
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
											<SelectItem value="social-media">Social Media</SelectItem>
											<SelectItem value="friend">Friend / Colleague</SelectItem>
											<SelectItem value="blog">Blog / Article</SelectItem>
											<SelectItem value="youtube">YouTube</SelectItem>
											<SelectItem value="twitter">Twitter / X</SelectItem>
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
	)
}
