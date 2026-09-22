"use client"

import React from "react"
import { ServiceCard } from "./service-card"
import { SERVICES } from "./types"

export function ServicesSection() {
	return (
		<div className="flex flex-col gap-5">
			<h2 className="heading-5 text-foreground">What I&apos;m Doing</h2>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{SERVICES.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>
		</div>
	)
}
