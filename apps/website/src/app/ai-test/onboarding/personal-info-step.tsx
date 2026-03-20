"use client"

import { Upload } from "lucide-react"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
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
import RadianLogo from "./radian-logo"
import SupportFooter from "./support-footer"

type PersonalInfoStepProps = {
	onNext: () => void
}

export default function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h1 className="heading-5">Personalize your account</h1>
						<p className="text-fg-secondary text-sm">
							Add your details to personalize your experience.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-6">
						<div className="flex gap-3">
							<Avatar size="64" rounded="square">
								<AvatarFallback>AB</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col justify-center gap-2">
								<p className="text-fg text-sm font-medium">Profile Picture</p>
								<div className="flex gap-3">
									<Button variant="outline" color="neutral" size="28">
										<Upload className="size-4" />
										Upload Image
									</Button>
									<Button
										variant="outline"
										color="neutral"
										size="28"
										className="opacity-50">
										Remove
									</Button>
								</div>
								<p className="text-fg-tertiary text-xs">
									Preferred size 1:1, up to 5MB
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<div className="flex gap-4">
								<div className="flex flex-1 flex-col gap-1.5">
									<Label>First Name</Label>
									<Input placeholder="Enter first name" />
								</div>
								<div className="flex flex-1 flex-col gap-1.5">
									<Label>Last Name</Label>
									<Input placeholder="Enter last name" />
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex flex-1 flex-col gap-1.5">
									<Label>What is your role?</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="designer">Designer</SelectItem>
											<SelectItem value="developer">Developer</SelectItem>
											<SelectItem value="manager">Product Manager</SelectItem>
											<SelectItem value="founder">Founder</SelectItem>
											<SelectItem value="marketer">Marketer</SelectItem>
											<SelectItem value="student">Student</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex flex-1 flex-col gap-1.5">
									<Label>Department</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select department" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="engineering">Engineering</SelectItem>
											<SelectItem value="design">Design</SelectItem>
											<SelectItem value="product">Product</SelectItem>
											<SelectItem value="marketing">Marketing</SelectItem>
											<SelectItem value="sales">Sales</SelectItem>
											<SelectItem value="hr">Human Resources</SelectItem>
											<SelectItem value="finance">Finance</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="flex flex-col gap-1.5">
								<Label>How did you hear about us ?</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select an option" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="social">Social Media</SelectItem>
										<SelectItem value="search">Search Engine</SelectItem>
										<SelectItem value="friend">Friend or Colleague</SelectItem>
										<SelectItem value="blog">Blog or Article</SelectItem>
										<SelectItem value="ad">Advertisement</SelectItem>
										<SelectItem value="event">Event or Conference</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<Button
						variant="strong"
						color="primary"
						className="w-full"
						onClick={onNext}>
						Continue
					</Button>
				</div>
			</div>

			<div className="absolute bottom-10">
				<SupportFooter />
			</div>
		</div>
	)
}
