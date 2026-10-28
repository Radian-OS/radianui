import { Label } from "@/registry/ui/label"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/otp-field"

export default function OTPFieldSize() {
	return (
		<div className="flex flex-col justify-center gap-3">
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - xs</Label>
				<OTPField size="xs">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - sm</Label>
				<OTPField size="sm">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - md</Label>
				<OTPField size="md">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - lg</Label>
				<OTPField size="lg">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - xl</Label>
				<OTPField size="xl">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 2xl</Label>
				<OTPField size="2xl">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
		</div>
	)
}
