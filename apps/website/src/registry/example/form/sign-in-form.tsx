"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheckBig, EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"

const FormSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	keepSignedIn: z.boolean(),
})

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
			keepSignedIn: false,
		},
	})

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data)
		toast.custom(() => (
			<Alert variant="soft" color="primary">
				<AlertIcon>
					<CircleCheckBig />
				</AlertIcon>
				<AlertTitle>Signed in successfully!</AlertTitle>
			</Alert>
		))
	}

	return (
		<div className="w-100">
			<div className="mx-auto flex flex-col gap-9">
				<Link href="/" style={{ fill: "white", color: "white" }}>
					<img
						src="/radian.svg"
						className="dark:hidden"
						alt="radian-logo"
						width={112}
						height={36}
					/>
					<img
						src="/radian-dark.svg"
						alt="radian-logo"
						className="hidden dark:block"
						width={112}
						height={36}
					/>
				</Link>

				<div className="space-y-6">
					<div className="space-y-2"></div>
					<h1 className="text-2xl font-semibold">Sign in</h1>
					<p className="text-fg-secondary text-sm font-medium">
						Don&apos;t have an account yet?{" "}
						<Link href={"/docs/components/form#sign-in-form"}>
							<span className="text-primary-text">Sign up</span>
						</Link>
					</p>
				</div>

				<div className="space-y-5">
					<Form {...form}>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }: { field: FieldValues }) => (
									<FormItem>
										<FormLabel htmlFor="sign-in-email">Email</FormLabel>
										<FormControl>
											<Input
												id="sign-in-email"
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
								render={({ field }: { field: FieldValues }) => (
									<FormItem>
										<FormLabel htmlFor="sign-in-password">Password</FormLabel>
										<FormControl>
											<InputWrapper>
												<Input
													id="sign-in-password"
													placeholder="Enter your password"
													type={showPassword ? "text" : "password"}
													{...field}
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
							<FormField
								control={form.control}
								name="keepSignedIn"
								render={({ field }: { field: FieldValues }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Keep me signed in</FormLabel>
										</div>
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
								onClick={form.handleSubmit(onSubmit)}>
								Sign In
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
