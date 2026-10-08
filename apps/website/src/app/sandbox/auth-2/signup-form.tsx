"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
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

export function SignupForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

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
		<div className="w-full rounded-2xl border border-zinc-300/50 bg-zinc-200/25 p-1.5 shadow-2xl shadow-black/[0.05] backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-800/25">
			<Card className="bg-card w-full gap-0 rounded-xl border border-zinc-200/80 py-0 shadow-none dark:border-zinc-800/90">
				<CardContent className="space-y-7 p-6 sm:space-y-8">
					<div className="space-y-2">
						<CardTitle className="text-xl tracking-tight">
							Start your 14-day trial
						</CardTitle>
						<CardDescription>
							No credit card. No sales call. Just ship.
						</CardDescription>
					</div>

					<SocialButtons />

					<div className="flex items-center gap-3">
						<div className="bg-border h-px flex-1" />
						<span className="text-fg-tertiary text-xs tracking-wide uppercase">
							or
						</span>
						<div className="bg-border h-px flex-1" />
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
										<FormItem className="gap-2">
											<FormLabel htmlFor="auth-5-email">Work email</FormLabel>
											<FormControl>
												<Input
													id="auth-5-email"
													type="email"
													autoComplete="email"
													placeholder="you@company.com"
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
										<FormItem className="gap-2">
											<FormLabel htmlFor="auth-5-password">Password</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														id="auth-5-password"
														type={showPassword ? "text" : "password"}
														autoComplete="new-password"
														placeholder="8+ characters"
														{...field}
													/>
													<button
														type="button"
														className="text-fg-tertiary hover:text-fg absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer transition-colors"
														aria-label={
															showPassword ? "Hide password" : "Show password"
														}
														aria-pressed={showPassword}
														onClick={() => setShowPassword((prev) => !prev)}>
														{showPassword ? (
															<EyeOff className="size-4" aria-hidden="true" />
														) : (
															<Eye className="size-4" aria-hidden="true" />
														)}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								color="primary"
								className="mt-1.5 w-full cursor-pointer">
								<span>
									{isSubmitted ? "Account created!" : "Start free trial"}
								</span>
								<ArrowRight className="size-4" aria-hidden="true" />
							</Button>

							<p className="text-fg-secondary text-center text-sm">
								Already have an account?{" "}
								<Link
									href="#"
									className="text-fg hover:text-primary font-medium transition-colors">
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
