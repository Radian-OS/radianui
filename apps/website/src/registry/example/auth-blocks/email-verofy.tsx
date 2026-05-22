"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"

const VerifyEmail = () => {
	const handleSubmitClick = () => {
		console.log("Clicked")
	}

	return (
		<div className="flex h-[85vh] items-center justify-center">
			<div className="max-w-88 sm:w-88 w-full px-4">
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
								Verify your email
							</h1>
							<div className="flex justify-between">
								<p className="text-fg-secondary text-sm font-medium">
									We&apos;ve sent an email to fullname@domain.com to activate
									your account
								</p>
							</div>
						</div>
						<div className="space-y-2">
							<Button
								className="w-full bg-black px-3.5 py-2.5"
								onClick={handleSubmitClick}>
								Open email app
							</Button>
							<Button
								className="w-full bg-black px-3.5 py-2.5"
								onClick={handleSubmitClick}>
								<Link
									href="https://mail.google.com"
									target="_blank"
									rel="noopener noreferrer">
									Open gmail
								</Link>
							</Button>
							<div className="text-[0.875rem] font-normal leading-[1.3125rem]">
								<p className="text-fg-secondary">
									Didn&apos;t get the email? Check your spam folder!
									<Link href="/">Re-enter your email and try again</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VerifyEmail
