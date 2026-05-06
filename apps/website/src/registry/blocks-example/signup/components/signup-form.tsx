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
import { Spinner } from "@/registry/ui/spinner"
import { GithubIcon } from "./github-icon"
import { GoogleIcon } from "./google-icon"
import Logo from "./radian-logo"

const FormSchema = z.object({
	firstName: z.string().min(1, { error: "First name is required" }),
	lastName: z.string().min(1, { error: "Last name is required" }),
	email: z
		.string()
		.min(1, { error: "Email is required" })
		.email({ error: "Please enter a valid email address" }),
	password: z
		.string()
		.min(1, { error: "Password is required" })
		.min(8, { error: "Password must be at least 8 characters long" })
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		}),
})

export default function Page() {
	const [isLoading, setIsLoading] = useState(false)

	const [showPassword, setShowPassword] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	})

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data)
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			form.reset()
		}, 2000)
	}

	return (
		<div className="w-100 bg-bg flex flex-col gap-8">
			{/* Title and Logo */}
			<div className="flex flex-col gap-6">
				<Logo />
				<div className="flex flex-col gap-2">
					<h1 className="heading-5 font-semibold">Sign Up</h1>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Button variant="link" asChild color="primary">
							<Link href="#">Sign in</Link>
						</Button>
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				{/* Sign Up Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6">
						<div className="flex flex-col gap-4">
							<div className="flex gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel htmlFor="firstName">First Name</FormLabel>
											<FormControl>
												<Input
													size="36"
													type="text"
													{...field}
													id="firstName"
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
										<FormItem className="flex-1">
											<FormLabel htmlFor="lastName">Last Name</FormLabel>
											<FormControl>
												<Input size="36" type="text" {...field} id="lastName" />
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
										<FormLabel htmlFor="email">Email Address</FormLabel>
										<FormControl>
											<Input size="36" type="email" {...field} id="email" />
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
										<FormLabel htmlFor="toggle-visible-password">
											Password
										</FormLabel>
										<FormControl>
											<InputWrapper>
												<Input
													{...field}
													id="toggle-visible-password"
													ref={inputRef}
													className="peer"
													type={showPassword ? "text" : "password"}
												/>
												<IconComponent
													className="hover:text-fg peer-disabled:text-fg-disabled hidden cursor-pointer peer-focus:block peer-disabled:pointer-events-none"
													onMouseDown={togglePasswordVisibility}
												/>
											</InputWrapper>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button className="w-full" type="submit" disabled={isLoading}>
							{isLoading ? <Spinner variant="default" /> : "Create account"}
						</Button>
					</form>
				</Form>
				{/* Divider */}
				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">
						Or continue with
					</span>
					<Divider className="flex-1" />
				</div>
				<div className="flex flex-col gap-4">
					{/* Social Login Buttons */}
					<div className="flex gap-3">
						<Button variant="outline" color="neutral" className="w-full">
							<GoogleIcon />
							Google
						</Button>
						<Button variant="outline" color="neutral" className="w-full">
							<GithubIcon />
							Github
						</Button>
					</div>
					{/* Terms and Privacy Policy */}
					<p className="text-fg-secondary text-[13px]">
						By signing up, you agree to Radian&apos;s{" "}
						<Button variant="link" asChild color="primary">
							<Link href="#" className="text-[13px]">
								Terms of Service
							</Link>
						</Button>{" "}
						and{" "}
						<Button variant="link" asChild color="primary">
							<Link href="#" className="text-[13px]">
								Privacy Policy
							</Link>
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}
