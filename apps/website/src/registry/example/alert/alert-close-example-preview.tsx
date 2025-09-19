import { useState } from "react"
import { Star } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

function DismissibleAlert() {
	const [isVisible, setIsVisible] = useState(true)
	const handleClose = () => setIsVisible(false)

	return (
		<>
			{isVisible && (
				<Alert close onClose={() => handleClose()} color="primary" variant="soft" className="w-full">
					<AlertIcon>
						<Star size={20} />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Dismissible Alert</AlertTitle>
						<AlertDescription>This alert can be closed by clicking the X button</AlertDescription>
					</AlertContent>
				</Alert>
			)}
		</>
	)
}

export default DismissibleAlert
