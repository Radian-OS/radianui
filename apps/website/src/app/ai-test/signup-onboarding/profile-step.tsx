"use client"

import { Button } from "@/registry/ui/button"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

export function ProfileStep({ onNext }: { onNext: () => void }) {
	return (
		<AuthLayout>
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h2 className="heading-5">Create your profile</h2>
						<p className="text-fg-secondary text-sm tracking-[-0.14px]">
							Tell us a bit about yourself and your company.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1.5">
							<Label>Full name</Label>
							<Input placeholder="John Doe" />
						</div>

						<div className="flex flex-col gap-1.5">
							<Label>Work email</Label>
							<Input placeholder="designer@mage.com" type="email" />
						</div>

						<div className="flex flex-col gap-4 sm:flex-row">
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Company Name</Label>
								<Input placeholder="Mage" />
							</div>
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Job Title</Label>
								<Input placeholder="Product Designer" />
							</div>
						</div>

						<div className="flex flex-col gap-4 sm:flex-row">
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Website URL</Label>
								<InputGroup>
									<InputAddon>https://</InputAddon>
									<Input placeholder="mageicon.com" />
								</InputGroup>
							</div>
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Country</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="United States" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="us">United States</SelectItem>
										<SelectItem value="uk">United Kingdom</SelectItem>
										<SelectItem value="ca">Canada</SelectItem>
										<SelectItem value="au">Australia</SelectItem>
										<SelectItem value="de">Germany</SelectItem>
										<SelectItem value="fr">France</SelectItem>
										<SelectItem value="jp">Japan</SelectItem>
										<SelectItem value="np">Nepal</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<Button onClick={onNext} className="w-full">
						Continue
					</Button>
				</div>
			</div>
		</AuthLayout>
	)
}
