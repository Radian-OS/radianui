"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"
import AuthHeader from "./auth-header"

type SignupFormValues = {
	email: string
	password: string
}

export default function SignupStep({ onNext }: { onNext: () => void }) {
	const [showPassword, setShowPassword] = useState(false)
	const form = useForm<SignupFormValues>({
		defaultValues: { email: "", password: "" },
	})

	function onSubmit(data: SignupFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			<AuthHeader title="Sign up with email">
				<p className="text-fg-secondary text-sm">
					Already have an account?{" "}
					<Link href="#" className="text-primary font-medium">
						Sign in
					</Link>
				</p>
			</AuthHeader>

			<div className="flex flex-col gap-6">
				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						className="flex-1">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=google.com"
							alt="Google"
							width={20}
							height={20}
						/>
						Google
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						className="flex-1">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=github.com"
							alt="Github"
							width={20}
							height={20}
						/>
						Github
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary text-sm font-medium">Or</span>
					<Divider className="flex-1" />
				</div>

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
										<FormLabel>Email address</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email"
												size="36"
												{...field}
											/>
										</FormControl>
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
											<InputWrapper size="36">
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Enter your password"
													{...field}
												/>
												<button
													type="button"
													onClick={() => setShowPassword(!showPassword)}
													className="text-fg-tertiary hover:text-fg transition-colors">
													{showPassword ? (
														<EyeOff className="size-5" />
													) : (
														<Eye className="size-5" />
													)}
												</button>
											</InputWrapper>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<Button type="submit" color="primary" className="w-full">
								Create account
							</Button>
							<p className="text-fg-secondary text-[13px] leading-5">
								By signing up, you agree to Radian&apos;s{" "}
								<Link href="#" className="text-primary font-medium">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link href="#" className="text-primary font-medium">
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
