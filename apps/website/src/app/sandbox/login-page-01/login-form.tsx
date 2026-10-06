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
import { LoginMagicButtons } from "./login-magic-buttons"
import { loginSchema, type LoginFormValues } from "./types"

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [submittedData, setSubmittedData] = useState<LoginFormValues | null>(
		null
	)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	})

	const handleSelectRole = (role: "user" | "admin") => {
		form.setValue(
			"email",
			role === "admin" ? "admin@radian.com" : "user@radian.com"
		)
		form.setValue("password", "password123")
	}

	const onSubmit = (data: LoginFormValues) => {
		setSubmittedData(data)
	}

	return (
		<div className="flex w-full flex-col gap-5">
			{/* Magic Link Buttons */}
			<LoginMagicButtons onSelectRole={handleSelectRole} />

			{/* Validated React Hook Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					{/* Email Field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address*</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email address"
										type="email"
										autoComplete="email"
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
							<FormItem className="flex flex-col gap-1.5">
								<FormLabel>Password*</FormLabel>
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
											className="hover:bg-transparent"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											onClick={() => setShowPassword((prev) => !prev)}>
											{showPassword ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</IconButton>
									</InputWrapper>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Remember Me and Forgot Password */}
					<div className="flex items-center justify-between pt-0.5">
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
							className="text-fg text-xs font-medium transition-colors hover:underline">
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
					Signed in successfully as {submittedData.email}
				</div>
			)}

			{/* Create Account Link */}
			<p className="text-fg-secondary text-center text-xs">
				New on our platform?{" "}
				<Link href="#" className="text-fg font-semibold hover:underline">
					Create an account
				</Link>
			</p>

			{/* Divider */}
			<div className="relative my-0.5 flex items-center justify-center">
				<div className="absolute inset-0 flex items-center">
					<div className="border-soft w-full border-t" />
				</div>
				<span className="bg-card text-fg-tertiary relative px-3 text-xs">
					or
				</span>
			</div>

			{/* Bottom Sign In With Google */}
			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				className="w-full">
				Sign in with google
			</Button>
		</div>
	)
}
