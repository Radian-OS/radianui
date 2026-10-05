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

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword((prev) => !prev)
	}

	const IconComponent = showPassword ? EyeOff : Eye

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
				<h1 className="heading-5">Welcome Back</h1>
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
									<FormLabel>Email or username</FormLabel>
									<FormControl>
										<InputWrapper size="36">
											<Mail />
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<InputWrapper size="36">
											<Lock />
											<Input
												placeholder="Enter your password"
												type={showPassword ? "text" : "password"}
												autoComplete="current-password"
												className="peer"
												{...field}
											/>
											<IconComponent
												className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
												onMouseDown={togglePasswordVisibility}
											/>
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
										<FormLabel htmlFor="remember" className="select-none">
											Remember me
										</FormLabel>
									</FormItem>
								)}
							/>

							<Link
								href="#forgot-password"
								className="text-fg text-sm font-medium transition-colors hover:underline">
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
						className="w-full">
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
					className="text-fg font-medium transition-colors hover:underline">
					Create an account
				</Link>
			</p>
		</div>
	)
}
