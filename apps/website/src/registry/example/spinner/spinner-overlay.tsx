"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/registry/ui/card"
import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerOverlay() {
	const [time, setTime] = useState(5)
	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prev) => {
				if (prev === 0) return 5
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<Card className="relative w-full max-w-xs">
			<CardContent className="space-y-3 p-4">
				<h3 className="text-sm font-semibold">Dashboard Overview</h3>
				<p className="text-sm">
					Monthly revenue and user statistics for the current period.
				</p>
				<div className="grid grid-cols-2 gap-4">
					<div className="rounded-md border p-3">
						<p className="text-xs">Revenue</p>
						<p className="text-lg font-bold">$12,450</p>
					</div>
					<div className="rounded-md border p-3">
						<p className="text-xs">Users</p>
						<p className="text-lg font-bold">1,234</p>
					</div>
				</div>
			</CardContent>
			{/* Overlay */}
			<Card className="bg-bg/80 backdrop-blur-xs absolute inset-0 z-10 flex items-center justify-center border-0 shadow-none">
				<CardContent className="flex grow flex-col items-center justify-center gap-2">
					<Spinner size={20} variant="activity" className="opacity-60" />
					<p className="text-fg-tertiary text-xs">Retrying in {time}s...</p>
				</CardContent>
			</Card>
		</Card>
	)
}
