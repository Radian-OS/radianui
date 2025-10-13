"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

const SignIn = () => {
	const handleSubmitClick = () => {
		console.log("Clicked")
	}

	return (
		<div className="flex h-[85vh] items-center justify-center">
			<div className="max-w-88 sm:w-88 w-full px-4">
				<div className="mx-auto flex flex-col gap-9">
					<Link href="/" style={{ fill: "white", color: "white" }}>
						<img src="/radian.svg" className="dark:hidden" alt="radian-logo" width={112} height={36} />
						<img src="/radian-dark.svg" alt="radian-logo" className="hidden dark:block" width={112} height={36} />
					</Link>

					<div className="space-y-6">
						<div className="space-y-2">
							<h1 className="text-2xl font-semibold">Sign in</h1>
							<p className="text-muted-foreground text-sm font-medium">
								Don&apos;t have an account yet?{" "}
								<Link href={"/signup"}>
									<span className="text-foreground">Sign up</span>
								</Link>
							</p>
						</div>

						<div className="space-y-5">
							<form className="space-y-4">
								<Input type="email" />
								<Input type="password" />
								<div className="flex items-center space-x-2">
									<Checkbox id="terms" />
									<Label htmlFor="terms">Keep me signed in</Label>
								</div>
							</form>

							<Button className="w-full bg-black px-3.5 py-2.5" onClick={handleSubmitClick}>
								Sign In
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignIn
