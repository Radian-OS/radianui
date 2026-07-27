"use client"

import { useEffect, useState } from "react"
import { Label } from "@/registry/ui/label"
import { Progress } from "@/registry/ui/progress"

const ProgressExample = () => {
	const [progress, setProgress] = useState(3)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 80) {
					clearInterval(interval)
					return 80
				}
				return prev + 1
			})
		}, 500)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="flex w-full max-w-80 flex-col gap-2">
			<div className="flex items-center justify-between">
				<Label>Progress</Label>
				<p className="text-fg-secondary text-sm font-medium">{progress}%</p>
			</div>
			<Progress value={progress} />
			<p className="text-fg-tertiary text-sm font-normal">Description</p>
		</div>
	)
}

export default ProgressExample
