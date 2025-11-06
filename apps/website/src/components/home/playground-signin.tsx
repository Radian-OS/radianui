import { useId } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

export const radiusMap: Record<string, string> = {
	default: "",
	rounded: "rounded-full",
	flat: "rounded-none",
	fun: "rounded-xl",
}

export default function PlaygroundSignin({ rounded }: { rounded: "default" | "rounded" | "flat" | "fun" }) {
	const emailId = useId()
	const passwordId = useId()
	const checkboxId = useId()

	return (
		<div className="bg-bg bg-radial bg-size-[15px_15px] flex h-full w-full items-center justify-center bg-[radial-gradient(var(--color-fill4)_1px,transparent_1px)] px-5 py-12 md:p-12">
			<div className="bg-bg border-soft flex w-full max-w-[384px] flex-col gap-8 rounded-2xl border px-6 py-8 shadow-md">
				<div className="flex flex-col gap-6">
					<Image src="/mstile-144x144.png" alt="Logo" width="48" height="48" />
					<div className="flex flex-col gap-1.5">
						<h5 className="heading-5 text-fg">Sign In</h5>
						<p className="text-fg-secondary text-base font-normal">
							Already have an account?{" "}
							<Link className="text-primary-text" href="#">
								Sign up
							</Link>
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1.5">
							<Label htmlFor={emailId} className="text-fg">
								Email
							</Label>
							<Input type="email" size="36" id={emailId} placeholder="example@radianos.com" className={`${radiusMap[rounded]}`} />
						</div>
						<div className="flex flex-col gap-1.5">
							<Label htmlFor={passwordId} className="text-fg">
								Password
							</Label>
							<Input size="36" type="password" id={passwordId} placeholder="••••••••••••" className={`${radiusMap[rounded]}`} />
						</div>
					</div>
					<div className="flex w-full items-center justify-between text-sm font-normal">
						<div className="flex items-center gap-2">
							<Checkbox id={checkboxId} className={`${radiusMap[rounded]}`} /> <Label htmlFor={checkboxId}>Remember me</Label>
						</div>
						<Link className="text-primary-text" href="#">
							Forgot Password?
						</Link>
					</div>
					<Button size="36" className={`w-full ${radiusMap[rounded]}`}>
						Log In
					</Button>
					<div className="flex items-center gap-1.5">
						<Divider className="flex-1" />
						<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">Or continue with</span>
						<Divider className="flex-1" />
					</div>
					<div className="flex gap-3">
						<Button variant="outline" color="neutral" className={`text-fg-secondary w-full ${radiusMap[rounded]}`}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M18.55 19.55C18.0663 19.9611 17.5477 20.3291 17 20.65C14.7044 21.9769 11.9759 22.3377 9.41428 21.6533C6.85269 20.9688 4.6678 19.295 3.34 17C3.23018 16.8188 3.13004 16.6318 3.04 16.44L6.24 13.94C6.65125 15.1428 7.42682 16.1877 8.45903 16.9296C9.49124 17.6715 10.7288 18.0736 12 18.08C13.0547 18.0751 14.0895 17.7923 15 17.26C15.0991 17.2095 15.1929 17.1492 15.28 17.08L18.55 19.55Z"
									fill="#2BA24C
"
								/>
								<path
									d="M5.91 12C5.9123 12.6572 6.02382 13.3094 6.24 13.93L3 16.43C2.33133 15.0495 1.98917 13.5338 2 12C1.99548 10.4277 2.36934 8.87739 3.09 7.47998L6.26 9.99998C6.02665 10.6409 5.90816 11.3179 5.91 12Z"
									fill="#F0B501
"
								/>
								<path
									d="M18.59 5.40998L16.74 7.25998C16.619 7.36821 16.4623 7.42805 16.3 7.42805C16.1377 7.42805 15.981 7.36821 15.86 7.25998C15.1742 6.70071 14.3743 6.29841 13.5164 6.08136C12.6585 5.8643 11.7635 5.83776 10.8943 6.0036C10.0251 6.16944 9.20271 6.52364 8.48501 7.0413C7.76731 7.55895 7.17168 8.22751 6.74 8.99998C6.55409 9.32025 6.3936 9.65461 6.26 9.99998L3.09 7.47998C3.17 7.31998 3.25 7.15998 3.34 7.00998C4.07676 5.73504 5.086 4.63854 6.29562 3.79881C7.50524 2.95909 8.88537 2.39687 10.3374 2.15231C11.7895 1.90775 13.2777 1.98689 14.6956 2.38408C16.1135 2.78127 17.4263 3.4867 18.54 4.44998C18.6087 4.5082 18.6648 4.57986 18.7047 4.66055C18.7447 4.74124 18.7677 4.82925 18.7724 4.91918C18.7771 5.00911 18.7633 5.09904 18.732 5.18345C18.7006 5.26785 18.6523 5.34495 18.59 5.40998Z"
									fill="#E43E2B
"
								/>
								<path
									d="M22 12.08C22.0083 13.502 21.7035 14.9084 21.1073 16.1993C20.511 17.4903 19.6379 18.6343 18.55 19.55L15.31 17.08C16.3885 16.3857 17.2184 15.3667 17.68 14.17H13.09C13.0043 14.1713 12.9191 14.1554 12.8397 14.1232C12.7602 14.0911 12.688 14.0432 12.6274 13.9826C12.5667 13.922 12.5189 13.8498 12.4867 13.7703C12.4545 13.6908 12.4386 13.6057 12.44 13.52V10.91C12.4386 10.8247 12.4545 10.74 12.4868 10.6611C12.5191 10.5821 12.5671 10.5106 12.6279 10.4507C12.6887 10.3909 12.761 10.344 12.8404 10.3129C12.9198 10.2819 13.0047 10.2673 13.09 10.27H21.24C21.393 10.2693 21.5414 10.3218 21.66 10.4185C21.7786 10.5151 21.8599 10.65 21.89 10.8C21.9653 11.2224 22.0021 11.6509 22 12.08Z"
									fill="#3B7DED
"
								/>
							</svg>
							Google
						</Button>
						<Button variant="outline" color="neutral" className={`text-fg-secondary w-full ${radiusMap[rounded]}`}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.9633 2.38196C0.554219 2.62051 -1.82095 17.9295 8.85177 21.6012C9.34962 21.6945 9.53632 21.3833 9.53632 21.124C9.53632 20.8647 9.53632 20.2735 9.53632 19.4438C6.74627 20.0454 6.15506 18.1266 6.15506 18.1266C5.96795 17.5265 5.57009 17.0144 5.0349 16.6849C4.13255 16.0729 5.1075 16.0833 5.1075 16.0833C5.42624 16.1254 5.73084 16.241 5.99724 16.421C6.26364 16.601 6.48455 16.8405 6.64254 17.1205C6.92549 17.6131 7.39049 17.9749 7.93748 18.1281C8.48448 18.2814 9.06977 18.2138 9.56744 17.9399C9.61868 17.4406 9.84242 16.9747 10.2001 16.6226C7.97016 16.3737 5.63646 15.5232 5.63646 11.7478C5.62244 10.7644 5.99486 9.81471 6.67366 9.10297C6.35965 8.24547 6.39693 7.29866 6.77738 6.4685C6.77738 6.4685 7.61751 6.2092 9.53632 7.50569C11.1799 7.05965 12.9127 7.05965 14.5563 7.50569C16.4648 6.22995 17.3049 6.4685 17.3049 6.4685C17.6699 7.29557 17.7033 8.23123 17.3982 9.08223C18.077 9.79397 18.4495 10.7436 18.4354 11.7271C18.4354 15.5128 16.0914 16.353 13.8614 16.5915C14.8986 17.1412 14.463 20.6781 14.5252 21.1137C14.5252 21.373 14.7015 21.6841 15.2201 21.5908C25.8617 17.9502 23.3725 2.62051 11.9633 2.38196Z"
									fill="currentColor"
								/>
							</svg>
							Github
						</Button>
					</div>
				</div>
				<p className="text-fg-secondary text-center text-sm font-normal">
					Don&apos;t have an account?{" "}
					<Link href="#" className="text-primary-text">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
