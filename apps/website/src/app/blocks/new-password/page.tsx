import Logo from "@/components/home/playground-logo"
import { cn } from "@/lib/utils"
import NewPasswordForm from "./components/new-password-form"

interface NewPasswordProps {
	fullScreen?: boolean
}

export default function Page({ fullScreen = true }: NewPasswordProps) {
	return (
		<div
			className={cn("bg-bg flex items-center justify-center px-5", {
				"h-full w-full": !fullScreen,
				"h-screen w-screen": fullScreen,
			})}>
			<div className="w-100 bg-bg flex">
				<div className="flex flex-1 flex-col gap-8">
					<div className="flex flex-1 flex-col gap-6">
						<div>
							<Logo />
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="heading-5">Change Your Password</h1>
							<p className="text-fg-secondary text-sm">
								Enter a new password below to change your password.
							</p>
						</div>
					</div>
					<NewPasswordForm />
				</div>
			</div>
		</div>
	)
}
