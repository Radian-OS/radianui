"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"

const formSchema = z.object({
	email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
})

type FormData = z.infer<typeof formSchema>

type EmailSubscribeProps = {
	subscribe: (email: string) => Promise<{ message: string; status: number }>
}

export const EmailSubscribe = ({ subscribe }: EmailSubscribeProps) => {
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
		<div className="z-30 flex flex-col gap-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row">
					<FormField
						control={form.control}
						name="email"
						render={({ field }: { field: FieldValues }) => (
							<FormItem className="w-full sm:flex-1">
								<FormControl>
									<Input size="40" placeholder="Enter your email" type="email" {...field} required />
								</FormControl>
								<FormMessage className={cn({ "text-success-text": subscriptionResult?.status === 201 })}>{subscriptionResult?.message}</FormMessage>
							</FormItem>
						)}
					/>
					<Button
						size="40"
						type="submit"
						disabled={form.formState.isSubmitting}
						className="border-primary-hover sm:w-23 w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0] sm:shrink-0">
						{form.formState.isSubmitting ? <Spinner size={40} variant="activity" /> : "Subscribe"}
					</Button>
				</form>
			</Form>
		</div>
	)
}
