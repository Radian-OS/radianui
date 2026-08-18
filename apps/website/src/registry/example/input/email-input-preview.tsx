import { Mail } from "lucide-react"
import {
	Input,
	InputAddon,
	InputGroup,
	InputWrapper,
} from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const EmailPreview = () => {
	return (
		<div className="flex w-80 flex-col gap-6">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="email-input">Email Input</Label>
				<Input
					id="email-input"
					className="w-full"
					type="email"
					placeholder="info@radianui.com"
				/>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="email-with-icon">Email w/icon</Label>
				<InputWrapper className="w-full">
					<Mail />
					<Input
						id="email-with-icon"
						type="email"
						placeholder="info@radianui.com"
					/>
				</InputWrapper>
			</div>

			<div className="flex w-full flex-col gap-1.5">
				<Label htmlFor="email-icon-inside">Email w/icon inside the input</Label>
				<InputGroup className="w-full">
					<InputAddon mode="icon">
						<Mail />
					</InputAddon>
					<Input
						id="email-icon-inside"
						type="email"
						placeholder="info@radianui.com"
					/>
				</InputGroup>
			</div>
		</div>
	)
}

export default EmailPreview
