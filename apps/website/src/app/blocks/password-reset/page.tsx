import { GmailIcon } from "@/components/home/gmail-icon"
import { OutlookIcon } from "@/components/home/outlook-icon"
import Logo from "@/components/home/playground-logo"
import { cn } from "@/lib/utils"
import { Button } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"
import { Input } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"

interface VerificationProps {
	fullScreen?: boolean
}

export default function Page({ fullScreen = true }: VerificationProps) {
	return (
		<div
			className={cn("bg-bg flex items-center justify-center px-5", {
				"h-full w-full": !fullScreen,
				"h-screen w-screen": fullScreen,
			})}>
			<div className="w-100 bg-bg flex">
				<div className="flex flex-1 flex-col gap-8">
					<div>
						<Logo />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Reset password</h1>
						<p className="text-fg-secondary text-sm">
							Enter the email address you registered with and we&apos;ll send
							you the reset instructions
						</p>
					</div>
					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-5">
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									<Label htmlFor="email-input">Email Address</Label>
									<Input id="email-input" size="36" type="email" />
								</div>
							</div>
							<Button className="w-full">Send Reset Instructions</Button>
						</div>
						<Divider className="my-2.5" />
						<div className="flex gap-3">
							<Button
								variant="outline"
								color="neutral"
								className="text-fg-secondary w-full">
								<GmailIcon />
								Open Gmail
							</Button>
							<Button
								variant="outline"
								color="neutral"
								className="text-fg-secondary w-full">
								<OutlookIcon />
								Open Outlook
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
