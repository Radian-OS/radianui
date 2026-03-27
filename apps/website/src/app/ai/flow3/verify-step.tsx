"use client"

import { useState } from "react"
import Link from "next/link"
import { GmailIcon } from "@/components/home/gmail-icon"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"
import { OutlookIcon } from "../icon/outlook"
import { Radian } from "../icon/radian"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	const [otp, setOtp] = useState("")
	const [error, setError] = useState("")

	function handleVerify() {
		if (otp.length < 6) {
			setError("Please enter the full 6-digit code")
			return
		}
		setError("")
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

			{/* OTP Form */}
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-1.5">
						<OTPField
							value={otp}
							onValueChange={setOtp}
							className="justify-between">
							{Array.from({ length: 6 }).map((_, i) => (
								<OTPInput className="size-13" key={i} index={i} />
							))}
							<OTPHiddenInput />
						</OTPField>

						{error && <p className="text-error-text text-xs">{error}</p>}
					</div>

					<div className="flex flex-col gap-3">
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="36"
							className="w-full"
							onClick={handleVerify}>
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
				</div>

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
						<GmailIcon />
						Open Gmail
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1">
						<OutlookIcon />
						Open Outlook
					</Button>
				</div>
			</div>
		</div>
	)
}
