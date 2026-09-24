"use client"

import React, { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
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

const FormSchema = z
	.object({
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	})

export default function NewPasswordForm() {
	const [isLoading, setIsLoading] = useState(false)

	const [showPassword, setShowPassword] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? <Eye /> : <EyeOff />

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
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
		<div className="bg-bg border-border flex w-100 rounded-2xl border px-6 py-8">
			<div className="flex flex-1 flex-col gap-8">
				<div className="flex flex-1 flex-col gap-6">
					<div>
						<Logo />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Change Your Password</h1>
						<p className="text-fg-secondary text-sm">
							Enter a new password below to change your password.
						</p>
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>New password</FormLabel>
											<FormControl>
												<InputWrapper>
													<Input
														{...field}
														id="toggle-visible-password"
														ref={inputRef}
														className="peer"
														type={showPassword ? "text" : "password"}
													/>
													{React.cloneElement(IconComponent, {
														className:
															"hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none",
														onMouseDown: togglePasswordVisibility,
													})}
												</InputWrapper>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Re-enter new password</FormLabel>
											<FormControl>
												<InputWrapper>
													<Input
														{...field}
														id="toggle-visible-password"
														ref={inputRef}
														className="peer"
														type={showPassword ? "text" : "password"}
													/>
													{React.cloneElement(IconComponent, {
														className:
															"hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none",
														onMouseDown: togglePasswordVisibility,
													})}
												</InputWrapper>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button className="w-full" type="submit" disabled={isLoading}>
								{isLoading ? <Spinner variant="default" /> : "Reset password"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
