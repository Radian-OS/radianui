"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"
import { showToast } from "@/registry/ui/toast"

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
})

export default function OTPFieldAutoSubmit() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { pin: "" },
	})

	function onSubmit(values: z.infer<typeof FormSchema>) {
		showToast({
			title: "You submitted the following values",
			description: JSON.stringify(values, null, 2),
			closable: false,
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
				<FormField
					control={form.control}
					name="pin"
					render={({ field }) => (
						<FormItem>
							<FormLabel>One-Time Password</FormLabel>
							<FormControl>
								<OTPField value={field.value} placeholder="000000" onValueChange={field.onChange} autoSubmit>
									{Array.from({ length: 6 }).map((_, index) => (
										<OTPInput key={index} index={index} />
									))}
									<OTPHiddenInput />
								</OTPField>
							</FormControl>
							<FormDescription>Please enter the one-time password sent to your phone.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
