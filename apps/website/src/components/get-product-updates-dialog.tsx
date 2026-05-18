"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	type SubscriptionResult,
	subscribeToNewsletter,
} from "@/lib/newsletter"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/registry/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Spinner } from "@/registry/ui/spinner"

const formSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address."),
})

type FormData = z.infer<typeof formSchema>

export function GetProductUpdatesDialog() {
	const [subscriptionResult, setSubscriptionResult] =
		useState<SubscriptionResult | null>(null)

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "" },
	})

	const router = useRouter()

	useEffect(() => {
		if (subscriptionResult) {
			const timer = setTimeout(() => {
				setSubscriptionResult(null)
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [subscriptionResult])

	const onSubmit = async (data: FormData) => {
		setSubscriptionResult(null)
		try {
			const result = await subscribeToNewsletter(data.email)
			setSubscriptionResult(result)
			if (result.status < 400) {
				form.reset()
				router.push("/")
			}
		} catch {
			setSubscriptionResult({
				message: "Something went wrong. Please try again.",
				status: 500,
			})
		}
	}

	return (
		<Dialog defaultOpen>
			<DialogContent
				closeButton="hidden"
				backdrop="blur"
				className="max-w-85 md:max-w-170 flex w-full flex-col gap-0 overflow-hidden p-0 md:flex-row">
				{/* Left Side - Graphic Background */}
				<div className="relative hidden w-full overflow-hidden md:flex md:w-1/2">
					<Image
						src="/get-product-updates-light.png"
						alt="get-early-updates-light"
						fill
						className="object-cover dark:hidden"
						unoptimized
						priority
					/>
					<Image
						src="/get-product-updates-dark.png"
						alt="get-early-updates-dark"
						fill
						className="hidden object-cover dark:block"
						unoptimized
						priority
					/>
				</div>
				{/* Right Side - Form */}
				<div className="bg-bg flex w-full flex-col justify-center gap-5 px-6 py-8 md:w-1/2">
					{/* Logo and Title Section */}
					<div className="flex flex-col gap-4">
						<Image src="/logo.svg" alt="radian_logo" width={36} height={36} />
						<div className="flex flex-col gap-1">
							<DialogTitle>Get Product Updates</DialogTitle>
							<DialogDescription>
								Subscribe to receive updates on new components, UI blocks, and
								key milestones as we build.
							</DialogDescription>
						</div>

						{/* Form Section */}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col gap-5">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<Label htmlFor="email">Email address</Label>
											<FormControl>
												<Input
													id="email"
													placeholder="johndoe@radian.com"
													type="email"
													{...field}
												/>
											</FormControl>
											<FormMessage
												className={cn({
													"text-success-text":
														subscriptionResult?.status &&
														subscriptionResult?.status >= 200 &&
														subscriptionResult?.status < 400,
												})}>
												{subscriptionResult?.message}
											</FormMessage>
										</FormItem>
									)}
								/>

								<Button
									variant={"smooth"}
									type="submit"
									disabled={form.formState.isSubmitting}
									className="w-full">
									{form.formState.isSubmitting ? (
										<Spinner variant="activity" />
									) : (
										"Get Product Updates"
									)}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
