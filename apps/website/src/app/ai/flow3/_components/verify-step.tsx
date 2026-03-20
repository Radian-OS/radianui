"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Form } from "@/registry/ui/form"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"

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
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Verify your email</h2>
					<p className="text-fg-secondary text-sm">
						Please enter the 6-digit code we emailed you.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<OTPField className="justify-between" size="48">
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPHiddenInput />
						</OTPField>

						<div className="flex flex-col gap-3">
							<Button type="submit" color="primary" className="w-full">
								Verify Code
							</Button>
							<p className="text-fg-secondary text-center text-[13px]">
								Didn&apos;t receive the code?{" "}
								<button
									type="button"
									className="text-primary font-medium hover:underline">
									Resend code
								</button>
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
