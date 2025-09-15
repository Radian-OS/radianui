"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const fonts = [
	{ label: "Geist", value: "font-geist" },
	{ label: "Inter Display", value: "font-inter-display" },
	{ label: "Inter", value: "font-inter" },
	{ label: "Open Sans", value: "font-open-sans" },
	{ label: "Roboto", value: "font-roboto" },
	{ label: "Manrope", value: "font-manrope" },
]

const TypographyPlaground = () => {
	const [defaultFont, setDefaultfont] = useState(fonts.map((font) => font.value)[1])
	console.log(defaultFont)
	return (
		<Tabs defaultValue="desktop">
			<div className={`flex items-center justify-between ${defaultFont}`}>
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36">
							{fonts.find((font) => font.value === defaultFont)?.label} <ChevronDown />
						</Button>
					</DropdownTrigger>
					<DropdownContent>
						<DropdownRadioGroup value={defaultFont} onValueChange={(value) => setDefaultfont(value)}>
							{fonts.map((font) => (
								<DropdownRadioItem key={font.value} value={font.value}>
									{font.label}
								</DropdownRadioItem>
							))}
						</DropdownRadioGroup>
					</DropdownContent>
				</Dropdown>
				<TabsList size="md">
					<TabsTrigger value="desktop">Desktop</TabsTrigger>
					<TabsTrigger value="tablet">Tablet</TabsTrigger>
					<TabsTrigger value="mobile">Mobile</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="desktop">
				<div className={`flex flex-col gap-10 rounded-xl border px-6 py-8 ${defaultFont}`}>
					<div className="flex flex-col gap-3 border-b border-l-0 border-r-0 border-t-0 pb-4">
						<Badge variant="soft" color="primary" size="24">
							Heading 2
						</Badge>
						<span className="text-5xl font-bold leading-[3.5rem]">Levy Chronicles</span>
						<p className="text-fg-secondary">
							In a seafaring empire, the treasury ran thin after a winter of failed harvests and costly patrols. The regent’s council needed revenue fast, and the merchant guild
							refused new tariffs on grain or sailcloth.
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 4
						</Badge>
						<span className="text-[2rem] font-bold leading-[2.5rem]">The Regent’s Edict</span>
						<p className="text-fg-secondary">
							Within a week, heralds posted notices along the docks. No ship could depart without a stamped chart, and every chart would carry a fee. The regent called it a fair
							contribution from those who profit from the sea.
							<br />
							<br />
							On the seventh day, a procession of ships entered the harbor together. Nets, barges, and tall masts alike. Captains presented their logbooks at the Admiralty steps.
						</p>
					</div>
					<div className="text-fg-secondary bg-fill2 border-l-primary border border-b-0 border-r-0 border-t-0 p-3">
						“If every voyage begins with a chart,” the regent declared, “then every chart should begin with a coin.”
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className="heading-6">Cartographers’ Revolt</span>
						<p className="text-fg-secondary">
							The port constable tore the notices down. The next night, a flotilla of fishing skiffs set lanterns in a long line over the dangerous bar and rang bells until dawn.
							Dockworkers joined, then pilots, then the insurers who had grown tired of paying for ignorance.
						</p>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="mobile">
				<div className={`flex flex-col gap-10 rounded-xl border px-6 py-8 ${defaultFont}`}>
					<div className="flex flex-col gap-3 border-b border-l-0 border-r-0 border-t-0 pb-4">
						<Badge variant="soft" color="primary" size="24">
							Heading 2
						</Badge>
						<span className="text-[2.25rem] font-bold leading-[2.75rem]">Levy Chronicles</span>
						<p className="text-fg-secondary">
							In a seafaring empire, the treasury ran thin after a winter of failed harvests and costly patrols. The regent’s council needed revenue fast, and the merchant guild
							refused new tariffs on grain or sailcloth.
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 4
						</Badge>
						<span className="text-[1.75rem] font-bold leading-[2.25rem]">The Regent’s Edict</span>
						<p className="text-fg-secondary">
							Within a week, heralds posted notices along the docks. No ship could depart without a stamped chart, and every chart would carry a fee. The regent called it a fair
							contribution from those who profit from the sea.
							<br />
							<br />
							On the seventh day, a procession of ships entered the harbor together. Nets, barges, and tall masts alike. Captains presented their logbooks at the Admiralty steps.
						</p>
					</div>
					<div className="text-fg-secondary bg-fill2 border-l-primary border border-b-0 border-r-0 border-t-0 p-3">
						“If every voyage begins with a chart,” the regent declared, “then every chart should begin with a coin.”
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className="heading-6">Cartographers’ Revolt</span>
						<p className="text-fg-secondary">
							The port constable tore the notices down. The next night, a flotilla of fishing skiffs set lanterns in a long line over the dangerous bar and rang bells until dawn.
							Dockworkers joined, then pilots, then the insurers who had grown tired of paying for ignorance.
						</p>
					</div>
				</div>
			</TabsContent>
			<TabsContent value="tablet">
				<div className={`flex flex-col gap-10 rounded-xl border px-6 py-8 ${defaultFont}`}>
					<div className="flex flex-col gap-3 border-b border-l-0 border-r-0 border-t-0 pb-4">
						<Badge variant="soft" color="primary" size="24">
							Heading 2
						</Badge>
						<span className="heading-2 text-[2.5rem] font-bold leading-[3rem]">Levy Chronicles</span>
						<p className="text-fg-secondary">
							In a seafaring empire, the treasury ran thin after a winter of failed harvests and costly patrols. The regent’s council needed revenue fast, and the merchant guild
							refused new tariffs on grain or sailcloth.
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 4
						</Badge>
						<span className="text-[1.875rem] font-bold leading-[2.375rem]">The Regent’s Edict</span>
						<p className="text-fg-secondary">
							Within a week, heralds posted notices along the docks. No ship could depart without a stamped chart, and every chart would carry a fee. The regent called it a fair
							contribution from those who profit from the sea.
							<br />
							<br />
							On the seventh day, a procession of ships entered the harbor together. Nets, barges, and tall masts alike. Captains presented their logbooks at the Admiralty steps.
						</p>
					</div>
					<div className="text-fg-secondary bg-fill2 border-l-primary border border-b-0 border-r-0 border-t-0 p-3">
						“If every voyage begins with a chart,” the regent declared, “then every chart should begin with a coin.”
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className="heading-6">Cartographers’ Revolt</span>
						<p className="text-fg-secondary">
							The port constable tore the notices down. The next night, a flotilla of fishing skiffs set lanterns in a long line over the dangerous bar and rang bells until dawn.
							Dockworkers joined, then pilots, then the insurers who had grown tired of paying for ignorance.
						</p>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	)
}
export default TypographyPlaground
