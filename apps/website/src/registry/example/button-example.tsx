"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CirclePlus, Settings } from "lucide-react"
import { Button, ButtonGroup } from "@/registry/ui/button"

// Types for variant, size, and color options
type VariantOptions = "strong" | "soft" | "outline" | "ghost"
type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
// Kept RoundedOptions for ButtonGroup only
// type RoundedOptions = "square" | "rounded" | "full"
type ColorOptions = "primary" | "info" | "success" | "error" | "warning"

const ButtonExample = () => {
	// State for button properties
	const [variant, setVariant] = useState<VariantOptions>("strong")
	const [size, setSize] = useState<SizeOptions>("36")
	// Kept rounded state for ButtonGroup
	// const [rounded, setRounded] = useState<RoundedOptions>("rounded")
	const [color, setColor] = useState<ColorOptions>("primary")
	const [includeIcon, setIncludeIcon] = useState<boolean>(true)

	// Controls rendering
	const [activeSection, setActiveSection] = useState<"single" | "group">("single")

	const ControlPanel = () => (
		<div className="mb-8 space-y-4">
			<div className="flex gap-4">
				<button onClick={() => setActiveSection("single")} className={`rounded px-4 py-2 ${activeSection === "single" ? "bg-primary text-white" : "bg-elevation-negative"}`}>
					Single Button
				</button>
				<button onClick={() => setActiveSection("group")} className={`rounded px-4 py-2 ${activeSection === "group" ? "bg-primary text-white" : "bg-elevation-negative"}`}>
					Button Group
				</button>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label htmlFor="variant" className="mb-2 block text-sm font-medium">
						Variant:
					</label>
					<select id="variant" value={variant} onChange={(e) => setVariant(e.target.value as VariantOptions)} className="bg-base border-border w-full rounded p-2">
						<option value="strong">Strong</option>
						<option value="soft">Soft</option>
						<option value="outline">Outline</option>
						<option value="ghost">Ghost</option>
						<option value="neutral-soft">Neutral Soft</option>
						<option value="neutral-outline">Neutral Outline</option>
					</select>
				</div>

				<div>
					<label htmlFor="size" className="mb-2 block text-sm font-medium">
						Size:
					</label>
					<select id="size" value={size} onChange={(e) => setSize(e.target.value as SizeOptions)} className="border-border bg-base w-full rounded p-2">
						<option value="28">28</option>
						<option value="32">32</option>
						<option value="36">36</option>
						<option value="40">40</option>
						<option value="44">44</option>
						<option value="48">48</option>
					</select>
				</div>

				{/* Only show rounded control for ButtonGroup */}
				{activeSection === "group" && (
					<div>
						<label htmlFor="rounded" className="mb-2 block text-sm font-medium">
							Rounded:
						</label>
						<select
							id="rounded"
							// value={rounded}
							// onChange={(e) => setRounded(e.target.value as RoundedOptions)}
							className="border-border bg-base w-full rounded p-2">
							<option value="square">Square</option>
							<option value="rounded">Rounded</option>
							<option value="full">Full</option>
						</select>
					</div>
				)}

				<div>
					<label htmlFor="color" className="mb-2 block text-sm font-medium">
						Color:
					</label>
					<select id="color" value={color} onChange={(e) => setColor(e.target.value as ColorOptions)} className="border-border bg-base w-full rounded p-2">
						<option value="primary">Primary</option>
						<option value="information">Information</option>
						<option value="success">Success</option>
						<option value="error">Error</option>
						<option value="warning">Warning</option>
					</select>
				</div>

				{activeSection === "single" && (
					<div>
						<label className="mb-2 block text-sm font-medium">Include Icon:</label>
						<div className="flex items-center">
							<input id="include-icon" type="checkbox" checked={includeIcon} onChange={() => setIncludeIcon((prev) => !prev)} className="mr-2" />
							<span>{includeIcon ? "Yes" : "No"}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	)

	const SingleButtonPreview = () => (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Regular Button</h3>
			<div className="flex items-center gap-4">
				<Button variant={variant} size={size} color={color}>
					{includeIcon && <CirclePlus />}
					Button Label
				</Button>
			</div>

			<h3 className="mt-6 text-lg font-medium">Icon Button</h3>
			<div className="flex items-center gap-4">
				<Button variant={variant} size={size} color={color} iconOnly>
					<CirclePlus />
				</Button>
			</div>
		</div>
	)

	const ButtonGroupPreview = () => (
		<div className="space-y-6">
			<div>
				<h3 className="mb-3 text-lg font-medium">Navigation Group</h3>
				<ButtonGroup variant={variant} size={size} color={color}>
					<Button>
						<ChevronLeft />
						Previous
					</Button>
					<Button>Current</Button>
					<Button>
						Next
						<ChevronRight />
					</Button>
				</ButtonGroup>
			</div>

			<div>
				<h3 className="mb-3 text-lg font-medium">Action Group</h3>
				<ButtonGroup variant={variant} size={size} color={color}>
					<Button>Save</Button>
					<Button>
						<Settings />
						Settings
					</Button>
					<Button>
						<CirclePlus />
						Add New
					</Button>
				</ButtonGroup>
			</div>

			<div>
				<h3 className="mb-3 text-lg font-medium">Icon Group</h3>
				<ButtonGroup variant={variant} size={size} color={color}>
					<Button iconOnly>
						<ChevronLeft />
					</Button>
					<Button iconOnly>
						<Settings />
					</Button>
					<Button iconOnly>
						<CirclePlus />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)

	return (
		<div className="mx-auto max-w-3xl rounded-lg border p-6">
			<h2 className="mb-6 text-2xl font-bold">Button Components Demo</h2>

			<ControlPanel />

			<div className="border-t pt-6">{activeSection === "single" ? <SingleButtonPreview /> : <ButtonGroupPreview />}</div>
		</div>
	)
}

export default ButtonExample
