import { useState } from "react"
import { Star, X } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

function DismissibleAlert() {
	const [isVisible, setIsVisible] = useState(true)
	const handleClose = () => setIsVisible(false)

	return (
		<>
			{isVisible && (
				<Alert color="primary" variant="soft" className="w-full">
					<AlertIcon>
						<Star size={20} />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Dismissible Alert</AlertTitle>
						<AlertDescription>This alert can be closed by clicking the X button</AlertDescription>
					</AlertContent>
					<button onClick={handleClose} className="text-fg-tertiary hover:text-fg-secondary flex-shrink-0 cursor-pointer rounded-sm opacity-70 transition-colors hover:opacity-100">
						<X size={20} />
						<span className="sr-only">Close</span>
					</button>
				</Alert>
			)}
		</>
	)
}

export default DismissibleAlert
