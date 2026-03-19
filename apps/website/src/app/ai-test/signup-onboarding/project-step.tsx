"use client"

import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { TextArea } from "@/registry/ui/text-area"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

export function ProjectStep({ onNext }: { onNext: () => void }) {
	return (
		<AuthLayout>
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h2 className="heading-5">Set your project name</h2>
						<p className="text-fg-secondary text-sm tracking-[-0.14px]">
							This name will be used to organize all your data and reports. You
							can change it later.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1.5">
							<Label>Project Name</Label>
							<Input placeholder="e.g. Radian Dashboard" />
						</div>

						<div className="flex flex-col gap-1.5">
							<Label>Project Description</Label>
							<TextArea
								placeholder="e.g. A modern analytics dashboard for design teams"
								className="min-h-[118px]"
							/>
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
