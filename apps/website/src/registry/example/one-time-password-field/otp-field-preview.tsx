import { Label } from "@/registry/ui/label"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"

const PASSWORD_LENGTH = 6

export default function OTPFieldPreview() {
	return (
		<div className="flex flex-col justify-center space-y-1.5">
			<Label htmlFor="one-time-password">One Time Password</Label>
			<OTPField autoFocus id="one-time-password">
				{Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
					<OTPInput key={i} />
				))}
				<OTPHiddenInput />
			</OTPField>
		</div>
	)
}
