"use client"

import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

const AccountVerified = () => {
	const handleSubmitClick = () => {
		console.log("Clicked")
	}

	return (
		<div className="flex h-[85vh] items-center justify-center">
			<div className="w-full max-w-96 px-4 sm:w-96">
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
								Account verified
							</h1>
							<div className="flex justify-between">
								<p className="text-fg-secondary text-sm font-medium">
									Congratulations! your email fullname@domain.com has been
									verified
								</p>
							</div>
						</div>
						<div className="space-y-5">
							<Button
								className="w-full bg-black px-3.5 py-2.5"
								onClick={handleSubmitClick}>
								Continue to your account
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountVerified
