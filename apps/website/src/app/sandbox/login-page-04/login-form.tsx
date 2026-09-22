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
				<h1 className="heading-2 text-foreground flex items-center justify-center gap-2 font-bold">
					<span>Welcome Back</span>
					<span className="text-2xl">👋</span>
				</h1>
				<p className="text-fg-secondary text-xs sm:text-sm">
					Lets get started with your 30 days free trial
				</p>
			</div>

			{/* Stacked Social Authentication Buttons */}
			<LoginSocialButtons />

			{/* Divider */}
			<div className="relative my-0.5 flex items-center justify-center">
				<div className="absolute inset-0 flex items-center">
					<div className="border-border/60 w-full border-t" />
				</div>
				<span className="bg-background text-fg-tertiary relative px-3 text-xs">
					Or
				</span>
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
							<FormItem className="space-y-1">
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
							<FormItem className="space-y-1">
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
							<FormItem className="space-y-1">
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
					<div className="flex items-center justify-between pt-1">
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex items-center gap-2 space-y-0">
									<FormControl>
										<Checkbox
											size="sm"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="text-fg-secondary text-xs font-medium hover:cursor-pointer">
										Remember Me
									</FormLabel>
								</FormItem>
							)}
						/>

						<Link
							href="#"
							className="text-fg hover:text-primary text-xs font-medium transition-colors">
							Forgot Password?
						</Link>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						variant="strong"
						color="neutral"
						size="40"
						className="mt-2 w-full font-medium shadow-xs">
						Sign in to Shadcn Studio
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
					className="text-fg hover:text-primary font-semibold transition-colors">
					Sign Up
				</Link>
			</p>
		</div>
	)
}
