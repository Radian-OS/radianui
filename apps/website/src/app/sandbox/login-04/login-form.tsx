"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/styles/default/ui/button"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import { loginSchema, type LoginFormValues } from "./types"

export function LoginForm() {
	const [isSubmitted, setIsSubmitted] = useState(false)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	})

	const onSubmit = (_data: LoginFormValues) => {
		setIsSubmitted(true)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				noValidate
				className="w-full space-y-6">
				<div className="space-y-4">
					{/* Email Field with default Input (no extra class names) */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<FormLabel className="text-fg-secondary text-sm font-normal">
									Email*
								</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="example@shadcnspace.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password Field with default Input (no extra class names) */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="space-y-1.5">
								<FormLabel className="text-fg-secondary text-sm font-normal">
									Password*
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Remember Device & Forgot Password Row */}
					<div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-sm">
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center gap-2 space-y-0">
									<FormControl>
										<Checkbox
											size="sm"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="text-fg-secondary cursor-pointer text-sm font-normal">
										Remember this device
									</FormLabel>
								</FormItem>
							)}
						/>

						<Link
							href="#forgot-password"
							className="text-fg hover:text-primary text-sm font-medium transition-colors">
							Forgot Password?
						</Link>
					</div>
				</div>

				{/* Solid Submit Button */}
				<Button
					type="submit"
					variant="strong"
					color="neutral"
					size="40"
					className="w-full font-medium"
					onClick={() => form.handleSubmit(onSubmit)()}>
					Sign in
				</Button>

				{/* Bottom Account Prompt without text underlines */}
				<p className="text-fg-secondary text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link
						href="#create-account"
						className="text-fg hover:text-primary font-medium transition-colors">
						Create an account
					</Link>
				</p>
			</form>
		</Form>
	)
}
