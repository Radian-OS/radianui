import { EyeIcon, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertDialogPreview = () => {
	return (
		<Tabs defaultValue="preview">
			<TabsList variant="outline-ghost" size="md">
				<TabsTrigger value="preview">
					<EyeIcon />
					Preview
				</TabsTrigger>
				<TabsTrigger value="code">
					<SquareTerminal />
					Code
				</TabsTrigger>
			</TabsList>

			<TabsContent value="preview">
				<div className="flex h-[420px] items-center justify-center overflow-auto rounded-xl border px-10">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline">Show Dialog</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>Take a moment to review the details provided to ensure you understand the implications.</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel asChild>
									<Button variant={"outline"}>Cancel</Button>
								</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button variant={"strong"} color={"primary"}>
										Continue
									</Button>
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet title="modal.tsx" showLineNumber className="h-[420px]" code={``} />
			</TabsContent>
		</Tabs>
	)
}

export default AlertDialogPreview
