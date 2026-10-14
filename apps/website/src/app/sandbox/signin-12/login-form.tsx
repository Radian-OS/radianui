"use client"

import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/styles/default/ui/button"
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
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	})

	const onSubmit = (_data: LoginFormValues) => {
		// Handle form submission logic here
		console.log("Form submitted:", _data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				noValidate
				className="flex w-full flex-col gap-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="info@radianui.com"
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
						<FormItem>
							<FormLabel className="flex justify-between">
								Password
								<Link href="#forgot-password" className="hover:underline">
									Forgot Password?
								</Link>
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

				{/* Solid Submit Button */}
				<Button
					type="submit"
					variant="strong"
					color="neutral"
					size="lg"
					className="w-full"
					onClick={() => form.handleSubmit(onSubmit)()}>
					Sign in
				</Button>

				{/* Bottom Account Prompt without text underlines */}
				<p className="text-fg-secondary text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link
						href="#create-account"
						className="text-fg font-medium transition-colors hover:underline">
						Create an account
					</Link>
				</p>
			</form>
		</Form>
	)
}
