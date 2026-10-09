"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { LoginBrand } from "./login-brand"
import { LoginSocialButtons } from "./login-social-buttons"
import { signupSchema, type SignupFormValues } from "./types"

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [submittedData, setSubmittedData] = useState<SignupFormValues | null>(
		null
	)

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = (data: SignupFormValues) => {
		setSubmittedData(data)
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-6">
			{/* Top Brand Logo */}
			<LoginBrand />

			{/* Heading & Subtitle */}
			<div>
				<h2 className="text-fg mb-1 text-2xl font-bold tracking-tight">
					Create an account
				</h2>
				<p className="text-fg-secondary text-sm">
					Sign up to get started with shadcn/studio.
				</p>
			</div>

			{/* Social Authentication Buttons */}
			<LoginSocialButtons />

			{/* Divider */}
			<div className="flex items-center gap-4">
				<div className="bg-border h-px flex-1" />
				<p className="text-fg-secondary text-xs whitespace-nowrap sm:text-sm">
					Or continue with email
				</p>
				<div className="bg-border h-px flex-1" />
			</div>

			{/* Validated React Hook Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4">
					{/* Email Field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-1.5">
								<FormLabel className="text-fg text-sm font-medium">
									Email address*
								</FormLabel>
								<FormControl>
									<Input
										placeholder="you@example.com"
										type="email"
										autoComplete="email"
										className="bg-bg focus-visible:bg-primary/10 h-10"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-error text-xs" />
							</FormItem>
						)}
					/>

					{/* Password Field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-1.5">
								<FormLabel className="text-fg text-sm font-medium">
									Password*
								</FormLabel>
								<FormControl>
									<InputWrapper size="36">
										<Input
											placeholder="Create a password"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
											className="h-10 border-neutral-200 bg-white placeholder:text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:placeholder:text-neutral-500"
											{...field}
										/>
										<IconButton
											type="button"
											variant="ghost"
											color="neutral"
											size="28"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											onClick={() => setShowPassword((prev) => !prev)}>
											{showPassword ? (
												<EyeOff className="text-fg-secondary size-4" />
											) : (
												<Eye className="text-fg-secondary size-4" />
											)}
										</IconButton>
									</InputWrapper>
								</FormControl>
								<FormMessage className="text-error text-xs" />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button
						type="submit"
						variant="strong"
						color="neutral"
						size="40"
						className="mt-2 h-10 w-full font-medium shadow-xs">
						Create account
					</Button>
				</form>
			</Form>

			{/* Success Message for testing validation */}
			{submittedData && (
				<div className="border-success/30 bg-success/10 text-success rounded-lg border p-3 text-xs">
					Account created successfully for {submittedData.email}
				</div>
			)}

			{/* Footer Link */}
			<p className="text-fg-secondary text-center text-sm">
				Already have an account?{" "}
				<Link
					href="#"
					className="text-fg hover:text-primary font-bold transition-colors">
					Log in
				</Link>
			</p>
		</div>
	)
}
