"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/styles/default/ui/card"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import { Input } from "@/styles/default/ui/input"
import { SocialButtons } from "./social-buttons"
import { signupSchema, type SignupFormValues } from "./types"
import { InputWrapper } from "@/registry/ui/input"

export function SignupForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

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

	const onSubmit = (_values: SignupFormValues) => {
		setIsSubmitted(true)
	}

	return (
		<div className="border-soft w-full rounded-2xl border p-1">
			<Card className="bg-bg border-soft w-full gap-0 rounded-xl border py-0">
				<CardContent className="flex flex-col gap-7 p-6 sm:gap-8">
					<div className="flex flex-col gap-2">
						<CardTitle className="heading-4">Start your 14-day trial</CardTitle>
						<CardDescription>
							No credit card. No sales call. Just ship.
						</CardDescription>
					</div>

					<SocialButtons />

					<div className="flex items-center gap-3">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary text-sm tracking-wide uppercase">
							or
						</span>
						<Divider className="flex-1" />
					</div>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							noValidate
							className="flex flex-col gap-6">
							<div className="flex flex-col gap-5">
								{/* Work Email Field */}
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor="auth-5-email">Work email</FormLabel>
											<FormControl>
												<Input
													id="auth-5-email"
													type="email"
													autoComplete="email"
													placeholder="info@radianui.com"
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
											<FormLabel htmlFor="auth-5-password">Password</FormLabel>
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
							</div>

							<Button
								type="submit"
								color="primary"
								className="w-full cursor-pointer">
								<span>
									{isSubmitted ? "Account created!" : "Start free trial"}
								</span>
								<ArrowRight className="size-4" aria-hidden="true" />
							</Button>

							<p className="text-fg-secondary text-center text-sm">
								Already have an account?{" "}
								<Link href="#" className="text-fg font-medium hover:underline">
									Sign in
								</Link>
							</p>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
