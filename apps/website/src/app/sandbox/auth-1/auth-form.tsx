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
				className="flex flex-col gap-3.5">
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
										size="36"
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
										size="36"
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
									size="36"
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

				{/* Password Field with size 36 InputWrapper and Eye Toggle */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<InputWrapper size="36">
									<Input
										size="36"
										placeholder="Enter your password"
										type={showPassword ? "text" : "password"}
										autoComplete="new-password"
										{...field}
									/>
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className="text-fg-tertiary hover:text-fg flex cursor-pointer items-center justify-center transition-colors focus:outline-none"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}>
										{showPassword ? (
											<Eye className="size-4" strokeWidth={1.75} />
										) : (
											<EyeOff className="size-4" strokeWidth={1.75} />
										)}
									</button>
								</InputWrapper>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Create Account Primary Button (size 36 matching input height) */}
				<Button
					type="submit"
					variant="strong"
					color="primary"
					size="36"
					className="mt-1.5 h-9 w-full cursor-pointer rounded-xl font-medium">
					Create account
				</Button>

				{/* Terms and Privacy Agreement */}
				<p className="text-fg-secondary text-left text-xs leading-relaxed">
					By signing up, you agree to Radian&apos;s{" "}
					<Link
						href="#terms"
						className="text-primary hover:text-primary/90 font-medium transition-colors">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						href="#privacy"
						className="text-primary hover:text-primary/90 font-medium transition-colors">
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
