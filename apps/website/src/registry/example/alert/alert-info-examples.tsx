import { CircleAlert, Import } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle, AlertToolbar } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

const AlertInfoExamples = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert color="info">
				<AlertIcon>
					<Import size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>New Version Available</AlertTitle>
					<AlertDescription>Version 2.1 is now live. Refresh to update</AlertDescription>
					<section className="flex items-center gap-2 pt-2">
						<Button color="info" variant="link">
							Later
						</Button>
						<span className="bg-fg-tertiary size-1 rounded-full"></span>
						<Button color="info" variant="link">
							Update
						</Button>
					</section>
				</AlertContent>
			</Alert>
			<Alert color="info" variant="outline">
				<AlertIcon>
					<CircleAlert size={20} />
				</AlertIcon>
				<AlertTitle>136 Contacts Imported</AlertTitle>
				<AlertToolbar>
					<Button color="info" variant="link">
						Undo
					</Button>
				</AlertToolbar>
			</Alert>
		</div>
	)
}

export default AlertInfoExamples
