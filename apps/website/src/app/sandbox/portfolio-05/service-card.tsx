"use client"

import React from "react"
import { Camera, Code, LayoutTemplate, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { ServiceItem } from "./types"

interface ServiceCardProps {
	service: ServiceItem
}

export function ServiceCard({ service }: ServiceCardProps) {
	const renderIcon = () => {
		switch (service.iconName) {
			case "design":
				return <LayoutTemplate className="text-warning size-8 stroke-[1.8]" />
			case "dev":
				return <Code className="text-warning size-8 stroke-[1.8]" />
			case "mobile":
				return <Smartphone className="text-warning size-8 stroke-[1.8]" />
			case "camera":
				return <Camera className="text-warning size-8 stroke-[1.8]" />
		}
	}

	return (
		<Card className="border-border/70 bg-elevation-level1/20 hover:border-warning-border/40 rounded-2xl border p-5 shadow-xs transition-all duration-200">
			<CardContent className="flex items-start gap-4 p-0">
				<div className="shrink-0 pt-0.5">{renderIcon()}</div>
				<div className="flex flex-col gap-1">
					<h3 className="text-fg text-sm font-bold sm:text-base">
						{service.title}
					</h3>
					<p className="text-fg-secondary text-xs leading-relaxed sm:text-sm">
						{service.description}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
