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
				<h1 className="heading-5">Invite your Team</h1>
				<p className="text-fg-secondary text-sm">
					Add team members you&apos;d like to include in this project.
				</p>
			</div>

			{/* Form */}
			<Invite onNext={onNext} onSkip={onSkip} text="Add more" />
		</div>
	)
}
