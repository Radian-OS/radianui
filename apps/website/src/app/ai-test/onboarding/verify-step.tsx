"use client"

import { Mail, Monitor } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"
import RadianLogo from "./radian-logo"
import SupportFooter from "./support-footer"

type VerifyStepProps = {
	onNext: () => void
}

export default function VerifyStep({ onNext }: VerifyStepProps) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
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

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						<OTPField size="48" className="justify-between">
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPInput />
							<OTPHiddenInput />
						</OTPField>

						<div className="flex flex-col gap-3">
							<Button
								variant="strong"
								color="primary"
								className="w-full"
								onClick={onNext}>
								Verify Code
							</Button>
							<p className="text-fg-tertiary text-center text-sm">
								Didn&apos;t receive the code?{" "}
								<Link href="#" className="text-primary-text font-medium">
									Resend code
								</Link>
							</p>
						</div>
					</div>

					<Divider />

					<div className="flex gap-3">
						<Button variant="outline" color="neutral" className="flex-1">
							<Mail className="size-5" />
							Open Gmail
						</Button>
						<Button variant="outline" color="neutral" className="flex-1">
							<Monitor className="size-5" />
							Open Outlook
						</Button>
					</div>
				</div>
			</div>

			<div className="absolute bottom-10">
				<SupportFooter />
			</div>
		</div>
	)
}
