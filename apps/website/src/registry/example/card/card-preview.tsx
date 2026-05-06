import Image from "next/image"
import { Button } from "@/styles/default/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/styles/default/ui/card"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

export default function CardPreview() {
	return (
		<Card className="max-w-100 w-full px-6 py-8">
			<div className="flex flex-1 flex-col gap-8">
				<Image
					src="/favicon-16x16.png"
					className="size-8"
					alt="radian-logo"
					width={112}
					height={36}
				/>
				<CardHeader className="flex flex-col gap-2 px-0">
					<span className="heading-5">Sign In</span>
					<span className="text-fg-secondary text-sm">
						Don&apos;t have an account ? <Button variant="link">Sign up</Button>
					</span>
				</CardHeader>
				<CardContent className="flex flex-col gap-5 px-0">
					<div className="flex flex-col gap-1.5">
						<Label>Email Address</Label>
						<Input size="36" type="email" />
					</div>
					<div className="flex flex-col gap-1.5">
						<div className="flex items-center justify-between">
							<Label>Password</Label>
							<Button variant="link">Forgot Password ?</Button>
						</div>
						<Input size="36" type="password" />
					</div>
				</CardContent>
				<CardFooter className="px-0">
					<Button className="w-full">Sign in</Button>
				</CardFooter>
			</div>
		</Card>
	)
}
