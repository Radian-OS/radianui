import React from "react"
import { Label } from "@/registry/ui/label"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"

export default function OTPFieldDisabled() {
	return (
		<div className="flex flex-col justify-center space-y-2">
			<Label htmlFor="one-time-password">One Time Password</Label>
			<OTPField size="44" placeholder="000000" disabled>
				{Array.from({ length: 6 }).map((_, index) => (
					<OTPInput key={index} index={index} />
				))}
				<OTPHiddenInput />
			</OTPField>
		</div>
	)
}
