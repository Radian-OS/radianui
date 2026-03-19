"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Label } from "@/registry/ui/label"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

interface VerifyStepProps {
	onNext: () => void
}

export function VerifyStep({ onNext }: VerifyStepProps) {
	return (
		<AuthLayout>
			<div className="flex w-full max-w-[360px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Verify your email</h1>
						<p className="text-fg-secondary text-sm">
							Please enter the 6-digit code we emailed you.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-1.5">
						<Label className="text-[13px]">Verification Code</Label>
						<OTPField size="36" className="flex w-full gap-1.5">
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPHiddenInput />
						</OTPField>
					</div>
					<div className="flex flex-col gap-3">
						<Button
							variant="strong"
							color="primary"
							size="36"
							className="w-full"
							onClick={onNext}>
							Verify Code
						</Button>
						<p className="text-fg-secondary text-center text-[13px]">
							Didn&apos;t receive the code?{" "}
							<Link href="#" className="text-primary font-medium">
								Resend code
							</Link>
						</p>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}
