"use client"

import Preference from "../_components/preference"
import { Radian } from "../icon/radian"

export default function UseCaseStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Radian />

				<div className="flex flex-col gap-2">
					<h5 className="heading-5">How would you like to use Radian?</h5>
					<p className="text-fg-secondary text-sm">
						Select the option that best fits your needs.
					</p>
				</div>
			</div>

			<Preference onNext={onNext} />
		</div>
	)
}
