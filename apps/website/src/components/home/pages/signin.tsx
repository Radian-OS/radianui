"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { GithubIcon } from "../github-icon"
import { GoogleIcon } from "../google-icon"

export default function Signin() {
	return (
		<div className="flex h-full w-full">
			<div className="not-lg:hidden h-full w-full overflow-hidden">
				<img className="h-full w-full object-cover" src="/homepage/abstract.png" />
			</div>
			<div className="flex h-full w-full items-center justify-center">
				<div className="flex w-full max-w-[360px] flex-col gap-8">
					<div className="flex flex-col gap-6">
						<Image src="/favicon-16x16.png" width={32} height={32} alt="Logo" />
						<div className="flex flex-col gap-2">
							<h5 className="heading-5">Sign In</h5>
							<p className="text-fg-secondary text-sm font-normal">
								Don’t have an account?{" "}
								<Link href="#" className="text-primary">
									Sign up
								</Link>
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Label className="font-medium" htmlFor="email">
									Email Address
								</Label>
								<Input id="email" />
							</div>
							<div className="flex flex-col gap-2">
								<Label className="font-medium" htmlFor="password">
									Password
								</Label>
								<Input id="password" />
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Checkbox id="remember-me" />
								<Label htmlFor="remember-me" className="text-fg-secondary font-normal">
									Remember me
								</Label>
							</div>
							<Link className="text-primary-text text-sm font-medium" href="#">
								Forgot Password?
							</Link>
						</div>
						<Button className="w-full">Sign In</Button>
					</div>

					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-2">
							<Divider className="flex-1" />
							<p className="text-fg-tertiary font-medium">Or continue with</p>
							<Divider className="flex-1" />
						</div>
						<div className="flex items-center gap-3">
							<Button className="w-full" variant="outline" color="neutral">
								<GoogleIcon />
								Google
							</Button>
							<Button className="w-full" variant="outline" color="neutral">
								<GithubIcon />
								Github
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
