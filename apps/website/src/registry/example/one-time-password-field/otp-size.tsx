import { Label } from "@/registry/ui/label"
import { OTPField, OTPHiddenInput, OTPInput } from "@/registry/ui/one-time-password-field"

export default function OTPFieldSize() {
	return (
		<div className="flex flex-col justify-center gap-3">
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 28</Label>
				<OTPField size="28">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 32</Label>
				<OTPField size="32">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 36</Label>
				<OTPField size="36">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 40</Label>
				<OTPField size="40">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 44</Label>
				<OTPField size="44">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
			<div className="flex flex-col justify-center space-y-1.5">
				<Label htmlFor="one-time-password">Size - 48</Label>
				<OTPField size="48">
					{Array.from({ length: 6 }).map((_, index) => (
						<OTPInput key={index} index={index} />
					))}
					<OTPHiddenInput />
				</OTPField>
			</div>
		</div>
	)
}
