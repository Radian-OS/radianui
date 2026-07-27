"use client"

import React from "react"
import { AlertTriangle, CircleCheckBig, Info } from "lucide-react"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import {
	Banner,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"

export default function Page() {
	return (
		<div className="max-w-132.5 flex w-full flex-col items-center gap-6 p-6">
			{/* Alerts */}
			<section className="w-full">
				<h3 className="mb-3 text-sm font-semibold">Alert examples</h3>

				<div className="flex flex-col gap-4">
					<Alert variant="strong">
						<AlertIcon>
							<CircleCheckBig size={18} />
						</AlertIcon>
						<AlertContent>
							<AlertTitle>Payment Successful</AlertTitle>
							<AlertDescription>
								Your payment was processed and a receipt was sent to your email.
							</AlertDescription>
							<div className="flex items-center gap-2 pt-2">
								<Button variant="link" color="success">
									View receipt
								</Button>
								<span className="bg-fg-tertiary size-1 rounded-full"></span>
								<Button variant="link" color="success">
									Manage
								</Button>
							</div>
						</AlertContent>
					</Alert>

					<Alert color="warning">
						<AlertIcon>
							<Info size={18} />
						</AlertIcon>
						<AlertContent>
							<AlertTitle>Storage Near Capacity</AlertTitle>
							<AlertDescription>
								You are nearing your storage limit. Consider upgrading your
								plan.
							</AlertDescription>
						</AlertContent>
					</Alert>

					<Alert color="error">
						<AlertIcon>
							<AlertTriangle size={18} />
						</AlertIcon>
						<AlertContent>
							<AlertTitle>Payment Failed</AlertTitle>
							<AlertDescription>
								We couldn’t process your card. Update your payment method to
								continue.
							</AlertDescription>
						</AlertContent>
					</Alert>
				</div>
			</section>

			{/* Banners */}
			<section className="w-full">
				<h3 className="mb-3 text-sm font-semibold">Banner examples</h3>

				<div className="flex flex-col gap-4">
					<Banner className="w-full" variant="strong">
						<BannerIcon>
							<Info size={18} />
						</BannerIcon>
						<BannerTitle className="truncate">
							Free trial ending soon
						</BannerTitle>
						<BannerDescription className="truncate">
							You have 3 days left in your trial. Need more time?
						</BannerDescription>
						<div className="pl-1">
							<Button size="28" color="neutral">
								Contact sales
							</Button>
						</div>
					</Banner>

					<Banner className="w-full" variant="outline">
						<BannerIcon>
							<Info size={18} />
						</BannerIcon>
						<BannerTitle>Black Friday Deal</BannerTitle>
						<BannerDescription>
							Save 30% on all annual plans — limited time only.
						</BannerDescription>
						<div className="pl-1">
							<Button size="28">Explore</Button>
						</div>
					</Banner>
				</div>
			</section>
		</div>
	)
}
