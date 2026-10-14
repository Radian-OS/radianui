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
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { Divider } from "@/styles/default/ui/divider"
import { LoginBrand } from "./login-brand"
import { LoginSocialButtons } from "./login-social-buttons"
import { loginSchema, type LoginFormValues } from "./types"

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [submittedData, setSubmittedData] = useState<LoginFormValues | null>(
		null
	)

	const IconComponent = showPassword ? EyeOff : Eye

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword((prev) => !prev)
	}

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	})

	const onSubmit = (data: LoginFormValues) => {
		setSubmittedData(data)
	}

	return (
		<div className="flex w-full max-w-md flex-col gap-8">
			{/* Top Brand Logo */}
			<LoginBrand />

			{/* Heading & Subtitle */}
			<div className="flex flex-col gap-1">
				<h1 className="heading-4">Welcome Back</h1>
				<p className="text-fg-secondary text-sm">
					Welcome back! Select method to login:
				</p>
			</div>

			{/* Social Authentication Buttons */}
			<LoginSocialButtons />

			{/* Divider */}
			<div className="flex w-full items-center gap-3">
				<Divider className="flex-1" />
				<span className="text-fg-tertiary text-sm">Or continue with Email</span>
				<Divider className="flex-1" />
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
							<FormItem>
								<FormLabel>Email address</FormLabel>
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
							<FormItem>
								<FormLabel className="flex justify-between">
									Password
									<Link href="#" className="hover:underline">
										Forgot Password?
									</Link>
								</FormLabel>{" "}
								<FormControl>
									<InputWrapper>
										<Input
											placeholder="Enter your password"
											type={showPassword ? "text" : "password"}
											autoComplete="current-password"
											{...field}
										/>
										<IconComponent
											className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
											onMouseDown={togglePasswordVisibility}
										/>
									</InputWrapper>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Submit Button */}
					<Button
						type="submit"
						variant="strong"
						color="neutral"
						size="lg"
						className="w-full">
						Sign in to Radian
					</Button>
				</form>
			</Form>

			{/* Success Message for testing validation */}
			{submittedData && (
				<div className="border-success/30 bg-success/10 text-success rounded-lg border p-3 text-xs">
					Signed in successfully with {submittedData.email}
				</div>
			)}

			{/* Footer Link */}
			<p className="text-fg-secondary text-center text-sm">
				New on our platform?{" "}
				<Link href="#" className="text-fg font-semibold hover:underline">
					Create an account
				</Link>
			</p>
		</div>
	)
}
