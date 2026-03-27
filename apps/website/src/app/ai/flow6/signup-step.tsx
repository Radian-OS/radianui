"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import Signup from "../_components/signup"
import { GithubIcon } from "../icon/github"
import { GoogleIcon } from "../icon/google"
import { Radian } from "../icon/radian"

export default function SignupStep({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex w-full max-w-[360px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h5 className="heading-5">Sign up with email</h5>
					<p className="text-fg-secondary text-sm">
						Already have an account?{" "}
						<Link href="#" className="text-primary font-medium hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<div className="flex gap-3">
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1">
						<GoogleIcon />
						Google
					</Button>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="flex-1">
						<GithubIcon />
						Github
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary text-sm font-medium">Or</span>
					<Divider className="flex-1" />
				</div>

				<Signup onNext={onNext} condition={true} />
			</div>
		</div>
	)
}
