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
						<AlertDescription>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, dolore. Distinctio similique consequatur ipsa. Ex corporis ullam, alias ut voluptates vel est ipsum,
							delectus, deleniti libero quia architecto earum. Maxime sed praesentium vitae iste est expedita minus veritatis, blanditiis odit consequatur corporis accusantium
							labore voluptatem sint quibusdam iusto magni itaque.
						</AlertDescription>
					</AlertContent>
				</Alert>
			)}
		</>
	)
}

export default DismissibleAlert
