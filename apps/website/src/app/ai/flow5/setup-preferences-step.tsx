"use client"

import Preference from "../_components/preference"

export default function SetupPreferencesStep({
	onNext,
}: {
	onNext: () => void
}) {
	return (
		<div className="border-soft bg-bg w-full max-w-[480px] rounded-2xl border px-6 py-8">
			<div className="flex flex-col gap-8">
				{/* Header */}
				<div className="flex flex-col gap-2 text-center">
					<h1 className="heading-5">Setup Preferences</h1>
					<p className="text-fg-secondary text-sm">
						Select options that match your workflow.
					</p>
				</div>

				{/* Options + Continue */}
				<Preference onNext={onNext} />
			</div>
		</div>
	)
}
