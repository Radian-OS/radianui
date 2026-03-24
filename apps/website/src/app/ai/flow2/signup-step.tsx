"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
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
import { Input } from "@/registry/ui/input"

const signupSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupStep({ onNext }: { onNext: () => void }) {
	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: { email: "", password: "" },
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-lg"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Sign up with email</h1>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Link href="#" className="text-primary font-medium hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			{/* Form */}
			<div className="flex flex-col gap-6">
				{/* Google Button */}
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="w-full">
					<Image
						src="https://www.google.com/s2/favicons?sz=32&domain=google.com"
						alt="Google"
						width={20}
						height={20}
					/>
					Continue with Google
				</Button>

				{/* Divider */}
				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">
						Or
					</span>
					<Divider className="flex-1" />
				</div>

				{/* Email & Password Form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input type="email" placeholder="" {...field} />
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
											<Input type="password" placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								variant="strong"
								color="primary"
								size="36"
								className="w-full">
								Create account
							</Button>
							<p className="text-fg-secondary text-[13px]">
								By signing up, you agree to Radian&apos;s{" "}
								<Link
									href="#"
									className="text-primary font-medium hover:underline">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="#"
									className="text-primary font-medium hover:underline">
									Privacy Policy
								</Link>
							</p>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
