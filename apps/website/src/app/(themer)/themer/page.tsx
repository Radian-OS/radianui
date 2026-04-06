"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { Card, CardContent } from "@/registry/ui/card"
import {
	Dropdown,
	DropdownContent,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/registry/ui/dropdown"

export default function Page() {
	const [primaryColor, setPrimaryColor] = useState<string>("purple")
	const [selectedComponent, setSelectedComponent] = useState<string>("button")

	const iframeRef = useRef<HTMLIFrameElement>(null)

	const iframeSrc = useMemo(
		() =>
			`/preview/test?primaryColor=${primaryColor}&component=${selectedComponent}`,
		[]
	)

	const selectedColorName =
		PRIMARY_COLORS.find((c) => c.value === primaryColor)?.name ?? primaryColor
	const selectedComponentName =
		COMPONENTS_DATA.find(
			(name) => name.toLowerCase().replace(/\s+/g, "-") === selectedComponent
		) ?? selectedComponent

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe?.contentWindow) return

		iframe.contentWindow.postMessage(
			{ type: "primary-color-change", primaryColor },
			"*"
		)
	}, [primaryColor])

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe?.contentWindow) return

		iframe.contentWindow.postMessage(
			{ type: "component-change", component: selectedComponent },
			"*"
		)
	}, [selectedComponent])

	return (
		<div className="flex h-screen w-full gap-4 p-3">
			<Card className="bg-fill1">
				<CardContent className="flex flex-col gap-4">
					<Dropdown>
						<DropdownTrigger className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<div className="flex flex-col items-start gap-0.5">
								<span className="text-fg-tertiary text-xs">Primary Color</span>
								<span className="text-fg">{selectedColorName}</span>
							</div>
							<ChevronDown className="text-fg-secondary size-4 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={primaryColor}
								onValueChange={setPrimaryColor}>
								{PRIMARY_COLORS.map((color) => (
									<DropdownRadioItem
										key={color.value}
										value={color.value}
										onSelect={(e) => e.preventDefault()}>
										<span
											className="size-3 shrink-0 rounded-full border border-black/10"
											style={{ backgroundColor: color.cssVars.light.primary }}
										/>
										{color.name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>

					<Dropdown>
						<DropdownTrigger className="border-border bg-elevation-level2 hover:bg-fill1 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors">
							<div className="flex flex-col items-start gap-0.5">
								<span className="text-fg-tertiary text-xs">Component</span>
								<span className="text-fg">{selectedComponentName}</span>
							</div>
							<ChevronDown className="text-fg-secondary size-4 shrink-0" />
						</DropdownTrigger>
						<DropdownContent side="right" className="max-h-96 w-56">
							<DropdownRadioGroup
								value={selectedComponent}
								onValueChange={setSelectedComponent}>
								{COMPONENTS_DATA.map((name) => (
									<DropdownRadioItem
										key={name}
										value={name.toLowerCase().replace(/\s+/g, "-")}
										onSelect={(e) => e.preventDefault()}>
										{name}
									</DropdownRadioItem>
								))}
							</DropdownRadioGroup>
						</DropdownContent>
					</Dropdown>
				</CardContent>
			</Card>

			<div className="flex-1">
				<iframe ref={iframeRef} src={iframeSrc} className="h-full w-full" />
			</div>
		</div>
	)
}
