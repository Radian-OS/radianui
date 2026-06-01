import { IconSlot } from "@/registry/icon/icon-library"
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

export default function DestructiveDialogCenter() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button color="error">
					<IconSlot slot="trash" />
					Delete Record
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-100 gap-8 pt-8">
				<div className="flex flex-col items-center gap-3">
					<span className="bg-error-accent border-soft-alpha flex size-10 items-center justify-center rounded-lg border">
						<IconSlot slot="trash" className="text-error size-6" />
					</span>
					<AlertDialogHeader className="sm:text-center">
						<AlertDialogTitle>Delete Account</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete the record?
						</AlertDialogDescription>
					</AlertDialogHeader>
				</div>
				<AlertDialogFooter className="sm:flex-col-reverse">
					<AlertDialogCancel asChild>
						<Button variant="outline" color="neutral" className="w-full">
							Cancel
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant="strong" color="error" className="w-full">
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
