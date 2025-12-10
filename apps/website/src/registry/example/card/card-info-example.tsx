import React from "react"
import { CheckCircle, FileStack, Link, ShieldAlert } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"

const CardInfoExample = () => {
	return (
		<Card className="w-100">
			<CardHeader>
				<CardTitle>Sync In Progress</CardTitle>
				<CardDescription>Started 3 mins ago</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mb-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Link className="text-fg-secondary" size={20} />
						<span className="text-fg-secondary text-sm">Events Found</span>
					</div>
					<span className="text-sm font-medium">28</span>
				</div>
				<div className="mb-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<ShieldAlert className="text-fg-secondary" size={20} />
						<span className="text-fg-secondary text-sm">Events Expired</span>
					</div>
					<span className="text-sm font-medium">8</span>
				</div>
				<div className="mb-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<CheckCircle className="text-fg-secondary" size={20} />
						<span className="text-fg-secondary text-sm">Compile Progress</span>
					</div>
					<span className="text-info-text whitespace-nowrap text-sm font-medium">In Progress</span>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<FileStack className="text-fg-secondary" size={20} />
						<span className="text-fg-secondary text-sm">Sources Checked</span>
					</div>
					<span className="whitespace-nowrap text-sm font-medium">210 out of 340</span>
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-end gap-2">
				<Button variant="outline" color="neutral">
					Cancel
				</Button>
				<Button>Continue</Button>
			</CardFooter>
		</Card>
	)
}

export default CardInfoExample
