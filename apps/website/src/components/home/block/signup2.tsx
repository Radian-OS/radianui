"use client"

import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"
import PlaygroundLogo from "../playground-logo"
import { ImagePreview } from "../playground/upload"
import { GithubIcon } from "./components/github-icon"
import { GoogleIcon } from "./components/google-icon"
import { buttonStyles, radiusMap, sizeMap, spaceMap } from "./signin1"

const FormSchema = z
	.object({
		firstName: z.string(),
		email: z.string(),
		password: z.string(),
	})
	.superRefine((data, ctx) => {
		// Validate first name first
		if (!data.firstName || data.firstName.trim().length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "First name is required",
				path: ["firstName"],
			})
			return
		}
		// Validate email
		if (!data.email || data.email.trim().length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "Email is required",
				path: ["email"],
			})
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			ctx.addIssue({
				code: "custom",
				message: "Please enter a valid email address",
				path: ["email"],
			})
			return
		}

		// Validate password (only if all above are valid)
		if (!data.password || data.password.trim().length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "Password is required",
				path: ["password"],
			})
			return
		}

		if (data.password.length < 8) {
			ctx.addIssue({
				code: "custom",
				message: "Password must be at least 8 characters long",
				path: ["password"],
			})
			return
		}

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
			ctx.addIssue({
				code: "custom",
				message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
				path: ["password"],
			})
		}
	})

export default function Signup2() {
	const [isLoading, setIsLoading] = useState(false)
	const { radius, spacing, size, label, placeholder, icon, button, logoImage } = usePlayground()

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
			email: "",
			password: "",
		},
	})

	const onSubmit = () => {
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			form.reset()
		}, 2000)
	}

	return (
		<div
			style={{
				backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
				backgroundSize: "10px 10px",
			}}
			className="bg-bg-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div className="w-100 bg-bg border-border flex rounded-2xl border px-6 py-8">
				<div className={`flex flex-1 flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
					<div>
						{logoImage ? <ImagePreview file={typeof logoImage === "string" ? { id: "logo", preview: logoImage, file: new File([], "logo") } : logoImage} /> : <PlaygroundLogo />}
					</div>
					<div className={`flex flex-col ${spaceMap.gap2[spacing ?? "default"]}`}>
						<h1 className="heading-5">Sign Up</h1>
						<p className="text-fg-secondary text-sm">
							Already have an account?{" "}
							<Button variant="link" asChild color="primary">
								<Link href="#">Sign in</Link>
							</Button>
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className={`flex flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
								<div className={`flex flex-col ${spaceMap.gap4[spacing ?? "default"]}`}>
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												{label && <FormLabel>First Name</FormLabel>}
												<FormControl>
													<InputWrapper size={sizeMap[size ?? "default"]} className="w-full">
														{icon && <User />}
														<Input placeholder={placeholder ? "Enter first name" : ""} className={`${radiusMap[radius]} w-full`} type="text" {...field} />
													</InputWrapper>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												{label && <FormLabel>Email Address</FormLabel>}
												<FormControl>
													<InputWrapper size={sizeMap[size ?? "default"]} className="w-full">
														{icon && <Mail />}
														<Input placeholder={placeholder ? "Enter your email" : ""} className={`${radiusMap[radius]} w-full`} type="email" {...field} />
													</InputWrapper>
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
												{label && <FormLabel>Password</FormLabel>}
												<FormControl>
													<InputWrapper className={`${radiusMap[radius]} w-full`}>
														{icon && <Lock />}
														<Input
															size={sizeMap[size ?? "default"]}
															className={`peer`}
															{...field}
															placeholder={placeholder ? "Enter your password" : ""}
															id="toggle-visible-password"
															ref={inputRef}
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
								<div className={`flex flex-col ${spaceMap.gap4[spacing ?? "default"]}`}>
									<Button type="submit" disabled={isLoading} size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} w-full ${buttonStyles[button ?? "default"]}`}>
										{isLoading ? <Spinner variant="default" /> : "Create account"}
									</Button>
									<p className="text-fg-secondary text-[13px]">
										By signing up, you agree to Radian&apos;s{" "}
										<Button variant="link" asChild color="primary">
											<Link className="text-[13px]" href="#">
												{" "}
												Terms of Service
											</Link>
										</Button>{" "}
										and{" "}
										<Button variant="link" asChild color="primary">
											<Link className="text-[13px]" href="#">
												{" "}
												Privacy Policy
											</Link>
										</Button>
									</p>
								</div>
							</div>
						</form>
					</Form>
					<div className={`flex flex-1 flex-col ${spaceMap.gap6[spacing ?? "default"]}`}>
						<div className={`flex items-center ${spaceMap.gap2[spacing ?? "default"]}`}>
							<Divider className="flex-1" />
							<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">Or continue with</span>
							<Divider className="flex-1" />
						</div>
						<div className={`flex ${spaceMap.gap3[spacing ?? "default"]}`}>
							<Button size={sizeMap[size ?? "default"]} variant="outline" color="neutral" className={`${radiusMap[radius]} text-fg-secondary w-full`}>
								<GoogleIcon />
								Google
							</Button>
							<Button size={sizeMap[size ?? "default"]} variant="outline" color="neutral" className={`${radiusMap[radius]} text-fg-secondary w-full`}>
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
