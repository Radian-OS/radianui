"use client"

import React from "react"
import { Badge } from "@/registry/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const fontSpecs = {
	desktop: [
		{ name: "Heading 1", size: 64, lineHeight: 72, letterSpacing: -1 },
		{ name: "Heading 2", size: 48, lineHeight: 56, letterSpacing: -1 },
		{ name: "Heading 3", size: 40, lineHeight: 48, letterSpacing: -0.75 },
		{ name: "Heading 4", size: 32, lineHeight: 40, letterSpacing: -0.5 },
		{ name: "Heading 5", size: 24, lineHeight: 32, letterSpacing: -0.5 },
		{ name: "Heading 6", size: 20, lineHeight: 28, letterSpacing: -0.25 },
	],
	tablet: [
		{ name: "Heading 1", size: 48, lineHeight: 56, letterSpacing: -1 },
		{ name: "Heading 2", size: 40, lineHeight: 48, letterSpacing: -1 },
		{ name: "Heading 3", size: 36, lineHeight: 44, letterSpacing: -0.75 },
		{ name: "Heading 4", size: 30, lineHeight: 38, letterSpacing: -0.5 },
		{ name: "Heading 5", size: 24, lineHeight: 32, letterSpacing: -0.5 },
		{ name: "Heading 6", size: 20, lineHeight: 28, letterSpacing: -0.25 },
	],
	mobile: [
		{ name: "Heading 1", size: 36, lineHeight: 44, letterSpacing: -1 },
		{ name: "Heading 2", size: 32, lineHeight: 40, letterSpacing: -1 },
		{ name: "Heading 3", size: 30, lineHeight: 38, letterSpacing: -0.75 },
		{ name: "Heading 4", size: 28, lineHeight: 36, letterSpacing: -0.5 },
		{ name: "Heading 5", size: 24, lineHeight: 32, letterSpacing: -0.5 },
		{ name: "Heading 6", size: 20, lineHeight: 28, letterSpacing: -0.25 },
	],
}

const HeadingFontSpecs = () => {
	return (
		<Tabs defaultValue="desktop">
			<div className="flex items-center justify-start overflow-x-auto">
				<TabsList>
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
							{headings.map(
								({ name, size, lineHeight, letterSpacing }, index) => (
									<div
										key={name}
										className={`flex flex-col gap-2 ${index !== headings.length - 1 ? "border-b pb-4" : ""}`}>
										<span
											className="font-semibold"
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
												Weight: Semi Bold
											</Badge>
											<Badge color="neutral" variant="outline">
												Line Height: {lineHeight}px
											</Badge>
											<Badge color="neutral" variant="outline">
												Letter Spacing: {letterSpacing}px
											</Badge>
										</section>
									</div>
								)
							)}
						</div>
					</div>
				</TabsContent>
			))}
		</Tabs>
	)
}

export default HeadingFontSpecs
