"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import OTPInput from "@/registry/ui/input-otp"

const EmailCode = () => {
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
							<h1 className="flex justify-between text-2xl font-semibold">Verify your email</h1>
							<div className="flex justify-between">
								<p className="text-muted-foreground text-sm font-medium">Please enter the 6-digit code we emailed you at fullname@domain.com</p>
							</div>
						</div>
						<div className="space-y-5">
							<OTPInput
								label="Confirmation Code"
								length={6}
								variant="box"
								rounded="sm"
								size="44"
								className="w-[320px]"
								placeholder="Confirmation Code"
							/>
							<Button className="w-full bg-black px-3.5 py-2.5" onClick={handleSubmitClick}>
								Verify
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmailCode
