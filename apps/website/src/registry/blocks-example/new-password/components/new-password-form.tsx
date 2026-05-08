"use client"

import React, { useMemo, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { IconSlot } from "@/registry/icon-library"
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
import { Progress } from "@/registry/ui/progress"
import Logo from "./brand-logo"

const FormSchema = z
	.object({
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/\d/, "Password must contain at least one number"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	})

const passwordSchema = z
	.string()
	.min(8, { message: "At least 8 characters" })
	.regex(/\d/, { message: "At least one number" })
	.regex(/[a-z]/, { message: "At least one lowercase letter" })
	.regex(/[A-Z]/, { message: "At least one uppercase letter" })

export default function NewPasswordForm() {
	const [isLoading, setIsLoading] = useState(false)

	const [showPassword, setShowPassword] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? "eyeoff" : "eye"

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	})

	const password = form.watch("password")

	const validation = useMemo(
		() => passwordSchema.safeParse(password),
		[password]
	)

	const errors = useMemo(() => {
		if (validation.success) return []
		return validation.error.issues.map((e) => e.message)
	}, [validation])

	const progress = useMemo(() => {
		const totalChecks = 4
		const passedChecks = totalChecks - errors.length
		return (passedChecks / totalChecks) * 100
	}, [errors])

	const isValid = (message: string) => !errors.includes(message)

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data)
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			form.reset()
		}, 2000)
	}

	return (
		<div className="max-w-90 flex w-full flex-col">
			<div className="pb-6">
				<Logo />
			</div>
			<div className="flex flex-col gap-2 pb-8">
				<span className="heading-5 font-semibold">Create a new password</span>
				<span className="text-fg-secondary text-sm">
					Enter a new password to change your password.
				</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="password" className="font-medium">
										Password
									</FormLabel>
									<FormControl>
										<InputWrapper>
											<Input
												{...field}
												id="password"
												ref={inputRef}
												className="peer"
												type={showPassword ? "text" : "password"}
											/>
											<IconSlot
												slot={IconComponent}
												className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
												onMouseDown={togglePasswordVisibility}
											/>
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
									<FormLabel
										htmlFor="re-enter-password"
										className="font-medium">
										Re-enter new password
									</FormLabel>
									<div className="flex flex-col gap-4">
										<FormControl>
											<InputWrapper>
												<Input
													{...field}
													id="re-enter-password"
													ref={inputRef}
													className="peer"
													type={showPassword ? "text" : "password"}
												/>
												<IconSlot
													slot={IconComponent}
													className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
													onMouseDown={togglePasswordVisibility}
												/>
											</InputWrapper>
										</FormControl>
										<div className="body-13 flex w-full flex-col gap-2">
											<Progress value={progress} />
											<p className="text-sm font-semibold">
												Your Password must contain
											</p>
											{[
												"At least 8 characters",
												"At least one number",
												"At least one lowercase letter",
												"At least one uppercase letter",
											].map((label) => (
												<p
													key={label}
													className="text-fg-tertiary flex items-center gap-2">
													<IconSlot
														slot="check"
														className={`size-4 ${isValid(label) ? "text-success-text" : ""}`}
													/>
													{label}
												</p>
											))}
										</div>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="py-1">
							<Button
								className="w-full"
								type="submit"
								loading={isLoading}
								disabled={isLoading}>
								{isLoading ? "Changing Password" : "Change password"}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
