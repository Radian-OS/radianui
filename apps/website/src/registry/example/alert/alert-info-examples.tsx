import { CircleAlert } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle, AlertToolbar } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

const AlertInfoExamples = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert color="info">
				<AlertIcon>
					<CircleAlert size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>New Version Available</AlertTitle>
					<AlertDescription>Version 2.1 is now live. Refresh to update</AlertDescription>
					<section className="flex items-center gap-2 pt-2">
						<LinkButton color="info" href="#info-alerts-examples">
							Statement
						</LinkButton>
						<span className="bg-fg-tertiary size-1 rounded-full"></span>
						<LinkButton color="info" href="#info-alerts-examples">
							Update
						</LinkButton>
					</section>
				</AlertContent>
			</Alert>
			<Alert color="info" variant="outline">
				<AlertIcon>
					<CircleAlert size={20} />
				</AlertIcon>
				<AlertTitle>136 Contacts Imported</AlertTitle>
				<AlertToolbar>
					<LinkButton color="info" href="#info-alerts-examples">
						Undo
					</LinkButton>
				</AlertToolbar>
			</Alert>
		</div>
	)
}

export default AlertInfoExamples
