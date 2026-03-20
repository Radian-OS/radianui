"use client"

import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import AuthHeader from "./auth-header"

export default function VerifyStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			<AuthHeader title="Verify your email">
				<p className="text-fg-secondary text-sm">
					We just sent an email to{" "}
					<span className="text-fg font-medium">account@radian.com</span>. Click
					the link in the email to verify your account.
				</p>
			</AuthHeader>

			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-3">
					<Button
						type="button"
						color="primary"
						className="w-full"
						onClick={onNext}>
						Resend email
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
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
