"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"
import PlaygroundLogo from "../playground-logo"
import { GithubIcon } from "./components/github-icon"
import { GoogleIcon } from "./components/google-icon"

const FormSchema = z
	.object({
		email: z.string(),
		password: z.string(),
		rememberMe: z.boolean(),
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

export const radiusMap: Record<string, string> = {
	default: "",
	rounded: "rounded-full",
	flat: "rounded-none",
	fun: "rounded-xl",
}

export default function Signin1() {
	const [isLoading, setIsLoading] = useState(false)
	const { radius } = usePlayground()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
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
		<div className="bg-bg-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div className="w-100 bg-bg flex">
				<div className="flex flex-1 flex-col gap-8">
					<div className="flex flex-1 flex-col gap-6">
						<div>
							<PlaygroundLogo />
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="heading-5">Sign In</h1>
							<p className="text-fg-secondary text-sm">
								Don&apos;t have an account?{" "}
								<Button variant="link" asChild color="primary">
									<Link href="#"> Sign up</Link>
								</Button>
							</p>
						</div>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-4">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input className={`${radiusMap[radius]} w-full`} size="36" type="email" {...field} />
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
													<Input className={`${radiusMap[radius]} w-full`} size="36" type="password" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex items-center justify-between">
									<FormField
										control={form.control}
										name="rememberMe"
										render={({ field }) => (
											<div className="flex items-center gap-2">
												<FormControl>
													<Checkbox id="remember-me" className={`${radiusMap[radius]}`} checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
												<FormLabel htmlFor="remember-me" className="text-fg-secondary font-normal">
													Remember me
												</FormLabel>
											</div>
										)}
									/>
									<Button variant="link" asChild color="primary">
										<Link href="#"> Forgot Password?</Link>
									</Button>
								</div>
								<Button className={`${radiusMap[radius]} w-full`} type="submit" disabled={isLoading}>
									{isLoading ? <Spinner variant="default" /> : "Sign In"}
								</Button>
							</div>
						</form>
					</Form>
					<div className="flex flex-1 flex-col gap-6">
						<div className="flex items-center gap-2">
							<Divider className="flex-1" />
							<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">Or continue with</span>
							<Divider className="flex-1" />
						</div>
						<div className="flex gap-3">
							<Button variant="outline" color="neutral" className={`${radiusMap[radius]} text-fg-secondary w-full`}>
								<GoogleIcon />
								Google
							</Button>
							<Button variant="outline" color="neutral" className={`${radiusMap[radius]} text-fg-secondary w-full`}>
								<GithubIcon />
								Github
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
