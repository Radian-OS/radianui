import React from "react"
import data from "./data.json"

export function SocialProof() {
	return (
		<div className="bg-bg w-full py-12 sm:py-16">
			<div className="mx-auto max-w-screen-xl px-6">
				<div className="flex flex-col items-center justify-center gap-8 text-center sm:gap-10">
					<p className="text-fg-secondary max-w-screen-lg text-base font-medium sm:text-lg">
						Thousands of businesses trust Radian to build their products
					</p>

					{/* Static Neutral Logo Grid */}
					<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
						{data.companies.map((logo, index) => (
							<div
								key={`${logo.name}-${index}`}
								className="flex h-10 items-center justify-center transition-all duration-200 hover:scale-105">
								<img
									src={logo.src}
									alt={logo.name}
									className="h-7 w-auto object-contain opacity-55 transition-opacity duration-200 hover:opacity-100 sm:h-8 dark:brightness-200 dark:contrast-125"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SocialProof
