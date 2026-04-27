"use client"

import { useEffect, useState } from "react"
import { EyeIcon, RotateCw, SquareTerminal } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { IconButton } from "@/styles/default/ui/button"
import { Label } from "@/styles/default/ui/label"
import { Progress } from "@/styles/default/ui/progress"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"

const ProgressPreview = () => {
	const [progress, setProgress] = useState(0)
	const [key, setKey] = useState(0)

	useEffect(() => {
		setProgress(3)
		const timer = setTimeout(() => setProgress(70), 500)
		return () => clearTimeout(timer)
	}, [key])

	const handleRefresh = () => {
		setProgress(0)
		setKey((prev) => prev + 1)
	}

	return (
		<Tabs defaultValue="preview">
			<div className="flex items-center justify-between">
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
				<div className="flex gap-2">
					<div className="flex gap-1">
						<IconButton
							aria-label="Re-Preview Button"
							variant="outline"
							color="neutral"
							onClick={handleRefresh}>
							<RotateCw />
						</IconButton>
					</div>
				</div>
			</div>

			<TabsContent value="preview">
				<div className="relative flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<div className="flex flex-col gap-1.5">
						<Label>Progress</Label>
						<Progress key={key} className="w-80" value={progress} />
					</div>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="progress-preview.tsx"
					showLineNumber
					className="h-[420px]"
					code={`import { Progress } from "@/components/ui/progress" 
import { useEffect, useState } from "react"

const ProgressPreview = () => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
	const interval = setInterval(() => {
		setProgress((prev) => {
			if (prev >= 70) {
				clearInterval(interval)
				return 70
			}
			return prev + 1
		})
	}, 500)
	return () => clearInterval(interval)
	}, [])
	
	return (
		<div className="flex flex-col gap-1.5">
			<Label>Progress</Label>
			<Progress className="w-80" value={progress} />
		</div>
 )
}

export default ProgressPreview`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default ProgressPreview
