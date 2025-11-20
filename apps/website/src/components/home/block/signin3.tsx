"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"
import PlaygroundLogo from "../playground-logo"
import { ImagePreview } from "../playground/upload"
import { Title } from "./components/title"
import { buttonStyles, radiusMap, sizeMap, spaceMap } from "./signin1"

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

export default function Signin3() {
	const [isLoading, setIsLoading] = useState(false)
	const { radius, spacing, size, label, placeholder, icon, button, logoImage } = usePlayground()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
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
					<div className={`text-fg flex items-center ${spaceMap.gap2[spacing ?? "default"]}`}>
						{logoImage ? <ImagePreview file={typeof logoImage === "string" ? { id: "logo", preview: logoImage, file: new File([], "logo") } : logoImage} /> : <PlaygroundLogo />}
						<Title />
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
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className={`flex flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
								<div className={`flex flex-col ${spaceMap.gap5[spacing ?? "default"]}`}>
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
												<div className="flex items-center justify-between">
													{label && <FormLabel>Password</FormLabel>}
													<Button variant="link" asChild color="primary">
														<Link href="#"> Forgot Password?</Link>
													</Button>
												</div>
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
								<Button type="submit" disabled={isLoading} size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} w-full ${buttonStyles[button ?? "default"]}`}>
									{isLoading ? <Spinner variant="default" /> : "Sign In"}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
