"use client"

import React, { useEffect, useState } from "react"
import { User } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"

function LoadingButtonExample() {
	useEffect(() => {
		// Automatically toggle button state every 4 seconds
		const interval = setInterval(() => {
			setLoading((prev) => !prev)
		}, 1000)

		// Cleanup interval on component unmount
		return () => clearInterval(interval)
	}, [])
	const [loading, setLoading] = useState(false)
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button loading={loading}>Loading</Button>
			<IconButton loading={loading}>
				<User />
			</IconButton>
		</div>
	)
}
export default LoadingButtonExample
