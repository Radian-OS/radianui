import { useState } from "react"
import { Star } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

function DismissibleAlert() {
	const [isVisible, setIsVisible] = useState(true)
	const handleClose = () => setIsVisible(false)

	return (
		<>
			{isVisible && (
				<Alert close onClose={() => handleClose()} color="success" variant="outline" className="w-full">
					<AlertIcon>
						<Star />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Dismissible Alert</AlertTitle>
						<AlertDescription>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, dolore. Distinctio similique consequatur ipsa. Ex corporis ullam, alias ut voluptates vel est ipsum,
								delectus, deleniti libero quia architecto earum. Maxime sed praesentium vitae iste est expedita minus veritatis, blanditiis odit consequatur corporis accusantium
								labore voluptatem sint quibusdam iusto magni itaque.
							</p>
							<div className="space-x-3.5">
								<LinkButton color="success" href="#close-icon">
									Upgrade
								</LinkButton>
								<LinkButton color="success" href="#close-icon">
									Dismiss
								</LinkButton>
							</div>
						</AlertDescription>
					</AlertContent>
				</Alert>
			)}
		</>
	)
}

export default DismissibleAlert
