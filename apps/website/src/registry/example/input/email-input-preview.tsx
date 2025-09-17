import { Mail } from "lucide-react"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"

const EmailPreview = () => {
	return (
		<InputGroup className="w-80">
			<InputAddon>
				<Mail />
			</InputAddon>
			<Input type="email" placeholder="designer@radianos.com" />
		</InputGroup>
	)
}

export default EmailPreview
