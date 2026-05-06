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
} from "@/styles/default/ui/alert-dialog"
import { Button } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"

export default function DestructiveDialogWithDivider() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button color="error">
					<Trash2 />
					Delete Record
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-100 gap-0 p-0">
				<AlertDialogHeader className="px-6 py-5">
					<AlertDialogTitle>Delete Account</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete the record?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Divider className="bg-soft-alpha" />
				<AlertDialogFooter className="px-6 py-5">
					<AlertDialogCancel asChild>
						<Button variant="outline" color="neutral">
							Cancel
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant="strong" color="error">
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
