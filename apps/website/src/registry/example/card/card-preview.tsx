// import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/registry/ui/card"

// import { Input } from "@/registry/ui/input"
// import { Label } from "@/registry/ui/label"

export default function CardPreview() {
	return (
		<Card className="max-w-95 w-full gap-0 p-0">
			<CardHeader className="border border-x-0 border-b-0 border-t-0 px-5 pb-2 pt-5 text-base font-semibold">
				Analytics Overview
			</CardHeader>
			<CardContent className="text-fg-secondary p-5 text-sm">
				Your dashboard refreshes every 15 minutes with live metrics, giving you
				a clear picture of what is moving and what needs your attention.
			</CardContent>
			<CardFooter className="bg-fill1 border border-x-0 border-b-0 border-t p-5">
				<Button variant="outline" color="neutral" className="w-full">
					View Dashboard
				</Button>
			</CardFooter>
		</Card>
	)
}
