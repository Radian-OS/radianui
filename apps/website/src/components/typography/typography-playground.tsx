"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { geist, inter, manrope, openSans, roboto } from "@/lib/fetch-fonts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const TypographyPlaground = () => {
	// font registry
	const fonts: Record<string, string> = {
		Inter: inter.className,
		"Inter Display": `${inter.className} tracking-tight`,
		Roboto: roboto.className,
		"Open Sans": openSans.className,
		Manrope: manrope.className,
		Geist: geist.className,
	}

	const [selectedFont, setSelectedFont] = useState<string>("Inter Display")

	return (
		<Tabs defaultValue="desktop">
			<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
				<Dropdown>
					<DropdownTrigger asChild>
						<Button variant="outline" color="neutral" size="36" autoFocus={false}>
							Font: {selectedFont} <ChevronDown />
						</Button>
					</DropdownTrigger>
					<DropdownContent>
						<DropdownRadioGroup value={selectedFont} onValueChange={(value) => setSelectedFont(value)}>
							{Object.keys(fonts).map((fontName) => (
								<DropdownRadioItem key={fontName} value={fontName}>
									{fontName}
								</DropdownRadioItem>
							))}
						</DropdownRadioGroup>
					</DropdownContent>
				</Dropdown>
				<TabsList className="whitespace-nowrap sm:whitespace-normal" size="md">
					<TabsTrigger value="desktop">Desktop</TabsTrigger>
					<TabsTrigger value="tablet">Tablet</TabsTrigger>
					<TabsTrigger value="mobile">Mobile</TabsTrigger>
				</TabsList>
			</div>

			{/* Desktop */}
			<TabsContent value="desktop">
				<div className={`flex flex-col gap-10 rounded-xl border px-6 py-8 ${fonts[selectedFont]}`}>
					<div className="flex flex-col gap-3 border-b pb-4">
						<Badge variant="soft" color="primary" size="24">
							Heading 2
						</Badge>
						<span className={`text-5xl font-bold leading-[3.5rem]`}>Levy Chronicles</span>
						<p className="text-fg-secondary">
							In a seafaring empire, the treasury ran thin after a winter of failed harvests and costly patrols. The regent&apos;s council needed revenue fast, and the merchant
							guild refused new tariffs on grain or sailcloth.
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 4
						</Badge>
						<span className={`text-[2rem] font-bold leading-[2.5rem]`}>The Regent&apos;s Edict</span>
						<p className="text-fg-secondary">
							Within a week, heralds posted notices along the docks. No ship could depart without a stamped chart, and every chart would carry a fee. The regent called it a fair
							contribution from those who profit from the sea.
						</p>
					</div>
					<div className="text-fg-secondary bg-fill2 border-l-primary border border-b-0 border-r-0 border-t-0 p-3">
						&quot;If every voyage begins with a chart,&quot; the regent declared, &quot;then every chart should begin with a coin.&quot;
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6`}>Cartographers&apos; Revolt</span>
						<p className="text-fg-secondary">
							The port constable tore the notices down. The next night, a flotilla of fishing skiffs set lanterns in a long line over the dangerous bar and rang bells until dawn.
							Dockworkers joined, then pilots, then the insurers who had grown tired of paying for ignorance.
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6 ${fonts[selectedFont]}`}>The Admiralty Levy: A New Era of Navigation Fees</span>
						<ul className="list-disc px-6 text-[1rem]">
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Harbor plans</span>: 2 silver per copy for detailed maps of local docks and facilities.
							</li>
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Coastal routes</span>: 5 silver for guides covering popular trade paths and hazards.
							</li>
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Open-ocean atlases</span>: 20 silver for extensive charts that include currents.
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6`}>Frequently asked questions</span>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>Why was the Map Duty introduced?</AccordionTrigger>
								<AccordionContent>
									The regent needed fast revenue and saw maps as an essential tool every ship relied on. Taxing them seemed like an easy and fair source of income.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>What problems did the tax create?</AccordionTrigger>
								<AccordionContent>
									The regent needed fast revenue and saw maps as an essential tool every ship relied on. Taxing them seemed like an easy and fair source of income.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>How was the issue resolved?</AccordionTrigger>
								<AccordionContent>
									The regent needed fast revenue and saw maps as an essential tool every ship relied on. Taxing them seemed like an easy and fair source of income.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</TabsContent>

			{/* Tablet */}
			<TabsContent value="tablet">
				<div className={`flex flex-col gap-10 rounded-xl border px-6 py-8 ${fonts[selectedFont]}`}>
					<div className="flex flex-col gap-3 border-b pb-4">
						<Badge variant="soft" color="primary" size="24">
							Heading 2
						</Badge>
						<span className={`text-[2.5rem] font-bold leading-[3rem]`}>Levy Chronicles</span>
						<p className="text-fg-secondary">
							In a seafaring empire, the treasury ran thin after a winter of failed harvests and costly patrols. The regent&apos;s council needed revenue fast, and the merchant
							guild refused new tariffs on grain or sailcloth.
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 4
						</Badge>
						<span className={`text-[1.875rem] font-bold leading-[2.375rem]`}>The Regent&apos;s Edict</span>
						<p className="text-fg-secondary">
							Within a week, heralds posted notices along the docks. No ship could depart without a stamped chart, and every chart would carry a fee. The regent called it a fair
							contribution from those who profit from the sea.
						</p>
					</div>
					<div className="text-fg-secondary bg-fill2 border-l-primary border border-b-0 border-r-0 border-t-0 p-3">
						&quot;If every voyage begins with a chart,&quot; the regent declared, &quot;then every chart should begin with a coin.&quot;
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6`}>Cartographers&apos; Revolt</span>
						<p className="text-fg-secondary">
							The port constable tore the notices down. The next night, a flotilla of fishing skiffs set lanterns in a long line over the dangerous bar and rang bells until dawn.
							Dockworkers joined, then pilots, then the insurers who had grown tired of paying for ignorance.
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6`}>The Admiralty Levy: A New Era of Navigation Fees</span>
						<ul className="list-disc px-6 text-[1rem]">
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Harbor plans</span>: 2 silver per copy for detailed maps of local docks and facilities.
							</li>
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Coastal routes</span>: 5 silver for guides covering popular trade paths and hazards.
							</li>
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Open-ocean atlases</span>: 20 silver for extensive charts that include currents.
							</li>
						</ul>
					</div>
				</div>
			</TabsContent>

			{/* Mobile */}
			<TabsContent value="mobile">
				<div className={`flex flex-col gap-10 rounded-xl border px-6 py-8 ${fonts[selectedFont]}`}>
					<div className="flex flex-col gap-3 border-b pb-4">
						<Badge variant="soft" color="primary" size="24">
							Heading 2
						</Badge>
						<span className={`text-[2.25rem] font-bold leading-[2.75rem]`}>Levy Chronicles</span>
						<p className="text-fg-secondary">
							In a seafaring empire, the treasury ran thin after a winter of failed harvests and costly patrols. The regent&apos;s council needed revenue fast, and the merchant
							guild refused new tariffs on grain or sailcloth.
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 4
						</Badge>
						<span className={`text-[1.75rem] font-bold leading-[2.25rem]`}>The Regent&apos;s Edict</span>
						<p className="text-fg-secondary">
							Within a week, heralds posted notices along the docks. No ship could depart without a stamped chart, and every chart would carry a fee. The regent called it a fair
							contribution from those who profit from the sea.
						</p>
					</div>
					<div className="text-fg-secondary bg-fill2 border-l-primary border border-b-0 border-r-0 border-t-0 p-3">
						&quot;If every voyage begins with a chart,&quot; the regent declared, &quot;then every chart should begin with a coin.&quot;
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6`}>Cartographers&apos; Revolt</span>
						<p className="text-fg-secondary">
							The port constable tore the notices down. The next night, a flotilla of fishing skiffs set lanterns in a long line over the dangerous bar and rang bells until dawn.
							Dockworkers joined, then pilots, then the insurers who had grown tired of paying for ignorance.
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<Badge variant="soft" color="primary" size="24">
							Heading 6
						</Badge>
						<span className={`heading-6`}>The Admiralty Levy: A New Era of Navigation Fees</span>
						<ul className="list-disc px-6 text-[1rem]">
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Harbor plans</span>: 2 silver per copy for detailed maps of local docks and facilities.
							</li>
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Coastal routes</span>: 5 silver for guides covering popular trade paths and hazards.
							</li>
							<li className="text-fg-secondary">
								<span className="text-fg font-medium">Open-ocean atlases</span>: 20 silver for extensive charts that include currents.
							</li>
						</ul>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	)
}

export default TypographyPlaground
