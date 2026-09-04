"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

export function AiworkCtaBanner() {
	return (
		<section className="py-16 md:py-24">
			<div className="mx-auto max-w-5xl px-4">
				<div className="from-primary relative overflow-hidden rounded-3xl bg-gradient-to-br to-blue-600 px-6 py-16 text-center text-white shadow-2xl md:px-12 md:py-20">
					{/* Background wave line graphic asset */}
					<Image
						src="https://framerusercontent.com/images/44hCWtn3BKzjAtKugGAid295p8.png"
						alt="Wave background"
						fill
						sizes="100vw"
						className="pointer-events-none object-cover opacity-35 mix-blend-screen"
					/>

					<div className="relative z-10 mx-auto max-w-2xl space-y-5">
						{/* Rule 13: heading-2 */}
						<h2 className="heading-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
							Let AI take the busywork off
							<br />
							your team&#39;s plate
						</h2>

						<p className="mx-auto max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
							From dispatching and documents to messages and reports, automate
							the tasks your team shouldn&#39;t be doing manually.
						</p>

						<div className="pt-4">
							{/* Rule 15: Explicit color prop on Button */}
							<Button
								variant="strong"
								color="neutral"
								size="40"
								className="text-primary gap-2 rounded-full bg-white px-6 text-sm font-semibold shadow-xl transition-transform hover:scale-105 hover:bg-white/95 active:scale-95">
								<span>Get 14 days free trial</span>
								<ChevronRight className="size-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
