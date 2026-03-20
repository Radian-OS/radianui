"use client"

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
		<div className="border-soft bg-bg w-full max-w-[400px] rounded-2xl border px-6 py-8">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="heading-5">Verify your email</h2>
				<p className="text-fg-secondary text-sm">
					Please enter the 6-digit code we emailed you.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Verification Code</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="000 - 000"
											size="36"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-4">
							<Button type="submit" color="primary" className="w-full">
								Verify code
							</Button>
							<p className="text-fg-secondary text-center text-[13px]">
								Didn&apos;t receive the code?{" "}
								<Link href="#" className="text-primary font-medium">
									Resend code
								</Link>
							</p>
						</div>
					</form>
				</Form>

				<Divider />

				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						className="flex-1">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=gmail.com"
							alt="Gmail"
							width={20}
							height={20}
						/>
						Open Gmail
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						className="flex-1">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=outlook.com"
							alt="Outlook"
							width={20}
							height={20}
						/>
						Open Outlook
					</Button>
				</div>
			</div>
		</div>
	)
}
