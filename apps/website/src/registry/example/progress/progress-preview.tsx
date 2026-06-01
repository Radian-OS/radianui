"use client"

import { useEffect, useState } from "react"
import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"

const ProgressPreview = () => {
	const [progress, setProgress] = useState(0)
	const [key] = useState(0)

	useEffect(() => {
		setProgress(3)
		const timer = setTimeout(() => setProgress(70), 500)
		return () => clearTimeout(timer)
	}, [key])

	return (
		<div className="flex flex-col gap-1.5">
			<Label>Progress</Label>
			<Progress key={key} className="w-80" value={progress} />
		</div>
	)
}

export default ProgressPreview
