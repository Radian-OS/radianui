"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

const SignUp = () => {
	const handleSubmitClick = () => {
		console.log("Clicked")
	}

	return (
		<div className="flex h-[85vh] items-center justify-center">
			<div className="w-full max-w-88 px-4 sm:w-88">
				<div className="mx-auto flex flex-col gap-9">
					<Link href="/" style={{ fill: "white", color: "white" }}>
						<img
							src="/radian.svg"
							className="dark:hidden"
							alt="radian-logo"
							width={112}
							height={36}
						/>
						<img
							src="/radian-dark.svg"
							alt="radian-logo"
							className="hidden dark:block"
							width={112}
							height={36}
						/>
					</Link>
					<div className="space-y-6">
						<div className="space-y-2">
							<h1 className="flex justify-between text-2xl font-semibold">
								Sign up
							</h1>
							<div className="flex justify-between">
								<p className="text-fg-secondary text-sm font-medium">
									Already have an account?{" "}
									<Link href={"/signup"}>
										<span className="text-fg">Sign in</span>
									</Link>
								</p>
							</div>
						</div>
						<div className="space-y-5">
							<div className="space-y-4">
								<form className="space-y-4">
									<Input />
									<Input type="email" />
									<Input type="password" />
								</form>
							</div>
							<Button
								className="w-full bg-black px-3.5 py-2.5"
								onClick={handleSubmitClick}>
								Sign Up
							</Button>
							<div className="text-[0.875rem] leading-[1.3125rem] font-normal">
								<p className="text-fg-secondary">
									By signing up, you agree to Radian &apos;s{" "}
									<span className="text-fg">Terms of Service</span> and{" "}
									<span className="text-fg">Privacy Policy</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp
