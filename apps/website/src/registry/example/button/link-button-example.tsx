import React from "react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"

function LinkButtonExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button color="neutral" asChild variant="link">
				<Link href="#link-button">Cancel</Link>
			</Button>
			<Button color="primary" asChild variant="link">
				<Link href="#link-button">Subscribe</Link>
			</Button>
		</div>
	)
}

export default LinkButtonExample
