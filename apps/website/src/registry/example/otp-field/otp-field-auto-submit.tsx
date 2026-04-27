"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/styles/default/ui/form"
import {
	OTPField,
	OTPHiddenInput,
	OTPInput,
} from "@/styles/default/ui/otp-field"

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your OTP must be 6 characters.",
	}),
})

export default function OTPFieldAutoSubmit() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { pin: "" },
	})

	function onSubmit(values: z.infer<typeof FormSchema>) {
		toast("You submitted the following values", {
			description: JSON.stringify(values, null, 2),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="pin"
					render={({ field }) => (
						<FormItem>
							<FormLabel>One-Time Password</FormLabel>
							<FormControl>
								<OTPField
									value={field.value}
									placeholder="000000"
									onValueChange={field.onChange}
									autoSubmit>
									{Array.from({ length: 6 }).map((_, index) => (
										<OTPInput key={index} index={index} />
									))}
									<OTPHiddenInput />
								</OTPField>
							</FormControl>
							<FormDescription>
								Please enter the OTP sent to your phone.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
