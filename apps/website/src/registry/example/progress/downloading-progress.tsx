"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Divider } from "@/styles/default/ui/divider"
import { Label } from "@/styles/default/ui/label"
import { Progress } from "@/styles/default/ui/progress"

export default function DownloadingProgress() {
	const [downloadProgress, setDownloadProgress] = useState(0)
	const [isComplete, setIsComplete] = useState(false)

	// Enhanced status messages with icons and colors
	const getStatusData = (progress: number) => {
		if (progress < 5) return { message: "Initializing download..." }
		if (progress < 15) return { message: "Setting up environment..." }
		if (progress < 25) return { message: "Connecting to server..." }
		if (progress < 35) return { message: "Verifying permissions..." }
		if (progress < 50) return { message: "Downloading core files..." }
		if (progress < 65) return { message: "Downloading assets..." }
		if (progress < 80) return { message: "Downloading dependencies..." }
		if (progress < 90) return { message: "Extracting files..." }
		if (progress < 95) return { message: "Validating integrity..." }
		if (progress < 100) return { message: "Finalizing installation..." }
		return { message: "Download complete!" }
	}

	// Get speed calculations
	const [speed, setSpeed] = useState(0)
	const [startTime] = useState(Date.now())

	useEffect(() => {
		const downloadTimer = setInterval(() => {
			setDownloadProgress((prev) => {
				if (prev >= 100) {
					setIsComplete(true)
					setTimeout(() => {
						setDownloadProgress(0)
						setIsComplete(false)
						setSpeed(0)
					}, 3000)
					return 100
				}

				const increment = Math.random() * 3 + 1
				const newProgress = prev + increment

				// Calculate speed (MB/s simulation)
				const currentSpeed = (increment / 150) * 1000 // Convert to MB/s
				setSpeed(currentSpeed)

				return newProgress
			})
		}, 150)

		return () => {
			clearInterval(downloadTimer)
		}
	}, [startTime])

	const statusData = getStatusData(downloadProgress)
	const progressPercentage = Math.round(downloadProgress)

	return (
		<div className="mx-auto w-full p-8">
			<div className="mb-6 text-center">
				<h2 className="mb-1 text-xl font-semibold">
					{isComplete ? "Installation Complete!" : "Workspace Setup"}
				</h2>
				<p className="text-fg-secondary text-sm">
					{isComplete
						? "Ready to launch your workspace"
						: "Setting up your development environment"}
				</p>
			</div>

			<div className="flex flex-col gap-1.5">
				{/* Progress Header */}
				<div className="flex items-center justify-between text-sm">
					<Label>Progress</Label>
					<div className="flex items-center space-x-4">
						<span className="text-fg-secondary">
							{speed > 0 ? `${speed.toFixed(1)} MB/s` : "--"}
						</span>
						<Badge variant="soft" color="neutral">
							{progressPercentage}%
						</Badge>
					</div>
				</div>

				<Progress value={downloadProgress} className="h-2 w-full" />

				<div className="flex items-center justify-between">
					<span className={`text-fg-secondary text-sm font-medium`}>
						{statusData.message}
					</span>
				</div>

				<Divider className="my-2" />

				<div className="flex justify-between">
					<div className="text-xs">
						<span className="text-fg-secondary">Files processed:</span>
						<div className="text-fg font-mono">
							{Math.floor((downloadProgress / 100) * 1247)} / 1247
						</div>
					</div>
					<div className="text-xs">
						<span className="text-fg-secondary">Size:</span>
						<div className="text-fg font-mono">
							{((downloadProgress / 100) * 2.4).toFixed(1)} / 2.4 GB
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
