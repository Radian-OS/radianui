"use client"

import { useEffect, useState } from "react"
import { RotateCw } from "lucide-react"
import { IconButton } from "@/registry/ui/button"
import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"

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
		<div>
			<IconButton
				aria-label="Re-Preview Button"
				variant="outline"
				color="neutral"
				onClick={handleRefresh}
				className="absolute right-0 top-0 m-2">
				<RotateCw />
			</IconButton>
			<div className="flex flex-col gap-1.5">
				<Label>Progress</Label>
				<Progress key={key} className="w-80" value={progress} />
			</div>
		</div>
	)
}

export default ProgressPreview
