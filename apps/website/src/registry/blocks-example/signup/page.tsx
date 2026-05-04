import React from "react"
import Image from "next/image"
import Logo from "./components/radian-logo"
import SignupForm from "./components/signup-form"

export default function SignupWithIllustration() {
	return (
		<div className="flex min-h-svh overflow-hidden">
			<div className="hidden w-1/2 p-6 md:block">
				<div className="pl-30 pt-32.5 bg-top-left relative h-full w-full overflow-hidden rounded-2xl bg-[url('/blocks/illustration-gradient.jpg')] bg-cover bg-no-repeat">
					<div className="max-w-120 flex flex-col gap-4 text-white">
						<Logo />
						<h4 className="heading-4 font-semibold">
							Start creating more designs with Radian
						</h4>
						<p className="text-base text-white">
							Create a free account and get full access to all features for
							30-days. No credit card needed.
						</p>
					</div>
					<div className="pl-30 absolute right-0 top-[50vh] h-max w-full">
						<Image
							src="/blocks/dashboard.png"
							alt=""
							className="w-full object-cover"
							width={500}
							height={500}
						/>
					</div>
				</div>
			</div>
			<div className="flex w-1/2 flex-1 items-center justify-center p-5">
				<SignupForm />
			</div>
		</div>
	)
}
