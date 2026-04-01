"use client"

import Link from "next/link"
import { GmailIcon } from "@/components/home/gmail-icon"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { OutlookIcon } from "../icon/outlook"
import { Radian } from "../icon/radian"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Verify your email</h1>
					<p className="text-fg-secondary text-sm">
						We just sent an email to{" "}
						<span className="text-fg font-medium">account@radian.com</span>.
						Click the link in the email to verify your account.
					</p>
				</div>
			</div>

			{/* Actions */}
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

				{/* Email Client Buttons */}
				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1"
						asChild>
						<Link href="https://mail.google.com" className="hover:underline">
							<GmailIcon />
							Open Gmail
						</Link>
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1"
						asChild>
						<Link href="https://outlook.live.com" className="hover:underline">
							<OutlookIcon />
							Open Outlook
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
