"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/styles/default/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"

const profileFormSchema = z.object({
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function CrisplyProfileSection() {
	const [savedMessage, setSavedMessage] = useState(false)

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: "Brian",
			lastName: "Frederin",
		},
	})

	function onSubmit(data: ProfileFormValues) {
		console.log("Profile updated:", data)
		setSavedMessage(true)
		setTimeout(() => setSavedMessage(false), 3000)
	}

	return (
		<section className="space-y-6">
			{/* Section Heading (Rule 13: heading-3) */}
			<h3 className="heading-3 text-fg text-lg font-bold tracking-tight">
				My Profile
			</h3>

			{/* Avatar & Photo Action Buttons */}
			<div className="flex flex-wrap items-center gap-6">
				<div className="border-border/80 shadow-xs relative size-20 overflow-hidden rounded-full border-2">
					<Image
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
						alt="Brian Frederin"
						fill
						sizes="80px"
						className="object-cover"
					/>
				</div>

				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-2.5">
						<Button
							type="button"
							variant="strong"
							color="neutral"
							size="36"
							className="gap-1.5 rounded-lg px-4 text-xs font-semibold">
							<Plus className="size-3.5" />
							<span>Change Image</span>
						</Button>

						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="36"
							className="rounded-lg px-4 text-xs font-semibold">
							<span>Remove Image</span>
						</Button>
					</div>

					<p className="text-fg-tertiary text-xs">
						We support PNGs, JPEGs and GIFs under 2MB
					</p>
				</div>
			</div>

			{/* Profile Form (Rules 2 & 3: Form + Zod validation) */}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{/* First Name */}
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-semibold">
										First Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="First Name"
											className="border-border/80 bg-bg h-10 rounded-lg text-xs"
										/>
									</FormControl>
									<FormMessage className="text-[11px]" />
								</FormItem>
							)}
						/>

						{/* Last Name */}
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-fg text-xs font-semibold">
										Last Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Last Name"
											className="border-border/80 bg-bg h-10 rounded-lg text-xs"
										/>
									</FormControl>
									<FormMessage className="text-[11px]" />
								</FormItem>
							)}
						/>
					</div>

					{savedMessage && (
						<p className="text-success text-xs font-medium">
							Profile changes saved successfully!
						</p>
					)}
				</form>
			</Form>
		</section>
	)
}
