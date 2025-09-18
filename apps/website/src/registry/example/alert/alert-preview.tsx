import { Bell } from "lucide-react"
import { Alert, AlertActions, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

export default function AlertPreview() {
	return (
		<Alert>
			<AlertIcon>
				<Bell size={16} />
			</AlertIcon>
			<AlertContent>
				<AlertTitle>Alert Title</AlertTitle>
				<AlertDescription>This is alert description.</AlertDescription>
			</AlertContent>
			<AlertActions>
				<LinkButton href="/">Action</LinkButton>
			</AlertActions>
		</Alert>
	)
}
