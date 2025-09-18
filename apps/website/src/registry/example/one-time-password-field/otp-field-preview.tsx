import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"

const PASSWORD_LENGTH = 6

export default function OTPFieldPreview() {
	return (
		<div className="flex flex-col gap-2">
			<OTPField autoFocus id="one-time-password">
				{Array.from({ length: PASSWORD_LENGTH }).map((_, i) => (
					<OTPInput key={i} />
				))}
				<OTPHiddenInput />
			</OTPField>
		</div>
	)
}
