import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Logo } from "./brand-logo"
import { GmailIcon } from "./gmail-icon"
import { MailLogo } from "./mail-logo"

export default function ResetEmail() {
	return (
		<>
			<div className="text-fg flex items-center gap-2.5 py-2.5">
				<Logo />
			</div>
			<div className="flex flex-1 items-center justify-center">
				<div className="w-90 bg-bg flex">
					<div className="flex flex-1 flex-col gap-8">
						<div className="flex w-full justify-center">
							<MailLogo />
						</div>
						<div className="flex flex-col items-center gap-2">
							<h1 className="heading-5 font-semibold">We sent you an email</h1>
							<div>
								<p className="text-fg-secondary text-center text-sm">
									Password recovery instructions have been sent to{" "}
									<span className="text-fg font-medium">
										account@radian.com
									</span>
									. You should receive the email shortly.
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<Button
								variant="outline"
								color="neutral"
								className="text-fg-secondary w-full">
								<GmailIcon />
								Open Gmail
							</Button>
						</div>
						<p className="text-fg-secondary text-center text-sm">
							Can&apos;t find the email?{" "}
							<Button variant="link" asChild color="primary">
								<Link href="#">Resend email</Link>
							</Button>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
