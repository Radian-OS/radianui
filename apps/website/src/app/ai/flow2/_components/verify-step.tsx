"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import AuthHeader from "./auth-header"

type VerifyFormValues = {
	code: string
}

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	const form = useForm<VerifyFormValues>({
		defaultValues: { code: "" },
	})

	function onSubmit(data: VerifyFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			<AuthHeader title="Verify your email">
				<p className="text-fg-secondary text-sm">
					Please enter the 6-digit code we emailed you.
				</p>
			</AuthHeader>

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
									<Input placeholder="000 - 000" size="36" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex flex-col gap-3">
						<Button type="submit" color="primary" className="w-full">
							Verify Code
						</Button>
						<p className="text-fg-secondary text-center text-[13px] leading-5">
							Didn&apos;t receive the code?{" "}
							<Link href="#" className="text-primary font-medium">
								Resend code
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	)
}
