"use client"

import Invite from "../_components/invite"

export default function InviteStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-5">Start with your team</h1>
				<p className="text-fg-secondary text-sm">
					You can invite others members to design and build things with you.
				</p>
			</div>

			<Invite onNext={onNext} onSkip={onSkip} text="Add more" />
		</div>
	)
}
