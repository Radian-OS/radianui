import { Bell } from "lucide-react"
import { Alert, AlertContent, AlertIcon, AlertTitle, AlertToolbar } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

export default function AlertPreview() {
	return (
		<Alert>
			<AlertIcon>
				<Bell size={16} />
			</AlertIcon>
			<AlertContent>
				<AlertTitle>This is simple alert</AlertTitle>
			</AlertContent>
			<AlertToolbar>
				<LinkButton href="/">Action</LinkButton>
			</AlertToolbar>
		</Alert>
	)
}
