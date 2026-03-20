"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
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

interface PersonalInfoStepProps {
	onNext: () => void
}

export function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
	return (
		<AuthLayout
			showHeader
			header={
				<>
					<RadianLogo />
					<div className="flex items-center gap-1">
						<button className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium">
							<LogOut className="size-5" />
							Sign out
						</button>
						<span className="text-fg-tertiary text-sm">
							(design@radian.com)
						</span>
					</div>
				</>
			}>
			<div className="flex w-full max-w-[400px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Tell us about you and your company</h1>
					<p className="text-fg-secondary text-sm">
						Just a few details to finish setting up your account.
					</p>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						<div className="flex gap-4">
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>First Name</Label>
								<Input size="36" />
							</div>
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Last Name</Label>
								<Input size="36" />
							</div>
						</div>

						<div className="flex gap-4">
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Company</Label>
								<Input size="36" />
							</div>
							<div className="flex flex-1 flex-col gap-1.5">
								<Label>Company Size</Label>
								<Select>
									<SelectTrigger size="36">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1-10">1-10</SelectItem>
										<SelectItem value="11-50">11-50</SelectItem>
										<SelectItem value="51-200">51-200</SelectItem>
										<SelectItem value="201-500">201-500</SelectItem>
										<SelectItem value="501-1000">501-1000</SelectItem>
										<SelectItem value="1001+">1001+</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="flex flex-col gap-1.5">
							<Label>What&apos;s your role?</Label>
							<Select>
								<SelectTrigger size="36">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="designer">Designer</SelectItem>
									<SelectItem value="developer">Developer</SelectItem>
									<SelectItem value="product-manager">
										Product Manager
									</SelectItem>
									<SelectItem value="founder">Founder / CEO</SelectItem>
									<SelectItem value="marketer">Marketer</SelectItem>
									<SelectItem value="student">Student</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex flex-col gap-1.5">
							<Label>How did you hear about us?</Label>
							<Select>
								<SelectTrigger size="36">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="social-media">Social Media</SelectItem>
									<SelectItem value="friend">Friend / Colleague</SelectItem>
									<SelectItem value="search">Search Engine</SelectItem>
									<SelectItem value="blog">Blog / Article</SelectItem>
									<SelectItem value="event">Event / Conference</SelectItem>
									<SelectItem value="ad">Advertisement</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Button
						variant="strong"
						color="primary"
						size="36"
						className="w-full"
						onClick={onNext}>
						Continue
					</Button>
				</div>
			</div>
		</AuthLayout>
	)
}
