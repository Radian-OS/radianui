// import Image from "next/image"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/registry/ui/card"

export default function CardPreview() {
	return (
		<Card className="max-w-95 w-full gap-0 py-0">
			<CardHeader className="px-5 pb-2 pt-5 text-base font-semibold">
				Your Workspace
			</CardHeader>
			<CardContent className="text-fg-secondary px-5 pb-5 pt-0 text-sm">
				Organize projects, assign ownership, and track progress in real time -
				all from one shared workspace built around your teams workflow.
				<br />
				<br />
				The workspace component supports a size prop that defaults to default
				for standard spacing and layout.
			</CardContent>
			<CardFooter className="bg-fill1 flex items-center justify-center border border-x-0 border-b-0 border-t px-5 py-5">
				<Button variant="outline" color="neutral" className="w-full">
					Open Workspace
				</Button>
			</CardFooter>
		</Card>
	)
}
