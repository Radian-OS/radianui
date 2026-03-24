"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"

const signupSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupStep({ onNext }: { onNext: () => void }) {
	const [showPassword, setShowPassword] = useState(false)

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: { email: "", password: "" },
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="border-soft bg-bg w-full max-w-[400px] rounded-2xl border p-6 md:p-8">
			<div className="flex flex-col gap-8">
				{/* Header */}
				<div className="flex flex-col gap-2 text-center">
					<h1 className="heading-5">Sign up</h1>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Link href="#" className="text-primary font-medium hover:underline">
							Sign in
						</Link>
					</p>
				</div>

				{/* Social + Form */}
				<div className="flex flex-col gap-6">
					{/* Google Button */}
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="w-full">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=google.com"
							alt="Google"
							width={20}
							height={20}
						/>
						Continue with Google
					</Button>

					{/* Divider */}
					<div className="flex items-center gap-2">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary text-sm font-medium">Or</span>
						<Divider className="flex-1" />
					</div>

					{/* Form */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4">
							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="" {...field} />
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
														type={showPassword ? "text" : "password"}
														placeholder=""
														{...field}
													/>
													<button
														type="button"
														onClick={() => setShowPassword(!showPassword)}
														className="text-fg-tertiary hover:text-fg-secondary">
														{showPassword ? (
															<EyeOff className="size-5" />
														) : (
															<Eye className="size-5" />
														)}
													</button>
												</InputWrapper>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Submit + Terms */}
							<div className="flex flex-col gap-3 pt-2">
								<Button
									type="submit"
									variant="strong"
									color="primary"
									size="36"
									className="w-full">
									Create account
								</Button>
								<p className="text-fg-secondary text-[13px]">
									By signing up, you agree to Radian&apos;s{" "}
									<Link
										href="#"
										className="text-primary font-medium hover:underline">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										href="#"
										className="text-primary font-medium hover:underline">
										Privacy Policy
									</Link>
								</p>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
