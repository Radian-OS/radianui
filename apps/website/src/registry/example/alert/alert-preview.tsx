import { Bell } from "lucide-react"
import { Alert, AlertIcon, AlertTitle, AlertToolbar } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

export default function AlertPreview() {
	return (
		<div className="flex w-full flex-col items-center gap-6 lg:max-w-[75%]">
			<Alert close>
				<AlertIcon>
					<Bell />
				</AlertIcon>
				<AlertTitle>This is simple alert</AlertTitle>
				<AlertToolbar>
					<LinkButton href="/">Action</LinkButton>
				</AlertToolbar>
			</Alert>
		</div>
	)
}
