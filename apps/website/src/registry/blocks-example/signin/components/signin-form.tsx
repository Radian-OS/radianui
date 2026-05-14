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
import Logo from "./brand-logo"
import { GithubIcon } from "./github-icon"
import { GoogleIcon } from "./google-icon"

const FormSchema = z
	.object({
		email: z.string(),
		password: z.string(),
	})
	.superRefine((data, ctx) => {
		// Validate email first
		if (!data.email || data.email.trim().length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "Email is required",
				path: ["email"],
			})
			return // Stop here
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			ctx.addIssue({
				code: "custom",
				message: "Please enter a valid email address",
				path: ["email"],
			})
			return // Stop here - don't validate password
		}

		// Only validate password if email is valid
		if (!data.password || data.password.trim().length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "Password is required",
				path: ["password"],
			})
		}
	})

export default function SigninForm() {
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
		<div className="flex flex-col gap-8 px-6 py-8 lg:px-7">
			<Logo />
			<div className="flex flex-col gap-2">
				<h1 className="heading-5">Sign In</h1>
				<p className="text-fg-secondary text-sm font-normal">
					Don&apos;t have an account?{" "}
					<Button variant="link" asChild color="primary">
						<Link href="#">Sign Up</Link>
					</Button>
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input size="36" type="email" {...field} />
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
									<div className="flex items-center justify-between">
										<FormLabel htmlFor="password">Password</FormLabel>
										<Button variant="link" asChild color="primary" size="28">
											<Link href="#">Forgot Password?</Link>
										</Button>
									</div>
									<FormControl>
										<InputWrapper>
											<Input
												{...field}
												id="password"
												ref={inputRef}
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
						<Button className="w-full" type="submit" disabled={isLoading}>
							{isLoading ? <Spinner variant="default" /> : "Sign In"}
						</Button>
					</div>
				</form>
			</Form>
			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-1.5">
					<Divider className="flex-1" />
					<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">
						Or continue with
					</span>
					<Divider className="flex-1" />
				</div>
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
			</div>
		</div>
	)
}
