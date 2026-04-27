import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

function LinkButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
