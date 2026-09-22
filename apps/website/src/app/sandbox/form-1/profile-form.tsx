"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info, RotateCcw, Save, Upload, X } from "lucide-react"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { Switch } from "@/styles/default/ui/switch"
import { Button } from "@/styles/default/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import {
	DEFAULT_PROFILE_VALUES,
	type ProfileFormValues,
	profileFormSchema,
} from "./types"

export function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: DEFAULT_PROFILE_VALUES,
	})

	function onSubmit(data: ProfileFormValues) {
		console.log("Profile updated:", data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Photo Row */}
				<div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
					<span className="text-foreground text-sm font-medium sm:col-span-4">
						Photo
					</span>
					<div className="flex items-center gap-3 sm:col-span-8">
						<Avatar size="40" rounded="circle" className="border-border border">
							<AvatarImage src="/sandbox/placeholder.svg" alt="Noa Brooks" />
							<AvatarFallback>NB</AvatarFallback>
						</Avatar>
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="32"
							className="gap-1.5 text-xs font-medium">
							<Upload className="size-3.5" />
							<span>Change</span>
						</Button>
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="32"
							className="gap-1.5 text-xs font-medium">
							<X className="size-3.5" />
							<span>Remove</span>
						</Button>
					</div>
				</div>

				{/* Full Name */}
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<FormLabel className="text-foreground text-sm font-medium sm:col-span-4">
								Full Name
							</FormLabel>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<Input placeholder="Full Name" {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Birth Date */}
				<FormField
					control={form.control}
					name="birthDate"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<div className="flex items-center gap-1.5 sm:col-span-4">
								<FormLabel className="text-foreground text-sm font-medium">
									Birth Date
								</FormLabel>
								<Info className="text-fg-tertiary size-3.5" />
							</div>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<Input placeholder="Sep 18, 1991" {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Availability Date */}
				<FormField
					control={form.control}
					name="availabilityDate"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<div className="flex items-center gap-1.5 sm:col-span-4">
								<FormLabel className="text-foreground text-sm font-medium">
									Availability Date
								</FormLabel>
								<Info className="text-fg-tertiary size-3.5" />
							</div>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<Input placeholder="April 24th, 2026 - 10:30" {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Company */}
				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<FormLabel className="text-foreground text-sm font-medium sm:col-span-4">
								Company
							</FormLabel>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<Input placeholder="Company Name" {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Specialties */}
				<FormField
					control={form.control}
					name="specialties"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<FormLabel className="text-foreground text-sm font-medium sm:col-span-4">
								Specialties
							</FormLabel>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<div className="border-alpha bg-bg rounded-control-lg flex min-h-9 flex-wrap items-center gap-1.5 border px-2.5 py-1.5">
										{field.value.map((tag) => (
											<span
												key={tag}
												className="bg-fill2 text-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium">
												<span>{tag}</span>
												<button
													type="button"
													onClick={() =>
														field.onChange(field.value.filter((t) => t !== tag))
													}
													className="text-fg-tertiary hover:text-foreground transition-colors">
													<X className="size-3" />
												</button>
											</span>
										))}
										<input
											type="text"
											placeholder={
												field.value.length === 0
													? "Add specialties..."
													: "Add specialty..."
											}
											onKeyDown={(e) => {
												if (e.key === "Enter" && e.currentTarget.value.trim()) {
													e.preventDefault()
													const newTag = e.currentTarget.value.trim()
													if (!field.value.includes(newTag)) {
														field.onChange([...field.value, newTag])
													}
													e.currentTarget.value = ""
												}
											}}
											className="text-foreground placeholder:text-fg-tertiary min-w-[100px] flex-1 bg-transparent text-xs focus:outline-hidden"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Dismissal Time */}
				<FormField
					control={form.control}
					name="dismissalTime"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<div className="flex items-center gap-1.5 sm:col-span-4">
								<FormLabel className="text-foreground text-sm font-medium">
									Dismissal Time
								</FormLabel>
								<Info className="text-fg-tertiary size-3.5" />
							</div>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<Input placeholder="05:30 PM" {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Phone Number */}
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<FormLabel className="text-foreground text-sm font-medium sm:col-span-4">
								Phone Number
							</FormLabel>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<FormControl>
									<Input placeholder="+1 (312) 847-1928" {...field} />
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Visibility */}
				<FormField
					control={form.control}
					name="visibility"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<FormLabel className="text-foreground text-sm font-medium sm:col-span-4">
								Visibility
							</FormLabel>
							<div className="flex flex-col gap-1 sm:col-span-8">
								<Select value={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select visibility" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="team-only">Team only</SelectItem>
										<SelectItem value="public">Public</SelectItem>
										<SelectItem value="private">Private</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>

				{/* Availability Switch */}
				<FormField
					control={form.control}
					name="availableToHire"
					render={({ field }) => (
						<FormItem className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12 sm:gap-6">
							<FormLabel className="text-foreground text-sm font-medium sm:col-span-4">
								Availability
							</FormLabel>
							<div className="flex items-center gap-3 sm:col-span-8">
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<span className="text-foreground text-sm font-normal">
									Available to hire
								</span>
							</div>
						</FormItem>
					)}
				/>

				{/* Form Footer */}
				<div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
					<span className="text-fg-secondary text-xs">
						Changes stay private until saved.
					</span>
					<div className="flex w-full items-center justify-end gap-3 sm:w-auto">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="36"
							onClick={() => form.reset()}
							className="gap-1.5 font-medium">
							<RotateCcw className="size-3.5" />
							<span>Cancel</span>
						</Button>
						<Button
							type="submit"
							variant="strong"
							color="neutral"
							size="36"
							className="gap-1.5 bg-white font-medium text-zinc-950 hover:bg-zinc-200">
							<Save className="size-3.5" />
							<span>Save changes</span>
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
