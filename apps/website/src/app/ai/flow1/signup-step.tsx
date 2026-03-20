"use client"

import { useState } from "react"
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
import { Input } from "@/registry/ui/input"

type SignupFormValues = {
	email: string
	password: string
}

export default function SignupStep({ onNext }: { onNext: () => void }) {
	const [showPassword] = useState(false)
	const form = useForm<SignupFormValues>({
		defaultValues: { email: "", password: "" },
	})

	const onSubmit = () => {
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
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Sign up with email</h1>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Link href="#" className="text-primary font-medium">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			{/* Form */}
			<div className="flex flex-col gap-6">
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
											<Input
												type={showPassword ? "text" : "password"}
												placeholder=""
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button
							type="submit"
							variant="strong"
							color="primary"
							className="w-full">
							Create an account
						</Button>
					</form>
				</Form>

				{/* Divider */}
				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">
						Or continue with
					</span>
					<Divider className="flex-1" />
				</div>

				{/* Social Buttons */}
				<div className="flex gap-3">
					<Button
						variant="outline"
						color="neutral"
						className="flex-1"
						type="button">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=google.com"
							alt="Google"
							width={20}
							height={20}
						/>
						Google
					</Button>
					<Button
						variant="outline"
						color="neutral"
						className="flex-1"
						type="button">
						<Image
							src="https://authjs.dev/img/providers/github.svg"
							alt="Github"
							width={20}
							height={20}
							className="dark:invert"
						/>
						Github
					</Button>
				</div>
			</div>
		</div>
	)
}
