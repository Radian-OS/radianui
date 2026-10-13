"use client"

import React from "react"
import { TRUSTED_COMPANIES } from "./pricing-data"

export function PricingLogos() {
	return (
		<div className="border-border/40 w-full border-t pt-16 pb-12">
			<div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 sm:px-8">
				{TRUSTED_COMPANIES.map((company) => (
					<div
						key={company.name}
						className="flex items-center opacity-75 transition-opacity duration-200 hover:opacity-100">
						{/* Light mode wordmark (contains logo + company name) */}
						<img
							src={company.lightSrc}
							alt={company.name}
							className="h-7 w-auto object-contain dark:hidden"
						/>
						{/* Dark mode wordmark (contains logo + company name) */}
						<img
							src={company.darkSrc}
							alt={company.name}
							className="hidden h-7 w-auto object-contain dark:block"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
