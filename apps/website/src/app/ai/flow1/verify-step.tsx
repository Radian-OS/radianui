"use client"

import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Verify your email</h1>
					<p className="text-fg-secondary text-sm">
						Please enter the 6-digit code we emailed you.
					</p>
				</div>
			</div>

			{/* OTP + Actions */}
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-5">
					{/* OTP Input */}
					<OTPField size="48" className="flex justify-between">
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPHiddenInput />
					</OTPField>

					{/* Verify + Resend */}
					<div className="flex flex-col gap-3">
						<Button
							variant="strong"
							color="primary"
							className="w-full"
							type="button"
							onClick={onNext}>
							Verify Code
						</Button>
						<p className="text-fg-tertiary text-center text-sm">
							Didn&apos;t receive the code?{" "}
							<button type="button" className="text-primary font-medium">
								Resend code
							</button>
						</p>
					</div>
				</div>

				{/* Divider */}
				<Divider />

				{/* Email Provider Buttons */}
				<div className="flex gap-3">
					<Button
						variant="outline"
						color="neutral"
						className="flex-1"
						type="button">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=gmail.com"
							alt="Gmail"
							width={20}
							height={20}
						/>
						Open Gmail
					</Button>
					<Button
						variant="outline"
						color="neutral"
						className="flex-1"
						type="button">
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
