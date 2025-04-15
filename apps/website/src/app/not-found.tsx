import Link from "next/link"
import { Button } from "@/registry/ui/button"

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center">
			<div className="w-full space-y-6 text-center">
				<div className="flex flex-col items-center justify-center gap-3">
					<h1 className="heading-1 animate-bounce">404</h1>
					<p className="text-text-secondary">Looks like you have lost. Click the button below to go to homepage.</p>
				</div>
				<Link href="/">
					<Button variant={"strong"} className="hover:bg-primary/90">
						Go to Homepage
					</Button>
				</Link>
			</div>
		</div>
	)
}
