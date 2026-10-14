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
import { signUpSchema, type SignUpFormValues } from "./types"

export function AuthForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const IconComponent = showPassword ? EyeOff : Eye

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword((prev) => !prev)
	}

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	})

	const onSubmit = (values: SignUpFormValues) => {
		setIsSubmitted(true)
		console.log("Sign-up submission:", values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-3">
				{/* First Name & Last Name (Side by Side) with size 36 */}
				<div className="grid grid-cols-2 gap-3">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										placeholder="First Name"
										type="text"
										autoComplete="given-name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Last Name"
										type="text"
										autoComplete="family-name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Email Address with size 36 */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input
									placeholder="Email Address"
									type="email"
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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

				{/* Create Account Primary Button (size 36 matching input height) */}
				<Button type="submit" className="w-full">
					Create account
				</Button>

				{/* Terms and Privacy Agreement */}
				<p className="text-fg-secondary text-left text-xs">
					By signing up, you agree to Radian&apos;s{" "}
					<Link
						href="#terms"
						className="text-primary font-medium hover:underline">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						href="#privacy"
						className="text-primary font-medium hover:underline">
						Privacy Policy
					</Link>
				</p>

				{isSubmitted && (
					<p className="text-success mt-1 text-center text-xs">
						Account created successfully.
					</p>
				)}
			</form>
		</Form>
	)
}
