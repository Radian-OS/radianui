import { Download, Github, Leaf } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"

export default function CardFancyExample() {
	return (
		<div className="bg-primary-accent flex w-full flex-col items-center justify-center gap-2 rounded-[20px] px-2.5 py-2.5 sm:w-fit">
			<Card className="sm:w-97.5 w-full">
				<CardHeader className="flex flex-row justify-between">
					<span className="bg-primary p-2.25 flex w-fit items-center justify-center rounded-[10px]">
						<Leaf className="size-6 text-white" />
					</span>
					<span className="border-alpha flex items-center overflow-hidden rounded-md border">
						<Badge
							color="neutral"
							className="text-primary-text border-0"
							size="24"
							variant="outline">
							<Download />
						</Badge>
						<Badge
							color="neutral"
							className="text-primary-text bg-primary-accent rounded-none border-0"
							size="24"
							variant="outline">
							141k/week
						</Badge>
					</span>
				</CardHeader>
				<CardContent className="flex flex-col justify-center gap-2">
					<CardTitle className="text-base font-medium">React Native</CardTitle>
					<CardDescription className="text-sm">
						A Mage icon library package for React Native and other applications.
					</CardDescription>
				</CardContent>
				<CardFooter className="gap-3">
					<Button className="w-full">
						<Github />
						Github
					</Button>
					<Button className="w-full" color="neutral" variant="outline">
						NPM
					</Button>
				</CardFooter>
			</Card>
			<span className="text-primary-text text-sm">v2.1.21</span>
		</div>
	)
}
