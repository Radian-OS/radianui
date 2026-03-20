"use client"

import { useState } from "react"
import { Link2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export default function InviteStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [emails, setEmails] = useState("")

	function handleCopyLink() {
		navigator.clipboard.writeText("https://radian.com/workspace/overview")
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Invite your Team</h2>
					<p className="text-fg-secondary text-sm">
						You can invite others members to design and build things with you.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-6">
					<div className="border-soft bg-fill1 flex items-center gap-3 rounded-[10px] border p-3">
						<div className="border-alpha bg-bg shadow-xs flex size-9 shrink-0 items-center justify-center rounded-lg border">
							<Link2 className="text-fg-secondary size-5" />
						</div>
						<div className="flex flex-1 flex-col gap-0.5">
							<p className="text-fg text-sm font-medium">
								Anyone with the link can view
							</p>
							<p className="text-fg-tertiary text-xs">
								radian.com/workspace/overview
							</p>
						</div>
						<Button
							type="button"
							variant="outline"
							size="32"
							onClick={handleCopyLink}>
							Copy
						</Button>
					</div>

					<div className="flex items-center gap-2">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary text-sm font-medium">Or</span>
						<Divider className="flex-1" />
					</div>

					<div className="flex flex-col gap-1.5">
						<Label>Invite by email</Label>
						<Input
							placeholder="e.g. user1example@gmail.com"
							size="36"
							value={emails}
							onChange={(e) => setEmails(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={onSkip}
						className="flex-1">
						Skip for now
					</Button>
					<Button
						type="button"
						color="primary"
						onClick={onNext}
						className="flex-1">
						Invite
					</Button>
				</div>
			</div>
		</div>
	)
}
