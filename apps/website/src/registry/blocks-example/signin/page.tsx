import Image from "next/image"
import { Card } from "@/registry/ui/card"
import SigninForm from "./components/signin-form"

export default function Page() {
	return (
		<div className="bg-elevation-negative flex h-screen w-screen items-center justify-center px-5">
			<Card className="border-border bg-bg flex w-90 flex-row overflow-hidden border p-0 lg:w-200">
				<div className="flex-1">
					<SigninForm />
				</div>
				<div className="hidden w-100 lg:block">
					<Image
						className="h-full w-full"
						src="/blocks/person-with-mobile.png"
						alt="Background Image"
						width={400}
						height={400}
					/>
				</div>
			</Card>
		</div>
	)
}
