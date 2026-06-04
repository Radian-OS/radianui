"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button, IconButton } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "./avatar"

const SAMPLES = [
	{ id: "img", src: "https://i.pravatar.cc/150?img=67", fallback: "YB" },
	{ id: "yb", src: undefined, fallback: "YB" },
	{ id: "sr", src: undefined, fallback: "SR" },
	{ id: "mk", src: undefined, fallback: "MK" },
]

type Rounded = "circle" | "square"
type StatusVariant = "online" | "offline" | "busy" | "away"

const ROUNDED_OPTIONS: Rounded[] = ["circle", "square"]
const STATUS_OPTIONS: Array<StatusVariant | "none"> = [
	"none",
	"online",
	"offline",
	"busy",
	"away",
]

function getFontSize(size: number): number {
	return Math.round(Math.max(size * 0.32))
}
function getSquareRadius(size: number): number {
	return Math.round(size * 0.17)
}
function getDotSize(size: number): number {
	return Math.round(size * 0.12)
}
function getBorderWidth(size: number): number {
	return Math.max(1, Math.round(size * 0.05))
}

type ScalingRow = {
	label: string
	ratio: number
	unit: string
	value: (size: number) => number
}

const SCALING_ROWS: ScalingRow[] = [
	{ label: "fontSize", ratio: 0.32, unit: "px", value: getFontSize },
	{ label: "borderRadius", ratio: 0.17, unit: "px", value: getSquareRadius },
	{ label: "dotSize", ratio: 0.12, unit: "px", value: getDotSize },
	{ label: "borderWidth", ratio: 0.05, unit: "px", value: getBorderWidth },
]

export default function AvatarPlayground() {
	const [size, setSize] = useState(40)
	const [inputVal, setInputVal] = useState("40")
	const [rounded, setRounded] = useState<Rounded>("circle")
	const [status, setStatus] = useState<StatusVariant | "none">("none")

	function applySize(val: number) {
		const clamped = Math.min(Math.max(val))
		setSize(clamped)
		setInputVal(String(clamped))
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputVal(e.target.value)
	}

	function handleInputCommit() {
		const parsed = parseInt(inputVal, 10)
		if (!isNaN(parsed)) {
			applySize(parsed)
		} else {
			setInputVal(String(size))
		}
	}

	return (
		<div className="bg-background min-h-screen p-8">
			<div className="mx-auto max-w-2xl space-y-6">
				{/* Controls */}
				<div className="border-border bg-card space-y-5 rounded-xl border p-6">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground text-sm">Size</span>
							<Input
								type="number"
								value={inputVal}
								onChange={handleInputChange}
								onBlur={handleInputCommit}
								className="w-40"
								onKeyDown={(e) => e.key === "Enter" && handleInputCommit()}
							/>
						</div>
						<div className="flex items-center gap-2">
							<IconButton
								aria-label="Reduce size"
								size="28"
								variant="outline"
								color="neutral"
								onClick={() => applySize(size - 1)}>
								<Minus size={16} />
							</IconButton>
							<Slider
								step={1}
								value={[size]}
								onValueChange={([val]) => applySize(val)}>
								<SliderThumb />
							</Slider>
							<IconButton
								aria-label="Increase size"
								size="28"
								variant="outline"
								color="neutral"
								onClick={() => applySize(size + 1)}>
								<Plus size={16} />
							</IconButton>
						</div>
					</div>

					<div className="space-y-2">
						<span className="text-muted-foreground text-sm">Rounded</span>
						<div className="flex gap-2">
							{ROUNDED_OPTIONS.map((opt) => (
								<Button
									key={opt}
									onClick={() => setRounded(opt)}
									className={`border transition-colors ${
										rounded === opt
											? "bg-primary text-primary-foreground border-transparent"
											: "border-border bg-background text-muted-foreground hover:bg-muted"
									}`}>
									{opt}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-2">
						<span className="text-muted-foreground text-sm">Status</span>
						<div className="flex flex-wrap gap-2">
							{STATUS_OPTIONS.map((opt) => (
								<Button
									key={opt}
									onClick={() => setStatus(opt)}
									className={`border transition-colors ${
										status === opt
											? "bg-primary text-primary-foreground border-transparent"
											: "border-border bg-background text-muted-foreground hover:bg-muted"
									}`}>
									{opt}
								</Button>
							))}
						</div>
					</div>
				</div>

				{/* Preview */}
				<div className="border-border bg-card rounded-xl border p-6">
					<p className="text-muted-foreground mb-4 text-sm">Preview</p>
					<div className="flex flex-wrap items-end gap-6">
						{SAMPLES.map((s) => (
							<div key={s.id} className="flex flex-col items-center gap-2">
								<Avatar size={size} rounded={rounded}>
									{s.src && <AvatarImage src={s.src} />}
									<AvatarFallback>{s.fallback}</AvatarFallback>
									{status !== "none" && <AvatarStatus variant={status} />}
								</Avatar>
								<span className="text-muted-foreground text-xs">
									{s.src ? "image" : s.fallback}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Computed values */}
				<div className="border-border bg-card space-y-3 rounded-xl border p-6">
					<p className="text-muted-foreground text-sm">Computed values</p>
					<div className="bg-muted space-y-2 rounded-lg p-4 font-mono text-sm">
						{SCALING_ROWS.map((row) => {
							const raw = size * row.ratio
							const result = row.value(size)
							return (
								<div
									key={row.label}
									className="flex flex-wrap items-baseline gap-1.5">
									<span className="text-fg">{row.label}</span>
									<span className="text-fg">
										= {size} × {row.ratio} = {raw.toFixed(2)}
									</span>
									<span className="text-fg-secondary">→</span>
									<span className="text-fg font-medium">
										rounds to {result}
										{row.unit}
									</span>
								</div>
							)
						})}
					</div>
				</div>

				{/* Code snippet */}
				<div className="border-border bg-card rounded-xl border p-6">
					<p className="text-muted-foreground mb-3 text-sm">Code</p>
					<pre className="bg-muted text-foreground overflow-x-auto rounded-lg p-4 text-sm leading-relaxed">
						<code>
							{[
								`<Avatar size={${size}} rounded="${rounded}">`,
								`  <AvatarImage src={src} />`,
								`  <AvatarFallback>YB</AvatarFallback>`,
								status !== "none"
									? `  <AvatarStatus variant="${status}" />`
									: null,
								`</Avatar>`,
							]
								.filter(Boolean)
								.join("\n")}
						</code>
					</pre>
				</div>
			</div>
		</div>
	)
}
