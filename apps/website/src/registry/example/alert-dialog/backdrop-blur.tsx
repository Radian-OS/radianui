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
import { Button } from "@/registry/ui/button"

export default function BackdropBlur() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" color="neutral">
					Show Dialog
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent backdrop="blur" className="max-w-100">
				<AlertDialogHeader>
					<AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved changes in the page. Do you want to save or discard
						it?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button
							variant="outline"
							color="neutral"
							className="w-full sm:w-fit">
							Discard
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							variant="strong"
							color="primary"
							className="w-full sm:w-fit">
							Save Changes
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
