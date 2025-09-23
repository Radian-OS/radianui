import React from "react"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

const ToastColor = () => {
	return (
		<div className="flex items-center justify-center gap-4">
			{/* primary color */}
			<Button
				variant="strong"
				color="primary"
				onClick={() =>
					toast.custom((t) => (
						<Alert variant="strong" color="primary" close onClose={() => toast.dismiss(t)}>
							<AlertIcon>
								<AlertCircle />
							</AlertIcon>
							<AlertTitle>Your form has been successfully submitted</AlertTitle>
						</Alert>
					))
				}>
				Primary
			</Button>

			{/* neutral color */}
			<Button
				variant="strong"
				color="neutral"
				onClick={() =>
					toast.custom((t) => (
						<Alert variant="strong" color="neutral" close onClose={() => toast.dismiss(t)}>
							<AlertIcon>
								<AlertCircle />
							</AlertIcon>
							<AlertTitle>Your form has been successfully submitted</AlertTitle>
						</Alert>
					))
				}>
				Neutral
			</Button>

			{/* warning color */}
			<Button
				variant="strong"
				color="warning"
				onClick={() =>
					toast.custom((t) => (
						<Alert variant="strong" color="warning" close onClose={() => toast.dismiss(t)}>
							<AlertIcon>
								<AlertCircle />
							</AlertIcon>
							<AlertTitle>Your form has been successfully submitted</AlertTitle>
						</Alert>
					))
				}>
				Warning
			</Button>

			{/* error color */}
			<Button
				variant="strong"
				color="error"
				onClick={() =>
					toast.custom((t) => (
						<Alert variant="strong" color="error" close onClose={() => toast.dismiss(t)}>
							<AlertIcon>
								<AlertCircle />
							</AlertIcon>
							<AlertTitle>Your form has been successfully submitted</AlertTitle>
						</Alert>
					))
				}>
				Error
			</Button>

			{/* info color */}
			<Button
				variant="strong"
				color="info"
				onClick={() =>
					toast.custom((t) => (
						<Alert variant="strong" color="info" close onClose={() => toast.dismiss(t)}>
							<AlertIcon>
								<AlertCircle />
							</AlertIcon>
							<AlertTitle>Your form has been successfully submitted</AlertTitle>
						</Alert>
					))
				}>
				Info
			</Button>

			{/* success color */}
			<Button
				variant="strong"
				color="success"
				onClick={() =>
					toast.custom((t) => (
						<Alert variant="strong" color="success" close onClose={() => toast.dismiss(t)}>
							<AlertIcon>
								<AlertCircle />
							</AlertIcon>
							<AlertTitle>Your form has been successfully submitted</AlertTitle>
						</Alert>
					))
				}>
				Success
			</Button>
		</div>
	)
}

export default ToastColor
