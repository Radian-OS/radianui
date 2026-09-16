"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheckBig, EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
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

interface FormData {
	name: string
	email: string
	password: string
}

const FormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters long"),
	email: z.email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number"
		),
})

export default function SignUp() {
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
			name: "",
			email: "",
			password: "",
		},
	})

	const onSubmit = (data: FormData) => {
		console.log(data)
		toast.custom(() => (
			<Alert variant="soft" color="primary">
				<AlertIcon>
					<CircleCheckBig />
				</AlertIcon>
				<AlertTitle>Account created successfully!</AlertTitle>
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
					<div className="space-y-2">
						<h1 className="flex justify-between text-2xl font-semibold">
							Sign up
						</h1>
						<div className="flex justify-between">
							<p className="text-fg-secondary text-sm font-medium">
								Already have an account?{" "}
								<Link href={"/docs/components/form#sign-up-form"}>
									<span className="text-primary-text">Sign in</span>
								</Link>
							</p>
						</div>
					</div>
					<div className="space-y-5">
						<Form {...form}>
							<form
								className="space-y-4"
								onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="name"
									render={({ field }: { field: FieldValues }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input placeholder="Enter your full name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }: { field: FieldValues }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
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
									render={({ field }: { field: FieldValues }) => (
										<FormItem>
											<FormLabel htmlFor="sign-up-password">Password</FormLabel>
											<FormControl>
												<InputWrapper>
													<Input
														id="sign-up-password"
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
								<Button type="submit" className="w-full">
									Sign Up
								</Button>
							</form>
						</Form>
						<div className="text-[0.875rem] leading-[1.3125rem] font-normal">
							<p className="text-fg-secondary">
								By signing up, you agree to Radian&apos;s{" "}
								<span className="text-fg">Terms of Service</span> and{" "}
								<span className="text-fg">Privacy Policy</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
