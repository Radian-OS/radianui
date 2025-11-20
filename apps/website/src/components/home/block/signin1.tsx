"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"
import PlaygroundLogo from "../playground-logo"
import { ImagePreview } from "../playground/upload"
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

export const sizeMap: Record<string, "36" | "32" | "40" | "28" | "44" | "48"> = {
	default: "36",
	small: "32",
	large: "40",
}

export const spaceMap = {
	gap8: {
		default: "gap-8",
		compact: "gap-4",
		spacious: "gap-12",
	},
	gap6: {
		default: "gap-6",
		compact: "gap-3",
		spacious: "gap-8",
	},
	gap5: {
		default: "gap-5",
		compact: "gap-2",
		spacious: "gap-7",
	},
	gap4: {
		default: "gap-4",
		compact: "gap-1.5",
		spacious: "gap-6",
	},
	gap3: {
		default: "gap-3",
		compact: "gap-1",
		spacious: "gap-5",
	},
	gap2: {
		default: "gap-2",
		compact: "gap-0.5",
		spacious: "gap-4",
	},
}

export const buttonStyles: Record<string, string> = {
	default: "",
	gradient:
		"active:bg-primary relative w-full overflow-hidden border border-black/10 before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-white/0",
	fancy:
		"from-primary to-primary-hover before:border-white/16 hover:opacity-92 w-full overflow-hidden bg-gradient-to-b before:absolute before:inset-px before:rounded-lg before:border",
}
export default function Signin1() {
	const [isLoading, setIsLoading] = useState(false)
	const { radius, spacing, size, label, placeholder, icon, button, logoImage } = usePlayground()

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
			<div className="w-100 bg-bg flex">
				<div className={`flex flex-1 flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
					<div className={`flex flex-1 flex-col ${spaceMap.gap6[spacing ?? "default"]}`}>
						<div>
							{logoImage ? <ImagePreview file={typeof logoImage === "string" ? { id: "logo", preview: logoImage, file: new File([], "logo") } : logoImage} /> : <PlaygroundLogo />}
						</div>
						<div className={`flex flex-col ${spaceMap.gap2[spacing ?? "default"]}`}>
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
							<div className={`flex flex-col ${spaceMap.gap5[spacing ?? "default"]}`}>
								<div className={`flex flex-col ${spaceMap.gap4[spacing ?? "default"]}`}>
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
													<InputWrapper size={sizeMap[size ?? "default"]}>
														{icon && <Lock />}
														<Input className={`${radiusMap[radius]} w-full`} placeholder={placeholder ? "Enter your password" : ""} type="password" {...field} />
													</InputWrapper>
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
													<Checkbox id="remember-me" checked={field.value} onCheckedChange={field.onChange} />
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
								<Button type="submit" disabled={isLoading} size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} w-full ${buttonStyles[button ?? "default"]}`}>
									{isLoading ? <Spinner variant="default" /> : "Sign In"}
								</Button>
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
