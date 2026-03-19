"use client"

import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

export function VerifyStep({ onNext }: { onNext: () => void }) {
	return (
		<AuthLayout>
			<div className="flex w-full max-w-[360px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h2 className="heading-5">Verify your email</h2>
						<p className="text-fg-secondary text-sm tracking-[-0.14px]">
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
							<Button onClick={onNext} className="w-full">
								Verify Code
							</Button>
							<p className="text-fg-secondary text-center text-sm tracking-[-0.14px]">
								Didn&apos;t receive the code?{" "}
								<Link href="#" className="text-primary font-medium">
									Resend code
								</Link>
							</p>
						</div>
					</div>

					<Divider />

					<div className="flex gap-3">
						<Button variant="outline" className="flex-1">
							<Mail className="size-5" />
							Open Gmail
						</Button>
						<Button variant="outline" className="flex-1">
							<Mail className="size-5" />
							Open Outlook
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}
