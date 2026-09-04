"use client"

import React from "react"
import { CheckCircle2, Lock, Server } from "lucide-react"

interface SecurityFeature {
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
}

const securityFeatures: SecurityFeature[] = [
	{
		title: "End-to-End Encryption",
		description: "All data encrypted in transit and at rest using AES-256.",
		icon: CheckCircle2,
	},
	{
		title: "Zero Data Retention",
		description: "Your data is never stored or used for model training.",
		icon: Lock,
	},
	{
		title: "Private Deployment",
		description: "Deploy in your own VPC for complete data sovereignty.",
		icon: Server,
	},
]

const complianceBadges = ["SOC 2", "GDPR", "HIPAA"]

export function AgentlabSecuritySection() {
	return (
		<section className="border-border/60 bg-bg border-t py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
					{/* Left Title & Compliance Badges */}
					<div className="lg:col-span-5">
						<h2 className="heading-2 text-fg font-serif text-3xl font-normal leading-[1.2] tracking-tight sm:text-4xl md:text-5xl">
							Enterprise-Grade Security Standards
						</h2>

						<div className="mt-8 flex items-center gap-3.5">
							{complianceBadges.map((badge) => (
								<div
									key={badge}
									className="from-primary to-primary-hover flex size-16 items-center justify-center rounded-full bg-gradient-to-br font-mono text-xs font-bold text-white shadow-md transition-transform hover:scale-105">
									{badge}
								</div>
							))}
						</div>
					</div>

					{/* Right 3 Feature Columns (Rule 18: mapped array) */}
					<div className="divide-border/60 grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-7">
						{securityFeatures.map((item) => {
							const Icon = item.icon
							return (
								<div
									key={item.title}
									className="p-6 sm:first:pl-0 sm:last:pr-0">
									<div className="border-border bg-fill2 text-fg mb-6 flex size-10 items-center justify-center rounded-lg border">
										<Icon className="text-primary size-5" />
									</div>
									<h3 className="heading-4 text-fg font-serif text-lg font-normal sm:text-xl">
										{item.title}
									</h3>
									<p className="text-fg-secondary mt-2.5 text-xs leading-relaxed sm:text-sm">
										{item.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
