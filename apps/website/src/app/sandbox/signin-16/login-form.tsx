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
import { Divider } from "@/styles/default/ui/divider"
import { LoginSocialButtons } from "./login-social-buttons"
import { loginSchema, type LoginFormValues } from "./types"

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [submittedData, setSubmittedData] = useState<LoginFormValues | null>(
		null
	)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			rememberMe: false,
		},
	})

	const onSubmit = (data: LoginFormValues) => {
		setSubmittedData(data)
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-6">
			{/* Top Heading */}
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="heading-2">
					<span>Welcome Back👋</span>
				</h1>
				<p className="text-fg-secondary text-xs sm:text-sm">
					Lets get started with your 30 days free trial
				</p>
			</div>

			{/* Stacked Social Authentication Buttons */}
			<LoginSocialButtons />

			{/* Divider */}
			<div className="flex w-full items-center gap-3">
				<Divider className="flex-1" />
				<span className="text-fg-tertiary text-sm">Or</span>
				<Divider className="flex-1" />
			</div>

			{/* Validated React Hook Form with 3 Fields */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-3.5">
					{/* Name Field */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Enter your name" {...field} />
								</FormControl>
								<FormMessage className="text-error text-xs" />
							</FormItem>
						)}
					/>

					{/* Email Field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Enter your email address"
										type="email"
										autoComplete="email"
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
							<FormItem>
								<FormControl>
									<InputWrapper size="36">
										<Input
											placeholder="••••••••••••••"
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

					{/* Remember Me and Forgot Password */}
					<div className="flex items-center justify-between">
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center gap-2">
									<FormControl>
										<Checkbox
											size="sm"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="text-xs font-medium hover:cursor-pointer">
										Remember Me
									</FormLabel>
								</FormItem>
							)}
						/>

						<Link
							href="#"
							className="text-fg hover:text-fg-secondary text-xs font-medium transition-colors">
							Forgot Password?
						</Link>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						variant="strong"
						color="neutral"
						size="40"
						className="w-full">
						Sign in to Radian
					</Button>
				</form>
			</Form>

			{/* Success Alert */}
			{submittedData && (
				<div className="border-success/30 bg-success/10 text-success rounded-lg border p-3 text-xs">
					Welcome {submittedData.name}! Signed in with {submittedData.email}.
				</div>
			)}

			{/* Footer Link */}
			<p className="text-fg-secondary text-center text-xs">
				Don&apos;t have an account yet?{" "}
				<Link
					href="#"
					className="text-fg hover:text-fg-secondary font-semibold transition-colors">
					Sign Up
				</Link>
			</p>
		</div>
	)
}
