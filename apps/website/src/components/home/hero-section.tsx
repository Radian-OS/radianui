import React from "react"
import { Box } from "lucide-react"
import { EmailSubscribe } from "@/components/email-subscribe"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"

export default function HeroSection() {
	return (
		<div className="relative box-border flex flex-col gap-1 px-4 pb-4 pt-6 md:px-6 lg:px-10 lg:py-16">
			<section className="max-w-187 flex flex-col justify-between gap-6">
				<div className="relative h-7 w-fit rounded-md">
					<Badge size="28" className="bg-primary-focus text-primary-text w-fit text-sm font-medium">
						<Box size={20} />
						<span>Under Development</span>
					</Badge>
					{/* <div className="border-soft-alpha h-7 w-40 rounded-md border p-1">123</div> */}
					<BorderBeam size={30} />
				</div>
				<h1 className="heading-1">Ship next generation of world class products and solutions</h1>
				<p className="text-text-secondary text-lg font-normal">
					Radian is a high quality design and development library to build systems that scale quickly. Get from design to product in few hours.
				</p>
				<EmailSubscribe />
			</section>
		</div>
	)
}
