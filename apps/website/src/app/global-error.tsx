"use client"

import { useEffect } from "react"
import { Button } from "@/registry/ui/button"
import "@/css/globals.css"

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error("[Global Error Boundary Caught]:", error)
	}, [error])

	return (
		<html lang="en">
			<body className="bg-bg text-fg flex min-h-screen items-center justify-center p-4">
				<div className="w-full max-w-lg space-y-6 text-center">
					<div className="flex flex-col items-center justify-center gap-3">
						<h1 className="heading-2">Application Error</h1>
						<p className="text-fg-secondary text-sm">
							A critical error occurred while initializing the application.
						</p>
						{error.digest && (
							<p className="bg-fill2 text-fg-tertiary rounded px-2.5 py-1 font-mono text-xs">
								Digest: {error.digest}
							</p>
						)}
					</div>
					<div className="flex items-center justify-center gap-3">
						<Button variant="strong" onClick={() => reset()}>
							Try again
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								window.location.href = "/"
							}}>
							Go to Homepage
						</Button>
					</div>
				</div>
			</body>
		</html>
	)
}
