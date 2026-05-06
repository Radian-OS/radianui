import React from "react"
import { Label } from "@/styles/default/ui/label"
import {
	OTPField,
	OTPHiddenInput,
	OTPInput,
} from "@/styles/default/ui/otp-field"

export default function OTPFieldDisabled() {
	return (
		<div className="flex flex-col justify-center space-y-1.5">
			<Label
				htmlFor="one-time-password"
				className="text-fg-disabled cursor-not-allowed">
				One Time Password
			</Label>
			<OTPField size="44" placeholder="000000" disabled>
				{Array.from({ length: 6 }).map((_, index) => (
					<OTPInput key={index} index={index} />
				))}
				<OTPHiddenInput />
			</OTPField>
		</div>
	)
}
