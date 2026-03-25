"use client"

import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon } from "lucide-react"
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
import { GithubIcon } from "../icon/github"
import { GoogleIcon } from "../icon/google"
import { Radian } from "../icon/radian"

const signupSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
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
	const inputRef = useRef<HTMLInputElement>(null)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: { firstName: "", lastName: "", email: "", password: "" },
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Sign up with email</h1>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Link href="#" className="text-primary font-medium hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			{/* Form */}
			<div className="flex flex-col gap-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							<div className="flex gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder="Your first name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem className="w-[192px]">
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder="Your last name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email address"
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
													{...field}
													id="toggle-visible-password"
													ref={inputRef}
													placeholder="Enter your password"
													className="peer"
													type={showPassword ? "text" : "password"}
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
						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								variant="strong"
								color="primary"
								size="36"
								className="w-full">
								Create account
							</Button>
							<p className="text-fg-secondary text-[13px] leading-5">
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

				{/* Divider */}
				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">
						Or continue with
					</span>
					<Divider className="flex-1" />
				</div>

				{/* Social Buttons */}
				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1">
						<GoogleIcon />
						Google
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1">
						<GithubIcon />
						Github
					</Button>
				</div>
			</div>
		</div>
	)
}
