import React from "react"
import { SocialProofCompanies1 } from "./socialProofCompanies1"
import { SocialProofCompanies2 } from "./socialProofCompanies2"
import { SocialProofCompanies3 } from "./socialProofCompanies3"
import { SocialProofCompanies4 } from "./socialProofCompanies4"

export default function Page() {
	return (
		<main className="bg-bg min-h-screen py-10">
			<div className="mx-auto flex max-w-screen-xl flex-col gap-16 px-4">
				{/* Section 1: Neutral Infinite Motion Marquee */}
				<section className="border-border/60 bg-elevation-level1 rounded-2xl border p-4 sm:p-8">
					<div className="mb-4 px-2">
						<span className="text-fg text-xs font-semibold tracking-wider uppercase">
							Variant 1 — Continuous Motion Marquee (Neutral)
						</span>
					</div>
					<SocialProofCompanies1 />
				</section>

				{/* Section 2: Colored Infinite Motion Marquee */}
				<section className="border-border/60 bg-elevation-level1 rounded-2xl border p-4 sm:p-8">
					<div className="mb-4 px-2">
						<span className="text-fg text-xs font-semibold tracking-wider uppercase">
							Variant 2 — Continuous Motion Marquee (Colored)
						</span>
					</div>
					<SocialProofCompanies2 />
				</section>

				{/* Section 3: Neutral Static Grid */}
				<section className="border-border/60 bg-elevation-level1 rounded-2xl border p-4 sm:p-8">
					<div className="mb-4 px-2">
						<span className="text-fg text-xs font-semibold tracking-wider uppercase">
							Variant 3 — Static Grid (Neutral)
						</span>
					</div>
					<SocialProofCompanies3 />
				</section>

				{/* Section 4: Colored Static Grid */}
				<section className="border-border/60 bg-elevation-level1 rounded-2xl border p-4 sm:p-8">
					<div className="mb-4 px-2">
						<span className="text-fg text-xs font-semibold tracking-wider uppercase">
							Variant 4 — Static Grid (Colored)
						</span>
					</div>
					<SocialProofCompanies4 />
				</section>
			</div>
		</main>
	)
}
