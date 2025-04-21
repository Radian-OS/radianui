"use client"

import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type TooltipPosition = "top" | "left" | "right" | "bottom"
type TooltipAlign = "start" | "end" | "center"

const TooltipExample = () => {
	const [selectedVariant, setSelectedVariant] = useState<TooltipPosition>("top")
	const [selectedAlign, setSelectedAlign] = useState<TooltipAlign>("center")

	const [showArrow, setShowArrow] = useState<boolean>(false)

	const tooltipPositions: TooltipPosition[] = ["top", "left", "right", "bottom"]

	return (
		<div className="flex flex-col gap-5">
			<div className="flex gap-5">
				<label className="flex flex-col gap-2">
					<span>Select Tooltip Position:</span>
					<select
						value={selectedVariant}
						onChange={(e) => setSelectedVariant(e.target.value as TooltipPosition)}
						className="w-max rounded border p-2">
						{tooltipPositions.map((position) => (
							<option key={position} value={position}>
								{position.charAt(0).toUpperCase() + position.slice(1)}
							</option>
						))}
					</select>
				</label>

				<label className="flex flex-col gap-2">
					<span>Show Arrow:</span>
					<select value={showArrow.toString()} onChange={(e) => setShowArrow(e.target.value === "true")} className="w-max rounded border p-2">
						<option value="true">True</option>
						<option value="false">False</option>
					</select>
				</label>

				<label className="flex flex-col gap-2">
					<span>Align:</span>
					<select value={selectedAlign} onChange={(e) => setSelectedAlign(e.target.value as TooltipAlign)} className="w-max rounded border p-2">
						<option value="start">Start</option>
						<option value="end">End</option>
						<option value="center">Center</option>
					</select>
				</label>
			</div>

			<Tooltip side={selectedVariant} withArrow={showArrow} align={selectedAlign}>
				<TooltipTrigger asChild>
					<Button className="w-max" variant="outline">
						Hover
					</Button>
				</TooltipTrigger>
				<TooltipContent>Hoverbjbjbjb</TooltipContent>
			</Tooltip>
		</div>
	)
}

export default TooltipExample
