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
} from "@/styles/default/ui/alert-dialog"
import { Button } from "@/styles/default/ui/button"

export default function AlertDialogPreview() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Show Dialog
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-100">
				<AlertDialogHeader>
					<AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved changes in the page. Do you want to save or discard
						it?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button variant="outline" color="neutral">
							Discard
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant="strong" color="primary">
							Save Changes
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
