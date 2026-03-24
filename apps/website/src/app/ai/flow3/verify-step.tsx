"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	const formRef = useRef<HTMLFormElement>(null)

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
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
					className="rounded-lg"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Verify your email</h1>
					<p className="text-fg-secondary text-sm">
						Please enter the 6-digit code we emailed you.
					</p>
				</div>
			</div>

			{/* OTP Form */}
			<div className="flex flex-col gap-6">
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="flex flex-col gap-5">
					<OTPField size="48" className="flex justify-between">
						{Array.from({ length: 6 }).map((_, i) => (
							<OTPInput key={i} />
						))}
						<OTPHiddenInput />
					</OTPField>

					<div className="flex flex-col gap-3">
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="36"
							className="w-full">
							Verify Code
						</Button>
						<p className="text-fg-secondary text-center text-sm">
							Didn&apos;t receive the code?{" "}
							<Link
								href="#"
								className="text-primary font-medium hover:underline">
								Resend code
							</Link>
						</p>
					</div>
				</form>

				{/* Divider */}
				<Divider />

				{/* Email Client Buttons */}
				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
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
						size="36"
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
