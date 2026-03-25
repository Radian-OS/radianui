"use client"

import { useState } from "react"
import Link from "next/link"
import { GmailIcon } from "@/components/home/gmail-icon"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { OutlookIcon } from "../icon/outlook"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	const [code, setCode] = useState("")
	const [error, setError] = useState("")

	function handleVerify() {
		if (code.replace(/\s|-/g, "").length < 6) {
			setError("Please enter the full 6-digit code")
			return
		}
		setError("")
		onNext()
	}

	return (
		<div className="border-soft bg-bg w-full max-w-[400px] rounded-2xl border p-6 md:p-8">
			<div className="flex flex-col gap-8">
				{/* Header */}
				<div className="flex flex-col gap-2 text-center">
					<h1 className="heading-5">Verify your email</h1>
					<p className="text-fg-secondary text-sm">
						Please enter the 6-digit code we emailed you.
					</p>
				</div>

				{/* Code Input + Actions */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-1.5">
							<label className="text-fg text-sm font-medium">
								Verification Code
							</label>
							<Input
								type="text"
								placeholder="000 - 000"
								value={code}
								onChange={(e) => {
									setCode(e.target.value)
									setError("")
								}}
							/>
							{error && <p className="text-error-text text-xs">{error}</p>}
						</div>

						<div className="flex flex-col gap-4">
							<Button
								type="button"
								variant="strong"
								color="primary"
								size="36"
								className="w-full"
								onClick={handleVerify}>
								Verify code
							</Button>
							<p className="text-fg-secondary text-center text-[13px]">
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
		</div>
	)
}
