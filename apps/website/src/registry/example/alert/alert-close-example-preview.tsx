import { useState } from "react"
import { EyeIcon, SquareTerminal, Star } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Alert } from "@/registry/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertCloseExamplePreview = () => {
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = (): void => {
		setIsVisible(false)
	}

	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"} size={"md"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					{isVisible && (
						<Alert title="Alert" description="This is a standard notification message" start={<Star size={20} />} color="primary" variant="default" onClose={handleClose} />
					)}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="alert.tsx"
					showLineNumber
					className="h-[420px]"
					code={`export default function AlertOncloseExample() { 
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = (): void => {
		setIsVisible(false)
	}

  return (
	<div>
		{isVisible && (
			<Alert title="Alert" description="This is a standard notification message" start={<Star size={20} />} color="primary" variant="default" onClose={handleClose} />
		)}
	</div>
  );
`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AlertCloseExamplePreview
