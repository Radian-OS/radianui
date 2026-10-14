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
import { LoginMagicButtons } from "./login-magic-buttons"
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
								</FormLabel>
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

			{/* Success Alert */}
			{submittedData && (
				<div className="border-success/30 bg-success/10 text-success rounded-lg border p-3 text-xs">
					Signed in successfully as {submittedData.email}
				</div>
			)}

			{/* Create Account Link */}
			<p className="text-fg-secondary text-center text-sm">
				New on our platform?{" "}
				<Link href="#" className="text-fg font-semibold hover:underline">
					Create an account
				</Link>
			</p>

			{/* Divider */}
			<div className="flex w-full items-center gap-3">
				<Divider className="flex-1" />
				<span className="text-fg-tertiary text-sm">OR</span>
				<Divider className="flex-1" />
			</div>

			{/* Bottom Sign In With Google */}
			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="md"
				className="w-full">
				Sign in with google
			</Button>
		</div>
	)
}
