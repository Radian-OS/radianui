import { Button } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"

export default function CardDefault() {
	return (
		<Card className="mx-auto w-full max-w-sm">
			<CardHeader>
				<CardTitle>Default Card</CardTitle>
				<CardDescription>This card uses the default styles.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					The card component uses a default style and structure that inherits
					default properties.
				</p>
			</CardContent>
			<CardFooter>
				<Button variant="outline" color="neutral" className="w-full">
					Action
				</Button>
			</CardFooter>
		</Card>
	)
}
