"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"
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
		<div className="flex w-full max-w-lg flex-col items-center gap-6 p-6">
			{/* Top Brand Logo */}
			<div className="flex items-center justify-center">
				<Link href="#" className="flex w-fit items-center gap-2">
					<img src="/logo.svg" alt="Radian" className="size-8 shrink-0" />
					<h1 className="heading-6">Radian</h1>
				</Link>
			</div>

			{/* Top Heading & Subtitle */}
			<div className="flex flex-col items-center gap-1.5 text-center">
				<h2 className="heading-4">Sign up to Radian</h2>
				<p className="text-fg-secondary text-sm">
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
							<FormItem>
								<FormLabel>Email or username</FormLabel>
								<FormControl>
									<Input
										placeholder="Email or username"
										autoComplete="username"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password Field with Eye Toggle */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative flex w-full items-center">
										<Input
											placeholder="Enter your password"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
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
								<FormMessage className="text-error" />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button type="submit" size="lg" className="mt-1 w-full">
						Sign up
					</Button>
				</form>
			</Form>

			{/* Divider */}
			<div className="flex w-full items-center gap-4">
				<Divider className="flex-1" />
				<span className="text-fg text-sm">Or continue with</span>
				<Divider className="flex-1" />
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
			<p className="text-fg-secondary text-center text-sm">
				Already have an account?{" "}
				<Link href="#" className="text-fg font-semibold hover:underline">
					Sign in
				</Link>
			</p>
		</div>
	)
}
