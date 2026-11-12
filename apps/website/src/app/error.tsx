"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"

export default function RootError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error("[Root Error Boundary Caught]:", error)
	}, [error])

	const isProductionMasked =
		error.message?.includes("Server Components render") ||
		error.message?.includes("Server Action")

	return (
		<div className="flex min-h-[70vh] items-center justify-center px-4">
			<div className="w-full max-w-lg space-y-6 text-center">
				<div className="flex flex-col items-center justify-center gap-3">
					<h1 className="heading-2">Something went wrong</h1>
					<p className="text-fg-secondary text-sm">
						{error.message && !isProductionMasked
							? error.message
							: "An unexpected error occurred while loading this page."}
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
					<Button variant="outline" asChild>
						<Link href="/">Go to Homepage</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
