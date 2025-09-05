"use client"

import { useState } from "react"
import { EyeIcon, SquareTerminal, Star, X } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
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
								<AlertTitle>Dismissible Alert</AlertTitle>
								<AlertDescription>This alert can be closed by clicking the X button</AlertDescription>
							</AlertContent>
							<button
								onClick={handleClose}
								className="text-fg-tertiary hover:text-fg-secondary flex-shrink-0 cursor-pointer rounded-sm opacity-70 transition-colors hover:opacity-100">
								<X size={20} />
								<span className="sr-only">Close</span>
							</button>
						</Alert>
					)}
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="dismissible-alert.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { useState } from "react"
import { Star, X } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

export const DismissibleAlert = () => {
	const [isVisible, setIsVisible] = useState(true)
	const handleClose = () => setIsVisible(false)

	return (
		<>
			{isVisible && (
				<Alert color="primary" variant="soft" className="w-full">
					<AlertIcon>
						<Star size={20} />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Dismissible Alert</AlertTitle>
						<AlertDescription>This alert can be closed by clicking the X button</AlertDescription>
					</AlertContent>
					<button
						onClick={handleClose}
						className="text-fg-tertiary hover:text-fg-secondary cursor-pointer transition-colors rounded-sm opacity-70 hover:opacity-100 flex-shrink-0"
					>
						<X size={20} />
						<span className="sr-only">Close</span>
					</button>
				</Alert>
			)}
		</>
	)
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default AlertCloseExamplePreview
