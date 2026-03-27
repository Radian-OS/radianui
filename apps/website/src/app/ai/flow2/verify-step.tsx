"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { Radian } from "../icon/radian"

const verifySchema = z.object({
	code: z
		.string()
		.min(1, "Verification code is required")
		.regex(/^\d{3}\s?-?\s?\d{3}$|^\d{6}$/, "Please enter a valid 6-digit code"),
})

type VerifyFormValues = z.infer<typeof verifySchema>

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	const form = useForm<VerifyFormValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: { code: "" },
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />

				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Verify your email</h1>
					<p className="text-fg-secondary text-sm">
						Please enter the 6-digit code we emailed you.
					</p>
				</div>
			</div>

			{/* Verification Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verification Code</FormLabel>
								<FormControl>
									<Input placeholder="000 - 000" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col gap-3">
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="36"
							className="w-full">
							Verify Code
						</Button>
						<p className="text-fg-secondary text-center text-[13px]">
							Didn&apos;t receive the code?{" "}
							<Link
								href="#"
								className="text-primary font-medium hover:underline">
								Resend code
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	)
}
