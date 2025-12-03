import React from "react"
import { FileStack, Link } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { Spinner } from "@/registry/ui/spinner"

const CardInfoExample = () => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Sync In Progress</CardTitle>
				<CardDescription>Started 3 mins ago</CardDescription>
				<CardAction>
					<Spinner variant="activity" className="text-info size-6" />
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Link className="text-fg-secondary" size={20} />
						<span className="text-fg-secondary text-sm">Events Found</span>
					</div>
					<span className="text-base font-medium">28</span>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<FileStack className="text-fg-secondary" size={20} />
						<span className="text-fg-secondary text-sm">Sources Checked</span>
					</div>
					<span className="text-base font-medium">210 out of 340</span>
				</div>
			</CardContent>
			<CardFooter className="flex items-center gap-2">
				<Button>Continue</Button>
				<Button variant="outline" color="neutral">
					Cancel
				</Button>
			</CardFooter>
		</Card>
	)
}

export default CardInfoExample
