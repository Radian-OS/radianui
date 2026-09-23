import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { PartnerLogo } from "./types"

const partnerLogos: PartnerLogo[] = [
	{ name: "Logoipsum One", logoUrl: "/sandbox/placeholder.svg" },
	{ name: "Logoipsum Two", logoUrl: "/sandbox/placeholder.svg" },
	{ name: "Logoipsum Three", logoUrl: "/sandbox/placeholder.svg" },
]

export function InfoPanel() {
	return (
		<div className="text-fg flex flex-col justify-between p-6 sm:p-10 lg:p-14">
			<div>
				{/* Eyebrow with success status dot */}
				<div className="text-fg-secondary flex items-center gap-2 text-sm font-medium">
					<span className="bg-success inline-block size-2 rounded-full shadow-xs" />
					<span>We can help</span>
				</div>

				{/* Main Headline with typography utility */}
				<h1 className="heading-1 text-fg mt-6 max-w-lg">
					Let’s discuss about your project and take it the next level.
				</h1>

				{/* Contact Details Grid */}
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
					<div>
						<span className="text-fg-tertiary text-xs font-medium tracking-wide uppercase">
							Phone
						</span>
						<p className="text-fg mt-1 text-sm font-semibold">+323-25-8964</p>
					</div>

					<div>
						<span className="text-fg-tertiary text-xs font-medium tracking-wide uppercase">
							Email
						</span>
						<div className="mt-1">
							<Link
								href="mailto:me@shadcnspace.com"
								className="text-fg hover:text-primary text-sm font-semibold transition-colors">
								me@shadcnspace.com
							</Link>
						</div>
					</div>
				</div>

				{/* Location */}
				<div className="mt-8">
					<span className="text-fg-tertiary text-xs font-medium tracking-wide uppercase">
						Location
					</span>
					<p className="text-fg mt-1 text-sm font-semibold">
						Mark Avenue, Dalls Road, New York
					</p>
				</div>
			</div>

			{/* Trusted by Section */}
			<div className="border-border/80 mt-14 border-t pt-8">
				<span className="text-fg-tertiary text-xs font-medium tracking-wider uppercase">
					Trusted by
				</span>

				<div className="mt-6 flex flex-wrap items-center gap-8 opacity-75 sm:gap-12">
					{partnerLogos.map((partner) => (
						<div
							key={partner.name}
							className="text-fg-secondary flex items-center gap-2.5 transition-opacity hover:opacity-100">
							<div className="bg-fill2 size-6 overflow-hidden rounded-md p-0.5">
								<Image
									src={partner.logoUrl}
									alt={partner.name}
									width={24}
									height={24}
									className="size-full object-contain brightness-90"
								/>
							</div>
							<span className="text-fg text-sm font-bold tracking-tight">
								Logoipsum
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
