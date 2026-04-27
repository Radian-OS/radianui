"use client"

import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"

const fontSpecs = {
	desktop: [
		{ name: "Body 18", size: 18, lineHeight: 28 },
		{ name: "Body 16", size: 16, lineHeight: 24 },
		{ name: "Body 14", size: 14, lineHeight: 20 },
		{ name: "Body 13", size: 13, lineHeight: 16 },
		{ name: "Body 12", size: 12, lineHeight: 16 },
	],
	tablet: [
		{ name: "Body 18", size: 18, lineHeight: 28 },
		{ name: "Body 16", size: 16, lineHeight: 24 },
		{ name: "Body 14", size: 14, lineHeight: 20 },
		{ name: "Body 13", size: 13, lineHeight: 16 },
		{ name: "Body 12", size: 12, lineHeight: 16 },
	],
	mobile: [
		{ name: "Body 18", size: 18, lineHeight: 28 },
		{ name: "Body 16", size: 16, lineHeight: 24 },
		{ name: "Body 14", size: 14, lineHeight: 20 },
		{ name: "Body 13", size: 13, lineHeight: 16 },
		{ name: "Body 12", size: 12, lineHeight: 16 },
	],
}

const BodyFontSpecs = () => {
	return (
		<Tabs defaultValue="desktop">
			<div className="flex items-center justify-start overflow-x-auto">
				<TabsList size="md">
					{Object.keys(fontSpecs).map((device) => (
						<TabsTrigger key={device} value={device}>
							{device.charAt(0).toUpperCase() + device.slice(1)}
						</TabsTrigger>
					))}
				</TabsList>
			</div>

			{Object.entries(fontSpecs).map(([device, headings]) => (
				<TabsContent key={device} value={device}>
					<div className="bg-fill2 rounded-2xl p-2">
						<div className="bg-bg flex flex-col gap-3 rounded-2xl border p-4 sm:p-8">
							{headings.map(({ name, size, lineHeight }, index) => (
								<div
									key={name}
									className={`flex flex-col gap-2 ${index !== headings.length - 1 ? "border-b pb-4" : ""}`}>
									<span
										style={{
											fontSize: `${size}px`,
											lineHeight: `${lineHeight}px`,
										}}>
										{name}
									</span>
									<section className="flex flex-wrap items-center justify-start gap-2">
										<Badge color="neutral" variant="outline">
											Font Size: {size}px
										</Badge>
										<Badge color="neutral" variant="outline">
											Weight: Regular
										</Badge>
										<Badge color="neutral" variant="outline">
											Line Height: {lineHeight}px
										</Badge>
										<Badge color="neutral" variant="outline">
											Letter Spacing: -1%
										</Badge>
									</section>
								</div>
							))}
						</div>
					</div>
				</TabsContent>
			))}
		</Tabs>
	)
}

export default BodyFontSpecs
