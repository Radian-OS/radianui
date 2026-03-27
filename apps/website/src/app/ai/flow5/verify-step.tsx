"use client"

import { GmailIcon } from "@/components/home/gmail-icon"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import Verify from "../_components/verify"
import { OutlookIcon } from "../icon/outlook"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="border-soft bg-bg w-full max-w-[400px] rounded-2xl border px-6 py-8">
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
					<Verify onNext={onNext} />

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
