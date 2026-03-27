"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { useFileUpload } from "@/registry/ui/file-upload"
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
import { Radian } from "../icon/radian"

const personalInfoSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	role: z.string().min(1, "Please select your role"),
	department: z.string().min(1, "Please select your department"),
	hearAbout: z.string().min(1, "Please select an option"),
})

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>

const roles = [
	{ value: "designer", label: "Designer" },
	{ value: "developer", label: "Developer" },
	{ value: "product-manager", label: "Product Manager" },
	{ value: "marketing", label: "Marketing" },
	{ value: "sales", label: "Sales" },
	{ value: "founder", label: "Founder / CEO" },
	{ value: "student", label: "Student" },
	{ value: "other", label: "Other" },
]

const departments = [
	{ value: "engineering", label: "Engineering" },
	{ value: "design", label: "Design" },
	{ value: "product", label: "Product" },
	{ value: "marketing", label: "Marketing" },
	{ value: "sales", label: "Sales" },
	{ value: "hr", label: "Human Resources" },
	{ value: "finance", label: "Finance" },
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

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function PersonalInfoStep({ onNext }: { onNext: () => void }) {
	const form = useForm<PersonalInfoFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			role: "",
			department: "",
			hearAbout: "",
		},
	})

	const [avatarError, setAvatarError] = useState<string | null>(null)

	const [
		{ files, isDragging, errors: fileErrors },
		{ removeFile, openFileDialog, getInputProps },
	] = useFileUpload({
		maxFiles: 1,
		maxSize: MAX_FILE_SIZE,
		accept: "image/*",
		multiple: false,
	})

	const currentFile = files[0]
	const previewUrl = currentFile?.preview

	useEffect(() => {
		if (currentFile) setAvatarError(null)
	}, [currentFile])

	function onSubmit() {
		if (files.length === 0) {
			setAvatarError("Profile picture is required")
			return
		}
		setAvatarError(null)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />
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
						{/* Avatar Upload */}
						<div className="flex items-start gap-3">
							<div
								className={cn(
									"relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-colors",
									isDragging
										? "border-primary bg-primary-focus"
										: "border-fg-secondary hover:border-fg-tertiary",
									previewUrl && "border-solid border-transparent"
								)}
								onClick={openFileDialog}>
								<input {...getInputProps()} className="sr-only" />
								{previewUrl ? (
									<img
										src={previewUrl}
										alt="Profile picture"
										className="h-full w-full object-cover"
									/>
								) : (
									<Avatar size="64" rounded="square">
										<AvatarFallback>AB</AvatarFallback>
									</Avatar>
								)}
							</div>
							<div className="flex flex-1 flex-col gap-2">
								<p className="text-fg text-sm font-medium">Profile Picture</p>
								<div className="flex gap-3">
									<Button
										type="button"
										variant="outline"
										color="neutral"
										size="28"
										onClick={openFileDialog}>
										<Upload className="size-4" />
										Upload Image
									</Button>
									<Button
										type="button"
										variant="outline"
										color="neutral"
										size="28"
										disabled={!currentFile}
										className={cn(!currentFile && "opacity-50")}
										onClick={() => {
											if (currentFile) removeFile(currentFile.id)
										}}>
										Remove
									</Button>
								</div>
								<p className="text-fg-tertiary text-xs">
									Preferred size 1:1, up to 5MB
								</p>
								{fileErrors.length > 0 && (
									<p className="text-error-text text-xs">{fileErrors[0]}</p>
								)}
								{avatarError && !fileErrors.length && (
									<p className="text-error-text text-xs">{avatarError}</p>
								)}
							</div>
						</div>

						{/* Form Fields */}
						<div className="flex flex-col gap-4">
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

							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<FormLabel>What is your role?</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}>
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
								<FormField
									control={form.control}
									name="department"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Department</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select..." />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{departments.map((dept) => (
														<SelectItem key={dept.value} value={dept.value}>
															{dept.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="hearAbout"
								render={({ field }) => (
									<FormItem>
										<FormLabel>How did you hear about us ?</FormLabel>
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
