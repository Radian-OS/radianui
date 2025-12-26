import Image from "next/image"
import Link from "next/link"
import { GithubIcon } from "@/components/home/block/components/github-icon"
import { GoogleIcon } from "@/components/home/block/components/google-icon"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

interface SigninProps {
	fullScreen?: boolean
}

export default function Page({ fullScreen = true }: SigninProps) {
	return (
		<div className={cn("bg-bg flex", { "h-screen w-screen": fullScreen, "h-full w-full": !fullScreen })}>
			<div className="flex w-full">
				<div className="hidden flex-1 md:block">
					<img className="h-full w-full object-cover" src="/media/background-2.jpg" alt="Background Image" width={400} height={400} />
				</div>
				<div className="bg-bg flex h-full w-full flex-1 items-center justify-center p-5">
					<div className="w-90 flex flex-col gap-8">
						<div className="flex flex-1 flex-col gap-6">
							<div>
								<Image src="/favicon-16x16.png" height={32} width={32} alt="Logo" />
							</div>
							<div className="flex flex-col gap-2">
								<span className="heading-5">Sign In</span>
								<p className="text-fg-secondary text-sm">
									Don&apos;t have an account?{" "}
									<Button variant="link" asChild color="primary">
										<Link href="#">Sign up</Link>
									</Button>
								</p>
							</div>
						</div>
						<form>
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-4">
									<div className="flex flex-col gap-1.5">
										<Label htmlFor="email" className="text-fg text-sm font-medium">
											Email Address
										</Label>
										<Input id="email" name="email" size="36" type="email" />
									</div>
									<div className="flex flex-col gap-1.5">
										<Label htmlFor="password" className="text-fg text-sm font-medium">
											Password
										</Label>
										<Input id="password" name="password" size="36" type="password" />
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Checkbox id="remember-me" name="rememberMe" />
										<Label htmlFor="remember-me" className="text-fg-secondary font-normal">
											Remember me
										</Label>
									</div>
									<Button variant="link" asChild color="primary">
										<Link href="#">Forgot Password?</Link>
									</Button>
								</div>
								<Button className="w-full">Sign In</Button>
							</div>
						</form>
						<div className="flex flex-1 flex-col gap-6">
							<div className="flex items-center gap-2">
								<Divider className="flex-1" />
								<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">Or continue with</span>
								<Divider className="flex-1" />
							</div>
							<div className="flex gap-3">
								<Button variant="outline" color="neutral" className="text-fg-secondary w-full">
									<GoogleIcon />
									Google
								</Button>
								<Button variant="outline" color="neutral" className="text-fg-secondary w-full">
									<GithubIcon />
									Github
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
