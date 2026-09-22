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
		<div className="flex flex-col justify-between p-6 text-white sm:p-10 lg:p-14">
			<div>
				{/* Eyebrow with emerald status dot */}
				<div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
					<span className="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
					<span>We can help</span>
				</div>

				{/* Main Headline with typography utility */}
				<h1 className="heading-1 mt-6 max-w-lg text-white">
					Let’s discuss about your project and take it the next level.
				</h1>

				{/* Contact Details Grid */}
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
					<div>
						<span className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
							Phone
						</span>
						<p className="mt-1 text-sm font-semibold text-white">
							+323-25-8964
						</p>
					</div>

					<div>
						<span className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
							Email
						</span>
						<div className="mt-1">
							<Link
								href="mailto:me@shadcnspace.com"
								className="hover:text-primary text-sm font-semibold text-white transition-colors">
								me@shadcnspace.com
							</Link>
						</div>
					</div>
				</div>

				{/* Location */}
				<div className="mt-8">
					<span className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
						Location
					</span>
					<p className="mt-1 text-sm font-semibold text-white">
						Mark Avenue, Dalls Road, New York
					</p>
				</div>
			</div>

			{/* Trusted by Section */}
			<div className="mt-14 border-t border-zinc-800/80 pt-8">
				<span className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
					Trusted by
				</span>

				<div className="mt-6 flex flex-wrap items-center gap-8 opacity-75 sm:gap-12">
					{partnerLogos.map((partner) => (
						<div
							key={partner.name}
							className="flex items-center gap-2.5 text-zinc-400 transition-opacity hover:opacity-100">
							<div className="size-6 overflow-hidden rounded-md bg-zinc-800/80 p-0.5">
								<Image
									src={partner.logoUrl}
									alt={partner.name}
									width={24}
									height={24}
									className="size-full object-contain brightness-90"
								/>
							</div>
							<span className="text-sm font-bold tracking-tight text-white">
								Logoipsum
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
