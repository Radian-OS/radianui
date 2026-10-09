"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
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
			emailOrUsername: "",
			password: "",
		},
	})

	const onSubmit = (data: SignupFormValues) => {
		setSubmittedData(data)
	}

	return (
		<div className="flex w-full max-w-lg flex-col items-center gap-6 p-6 text-neutral-900">
			{/* Top Brand Logo */}
			<div className="flex items-center justify-center">
				<div className="flex size-10 items-center justify-center rounded-xl bg-black text-white">
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7 6v6a5 5 0 0 0 10 0V6"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
						/>
						<circle cx="17.5" cy="17.5" r="1.5" fill="currentColor" />
					</svg>
				</div>
			</div>

			{/* Top Heading & Subtitle */}
			<div className="flex flex-col items-center gap-1.5 text-center">
				<h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
					Sign up to ReUI
				</h2>
				<p className="text-sm text-neutral-500">
					Create your account to get started.
				</p>
			</div>

			{/* Validated React Hook Form with Signup Fields */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex w-full flex-col gap-4">
					{/* Email or Username Field */}
					<FormField
						control={form.control}
						name="emailOrUsername"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<FormLabel className="text-sm font-medium text-neutral-900">
									Email or username
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Email or username"
										autoComplete="username"
										className="h-10 border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus-visible:border-neutral-900 focus-visible:ring-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-error text-xs" />
							</FormItem>
						)}
					/>

					{/* Password Field with Eye Toggle */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<FormLabel className="text-sm font-medium text-neutral-900">
									Password
								</FormLabel>
								<FormControl>
									<div className="relative flex w-full items-center">
										<Input
											placeholder="Enter your password"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
											className="h-10 w-full border-neutral-200 bg-white pr-10 text-neutral-900 placeholder:text-neutral-400 focus-visible:border-neutral-900 focus-visible:ring-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
											{...field}
										/>
										<button
											type="button"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											onClick={() => setShowPassword((prev) => !prev)}
											className="absolute right-2 flex size-7 cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-colors hover:text-neutral-900">
											{showPassword ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage className="text-error text-xs" />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button type="submit" size="40" className="mt-1 w-full">
						Sign up
					</Button>
				</form>
			</Form>

			{/* Divider */}
			<div className="flex w-full items-center gap-4">
				<div className="h-px flex-1 bg-neutral-200" />
				<span className="text-sm text-neutral-400">Or continue with</span>
				<div className="h-px flex-1 bg-neutral-200" />
			</div>

			{/* Social Authentication Buttons */}
			<LoginSocialButtons />

			{/* Success Alert */}
			{submittedData && (
				<div className="border-success/30 bg-success/10 text-success w-full rounded-lg border p-3 text-xs">
					Account created successfully for {submittedData.emailOrUsername}!
				</div>
			)}

			{/* Footer Link */}
			<p className="text-center text-sm text-neutral-500">
				Already have an account?{" "}
				<Link
					href="#"
					className="font-semibold text-neutral-900 transition-colors hover:text-neutral-600">
					Sign in
				</Link>
			</p>
		</div>
	)
}
