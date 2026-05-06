import { Label } from "@/styles/default/ui/label"
import {
	OTPField,
	OTPHiddenInput,
	OTPInput,
} from "@/styles/default/ui/otp-field"

const PASSWORD_LENGTH = 6

export default function OTPFieldValidationTypeNumeric() {
	return (
		<div className="flex flex-col justify-center gap-3">
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">
					Validation Type - Alphanumeric
				</Label>
				<OTPField id="one-time-password" validationType="alphanumeric">
					{Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
						<OTPInput key={i} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Validation Type - Numeric</Label>
				<OTPField id="one-time-password" validationType="numeric">
					{Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
						<OTPInput key={i} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Validation Type - Alpha</Label>
				<OTPField id="one-time-password" validationType="alpha">
					{Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
						<OTPInput key={i} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
		</div>
	)
}
