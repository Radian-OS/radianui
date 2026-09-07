"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Switch } from "@/styles/default/ui/switch"

const securityFormSchema = z.object({
	email: z.string().email("Invalid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
})

type SecurityFormValues = z.infer<typeof securityFormSchema>

export function CrisplySecuritySection() {
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

	const form = useForm<SecurityFormValues>({
		resolver: zodResolver(securityFormSchema),
		defaultValues: {
			email: "brianfrederin@email.com",
			password: "supersecretpassword",
		},
	})

	return (
		<section className="space-y-6 pt-6">
			{/* Section Heading (Rule 13: heading-3) */}
			<h3 className="heading-3 text-fg text-lg font-bold tracking-tight">
				Account Security
			</h3>

			{/* Form with Zod validation */}
			<Form {...form}>
				<div className="space-y-5">
					{/* Email Field & Action Button */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-fg text-xs font-semibold">
									Email
								</FormLabel>
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
									<FormControl>
										<Input
											{...field}
											type="email"
											className="border-border/80 bg-fill1/40 text-fg-secondary h-10 flex-1 rounded-lg text-xs"
										/>
									</FormControl>
									<Button
										type="button"
										variant="outline"
										color="neutral"
										size="40"
										className="shrink-0 rounded-lg px-4 text-xs font-semibold">
										<span>Change email</span>
									</Button>
								</div>
								<FormMessage className="text-[11px]" />
							</FormItem>
						)}
					/>

					{/* Password Field & Action Button */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-fg text-xs font-semibold">
									Password
								</FormLabel>
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
									<FormControl>
										<Input
											{...field}
											type="password"
											value="••••••••••••"
											readOnly
											className="border-border/80 bg-fill1/40 text-fg-secondary h-10 flex-1 rounded-lg text-xs"
										/>
									</FormControl>
									<Button
										type="button"
										variant="outline"
										color="neutral"
										size="40"
										className="shrink-0 rounded-lg px-4 text-xs font-semibold">
										<span>Change password</span>
									</Button>
								</div>
								<FormMessage className="text-[11px]" />
							</FormItem>
						)}
					/>
				</div>
			</Form>

			{/* 2-Step Verifications Row */}
			<div className="border-border/60 flex items-center justify-between border-t pt-5">
				<div>
					<div className="text-fg text-xs font-bold">2-Step Verifications</div>
					<div className="text-fg-tertiary mt-1 text-xs">
						Add an additional layer of security to your account during login.
					</div>
				</div>

				<Switch
					checked={twoFactorEnabled}
					onCheckedChange={setTwoFactorEnabled}
					aria-label="Toggle 2-Step Verification"
				/>
			</div>
		</section>
	)
}
