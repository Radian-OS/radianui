"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

type PersonalInfoFormValues = {
	fullName: string
	workEmail: string
	companyName: string
	jobTitle: string
	websiteUrl: string
	country: string
}

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		defaultValues: {
			fullName: "",
			workEmail: "",
			companyName: "",
			jobTitle: "",
			websiteUrl: "",
			country: "",
		},
	})

	function onSubmit(data: PersonalInfoFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Create your profile</h2>
					<p className="text-fg-secondary text-sm">
						Tell us a bit about yourself and your company.
					</p>
				</div>
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
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" size="36" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
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
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name</FormLabel>
										<FormControl>
											<Input placeholder="Mage" size="36" {...field} />
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
												placeholder="Product Designer"
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
								name="websiteUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website URL</FormLabel>
										<FormControl>
											<InputGroup>
												<InputAddon size="36">https://</InputAddon>
												<Input
													placeholder="mageicon.com"
													size="36"
													{...field}
												/>
											</InputGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<Select value={field.value} onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger size="36">
													<SelectValue placeholder="United States" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="us">United States</SelectItem>
												<SelectItem value="uk">United Kingdom</SelectItem>
												<SelectItem value="ca">Canada</SelectItem>
												<SelectItem value="au">Australia</SelectItem>
												<SelectItem value="de">Germany</SelectItem>
												<SelectItem value="fr">France</SelectItem>
												<SelectItem value="jp">Japan</SelectItem>
												<SelectItem value="in">India</SelectItem>
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
	)
}
