"use client"

import { GmailIcon } from "@/components/home/gmail-icon"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OutlookIcon } from "../icon/outlook"
import { Radian } from "../icon/radian"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h5 className="heading-5">Verify your email</h5>
					<p className="text-fg-secondary text-sm">
						We just sent an email to{" "}
						<span className="text-fg font-medium">account@radian.com</span>.
						Click the link in the email to verify your account.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-3">
					<Button
						type="button"
						variant="strong"
						color="primary"
						size="36"
						className="w-full"
						onClick={onNext}>
						Resend email
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="w-full">
						Update email address
					</Button>
				</div>

				<Divider />

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
