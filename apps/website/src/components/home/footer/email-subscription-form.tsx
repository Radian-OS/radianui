"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"

const formSchema = z.object({
	email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
})

type FormData = z.infer<typeof formSchema>

type EmailSubscriptionProps = {
	subscribe: (email: string) => Promise<{ message: string; status: number }>
}

export default function EmailSubscription({ subscribe }: EmailSubscriptionProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "" },
	})

	const [subscriptionResult, setSubscriptionResult] = useState<{ message: string; status: number } | null>(null)

	// Keep the subscription result for 5 seconds
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
			const result = await subscribe(data.email)
			setSubscriptionResult(result)
			if (result.status < 400) {
				form.reset()
			}
		} catch (error) {
			console.error("Failed to subscribe email:", error)
			setSubscriptionResult({ message: "Something went wrong. Please try again.", status: 500 })
		}
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<Divider className="via-border bg-gradient-to-r from-transparent to-transparent" />
			<div className="max-w-360 lg:px-30 flex w-full flex-col justify-between gap-8 px-5 py-8 md:flex-row md:py-10">
				<div className="flex max-w-[396px] flex-col gap-2">
					<h5 className="heading-5">Love Building Products?</h5>
					<p className="text-fg-secondary text-sm font-normal">We’re adding tons of cool components and blocks to help you build. Subscribe to get updates on development</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex gap-3">
							<FormField
								control={form.control}
								name="email"
								render={({ field }: { field: FieldValues }) => (
									<FormItem className="w-70">
										<FormControl>
											<Input placeholder="Enter your email" type="email" {...field} required />
										</FormControl>
										<FormMessage className={cn({ "text-success-text": subscriptionResult?.status === 201 })}>{subscriptionResult?.message}</FormMessage>
									</FormItem>
								)}
							/>
							<Button className="w-23" type="submit" disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting ? <Spinner variant="activity" /> : "Subscribe"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
