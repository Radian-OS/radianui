"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	const [otp, setOtp] = useState("")

	function handleVerify() {
		console.log("OTP:", otp)
		onNext()
	}

	return (
		<div className="w-full max-w-[360px]">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Verify your email</h2>
				<p className="text-fg-secondary text-sm">
					Please enter the 6-digit code we emailed you.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-6">
				<div className="flex flex-col gap-6">
					<OTPField
						value={otp}
						onValueChange={setOtp}
						size="48"
						className="justify-between">
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPInput />
						<OTPHiddenInput />
					</OTPField>

					<div className="flex flex-col gap-4">
						<Button
							type="button"
							color="primary"
							className="w-full"
							onClick={handleVerify}>
							Verify code
						</Button>
						<p className="text-fg-secondary text-center text-sm">
							Didn&apos;t receive the code?{" "}
							<Link href="#" className="text-primary font-medium">
								Resend code
							</Link>
						</p>
					</div>
				</div>

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
