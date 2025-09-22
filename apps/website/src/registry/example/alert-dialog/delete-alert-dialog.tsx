import { Trash2 } from "lucide-react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/registry/ui/alert-dialog"
import { Button, IconButton } from "@/registry/ui/button"

export default function DeleteAlertDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<IconButton color="error">
					<Trash2 />
				</IconButton>
			</AlertDialogTrigger>
			<AlertDialogContent backdrop="blur">
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Your Action</AlertDialogTitle>
					<AlertDialogDescription>Once confirmed, this action cannot be reversed. It will delete your account and remove all associated data.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button variant="outline" color="neutral">
							Go Back
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant="strong" color="error">
							Delete Account
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
