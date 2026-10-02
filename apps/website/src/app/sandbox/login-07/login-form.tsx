"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
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
import { SocialLogin } from "./social-login"
import { loginSchema, type LoginFormValues } from "./types"

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			emailOrUsername: "",
			password: "",
			rememberMe: false,
		},
	})

	const onSubmit = (values: LoginFormValues) => {
		setIsSubmitted(true)
		console.log("Login form submitted:", values)
	}

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-6">
			{/* Form Heading & Subtitle */}
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="text-fg text-2xl font-medium">Welcome Back</h1>
				<p className="text-fg-secondary text-sm">Sign in to continue.</p>
			</div>

			{/* Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						{/* Email or Username */}
						<FormField
							control={form.control}
							name="emailOrUsername"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-1.5">
									<FormLabel className="text-fg-secondary text-sm font-normal">
										Email or username
									</FormLabel>
									<FormControl>
										<InputWrapper size="36">
											<Mail className="text-fg-tertiary size-4" />
											<Input
												placeholder="Enter your email or username"
												type="text"
												autoComplete="username"
												{...field}
											/>
										</InputWrapper>
									</FormControl>
									<FormMessage className="text-error text-xs" />
								</FormItem>
							)}
						/>

						{/* Password */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-1.5">
									<FormLabel className="text-fg-secondary text-sm font-normal">
										Password
									</FormLabel>
									<FormControl>
										<InputWrapper size="36">
											<Lock className="text-fg-tertiary size-4" />
											<Input
												placeholder="Enter your password"
												type={showPassword ? "text" : "password"}
												autoComplete="current-password"
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

						{/* Remember Me and Forgot Password in Same Line */}
						<div className="flex items-center justify-between pt-0.5 text-sm">
							<FormField
								control={form.control}
								name="rememberMe"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center gap-2 space-y-0">
										<FormControl>
											<Checkbox
												id="remember"
												checked={field.value}
												onCheckedChange={field.onChange}
												size="sm"
												className="cursor-pointer"
											/>
										</FormControl>
										<FormLabel
											htmlFor="remember"
											className="text-fg cursor-pointer text-sm leading-none font-normal select-none">
											Remember me
										</FormLabel>
									</FormItem>
								)}
							/>

							<Link
								href="#forgot-password"
								className="text-fg hover:text-fg-secondary text-sm font-medium transition-colors">
								Forgot Password?
							</Link>
						</div>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						variant="strong"
						color="neutral"
						size="36"
						className="w-full cursor-pointer rounded-lg text-sm font-medium shadow-xs">
						Sign in
					</Button>
				</form>
			</Form>

			{/* Success notification banner on submit */}
			{isSubmitted && (
				<p className="text-success text-center text-xs font-medium">
					Sign in submitted successfully!
				</p>
			)}

			{/* Social Sign In Providers */}
			<SocialLogin />

			{/* Create Account Link */}
			<p className="text-fg-secondary text-center text-sm font-normal">
				Don&apos;t have an account?{" "}
				<Link
					href="#signup"
					className="text-fg hover:text-fg-secondary font-medium transition-colors">
					Create an account
				</Link>
			</p>
		</div>
	)
}
