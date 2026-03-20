"use client"

import { Upload } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
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
	referral: string
}

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			role: "",
			department: "",
			referral: "",
		},
	})

	const onSubmit = () => {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Personalize your account</h1>
					<p className="text-fg-secondary text-sm">
						Add your details to personalize your experience.
					</p>
				</div>
			</div>

			{/* Form */}
			<div className="flex flex-col gap-5">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6">
						{/* Avatar Section */}
						<div className="flex items-start gap-3">
							<Avatar size="64" rounded="square">
								<AvatarFallback>AB</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col justify-center gap-2">
								<p className="text-fg text-sm font-medium">Profile Picture</p>
								<div className="flex gap-3">
									<Button
										type="button"
										variant="outline"
										color="neutral"
										size="28">
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

						{/* Name Fields */}
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input {...field} />
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
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							{/* Role & Department */}
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<FormLabel>What is your role?</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="designer">Designer</SelectItem>
													<SelectItem value="developer">Developer</SelectItem>
													<SelectItem value="manager">Manager</SelectItem>
													<SelectItem value="founder">Founder</SelectItem>
													<SelectItem value="student">Student</SelectItem>
													<SelectItem value="educator">Educator</SelectItem>
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
										<FormItem>
											<FormLabel>Department</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="engineering">
														Engineering
													</SelectItem>
													<SelectItem value="design">Design</SelectItem>
													<SelectItem value="marketing">Marketing</SelectItem>
													<SelectItem value="sales">Sales</SelectItem>
													<SelectItem value="product">Product</SelectItem>
													<SelectItem value="operations">Operations</SelectItem>
													<SelectItem value="hr">Human Resources</SelectItem>
													<SelectItem value="other">Other</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>

							{/* How did you hear about us */}
							<FormField
								control={form.control}
								name="referral"
								render={({ field }) => (
									<FormItem>
										<FormLabel>How did you hear about us ?</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="google">Google Search</SelectItem>
												<SelectItem value="social">Social Media</SelectItem>
												<SelectItem value="friend">
													Friend or Colleague
												</SelectItem>
												<SelectItem value="blog">Blog Post</SelectItem>
												<SelectItem value="youtube">YouTube</SelectItem>
												<SelectItem value="twitter">Twitter / X</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							variant="strong"
							color="primary"
							className="w-full">
							Continue
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
