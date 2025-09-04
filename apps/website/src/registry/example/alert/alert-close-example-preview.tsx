"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal, Star } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Alert, AlertClose, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const AlertCloseExamplePreview = () => {
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = () => setIsVisible(false)

	const handlePreviewTabClick = () => {
		setIsVisible(true)
	}

	return (
		<Tabs defaultValue="preview" variant="outline-ghost" size="md">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger onClick={handlePreviewTabClick} value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger onClick={handlePreviewTabClick} value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					{isVisible && (
						<Alert color="primary" variant="soft" className="w-full">
							<AlertIcon>
								<Star size={20} />
							</AlertIcon>
							<AlertContent>
								<AlertTitle>Alert</AlertTitle>
								<AlertDescription>This is a standard notification message</AlertDescription>
							</AlertContent>
							<AlertClose onClick={handleClose} />
						</Alert>
					)}
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="alert-close.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { useState } from "react"
import { Alert,AlertClose, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

export const AlertClose=()=>{
	const [isVisible, setIsVisible] = useState(true);
	const handleClose = () => setIsVisible(false);
	return (
		<>
			{isVisible && (
				<Alert color="primary" variant="soft" className="w-full">
					<AlertIcon>
						<Star size={20} />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Alert</AlertTitle>
						<AlertDescription>This is a standard notification message</AlertDescription>
					</AlertContent>
					<AlertClose onClick={handleClose} />
				</Alert>
			)}
		</>
	);
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AlertCloseExamplePreview
