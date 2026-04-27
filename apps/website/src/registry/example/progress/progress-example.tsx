"use client"

import { useEffect, useState } from "react"
import { Label } from "@/styles/default/ui/label"
import { Progress } from "@/styles/default/ui/progress"

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
		<div className="flex flex-col gap-2">
			<div className="flex w-80 items-center justify-between">
				<Label>Progress</Label>
				<p className="text-fg-secondary text-sm font-medium">{progress}%</p>
			</div>
			<Progress className="w-80" value={progress} />
			<p className="text-fg-tertiary text-sm font-normal">Description</p>
		</div>
	)
}

export default ProgressExample
