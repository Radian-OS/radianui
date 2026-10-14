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
import { Input, InputWrapper } from "@/styles/default/ui/input"
import { LoginBrand } from "./login-brand"
import { LoginSocialButtons } from "./login-social-buttons"
import { signupSchema, type SignupFormValues } from "./types"

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [submittedData, setSubmittedData] = useState<SignupFormValues | null>(
		null
	)

	const IconComponent = showPassword ? EyeOff : Eye

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword((prev) => !prev)
	}

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
		<div className="flex w-full max-w-md flex-col gap-5 sm:gap-6">
			{/* Top Brand Logo */}
			<LoginBrand />

			{/* Heading & Subtitle */}
			<div className="flex flex-col gap-1">
				<h2 className="heading-4">Create an account</h2>
				<p className="text-fg-secondary text-sm">
					Sign up to get started with Radian
				</p>
			</div>

			{/* Social Authentication Buttons */}
			<LoginSocialButtons />

			{/* Divider */}
			<div className="flex items-center gap-4">
				<Divider className="flex-1" />
				<p className="text-fg-secondary text-sm">Or continue with email</p>
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
										placeholder="info@radianui.com"
										type="email"
										autoComplete="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password Field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
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
				<Link href="#" className="text-fg font-bold hover:underline">
					Log in
				</Link>
			</p>
		</div>
	)
}
